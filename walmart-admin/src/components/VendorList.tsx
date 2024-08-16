import { useState, useEffect } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";

interface Vendor {
    id: string;
    vendorId: string;
    name: string;
    contact: string;
    category: string;
    quality: number; //Rating out of 5
    speed: number;
    price: number;
}

const VendorList = () => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editVendor, setEditVendor] = useState<Vendor | null>(null);

    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:3000/vendors');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Vendor[] = await response.json();
        setVendors(data);
      } catch (error) {
        setError('Failed to fetch vendors');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchVendors();
    }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      console.log('Uploading file:', event.target.files[0].name);
      try {
        const response = await fetch('http://localhost:3000/vendors/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Re-fetch vendors after upload
          fetchVendors();
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error uploading file', error);
      }
    }
  };

  if (loading) {
    return <p>Loading vendors...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  type Action = {
    label: string;
    icon: React.JSX.Element;
    color?: string;
    onClick: (row: any) => void;
  };

  const handleEditClick = (vendor: Vendor) => {
    setEditVendor(vendor);
  };

  const handleSaveVendor = (updatedVendor: Vendor) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.vendorId === updatedVendor.vendorId ? updatedVendor : vendor
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="border-b bg-gray-100">
            {/* <th className="py-3 px-2 text-left text-gray-700">Vendor Id</th> */}
            <th className="py-3 px-2 text-left text-gray-700">Vendor Name</th>
            <th className="py-3 px-2 text-left text-gray-700">Contact</th>
            <th className="py-3 px-2 text-left text-gray-700">Category</th>
            <th className="py-3 px-2 text-left text-gray-700">Quality Rating</th>
            <th className="py-3 px-2 text-left text-gray-700">Delivery Rating</th>
            <th className="py-3 px-2 text-left text-gray-700">Effective Price Rating</th>
            <th className="py-3 px-2 text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.vendorId} className="border-b text-gray-700">
              {/* <td className="px-3 py-1">{vendor.vendorId}</td> */}
              <td className="px-2 py-1">
                <div className="flex flex-col gap-0.5">
                  <div className="text-gray-700 font-medium">{vendor.name}</div>
                  <div className="text-sm text-gray-500">{vendor.vendorId}</div>
                </div>
              </td>
              <td className="p-2 text-gray-700">{vendor.contact}</td>
              <td className="p-2 text-gray-700">{vendor.category}</td>
              <td className="px-2 py-1 text-gray-700">{vendor.quality?.toFixed(2)}</td>
              <td className={`px-2 py-1 ${vendor.speed > vendor.price ? "text-green-500" : "text-gray-700"}`}>{vendor.speed?.toFixed(2)}</td>
              <td className={`px-2 py-1 ${vendor.speed < vendor.price ? "text-green-500" : "text-gray-700"}`}>{vendor.price?.toFixed(2)}</td>
              <td className="px-2 py-1 text-gray-700">
                <button
                    className="p-1 text-blue-500"
                    onClick={() => handleEditClick(vendor)}
                  >
                    <FiEdit />
                </button>
                {/* <button
                    className="p-1 text-red-500"
                    onClick={() => handleDeleteClick(vendor.vendorId)}
                  >
                    <FiTrash />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorList;