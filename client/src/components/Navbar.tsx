"use client";

import { useRouter } from 'next/navigation';
import api from '@/services/api';

export default function Navbar({ user }: { user: any }) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            router.push('/login');
            router.refresh();
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <nav className="bg-zinc-400 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-blue-600">TaskManager</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700">Hi, {user?.name}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
