import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import ProductList from '@/components/ProductList'
import React from 'react'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'

const index = () => {
  return (
    <div className="flex flex-row h-screen w-full bg-white">
        <Sidebar />
        <div className="flex flex-col w-full">
            <Navbar />
            <div className="px-8 py-6">
                <div className="flex flex-row justify-between mb-3">
                    <div className="flex flex-row items-center gap-3 font-semibold mb-6">
                        <FaShoppingCart className="inline-block text-3xl"/> 
                        <p className="text-3xl">Products</p>
                    </div>
                    <div>
                        <Link href="/products/add">
                            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-lg text-white font-medium rounded-lg">
                                Add Product
                            </button>
                        </Link>
                    </div>
                </div> 
                <ProductList />
            </div>
        </div>
    </div>
  )
}

export default index