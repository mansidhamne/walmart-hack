import React, { useEffect, useState } from 'react'

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

interface Vendor {
    vendorId: string;
    name: string;
    contact: string;
    quality: number;
    speed: number;
    price: number;
  }

interface BidModalProps {
    product: Product;
    productId: string;
    onClose: () => void;
}

// const BidModal: React.FC<BidModalProps> = ({
//     product,
//     productId,
//     onClose,
// }) => {
//     const [vendors, setVendors] = useState<Vendor[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [demand, setDemand] = useState<number | null>(null);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchVendors = async () => {
//           try {
//             const response = await fetch(`http://localhost:3000/vendors/category/${product.category}`);
//             if (!response.ok) {
//               throw new Error('Failed to fetch vendors');
//             }
//             const data: Vendor[] = await response.json();
//             setVendors(data);
//           } catch (error) {
//             setError('Failed to load vendors');
//           } finally {
//             setLoading(false);
//           }
//         };
    
//         fetchVendors();
//     }, [product.category]);

//     const fetchDemand = async () => {
//         const data = {
//             'name' : product.name,
//             'inventory' : product.inventory
//         }
//         console.log('product name', data);
//         try {
//             const response = await fetch('http://localhost:5000/calc-demand', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || 'Failed to fetch prediction');
//             }
//             const demandData = await response.json();
//             setDemand(demandData);
//         } catch (error) {
//             console.error('Error fetching demand:', error);
//             setError('Failed to load demand');
//         }
//     };

//     useEffect(() => {
//         fetchDemand();
//     }, [product.name, product.inventory]);

//     const renderComment = (vendor: Vendor) => {
//         if (vendor.speed > vendor.price) {
//             return 'Fast Delivery';
//         } else {
//             return 'Lowest Price';
//         }
//     }

//     const toastSuccess = () => {
//         alert('Tender Request Floated Successfully');
//         onClose();
//     }
    
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white px-8 py-4 rounded-lg shadow-md max-h-[350px] overflow-y-auto">
//                 <h2 className="text-xl font-semibold mb-6 text-center">Order Request</h2>
//                 <div className="flex flex-row justify-between gap-10 text-lg mb-2">
//                     <h3 className="font-semibold">Product Name: <span className="font-normal text-gray-700">{product.name}</span></h3>
//                     <h3 className="font-semibold">Product ID: <span className="font-normal text-gray-700">{product.productId}</span></h3>
//                 </div>
//                 <div className="flex flex-row justify-between gap-10 text-lg mb-2 ">
//                     <h3 className="font-semibold">Current Inventory: <span className="font-normal text-gray-700">{product.inventory}</span></h3>
//                     <h3 className="font-semibold">Demand Forecasted: <span className="font-normal text-gray-700">{demand !== null ? demand : 'Loading...'}</span></h3>
//                 </div>
//                 <div className="flex flex-row justify-between gap-10 text-lg mb-2 ">
//                     <h3 className="font-semibold">Category: <span className="font-normal text-gray-700">{product.category}</span></h3>
//                 </div>
//                 <div className='bg-gray-200 w-full h-1 my-4'></div>
//                 <div className="mt-2">
//                     {!loading && !error && (
//                         <div className="flex flex-col gap-4">
//                             {vendors.map((vendor) => (
//                                 <div key={vendor.vendorId} className=" text-lg flex flex-row justify-between">
//                                     <span className="font-medium text-gray-700">{vendor.name}</span>
//                                     <span className=" text-gray-500">{renderComment(vendor)}</span>
//                                 </div>
//                             ))}
//                         </div>
                        
//                     )}
//                 </div>
//                 <div className="mt-8 flex justify-around">
//                     <button
//                         className="bg-gray-300 text-gray-900 px-6 py-2 rounded font-medium"
//                         onClick={onClose}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         className="bg-green-500 text-white px-6 py-2 rounded font-medium"
//                         onClick={toastSuccess}
//                     >
//                         Float Tender Request
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default BidModal

const BidModal: React.FC<BidModalProps> = ({
    product,
    productId,
    onClose,
}) => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [demand, setDemand] = useState<{ demand: number } | null>(null);

    useEffect(() => {
        const fetchVendors = async () => {
          try {
            const response = await fetch(`http://localhost:3000/vendors/category/${product.category}`);
            if (!response.ok) {
              throw new Error('Failed to fetch vendors');
            }
            const data: Vendor[] = await response.json();
            setVendors(data);
          } catch (error) {
            setError('Failed to load vendors');
          } finally {
            setLoading(false);
          }
        };
    
        fetchVendors();
    }, [product.category]);

    useEffect(() => {
        const fetchDemand = async () => {
            const data = {
                'name' : product.name,
                'inventory' : product.inventory
            }
            console.log('product name', data);
            try {
                const response = await fetch('http://localhost:5000/calc-demand', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch prediction');
                }
                const demandData = await response.json();
                console.log('demand data', demandData);
                setDemand(demandData);
            } catch (error) {
                console.error('Error fetching demand:', error);
                setError('Failed to load demand');
            }
        };

        fetchDemand();
    }, [product.name, product.inventory]);

    const renderComment = (vendor: Vendor) => {
        if (vendor.speed > vendor.price) {
            return 'Fast Delivery';
        } else {
            return 'Lowest Price';
        }
    }

    const toastSuccess = () => {
        alert('Tender Request Floated Successfully');
        onClose();
    }
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white px-8 py-4 rounded-lg shadow-md max-h-[350px] overflow-y-auto min-w-[450px]">
                <h2 className="text-xl font-semibold mb-6 text-center">Order Request</h2>
                <div className="flex flex-row justify-between gap-10 text-lg mb-2">
                    <h3 className="font-semibold">Product Name: <span className="font-normal text-gray-700">{product.name}</span></h3>
                    <h3 className="font-semibold">Product ID: <span className="font-normal text-gray-700">{product.productId}</span></h3>
                </div>
                <div className="flex flex-row justify-between gap-10 text-lg mb-2 ">
                    <h3 className="font-semibold">Current Inventory: <span className="font-normal text-gray-700">{product.inventory}</span></h3>
                    <h3 className="font-semibold">Units to Order: <span className="font-normal text-gray-700">{demand !== null ? demand.demand : 'Loading...'}</span></h3>
                </div>
                <div className="flex flex-row justify-between gap-10 text-lg mb-2 ">
                    <h3 className="font-semibold">Category: <span className="font-normal text-gray-700">{product.category}</span></h3>
                </div>
                <div className='bg-gray-200 w-full h-1 my-4'></div>
                <div className="mt-2">
                    {!loading && !error && (
                        <div className="flex flex-col gap-4">
                            {vendors.map((vendor) => (
                                <div key={vendor.vendorId} className=" text-lg flex flex-row justify-between">
                                    <span className="font-medium text-gray-700">{vendor.name}</span>
                                    <span className=" text-gray-500">{renderComment(vendor)}</span>
                                </div>
                            ))}
                        </div>
                        
                    )}
                </div>
                <div className="mt-8 flex justify-around">
                    <button
                        className="bg-gray-300 text-gray-900 px-6 py-2 rounded font-medium"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-green-500 text-white px-6 py-2 rounded font-medium"
                        onClick={toastSuccess}
                    >
                        Float Tender Request
                    </button>
                </div>
            </div>
        </div>
    )
}


    // return (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //         <div className="bg-white px-8 py-4 rounded-lg shadow-md max-h-[350px] overflow-y-auto">
    //             {/* ... other JSX ... */}
    //             <div className="flex flex-row justify-between gap-10 text-lg mb-2 ">
    //                 <h3 className="font-semibold">Current Inventory: <span className="font-normal text-gray-700">{product.inventory}</span></h3>
    //                 <h3 className="font-semibold">Demand Forecasted: <span className="font-normal text-gray-700">{demand !== null ? demand.demand : 'Loading...'}</span></h3>
    //             </div>
    //             {/* ... rest of your JSX ... */}
    //         </div>
    //     </div>
    // )


export default BidModal