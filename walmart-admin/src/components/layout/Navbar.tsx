import { useAuth, UserButton, useUser } from '@clerk/nextjs';
import React from 'react'

const Navbar = () => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const { user } = useUser();

    if (!isLoaded || !user) {
        return null; // Optionally render a loading state here
    }

    return (
        <header className="bg-white shadow-md p-4 flex items-center justify-end">
            {/* User Details */}
            <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">{user.firstName} {user.lastName}</span>
                <UserButton/>     
            </div>
        </header>
  )
}

export default Navbar