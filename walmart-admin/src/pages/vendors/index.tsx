import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import VendorList from '@/components/VendorList'
import Link from 'next/link'
import React from 'react'
import { IoPeople } from 'react-icons/io5'

const index = () => {
  return (
    <div className="flex flex-row h-[100%] w-full bg-white">
        <Sidebar />
        <div className="flex flex-col w-full">
            <Navbar />
            <div className="px-8 py-6">
                <div className="flex flex-row justify-between mb-3">
                    <div className="flex flex-row items-center gap-3 font-semibold mb-6">
                        <IoPeople className="inline-block text-3xl"/> 
                        <p className="text-3xl">Vendors</p>
                    </div>
                    <div>
                        <Link href="/vendors/add">
                            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-lg text-white font-medium rounded-lg">
                                Add Vendor
                            </button>
                        </Link>
                    </div>
                </div> 
                <VendorList />
            </div>
        </div>
    </div>
  )
}

export default index