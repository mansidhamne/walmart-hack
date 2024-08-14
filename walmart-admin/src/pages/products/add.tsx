// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Navbar from '@/components/layout/Navbar';
// import Sidebar from '@/components/layout/Sidebar';
// import { FaPlus } from 'react-icons/fa';

// const AddProduct = () => {
//   const [productName, setProductName] = useState('');
//   const [productImage, setProductImage] = useState('');
//   const [productCategory, setProductCategory] = useState('');
//   const [productInventory, setProductInventory] = useState('');
//   const [price, setPrice] = useState('');
//   const [productStatus, setProductStatus] = useState('');
//   const router = useRouter();

//   const statusMap = [
//     {id: 0, value: 'In Stock'},
//     {id: 1, value: 'Out of Stock'},
//     {id: 2, value: 'Reorder Soon'},
//     {id: 3, value: 'Reorder Next Week'},
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Prepare product data
//     const productData = {
//       name: productName,
//       image: productImage,
//       category: productCategory,
//       inventory: parseInt(productInventory),
//       price: parseFloat(price),
//       status: productStatus,
//     };

//     try {
//       // Send data to backend
//       const response = await fetch('http://localhost:3000/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(productData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add product');
//       }

//       // Redirect to the products page after successful submission
//       router.push('/products');
//     } catch (error) {
//       console.error('Error adding product:', error);
//       // Optionally, display an error message to the user
//     }
//   };

//   return (
//     <div className="h-screen w-full bg-white flex flex-row">
//       <Sidebar />
//       <div className="flex flex-col flex-1">
//         <Navbar />
//         <div className="text-3xl font-bold my-6 text-gray-800 px-8 py-4 flex flex-row items-center gap-3"><FaPlus />Add Product</div>
//         <div className="p-2 flex-1 flex w-full">
//           <form onSubmit={handleSubmit} className="bg-white py-2 px-8 w-full max-w-3xl">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="flex flex-col">
//                 <label htmlFor="productName" className="text-gray-700 font-semibold mb-2">Product Name</label>
//                 <input
//                   type="text"
//                   id="productName"
//                   value={productName}
//                   onChange={(e) => setProductName(e.target.value)}
//                   className="border border-gray-300 rounded-lg px-4 py-2"
//                   required
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="productImage" className="text-gray-700 font-semibold mb-2">Product Image URL</label>
//                 <input
//                   type="text"
//                   id="productImage"
//                   value={productImage}
//                   onChange={(e) => setProductImage(e.target.value)}
//                   className="border border-gray-300 rounded-lg px-4 py-2"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="flex flex-col">
//                 <label htmlFor="productCategory" className="text-gray-700 font-semibold mb-2">Product Categories</label>
//                 <select
//                   id="productCategory" 
//                   value={productCategory} 
//                   onChange={(e) => setProductCategory(e.target.value)} 
//                   className="border border-gray-300 rounded-lg px-4 py-2" 
//                   required
//                 >
//                   <option value="" disabled>Select a category</option>
//                   <option value="GROCERIES">Groceries</option>
//                   <option value="BEAUTY_PRODUCTS">Beauty Products</option>
//                   <option value="STATIONERY">Stationery</option>
//                   <option value="ACCESSORIES">Accessories</option>
//                   <option value="HOME_DECOR">Home Decor</option>
//                 </select>
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="productInventory" className="text-gray-700 font-semibold mb-2">Current Inventory (Units)</label>
//                 <input
//                   type="text"
//                   id="productInventory"
//                   value={productInventory}
//                   onChange={(e) => setProductInventory(e.target.value)}
//                   className="border border-gray-300 rounded-lg px-4 py-2"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="flex flex-col">
//                 <label htmlFor="price" className="text-gray-700 font-semibold mb-2">Price (₹)</label>
//                 <input
//                   type="number"
//                   id="price"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   className="border border-gray-300 rounded-lg px-4 py-2"
//                   required
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="status" className="text-gray-700 font-semibold mb-2">Status</label>
//                 <select
//                   id="status"
//                   value={productStatus}
//                   onChange={(e) => setProductStatus(e.target.value)}
//                   className="border border-gray-300 rounded-lg px-4 py-2"
//                   required
//                 >
//                   {statusMap.map((id) => (
//                     <option key={id.id} value={id.id}>{id.value}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
//             >
//               Add Product
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { FaPlus } from 'react-icons/fa';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productInventory, setProductInventory] = useState('');
  const [price, setPrice] = useState('');
  const [productStatus, setProductStatus] = useState(0);
  const router = useRouter();

  const statusMap = [
    { id: 0, value: 'In Stock' },
    { id: 1, value: 'Out of Stock' },
    { id: 2, value: 'Reorder Soon' },
    { id: 3, value: 'Reorder Next Week' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // First, get the predicted status using the Flask service
      const predictionResponse = await handlePredict();
      const { status: predictedStatus } = predictionResponse;
  
      // Prepare product data with the predicted status
      const productData = {
        name: productName,
        image: productImage,
        category: productCategory,
        inventory: parseInt(productInventory),
        price: parseFloat(price),
        status: predictedStatus, // Use the predicted status
      };
  
      // Send product data to the backend
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
  
      // Redirect to the products page after successful submission
      router.push('/products');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  const handlePredict = async () => {
    const data = { 'name': productName };
    if (!data){
      console.log('No data');
    }
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }
  
      const prediction = await response.json();
      return prediction; // Return the prediction status
  
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div className="h-screen w-full bg-white flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="text-3xl font-bold my-6 text-gray-800 px-8 py-4 flex flex-row items-center gap-3"><FaPlus />Add Product</div>
        <div className="p-2 flex-1 flex w-full">
          <form onSubmit={handleSubmit} className="bg-white py-2 px-8 w-full max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="productName" className="text-gray-700 font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="productImage" className="text-gray-700 font-semibold mb-2">Product Image URL</label>
                <input
                  type="text"
                  id="productImage"
                  value={productImage}
                  onChange={(e) => setProductImage(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="productCategory" className="text-gray-700 font-semibold mb-2">Product Categories</label>
                <select
                  id="productCategory"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
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
              <div className="flex flex-col">
                <label htmlFor="productInventory" className="text-gray-700 font-semibold mb-2">Current Inventory (Units)</label>
                <input
                  type="text"
                  id="productInventory"
                  value={productInventory}
                  onChange={(e) => setProductInventory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="price" className="text-gray-700 font-semibold mb-2">Price (₹)</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="status" className="text-gray-700 font-semibold mb-2">Status</label>
                <select
                  id="status"
                  value={productStatus}
                  onChange={(e) => setProductStatus(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  required
                >
                  {statusMap.map((status) => (
                    <option key={status.id} value={status.id}>{status.value}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
              onClick={() => handlePredict()}
            >
              Add Product
            </button>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              
            >
              Click me!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
