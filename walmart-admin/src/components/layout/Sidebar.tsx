import React from 'react'
import Link from 'next/link';
import { FaShoppingCart } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";


const Sidebar = () => {
  return (
    <div className="flex flex-col py-6 px-4 bg-blue-500 w-64 min-w-[250px]">
        <Link href="/">
          <img src="../../images/logo.png" alt="" className="w-[200px]"/>
        </Link>
        <hr className="my-6 border-[0.5px] border-gray-100" />
        <div className="flex flex-col space-y-4 px-2">
            <div className="flex items-center space-x-4">
                <FaShoppingCart className="text-white text-xl " />
                <Link href="/products">
                  <p className="text-white text-xl font-medium hover:underline hover:underline-offset-4">Products</p>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <IoPeople className="text-white text-xl" />
                <Link href="/vendors">
                  <p className="text-white text-xl font-medium hover:underline hover:underline-offset-4">Vendors</p>
                </Link> 
            </div>
        </div>
    </div>
  )
}

export default Sidebar