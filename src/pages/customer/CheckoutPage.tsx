import React, { useState, useEffect, useMemo } from 'react';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type {
  Stripe,
  StripeElements,
  StripeElementStyle,
  StripeCardNumberElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardCvcElementOptions,
} from '@stripe/stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@hooks/useCart';
import { useAuthStore } from '@store/authStore';
import { useAddressStore } from '@store/addressStore';
import { useToast } from '@components/common/Toast';
import { ordersAPI, paymentsAPI } from '@api';
import { menuAPI } from '@api/endpoints/menu';
import { deliveryAPI } from '@api/endpoints/delivery';
import { MealSubscriptionSelection } from '@models/cart.types';
import { formatCurrency } from '@utils/formatters';
import { Address, DeliveryAvailability } from '@models/address.types';
import { DeliveryZone } from '@models/subscription.types';
import { DAILY_DELIVERY_FEE } from '@utils/constants';
import {
  MapPin,
  ArrowLeft,
  Truck,
  Store,
  CheckCircle,
  CreditCard,
  Package,
  FileText,
  ShoppingCart,
  AlertTriangle,
} from 'lucide-react';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Input from '@components/common/Input';
import LoadingScreen from '@components/common/LoadingScreen';
import Modal from '@components/common/Modal';

const DEFAULT_COUNTRY = 'Australia';
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || '';

const formatScheduleDate = (dateString: string) => {
  if (!dateString) {
    return 'Date to be confirmed';
  }

  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) {
    return dateString;
  }

  return parsed.toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};

const getInitialAddressForm = () => ({
  label: 'Home',
  street: '',
  suburb: '',
  postcode: '',
  state: 'NSW',
  country: DEFAULT_COUNTRY,
  is_default: false,
  delivery_instructions: '',
});

interface CheckoutState {
  cateringDetails?: any;
  subscriptionDetails?: MealSubscriptionSelection;
  addOns?: Array<{ id: string; quantity: number; item?: any }>;
}

interface CheckoutPageContentProps {
  isStripeAvailable: boolean;
  stripe?: Stripe | null;
  elements?: StripeElements | null;
  isLiveStripeMode?: boolean;
}

const CheckoutPageContent: React.FC<CheckoutPageContentProps> = ({
  isStripeAvailable,
  stripe,
  elements,
  isLiveStripeMode = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();
  const {
    items = [],
    sidelines = [],
    summary = {
      item_count: 0,
      subtotal: 0,
      delivery_fee: 0,
      tax: 0,
      total: 0,
    },
    clearCart,
    isLoading: cartLoading,
  } = useCart();
  const { showToast } = useToast();
  const {
    addresses,
    fetchAddresses,
    addAddress,
    calculateDeliveryFee,
    isLoading: addressStoreLoading,
    isValidating: isCalculatingDeliveryFee,
    error: addressStoreError,
    clearError: clearAddressError,
  } = useAddressStore();
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>([]);

  const state = (location.state as CheckoutState) || {};
  const { cateringDetails, subscriptionDetails, addOns = [] } = state;

  const sidelineTotal = useMemo(() => {
    if (!Array.isArray(sidelines) || sidelines.length === 0) {
      return 0;
    }

    return sidelines.reduce((sum: number, entry: any) => {
      const sidelineData = entry?.sideline || entry;
      const price = Number(sidelineData?.price) || 0;
      const quantity =
        Number(entry?.quantity ?? sidelineData?.quantity ?? 1) || 1;
      return sum + price * quantity;
    }, 0);
  }, [sidelines]);

  const addOnTotal = useMemo(() => {
    if (!Array.isArray(addOns) || addOns.length === 0) {
      return 0;
    }
    return addOns.reduce((sum, entry) => {
      const price =
        Number(entry.item?.price) ||
        Number((entry as any)?.price) ||
        0;
      const qty = Number(entry.quantity) || 0;
      return sum + price * qty;
    }, 0);
  }, [addOns]);

  const subscriptionPricing = useMemo(() => {
    if (!subscriptionDetails) {
      return null;
    }

    const toNumber = (value: any): number => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const plan = subscriptionDetails.plan;
    const isRegularPlan = plan?.tab === 'regular';

    const resolveEntryPrice = (entry: any) => {
      const base = toNumber(entry.item?.price ?? entry.price);
      const size = (entry as any)?.variation_size;
      if (!size) return base;
      const variations = entry.item?.variations || [];
      const match = Array.isArray(variations)
        ? variations.find(
            (v: any) =>
              v?.is_available &&
              String(v?.size || '').toLowerCase() === String(size).toLowerCase()
          )
        : null;
      return toNumber(match?.price ?? base);
    };

    let itemsSubtotal = 0;
    let totalBoxesFromSchedule = 0;
    (subscriptionDetails.schedule || []).forEach((slot) => {
      const slotItems = Array.isArray(slot.items) ? slot.items : [];
      slotItems.forEach((entry) => {
        const price = resolveEntryPrice(entry);
        const quantity = Math.max(0, toNumber(entry.quantity));
        if (!quantity) return;
        totalBoxesFromSchedule += quantity;
        itemsSubtotal += price * quantity;
      });
    });

    const baseSubtotal = itemsSubtotal + sidelineTotal + addOnTotal;

    if (isRegularPlan) {
      return {
        planSubtotal: itemsSubtotal,
        discount: 0,
        extraBoxesCost: 0,
        extraBoxUnit: 0,
        subtotalBeforeDelivery: baseSubtotal,
        tax: baseSubtotal * 0.1,
        extraBoxesCount: 0,
      };
    }

    const discount =
      plan?.tab === 'weekly' && totalBoxesFromSchedule > 0
        ? 20
        : plan?.tab === 'fortnight' && totalBoxesFromSchedule >= 20
          ? 50
          : 0;

    const discountedSubtotal = Math.max(0, baseSubtotal - discount);

    return {
      planSubtotal: itemsSubtotal,
      discount,
      extraBoxesCost: 0,
      extraBoxUnit: 0,
      subtotalBeforeDelivery: discountedSubtotal,
      tax: discountedSubtotal * 0.1,
      extraBoxesCount: 0,
    };
  }, [subscriptionDetails, sidelineTotal, addOnTotal]);

  const subscriptionScheduleSummary = useMemo(() => {
    if (!subscriptionDetails?.schedule?.length) {
      return [];
    }

    return subscriptionDetails.schedule.map((slot) => {
      const totalBoxes = slot.items?.reduce(
        (sum, entry) => sum + (entry.quantity || 0),
        0
      );

      return {
        date: slot.date,
        displayDate: formatScheduleDate(slot.date),
        totalBoxes: totalBoxes || 0,
      };
    });
  }, [subscriptionDetails]);

  const cardElementStyle = useMemo<StripeElementStyle>(
    () => ({
      base: {
        fontSize: '16px',
        color: '#1f2937',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
      invalid: {
        color: '#ef4444',
      },
    }),
    [],
  );

  const cardNumberOptions = useMemo<StripeCardNumberElementOptions>(
    () => ({
      style: cardElementStyle,
      showIcon: true,
      placeholder: '1234 1234 1234 1234',
    }),
    [cardElementStyle],
  );

  const cardExpiryOptions = useMemo<StripeCardExpiryElementOptions>(
    () => ({
      style: cardElementStyle,
    }),
    [cardElementStyle],
  );

  const cardCvcOptions = useMemo<StripeCardCvcElementOptions>(
    () => ({
      style: cardElementStyle,
      placeholder: '123',
    }),
    [cardElementStyle],
  );

  useEffect(() => {
    if (subscriptionDetails) {
      const dates = Array.isArray(subscriptionDetails.schedule)
        ? subscriptionDetails.schedule.map((slot: any) => slot.date).filter(Boolean)
        : [];
      const defaultMethod =
        subscriptionDetails.fulfilment === 'pickup' ? 'pickup' : 'delivery';
      const mapping: Record<string, 'delivery' | 'pickup'> = {};
      dates.forEach((date: string) => {
        mapping[date] = defaultMethod;
      });
      setSubscriptionFulfilmentByDate(mapping);
    }
  }, [subscriptionDetails]);

  const initialPaymentMethod: 'card' | 'cash' = isStripeAvailable ? 'card' : 'cash';

  // State
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [subscriptionFulfilmentByDate, setSubscriptionFulfilmentByDate] =
    useState<Record<string, 'delivery' | 'pickup'>>({});
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>(
    'delivery'
  );
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] =
    useState<'card' | 'cash'>(initialPaymentMethod);
  const [deliveryFee, setDeliveryFee] = useState(
    summary.delivery_fee ?? DAILY_DELIVERY_FEE
  );
  const [addressError, setAddressError] = useState<string | null>(null);
  const [cardError, setCardError] = useState<string | null>(null);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [cardholderName, setCardholderName] = useState(() => {
    const fallbackName =
      user?.full_name?.trim() ||
      `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
    return fallbackName || '';
  });
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);

  const subscriptionDeliveryDays = useMemo(() => {
    if (!subscriptionDetails?.schedule?.length) {
      return 0;
    }
    return subscriptionDetails.schedule.reduce((count: number, slot: any) => {
      const date = slot?.date;
      if (!date) return count;
      const chosen =
        subscriptionFulfilmentByDate[date] ||
        (subscriptionDetails.fulfilment === 'pickup' ? 'pickup' : 'delivery');
      return count + (chosen === 'delivery' ? 1 : 0);
    }, 0);
  }, [subscriptionDetails, subscriptionFulfilmentByDate]);

  useEffect(() => {
    if (!subscriptionDetails) return;
    setDeliveryMethod(subscriptionDeliveryDays > 0 ? 'delivery' : 'pickup');
  }, [subscriptionDetails, subscriptionDeliveryDays]);

  useEffect(() => {
    if (!isStripeAvailable) {
      setPaymentMethod('cash');
    }
  }, [isStripeAvailable]);

  useEffect(() => {
    if (!cardholderName && user) {
      const derivedName =
        user.full_name?.trim() ||
        `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();
      if (derivedName) {
        setCardholderName(derivedName);
      }
    }
  }, [user, cardholderName]);

  useEffect(() => {
    if (paymentMethod !== 'card') {
      setCardError(null);
      setIsCardComplete(false);
      setCardNumberComplete(false);
      setCardExpiryComplete(false);
      setCardCvcComplete(false);
    }
  }, [paymentMethod]);

  useEffect(() => {
    setIsCardComplete(
      cardNumberComplete && cardExpiryComplete && cardCvcComplete,
    );
  }, [cardNumberComplete, cardExpiryComplete, cardCvcComplete]);

  // Address modal state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(getInitialAddressForm);

  // Fetch saved addresses on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses().catch((error: any) => {
        console.error('Failed to fetch addresses:', error);
      });
      deliveryAPI
        .getDeliveryZones()
        .then((resp) => {
          const zones = resp.data?.data ?? resp.data ?? [];
          if (Array.isArray(zones)) {
            setDeliveryZones(zones);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch delivery zones:', error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const selectedAddressId = selectedAddress?._id ?? '';

  useEffect(() => {
    if (!addresses || addresses.length === 0) {
      setSelectedAddress(null);
      return;
    }

    if (
      !selectedAddressId ||
      !addresses.some((addr) => addr._id === selectedAddressId)
    ) {
      const nextAddress =
        addresses.find((addr) => addr.is_default) || addresses[0];
      setSelectedAddress(nextAddress);
    }
  }, [addresses, selectedAddressId]);

  useEffect(() => {
    if (
      deliveryMethod === 'delivery' &&
      !addressStoreLoading &&
      addresses.length === 0
    ) {
      setIsAddressModalOpen(true);
    }
  }, [deliveryMethod, addressStoreLoading, addresses.length]);

  useEffect(() => {
    const evaluateDeliveryFee = async () => {
      if (deliveryMethod !== 'delivery') {
        setAddressError(null);
        setDeliveryFee(0);
        return;
      }

      if (!selectedAddressId || !selectedAddress) {
        setAddressError(null);
        setDeliveryFee(0);
        return;
      }

      clearAddressError();
      setAddressError(null);

      const isDailyOrder = !subscriptionDetails && !cateringDetails;

      if (isDailyOrder) {
        try {
          const formattedAddress = [
            selectedAddress.street,
            selectedAddress.suburb,
            selectedAddress.state,
            selectedAddress.postcode,
            selectedAddress.country || DEFAULT_COUNTRY,
          ]
            .filter(Boolean)
            .join(', ');

          const availabilityResponse = await deliveryAPI.checkAvailability(
            formattedAddress,
            'daily'
          );
          const availability = availabilityResponse.data.data as DeliveryAvailability | undefined;

          if (availability?.available) {
            const fee =
              availability.delivery_fee !== undefined
                ? availability.delivery_fee
                : DAILY_DELIVERY_FEE;
            setDeliveryFee(fee);
          } else {
            const message =
              availability?.message ||
              availabilityResponse.data.message ||
              'Delivery service is not available for this address.';
            setAddressError(message);
            setDeliveryFee(0);
          }
        } catch (error: any) {
          console.error('Delivery availability check failed:', error);
          const message =
            error?.response?.data?.message ||
            error?.response?.data?.detail ||
            error?.message ||
            'Delivery service is not available for this address.';
          setAddressError(message);
          setDeliveryFee(0);
        }
        return;
      }

      const matchedZone = deliveryZones.find(
        (zone) => zone.postcode?.trim() === selectedAddress.postcode?.trim()
      );

      if (!matchedZone) {
        setAddressError('Delivery service is not available for this address.');
        setDeliveryFee(0);
        return;
      }

      try {
        const deliveryDays =
          subscriptionDeliveryDays ||
          subscriptionDetails?.plan?.deliveries_per_cycle ||
          1;
        const orderValue =
          subscriptionPricing?.subtotalBeforeDelivery ??
          summary.subtotal ??
          0;
        const response = await calculateDeliveryFee(selectedAddressId, {
          deliveryDays,
          orderValue,
          isExpress: false,
        });
        const fee = Number((response as any)?.fee);
        if (!Number.isFinite(fee) || fee < 0) {
          throw new Error('Delivery fee could not be calculated for this postcode.');
        }
        setDeliveryFee(fee);
      } catch (error: any) {
        console.error('Delivery fee calculation failed:', error);
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.detail ||
          error?.message ||
          'Delivery service is not available for this address.';
        setAddressError(message);
        setDeliveryFee(0);
      }
    };

    evaluateDeliveryFee();
  }, [
    selectedAddressId,
    selectedAddress,
    deliveryMethod,
    calculateDeliveryFee,
    subscriptionPricing,
    clearAddressError,
    subscriptionDetails,
    subscriptionDeliveryDays,
    cateringDetails,
  ]);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
  }, [isAuthenticated, navigate]);

  // Helper function to safely get item data
  const getItemData = (item: any) => {
    // Handle different item structures
    const nestedItem = item.menu_item || item.sideline;
    if (nestedItem) {
      return {
        id: nestedItem.id || nestedItem._id,
        name: nestedItem.name || 'Unknown Item',
        price: nestedItem.price || 0,
        quantity: item.quantity || 1,
      };
    } else if (item.item_name) {
      return {
        id: item.item_id,
        name: item.item_name || 'Unknown Item',
        price: item.price || 0,
        quantity: item.quantity || 1,
      };
    } else {
      return {
        id:
          item.item_id ||
          item.id ||
          item._id ||
          item.menu_item?.id ||
          item.menu_item?._id,
        name: item.name || 'Unknown Item',
        price: item.price || 0,
        quantity: item.quantity || 1,
      };
    }
  };

  const mapItemsToPayload = (entries: any[] = []) => {
    return entries
      .map((entry) => {
        const itemData = getItemData(entry);
        const itemId =
          itemData.id ||
          (entry as any).item_id ||
          entry.id ||
          entry._id ||
          entry.menu_item?.id ||
          entry.menu_item?._id;
        const quantity = Number(itemData.quantity || entry.quantity || 0);

        if (!itemId || quantity <= 0) {
          console.warn('Skipping invalid cart entry', entry);
          return null;
        }

        return {
          item_id: itemId,
          quantity,
        };
      })
      .filter(Boolean);
  };

  // Check if cart is empty (excluding loading state)
  const isCartEmpty =
    !cartLoading &&
    (!items || items.length === 0) &&
    !cateringDetails &&
    !subscriptionDetails;

  const handleSaveAddress = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedPayload = {
      label: newAddress.label.trim() || 'Home',
      street: newAddress.street.trim(),
      suburb: newAddress.suburb.trim(),
      postcode: newAddress.postcode.trim(),
      state: newAddress.state.trim() || 'NSW',
      country: newAddress.country || DEFAULT_COUNTRY,
      is_default: newAddress.is_default || addresses.length === 0,
      delivery_instructions: newAddress.delivery_instructions?.trim() || undefined,
    };

    if (!trimmedPayload.street || !trimmedPayload.suburb || !trimmedPayload.postcode) {
      showToast('Please complete the required address fields.', 'error');
      return;
    }

    setIsSavingAddress(true);
    try {
      const createdAddress = await addAddress(trimmedPayload);
      setIsAddressModalOpen(false);
      setNewAddress(getInitialAddressForm());
      setSelectedAddress(createdAddress);
      showToast('Address saved successfully', 'success');
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        'Failed to save address';
      showToast(message, 'error');
    } finally {
      setIsSavingAddress(false);
    }
  };

  const processCardPayment = async (orderId: string) => {
    if (!isStripeAvailable) {
      throw new Error(
        'Card payments are currently unavailable. Please choose cash or try again later.',
      );
    }

    if (!stripe || !elements) {
      throw new Error(
        'Secure payment form is still loading. Please wait a moment and try again.',
      );
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      throw new Error(
        'Card number input is not ready yet. Please refresh the page and try again.',
      );
    }

    setCardError(null);

    const intentResponse = await paymentsAPI.createPaymentIntent(orderId);
    const paymentIntent = intentResponse.data.data;

    const normalizedCardholder = cardholderName.trim();
    const fallbackName =
      user?.full_name?.trim() ||
      `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
    const billingName = normalizedCardholder || fallbackName || undefined;

    const confirmation = await stripe.confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: billingName,
            email: user?.email || undefined,
            phone: user?.phone || undefined,
          },
        },
      },
    );

    if (confirmation.error) {
      setCardError(
        confirmation.error.message ||
        'Payment failed. Please check your card details.',
      );
      throw new Error(
        confirmation.error.message ||
        'Card payment failed. Please try another card or use cash on delivery.',
      );
    }

    await paymentsAPI.confirmPayment(paymentIntent.payment_intent_id);
    cardNumberElement.clear();
    elements.getElement(CardExpiryElement)?.clear();
    elements.getElement(CardCvcElement)?.clear();
    setCardNumberComplete(false);
    setCardExpiryComplete(false);
    setCardCvcComplete(false);
    setIsCardComplete(false);
    setCardError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      if (!isStripeAvailable) {
        showToast(
          'Card payments are currently unavailable. Please choose cash or try again later.',
          'error',
        );
        return;
      }

      if (!cardholderName.trim()) {
        showToast('Please enter the name on the card.', 'error');
        return;
      }

      if (!isCardComplete) {
        showToast('Please enter your card details to continue.', 'error');
        return;
      }
    }

    // Validation
    if (isCartEmpty) {
      showToast('Your cart is empty', 'error');
      navigate('/menu/daily');
      return;
    }

    if (subscriptionDetails) {
      if (!selectedAddress) {
        showToast('Please select an address', 'error');
        return;
      }
    } else {
      if (deliveryMethod === 'delivery' && !selectedAddress) {
        showToast('Please select or add a delivery address', 'error');
        return;
      }

      // Date/time selection removed for meal plans per requirement
    }

    if (addressError && deliveryMethod === 'delivery') {
      showToast(addressError, 'error');
      return;
    }

    const isDailyOrder = !subscriptionDetails && !cateringDetails;

    if (isDailyOrder) {
      try {
        const availabilityResponse = await menuAPI.getDailyMenuAvailability();
        const availability = availabilityResponse.data?.data ?? availabilityResponse.data;
        if (availability && availability.is_open === false) {
          setIsProcessing(false);
          showToast(
            availability.message ||
            'Daily Menu ordering is currently closed. Please order between 11:00 AM and 9:00 PM AEST.',
            'error'
          );
          return;
        }
      } catch (error: any) {
        // If we cannot verify availability, block checkout to avoid failed orders
        console.error('Failed to verify daily menu availability:', error);
        setIsProcessing(false);
        showToast(
          'We could not verify the Daily Menu ordering window. Please try again in a moment.',
          'error'
        );
        return;
      }
    }

    setIsProcessing(true);

    try {
      let orderPayload: any = {};
      const deliveryAddressId = selectedAddressId;
      const backendDeliveryMethod =
        deliveryMethod === 'delivery' ? 'standard' : 'pickup';
      const sidelinePayload = mapItemsToPayload(sidelines);
      const addOnPayload =
        Array.isArray(addOns) && addOns.length > 0
          ? addOns
            .map((entry) => {
              const id =
                entry.id ||
                (entry as any).item_id ||
                entry.item?._id ||
                entry.item?.id;
              const qty = Number(entry.quantity) || 0;
              if (!id || qty <= 0) return null;
              return { item_id: id, quantity: qty };
            })
            .filter(Boolean)
          : [];

      if (cateringDetails) {
        // Catering order
        orderPayload = {
          package_type: cateringDetails.package.id,
          guest_count: cateringDetails.eventDetails.head_count,
          event_date: cateringDetails.eventDetails.event_date,
          event_time: cateringDetails.eventDetails.event_time,
          venue_address: cateringDetails.eventDetails.venue_address,
          selected_items: cateringDetails.selectedItems,
          special_requests: specialInstructions,
          payment_method: paymentMethod,
        };
      } else if (subscriptionDetails) {
        const plan = subscriptionDetails.plan;
        const planId = (plan as any)._id || (plan as any).id;

        const planSelections = [
          {
            plan_id: planId,
            quantity: subscriptionDetails.planQuantity,
          },
        ];

        const deliverySlots = subscriptionDetails.schedule
          .map((slot) => {
            const menuItems: Record<string, number> = {};
            const variationSizes: Record<string, string> = {};
            slot.items.forEach((entry: any) => {
              const rawId = (entry.item as any)?._id || (entry.item as any)?.id;
              const quantity = Number(entry.quantity) || 0;
              if (!rawId || quantity <= 0) {
                return;
              }
              menuItems[rawId] = (menuItems[rawId] || 0) + quantity;
              if (entry.variation_size) {
                variationSizes[rawId] = String(entry.variation_size);
              }
            });

            const normalizedNotes = (() => {
              const existing = slot.notes?.trim();
              if (existing) return existing;
              const instructionLines = slot.items
                .map((entry) => {
                  const text = entry.instructions?.trim();
                  if (!text) return null;
                  return `${entry.item?.name || 'Dish'}: ${text}`;
                })
                .filter(Boolean) as string[];
              return instructionLines.length ? instructionLines.join(' | ') : undefined;
            })();

            return {
              delivery_date: slot.date,
              menu_items: menuItems,
              variation_sizes: Object.keys(variationSizes).length
                ? variationSizes
                : undefined,
              fulfilment_method:
                subscriptionFulfilmentByDate[slot.date] ||
                (subscriptionDetails.fulfilment === 'pickup'
                  ? 'pickup'
                  : 'delivery'),
              notes: normalizedNotes,
            };
          })
          .filter((slot) => Object.keys(slot.menu_items).length > 0);

        if (deliverySlots.length === 0) {
          showToast(
            'Please assign at least one meal to your selected delivery days before checking out.',
            'error',
          );
          return;
        }

        orderPayload = {
          plan_selections: planSelections,
          delivery_slots: deliverySlots,
          sidelines: [...sidelinePayload, ...addOnPayload],
          delivery_address_id: deliveryAddressId,
          fulfilment_method: deliveryMethod,
          is_express: false,
          delivery_instructions: specialInstructions,
          notes: '',
          payment_method: paymentMethod,
        };
      } else {
        // Daily order
        const dailyItemsPayload = mapItemsToPayload(items);

        if (dailyItemsPayload.length === 0) {
          showToast(
            'We could not detect any valid menu items in your cart. Please add at least one item and try again.',
            'error'
          );
          setIsProcessing(false);
          return;
        }

        orderPayload = {
          items: dailyItemsPayload,
          sidelines: sidelinePayload,
          delivery_method: backendDeliveryMethod,
          delivery_address_id:
            backendDeliveryMethod === 'standard' ? deliveryAddressId : undefined,
          delivery_instructions: specialInstructions,
          notes: '',
          payment_method: paymentMethod,
        };
      }

      console.log('Submitting order:', orderPayload);

      // Create order based on type
      let orderResponse;
      if (cateringDetails) {
        orderResponse = await ordersAPI.createCateringOrder(orderPayload);
      } else if (subscriptionDetails) {
        orderResponse = await ordersAPI.createMealSubscriptionOrder(orderPayload);
      } else {
        orderResponse = await ordersAPI.createDailyOrder(orderPayload);
      }

      const order = orderResponse.data.data;
      const orderId = order.id || order._id;

      if (!orderId) {
        throw new Error('Unable to determine the order ID for payment processing.');
      }

      if (paymentMethod === 'card') {
        await processCardPayment(orderId);
      }

      // Clear cart after successful order and payment. The subscription flow doesn't
      // always create a cart entry, so failures here shouldn't block checkout.
      try {
        await clearCart();
      } catch (clearError) {
        console.warn('Failed to clear cart after order:', clearError);
      }

      showToast('Order placed successfully!', 'success');

      // Navigate to order confirmation or home
      navigate('/', {
        state: { orderPlaced: true, orderId },
      });
    } catch (error: any) {
      console.error('Checkout error:', error);
      const isTimeoutError = error?.code === 'ECONNABORTED';
      const errorMessage = isTimeoutError
        ? 'The order is taking longer than expected. Please check your email or order history before placing it again.'
        : error?.message ||
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        'Failed to place order. Please try again.';
      showToast(errorMessage, isTimeoutError ? 'info' : 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotalAmount = subscriptionPricing
    ? subscriptionPricing.subtotalBeforeDelivery
    : (summary.subtotal ?? 0) + sidelineTotal + addOnTotal;
  const baseTaxAmount =
    summary.tax !== undefined ? summary.tax : (summary.subtotal ?? 0) * 0.1;
  const taxAmount = subscriptionPricing
    ? subscriptionPricing.tax
    : baseTaxAmount + (sidelineTotal + addOnTotal) * 0.1;
  const effectiveDeliveryFee = deliveryMethod === 'delivery' ? deliveryFee : 0;
  const totalAmount = subtotalAmount + taxAmount + effectiveDeliveryFee;
  const isCardPaymentSelected = paymentMethod === 'card';
  const isSubmitDisabled =
    isProcessing ||
    (isCardPaymentSelected && (!isStripeAvailable || !isCardComplete));
  const submitLabel = isProcessing
    ? isCardPaymentSelected
      ? 'Processing Payment...'
      : 'Processing...'
    : 'Place Order';

  // Show loading while cart data is loading
  if (cartLoading) {
    return <LoadingScreen message="Loading checkout..." />;
  }

  // Show empty cart message
  if (isCartEmpty) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card padding="lg" className="text-center max-w-md">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-text mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some delicious items to your cart before checking out
          </p>
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate('/menu/daily')}
          >
            Browse Menu
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-primary hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <h1 className="font-heading text-4xl font-bold text-text mb-8">
          Complete Your Order
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Method */}
              <Card padding="lg">
                <h2 className="font-heading text-2xl font-bold text-text mb-4 flex items-center space-x-2">
                  <Truck size={24} className="text-primary" />
                  <span>Delivery Method</span>
                </h2>

                {subscriptionDetails ? (
                  <p className="text-sm text-gray-600">
                    Choose delivery or pickup per day in the meal subscription summary. Delivery fees are calculated only for the days marked as delivery.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('delivery')}
                      className={`p-4 border-2 rounded-lg transition-all ${deliveryMethod === 'delivery'
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary'
                        }`}
                    >
                      <MapPin
                        className={`mx-auto mb-2 ${deliveryMethod === 'delivery'
                          ? 'text-primary'
                          : 'text-gray-400'
                          }`}
                        size={32}
                      />
                      <p className="font-semibold text-text">Delivery</p>
                      <p className="text-sm text-gray-600">
                        {deliveryMethod === 'delivery' ? (
                          isCalculatingDeliveryFee ? (
                            'Calculating...'
                          ) : effectiveDeliveryFee === 0 ? (
                            'FREE'
                          ) : (
                            formatCurrency(effectiveDeliveryFee)
                          )
                        ) : (
                          formatCurrency(effectiveDeliveryFee)
                        )}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryMethod('pickup');
                        setIsAddressModalOpen(false);
                      }}
                      className={`p-4 border-2 rounded-lg transition-all ${deliveryMethod === 'pickup'
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary'
                        }`}
                    >
                      <Store
                        className={`mx-auto mb-2 ${deliveryMethod === 'pickup'
                          ? 'text-primary'
                          : 'text-gray-400'
                          }`}
                        size={32}
                      />
                      <p className="font-semibold text-text">Pickup</p>
                      <p className="text-sm text-gray-600">FREE</p>
                    </button>
                  </div>
                )}
              </Card>

              {/* Delivery Address - only show if delivery selected */}
              {deliveryMethod === 'delivery' && (
                <Card padding="lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={24} className="text-primary" />
                      <h2 className="font-heading text-2xl font-bold text-text">
                        Delivery Address
                      </h2>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const initialForm = getInitialAddressForm();
                        initialForm.is_default = addresses.length === 0;
                        setNewAddress(initialForm);
                        setIsAddressModalOpen(true);
                      }}
                    >
                      Add Address
                    </Button>
                  </div>

                  {addressStoreLoading ? (
                    <LoadingScreen
                      variant="section"
                      message="Loading saved addresses..."
                    />
                  ) : addresses.length > 0 ? (
                    <div className="space-y-3">
                      {addresses.map((addr) => (
                        <label
                          key={addr._id}
                          className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${(selectedAddressId &&
                            selectedAddressId === addr._id) ||
                            (!selectedAddressId && addr.is_default)
                            ? 'border-primary bg-primary-50'
                            : 'border-gray-200 hover:border-primary'
                            }`}
                        >
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddressId === addr._id}
                            onChange={() => setSelectedAddress(addr)}
                            className="mt-1"
                          />
                          <div>
                            <p className="font-semibold text-text">
                              {addr.label || 'Address'}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {addr.street}, {addr.suburb} {addr.state}{' '}
                              {addr.postcode}
                            </p>
                            {addr.is_default && (
                              <span className="inline-block mt-1 px-2 py-1 bg-primary text-white text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-3">
                        You have not saved any delivery addresses yet.
                      </p>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                          const initialForm = getInitialAddressForm();
                          initialForm.is_default = true;
                          setNewAddress(initialForm);
                          setIsAddressModalOpen(true);
                        }}
                      >
                        Add Your First Address
                      </Button>
                    </div>
                  )}

                  {(addressError || addressStoreError) && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      {addressError || addressStoreError || 'Delivery service is not available for this address.'}
                    </div>
                  )}

                  {deliveryMethod === 'delivery' && addresses.length > 0 && !addressError && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                      {isCalculatingDeliveryFee
                        ? 'Calculating delivery fee for the selected address...'
                        : `Calculated delivery fee: ${formatCurrency(effectiveDeliveryFee)}`}
                    </div>
                  )}
                </Card>
              )}

              {/* Delivery Time removed per requirement */}

              {/* Special Instructions */}
              <Card padding="lg">
                <h2 className="font-heading text-2xl font-bold text-text mb-4 flex items-center space-x-2">
                  <FileText size={24} className="text-primary" />
                  <span>Special Instructions (Optional)</span>
                </h2>

                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Any special requests or delivery instructions..."
                />
              </Card>

              {/* Payment Method */}
              <Card padding="lg">
                <h2 className="font-heading text-2xl font-bold text-text mb-4 flex items-center space-x-2">
                  <CreditCard size={24} className="text-primary" />
                  <span>Payment Method</span>
                </h2>

                <div className="space-y-3">
                  <div
                    className={`flex flex-col gap-3 p-4 border-2 rounded-lg transition-all ${paymentMethod === 'card'
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-200 hover:border-primary'
                      } ${isStripeAvailable
                        ? ''
                        : 'opacity-70 pointer-events-none'
                      }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="payment-card"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value as 'card')
                        }
                        className="mr-3"
                        disabled={!isStripeAvailable}
                      />
                      <label
                        htmlFor="payment-card"
                        className="flex items-center cursor-pointer select-none"
                      >
                        <CreditCard className="mr-3 text-gray-600" size={20} />
                        <span className="font-semibold">Card Payment</span>
                      </label>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="w-full">
                        {isStripeAvailable ? (
                          <div className="space-y-4">
                            {isLiveStripeMode && (
                              <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                                <AlertTriangle className="mt-0.5 text-amber-500" size={16} />
                                <span>
                                  Live payments are enabled. Charges will be captured immediately when you submit this order.
                                </span>
                              </div>
                            )}
                            <Input
                              type="text"
                              label="Name on Card"
                              value={cardholderName}
                              onChange={(e) => setCardholderName(e.target.value)}
                              placeholder="Enter the name that appears on the card"
                              autoComplete="cc-name"
                              required
                            />

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Number
                              </label>
                              <div
                                className={`w-full px-4 py-3 border rounded-lg bg-white shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${cardError ? 'border-red-400' : 'border-gray-200'
                                  }`}
                              >
                                <CardNumberElement
                                  options={cardNumberOptions}
                                  className="w-full"
                                  onChange={(event) => {
                                    setCardNumberComplete(event.complete);
                                    setCardError(event.error?.message || null);
                                  }}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Expiration Date
                                </label>
                                <div
                                  className={`w-full px-4 py-3 border rounded-lg bg-white shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${cardError
                                    ? 'border-red-400'
                                    : 'border-gray-200'
                                    }`}
                                >
                                  <CardExpiryElement
                                    options={cardExpiryOptions}
                                    className="w-full"
                                    onChange={(event) => {
                                      setCardExpiryComplete(event.complete);
                                      setCardError(event.error?.message || null);
                                    }}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  CVV
                                </label>
                                <div
                                  className={`w-full px-4 py-3 border rounded-lg bg-white shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${cardError
                                    ? 'border-red-400'
                                    : 'border-gray-200'
                                    }`}
                                >
                                  <CardCvcElement
                                    options={cardCvcOptions}
                                    className="w-full"
                                    onChange={(event) => {
                                      setCardCvcComplete(event.complete);
                                      setCardError(event.error?.message || null);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            {cardError && (
                              <p className="text-sm text-red-500">
                                {cardError}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              Secure payments are powered by Stripe. Your card
                              details never touch our servers.
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-red-500">
                            Card payments are temporarily unavailable. Please
                            choose cash on delivery.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {subscriptionDetails && deliveryMethod === 'pickup' && (
                    <div
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'cash'
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary'
                        }`}
                    >
                      <input
                        type="radio"
                        id="payment-cash"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value as 'cash')
                        }
                        className="mr-3"
                      />
                      <label
                        htmlFor="payment-cash"
                        className="flex items-center cursor-pointer select-none"
                      >
                        <span className="mr-3">Cash</span>
                        <span className="font-semibold">Cash on Pickup</span>
                      </label>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card padding="lg" className="sticky top-24">
                <h2 className="font-heading text-2xl font-bold text-text mb-4 flex items-center space-x-2">
                  <Package size={24} className="text-primary" />
                  <span>Order Summary</span>
                </h2>

                {/* Meal Subscription Details */}
                {subscriptionDetails && (
                  <div className="space-y-3 mb-4">
                    <p className="text-sm font-semibold text-gray-700">
                      Meal Subscription
                    </p>
                    <div className="flex items-start justify-between text-sm">
                      <div>
                        <p className="font-semibold text-text">
                          {subscriptionDetails.plan.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty {subscriptionDetails.planQuantity} ·{' '}
                          {subscriptionDeliveryDays > 0
                            ? subscriptionDeliveryDays ===
                              subscriptionScheduleSummary.length
                              ? 'Delivery'
                              : 'Delivery + Pickup'
                            : 'Pickup'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {subscriptionDetails.totalBoxes} meals selected
                        </p>
                      </div>
                      <span className="font-semibold">
                        {formatCurrency(subscriptionPricing?.planSubtotal || 0)}
                      </span>
                    </div>

                    {Number((subscriptionPricing as any)?.discount) > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Deal discount</span>
                        <span className="font-semibold text-green-600">
                          - {formatCurrency(Number((subscriptionPricing as any)?.discount) || 0)}
                        </span>
                      </div>
                    )}

                    {subscriptionScheduleSummary.length > 0 && (
                      <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600 space-y-2">
                        {subscriptionScheduleSummary.map((slot) => (
                          <div
                            key={slot.date}
                            className="flex items-center justify-between"
                          >
                            <div className="flex flex-col">
                              <span>{slot.displayDate}</span>
                              <label className="mt-1 inline-flex items-center gap-2 text-[11px] text-gray-500">
                                <input
                                  type="checkbox"
                                  checked={
                                    (subscriptionFulfilmentByDate[slot.date] ||
                                      (subscriptionDetails.fulfilment === 'pickup'
                                        ? 'pickup'
                                        : 'delivery')) === 'delivery'
                                  }
                                  onChange={() =>
                                    setSubscriptionFulfilmentByDate((prev) => ({
                                      ...prev,
                                      [slot.date]:
                                        (prev[slot.date] ||
                                          (subscriptionDetails.fulfilment === 'pickup'
                                            ? 'pickup'
                                            : 'delivery')) === 'delivery'
                                          ? 'pickup'
                                          : 'delivery',
                                    }))
                                  }
                                />
                                Delivery for this day
                              </label>
                            </div>
                            <span className="font-semibold text-text">
                              {slot.totalBoxes} meals
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Items */}
                {items && items.length > 0 && (
                  <div className="space-y-3 mb-4">
                    <p className="text-sm font-semibold text-gray-700">
                      Items:
                    </p>
                    {items.map((item: any, index: number) => {
                      const itemData = getItemData(item);
                      return (
                        <div
                          key={itemData.id || index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">
                            {itemData.quantity}x {itemData.name}
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(itemData.price * itemData.quantity)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {addOns.length > 0 && (
                  <div className="space-y-3 mb-4">
                    <p className="text-sm font-semibold text-gray-700">
                      Add-ons (charged separately):
                    </p>
                    {addOns.map((entry, index) => {
                      const price =
                        Number(entry.item?.price) ||
                        Number((entry as any)?.price) ||
                        0;
                      const qty = Number(entry.quantity) || 0;
                      return (
                        <div
                          key={entry.id || index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">
                            {qty}x {entry.item?.name || 'Add-on'}
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(price * qty)}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex justify-between text-sm font-semibold text-text border-t pt-2">
                      <span>Add-ons total</span>
                      <span>{formatCurrency(addOnTotal)}</span>
                    </div>
                  </div>
                )}

                {/* Sidelines */}
                {sidelines && sidelines.length > 0 && (
                  <>
                    <div className="border-t pt-3 mb-3">
                      <p className="text-sm font-semibold mb-2">Add-ons:</p>
                      {sidelines.map((item: any, index: number) => {
                        const sidelineData = item.sideline || item;
                        return (
                          <div
                            key={sidelineData.id || sidelineData._id || index}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600">
                              {item.quantity || 1}x{' '}
                              {sidelineData.name || 'Add-on'}
                            </span>
                            <span className="font-semibold">
                              {formatCurrency(
                                (sidelineData.price || 0) * (item.quantity || 1)
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">
                      {formatCurrency(subtotalAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee:</span>
                    <span className="font-semibold">
                      {deliveryMethod === 'pickup' || effectiveDeliveryFee === 0
                        ? 'FREE'
                        : formatCurrency(effectiveDeliveryFee)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (GST 10%):</span>
                    <span className="font-semibold">
                      {formatCurrency(taxAmount)}
                    </span>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-heading text-xl font-bold text-text">
                        Total:
                      </span>
                      <span className="font-heading text-3xl font-bold text-primary">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  className="mt-6"
                  disabled={isSubmitDisabled}
                  isLoading={isProcessing}
                >
                  {submitLabel}
                </Button>

                {/* Security Note */}
                <div className="mt-4 flex items-start space-x-2 text-xs text-gray-600">
                  <CheckCircle
                    size={16}
                    className="text-green-500 flex-shrink-0 mt-0.5"
                  />
                  <p>Your payment information is secure and encrypted</p>
                </div>
              </Card>
            </div>
          </div>
        </form>
        <Modal
          isOpen={isAddressModalOpen}
          onClose={() => {
            if (!isSavingAddress) {
              setIsAddressModalOpen(false);
            }
          }}
          title="Add New Address"
          size="md"
        >
          <form onSubmit={handleSaveAddress} className="space-y-4">
            <Input
              type="text"
              label="Label"
              value={newAddress.label}
              onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, label: e.target.value }))
              }
              placeholder="Home, Work, etc."
              required
            />

            <Input
              type="text"
              label="Street Address"
              value={newAddress.street}
              onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, street: e.target.value }))
              }
              placeholder="45 Railway Terrace"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                label="Suburb"
                value={newAddress.suburb}
                onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, suburb: e.target.value }))
                }
                placeholder="Guildford"
                required
              />
              <Input
                type="text"
                label="Postcode"
                value={newAddress.postcode}
                onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, postcode: e.target.value }))
                }
                placeholder="2161"
                maxLength={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                label="State"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, state: e.target.value }))
                }
                placeholder="NSW"
                required
              />
              <Input
                type="text"
                label="Country"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, country: e.target.value }))
                }
                placeholder="Australia"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Instructions (Optional)
              </label>
              <textarea
                value={newAddress.delivery_instructions}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    delivery_instructions: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={3}
                placeholder="Gate is on Palmer St; buzz 45 then wait."
              />
            </div>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newAddress.is_default}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    is_default: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-primary focus:ring-primary"
                disabled={addresses.length === 0 && newAddress.is_default}
              />
              <span className="text-sm text-gray-700">
                Set as default delivery address
              </span>
            </label>

            <div className="flex space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  if (!isSavingAddress) {
                    setIsAddressModalOpen(false);
                  }
                }}
                disabled={isSavingAddress}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={isSavingAddress}
                isLoading={isSavingAddress}
              >
                Save Address
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

interface CheckoutPageWithElementsProps {
  isLiveStripeMode: boolean;
}

const CheckoutPageWithElements: React.FC<CheckoutPageWithElementsProps> = ({
  isLiveStripeMode,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  return (
    <CheckoutPageContent
      isStripeAvailable
      stripe={stripe}
      elements={elements}
      isLiveStripeMode={isLiveStripeMode}
    />
  );
};

const CheckoutPage: React.FC = () => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(() =>
    STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null,
  );
  const [isStripeReady, setIsStripeReady] = useState(Boolean(STRIPE_PUBLISHABLE_KEY));
  const [isLoadingConfig, setIsLoadingConfig] = useState(!STRIPE_PUBLISHABLE_KEY);
  const [isLiveStripeMode, setIsLiveStripeMode] = useState<boolean>(() =>
    STRIPE_PUBLISHABLE_KEY ? STRIPE_PUBLISHABLE_KEY.startsWith('pk_live_') : false,
  );

  useEffect(() => {
    if (STRIPE_PUBLISHABLE_KEY) {
      setIsLoadingConfig(false);
      setIsLiveStripeMode(STRIPE_PUBLISHABLE_KEY.startsWith('pk_live_'));
      return;
    }

    let isMounted = true;

    const fetchStripeConfig = async () => {
      try {
        const response = await paymentsAPI.getConfig();
        const config = response.data?.data;

        if (!isMounted) {
          return;
        }

        if (config?.stripe_enabled && config?.stripe_publishable_key) {
          setStripePromise(loadStripe(config.stripe_publishable_key));
          setIsStripeReady(true);
          setIsLiveStripeMode(Boolean(config.is_live_mode));
        } else {
          setStripePromise(null);
          setIsStripeReady(false);
          setIsLiveStripeMode(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to load Stripe config:', error);
          setStripePromise(null);
          setIsStripeReady(false);
          setIsLiveStripeMode(false);
        }
      } finally {
        if (isMounted) {
          setIsLoadingConfig(false);
        }
      }
    };

    fetchStripeConfig();

    return () => {
      isMounted = false;
    };
  }, [STRIPE_PUBLISHABLE_KEY]);

  if (isLoadingConfig) {
    return <LoadingScreen message="Loading payment options..." />;
  }

  if (stripePromise && isStripeReady) {
    return (
      <Elements stripe={stripePromise}>
        <CheckoutPageWithElements isLiveStripeMode={isLiveStripeMode} />
      </Elements>
    );
  }

  return <CheckoutPageContent isStripeAvailable={false} isLiveStripeMode={isLiveStripeMode} />;
};

export default CheckoutPage;
