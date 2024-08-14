import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { FaPlus } from 'react-icons/fa';

const AddVendor = () => {
  const [vendorName, setvendorName] = useState('');
  const [vendorContact, setvendorContact] = useState('');
  const [vendorCategory, setvendorCategory] = useState('');
  const [price, setPrice] = useState('');
  const [speed, setSpeed] = useState('');
  const [quality, setQuality] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare vendor data
    const vendorData = {
      name: vendorName,
      contact: vendorContact,
      category: vendorCategory,
      price: parseFloat(price),
      speed: parseFloat(speed),
      quality: parseFloat(quality),
    };

    try {
      const response = await fetch('http://localhost:3000/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) {
        throw new Error('Failed to add vendor');
      }
      router.push('/vendors');
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  return (
    <div className="h-screen w-full bg-white flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="text-3xl font-bold my-6 text-gray-800 px-8 py-4 flex flex-row items-center gap-3"><FaPlus />Add vendor</div>
        <div className="p-2 flex-1 flex w-full">
          <form onSubmit={handleSubmit} className="bg-white py-2 px-8 w-full max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="vendorName" className="text-gray-700 font-semibold mb-2">Vendor Name</label>
                <input
                  type="text"
                  id="vendorName"
                  value={vendorName}
                  onChange={(e) => setvendorName(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vendorContact" className="text-gray-700 font-semibold mb-2">Email ID</label>
                <input
                  type="text"
                  id="vendorContact"
                  value={vendorContact}
                  onChange={(e) => setvendorContact(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vendorCategory" className="text-gray-700 font-semibold mb-2">Category</label>
                <select
                  id="vendorCategory" 
                  value={vendorCategory} 
                  onChange={(e) => setvendorCategory(e.target.value)} 
                  className="border border-gray-300 rounded-lg px-4 py-2" 
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="GROCERIES">Groceries</option>
                  <option value="BEAUTY_PRODUCTS">Beauty Products</option>
                  <option value="STATIONERY">Stationery</option>
                  <option value="ACCESSORIES">Accessories</option>
                  <option value="HOME_DECOR">Home Decor</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="vendorPrice" className="text-gray-700 font-semibold mb-2">Effective Price Rating</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vendorQuality" className="text-gray-700 font-semibold mb-2">Quality Rating</label>
                <input
                  type="text"
                  id="quality"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vendorSpeed" className="text-gray-700 font-semibold mb-2">Delivery Rating</label>
                <input
                  type="text"
                  id="speed"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
            >
              Add vendor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVendor;
