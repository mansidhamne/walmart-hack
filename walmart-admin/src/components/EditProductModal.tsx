import React, { useState } from 'react';

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

interface EditProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>({
    id: product?.id || '',
    productId: product?.productId || '',
    image: product?.image || '',
    name: product?.name || '',
    category: product?.category || '',
    inventory: product?.inventory || 0,
    price: product?.price || 0,
    status: product?.status || 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct({ 
        ...updatedProduct, 
        [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${updatedProduct.productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        onSave(updatedProduct);
        onClose();
      } else {
        console.error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes', error);
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-700 font-medium mb-2">Product Name</label>
                <input
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleInputChange}
                className="border p-2 rounded-lg w-full mb-2"
                disabled
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="category" className="text-gray-700 font-medium mb-2">Product Category</label>
                <input
                type="text"
                name="category"
                value={updatedProduct.category}
                onChange={handleInputChange}
                className="border p-2 rounded-lg w-full mb-2"
                disabled
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="inventory" className="text-gray-700 font-medium mb-2">Current Inventory (Units)</label>
                <input
                    type='number'
                    name="inventory"
                    value={updatedProduct.inventory}
                    onChange={handleInputChange}
                    className="border p-2 rounded-lg w-full mb-2"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="price" className="text-gray-700 font-medium mb-2">Selling Price (₹)</label>
                <input
                    type="number"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleInputChange}
                    className="border p-2 rounded-lg w-full mb-2"
                />
            </div>
        </div>
        
        
        {/* Add more fields as needed */}
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
