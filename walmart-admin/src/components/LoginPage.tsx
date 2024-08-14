import { SignInButton } from '@clerk/nextjs';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full relative">
        <img 
          src="../../images/warehouse.png" 
          alt="Warehouse" 
          className="h-full w-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-70">
            <h1 className="text-white text-3xl font-extrabold drop-shadow-lg">Purchase Department Dashboard</h1>
            <SignInButton fallbackRedirectUrl="" >
                <button className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    Sign In
                </button>
            </SignInButton>
        </div>
    </div>
  );
}

export default LoginPage;
