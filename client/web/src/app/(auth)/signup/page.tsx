'use client';

import { ROUTES } from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        petPreference: 'all', // 'dogs', 'cats', 'all'
        lookingFor: 'adopt', // 'adopt', 'foster', 'both'
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For demo purposes, just redirect to discover page
            router.push(ROUTES.DISCOVER);
        } catch (err) {
            console.error('Signup error:', err);
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
                    <h2 className="text-2xl font-semibold mb-6">Create Account</h2>

                    <div className="mb-6 flex justify-between">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`h-2 flex-1 mx-1 rounded-full ${s <= step ? 'bg-yellow-400' : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>

                    {step === 1 && (
                        <form onSubmit={nextStep} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
                            >
                                Continue
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={nextStep} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="petPreference" className="block text-sm font-medium text-gray-700 mb-1">
                                    Pet Preference
                                </label>
                                <select
                                    id="petPreference"
                                    name="petPreference"
                                    value={formData.petPreference}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                >
                                    <option value="all">All Pets</option>
                                    <option value="dogs">Dogs</option>
                                    <option value="cats">Cats</option>
                                    <option value="other">Other Animals</option>
                                </select>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="lookingFor" className="block text-sm font-medium text-gray-700 mb-1">
                                    I&apos;m looking to
                                </label>
                                <select
                                    id="lookingFor"
                                    name="lookingFor"
                                    value={formData.lookingFor}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                >
                                    <option value="adopt">Adopt a pet</option>
                                    <option value="foster">Foster a pet</option>
                                    <option value="both">Both adopt and foster</option>
                                </select>
                            </div>

                            <div className="text-sm text-gray-600">
                                <p>By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition disabled:opacity-70"
                                >
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link href={ROUTES.LOGIN} className="text-yellow-600 font-semibold hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
} 