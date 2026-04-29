import React, { useState } from 'react';
import { useAddressStore } from '@store/addressStore';
import { useToast } from '@components/common/Toast';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import { MapPin, Edit, Trash2, Check } from 'lucide-react';
import { Address } from '@models/address.types';

interface AddressCardProps {
  address: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  const { setDefaultAddress, deleteAddress, isLoading } = useAddressStore();
  const { showToast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSetDefault = async () => {
    try {
      await setDefaultAddress(address._id);
      showToast('Default address updated', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to update default address', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    setIsDeleting(true);
    try {
      await deleteAddress(address._id);
      showToast('Address deleted successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to delete address', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card
      padding="lg"
      className={`relative ${
        address.is_default ? 'ring-2 ring-primary border-primary' : ''
      }`}
    >
      {address.is_default && (
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <Check size={14} />
          <span>Default</span>
        </div>
      )}

      <div className="flex items-start space-x-3 mb-4">
        <MapPin className="text-primary flex-shrink-0 mt-1" size={20} />
        <div className="flex-1">
          <h3 className="font-semibold text-text text-lg mb-2">
            {address.label}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {address.street}
            <br />
            {address.suburb}, {address.state} {address.postcode}
          </p>

          {address.delivery_instructions && (
            <p className="text-gray-500 text-xs mt-2 italic">
              📝 {address.delivery_instructions}
            </p>
          )}
        </div>
      </div>

      <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
        {!address.is_default && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSetDefault}
            disabled={isLoading}
            className="flex-1"
          >
            Set as Default
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          disabled={isDeleting}
          onClick={handleDelete}
          className="text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default AddressCard;
