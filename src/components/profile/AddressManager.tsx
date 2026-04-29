import React, { useState, useEffect } from 'react';
import { useAddressStore } from '@store/addressStore';
import { useToast } from '@components/common/Toast';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Modal from '@components/common/Modal';
import AddressCard from './AddressCard';
import { Plus } from 'lucide-react';
import Input from '@components/common/Input';

const AddressManager: React.FC = () => {
  const { addresses, fetchAddresses, addAddress, isLoading } =
    useAddressStore();
  const { showToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    suburb: '',
    postcode: '',
    state: 'NSW',
    is_default: false,
    delivery_instructions: '',
  });

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addAddress(newAddress);
      showToast('Address added successfully', 'success');
      setShowAddModal(false);
      setNewAddress({
        label: '',
        street: '',
        suburb: '',
        postcode: '',
        state: 'NSW',
        is_default: false,
        delivery_instructions: '',
      });
    } catch (error: any) {
      showToast(error.message || 'Failed to add address', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-text">
          My Addresses
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
          size="md"
        >
          <Plus size={20} className="mr-2" />
          Add New Address
        </Button>
      </div>

      {isLoading ? (
        <Card padding="lg">
          <p className="text-center text-gray-500">Loading addresses...</p>
        </Card>
      ) : addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <AddressCard key={address._id} address={address} />
          ))}
        </div>
      ) : (
        <Card padding="lg">
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No addresses saved yet</p>
            <Button variant="outline" onClick={() => setShowAddModal(true)}>
              Add Your First Address
            </Button>
          </div>
        </Card>
      )}

      {/* Add Address Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Address"
      >
        <form onSubmit={handleAddAddress} className="space-y-4">
          <Input
            type="text"
            label="Label"
            value={newAddress.label}
            onChange={(e) =>
              setNewAddress({ ...newAddress, label: e.target.value })
            }
            placeholder="Home, Work, etc."
            required
          />

          <Input
            type="text"
            label="Street Address"
            value={newAddress.street}
            onChange={(e) =>
              setNewAddress({ ...newAddress, street: e.target.value })
            }
            placeholder="123 Main St"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Suburb"
              value={newAddress.suburb}
              onChange={(e) =>
                setNewAddress({ ...newAddress, suburb: e.target.value })
              }
              placeholder="Guildford"
              required
            />

            <Input
              type="text"
              label="Postcode"
              value={newAddress.postcode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, postcode: e.target.value })
              }
              placeholder="2161"
              required
              maxLength={4}
            />
          </div>

          <Input
            type="text"
            label="Delivery Instructions (Optional)"
            value={newAddress.delivery_instructions}
            onChange={(e) =>
              setNewAddress({
                ...newAddress,
                delivery_instructions: e.target.value,
              })
            }
            placeholder="Leave at door, ring bell, etc."
          />

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={newAddress.is_default}
              onChange={(e) =>
                setNewAddress({ ...newAddress, is_default: e.target.checked })
              }
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">
              Set as default address
            </span>
          </label>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Add Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddressManager;
