'use client';

import { ROUTES } from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // In a real app, you would validate and send to your API
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // For demo purposes, just redirect to discover page
            router.push(ROUTES.DISCOVER);
        } catch {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-yellow-400">PumplePet</h1>
                    <p className="text-gray-600 mt-2">Find your perfect pet companion</p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-6">Log In</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="text-right">
                            <Link href="/forgot-password" className="text-sm text-yellow-600 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition disabled:opacity-70"
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href={ROUTES.SIGNUP} className="text-yellow-600 font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
} 