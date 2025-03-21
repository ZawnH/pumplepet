'use client';

import { ROUTES } from '@/constants';
import Link from 'next/link';

export default function BeelinePage() {
    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Your Beeline</h1>

            <div className="bg-yellow-50 rounded-xl p-6 mb-6 text-center">
                <h2 className="text-xl font-semibold mb-2">See who likes you</h2>
                <p className="text-gray-600 mb-4">
                    Upgrade to Bumble Premium to see all the people who have already liked you.
                </p>
                <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
                    Upgrade Now
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="relative">
                        <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
                            {/* Blurred image placeholder */}
                            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                                <span className="text-4xl">👤</span>
                            </div>
                            {/* Blur overlay */}
                            <div className="absolute inset-0 backdrop-blur-xl"></div>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 text-white text-center">
                            <div className="text-sm font-semibold">Someone likes you</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                    Match with them instantly by upgrading to Premium
                </p>
                <Link
                    href={ROUTES.DISCOVER}
                    className="inline-block px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                >
                    Continue Swiping
                </Link>
            </div>
        </div>
    );
} 