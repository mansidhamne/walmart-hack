import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaStar, FaStarHalf } from 'react-icons/fa';
import { FiEdit, FiTrash } from 'react-icons/fi';
import EditProductModal from './EditProductModal';
import DeleteConfirmationModal from './DeleteProductModal';
import BidModal from './BidModal';

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

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null); // State for the product to delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bidProduct, setBidProduct] = useState<Product | null>(null);
  const [showBidModal, setShowBidModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderStatus = (status: number) => {
    const statusMap: {[key: number]: string }= {
      0: 'IN STOCK',
      1: 'OUT OF STOCK',
      2: 'REORDER SOON',
      3: 'REORDER NEXT WEEK',
    };

    if (status == 0) {
      return <span className="text-sm bg-green-300/20 text-green-500 p-2 rounded-sm font-semibold">{statusMap[status]}</span>;
    } else if (status == 1) {
      return <span className="text-sm bg-red-200/20 text-red-500 p-2 rounded-sm font-semibold">{statusMap[status]}</span>;
    } else if (status == 2) {
      return <span className="text-sm bg-blue-200/20 text-blue-500 p-2 rounded-sm font-semibold">{statusMap[status]}</span>;
    } else if (status == 3) {
      return <span className="text-sm bg-yellow-200/20 text-yellow-500 p-2 rounded-sm font-semibold">{statusMap[status]}</span>;
    }
  };

  const handleBidRequest = (product: Product) => {
    setBidProduct(product);
    setShowBidModal(true);
  }

  const renderOrderButton = (product: Product) => {
    if (product.status >= 1) {
      return (
        <button 
          className="bg-green-500 text-white p-2 rounded-sm font-semibold text-sm"
          onClick={() => handleBidRequest(product)}
        >
          BID REQUEST
        </button>
      );
    } else {
      return (
        <button 
          className="bg-gray-200 text-gray-500 p-2 rounded-sm text-sm font-semibold cursor-not-allowed" 
          disabled
        >
          BID REQUEST
        </button>
      );
    }
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  type Action = {
    label: string;
    icon: React.JSX.Element;
    color?: string; // Add the color property
    onClick: (row: any) => void;
  };

  let actionsAvailable: Action[] = [
    {
      label: 'Edit',
      icon: <FiEdit />,
      color: 'text-blue-500',
      onClick: (row) => {
        console.log('Edit', row);
      },
    },
    {
      label: 'Delete',
      icon: <FiTrash />,
      color: 'text-red-500',
      onClick: (row) => {
        console.log('Delete', row);
      },
    },
  ];

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };


  const confirmDelete = async (productId: string) => {
    if (productToDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/products/${productToDelete.productId}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          setProducts(
            products.filter(
              (product) => product.productId !== productToDelete.productId
            )
          );
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product', error);
      } finally {
        setShowDeleteModal(false);
        setProductToDelete(null);
      }
    }
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.productId === updatedProduct.productId ? updatedProduct : product
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-3 text-left text-gray-700">Product</th>
            <th className="p-3 text-left text-gray-700">Category</th>
            <th className="p-3 text-left text-gray-700">Inventory</th>
            <th className="p-3 text-left text-gray-700">Selling Price</th>
            <th className="p-3 text-left text-gray-700">Status</th>
            <th className="p-3 text-left text-gray-700">PO</th>
            <th className="p-3 text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId} className="border-b text-gray-700">
              <td className="flex flex-row gap-3 px-3 py-1">
                <div>
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <span>{product.name}</span>
                  <span className="text-xs text-gray-400">{product.productId || product.id}</span>
                </div>
              </td>
              <td className="p-2 text-gray-700">{product.category}</td>
              <td className="p-2 text-gray-700">{product.inventory}</td>
              <td className="px-2 py-1 text-gray-700">₹{product.price?.toFixed(2)}</td>
              <td className="px-2 py-1 text-gray-700">{renderStatus(product.status)}</td>
              <td className="px-2 py-1 text-gray-700">
                {renderOrderButton(product)}
              </td>
              <td className="px-2 py-1 text-gray-700">
                <button
                    className="p-1 text-blue-500"
                    onClick={() => handleEditClick(product)}
                  >
                    <FiEdit />
                </button>
                <button
                    className="p-1 text-red-500"
                    onClick={() => handleDeleteClick(product)}
                  >
                    <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={handleSaveProduct}
        />
      )}
      {showDeleteModal && productToDelete && (
        <DeleteConfirmationModal
          productId={productToDelete.productId}
          productName={productToDelete.name}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
      {showBidModal && bidProduct &&(
        <BidModal 
          product = {bidProduct}
          productId={bidProduct.productId}
          onClose={() => setShowBidModal(false)}
        />
      )}
    </div>
  );
};

export default ProductList;
