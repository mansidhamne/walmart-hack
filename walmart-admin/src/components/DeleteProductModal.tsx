import React from 'react';

interface Product {
    id: string;
    productId: string;
    image: string;
    name: string;
    category: string;
    inventory: number;
    price: number;
    status: number;
}

interface DeleteConfirmationModalProps {
    productId: string;
    productName: string;
    onClose: () => void;
    onConfirm: (productId: string) => Promise<void>;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    productId,
    productName,
    onClose,
    onConfirm,
  }) => {
    const handleConfirmClick = () => {
      onConfirm(productId);
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-2">Confirm Deletion</h2>
          <p className="mb-6 text-lg">Are you sure you want to delete the product {productName}?</p>
          <div className="mt-4 flex justify-around">
            <button
              className="bg-red-500 text-white px-6 py-2 rounded"
              onClick={handleConfirmClick}
            >
              Delete
            </button>
            <button
              className="bg-gray-300 px-6 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmationModal;