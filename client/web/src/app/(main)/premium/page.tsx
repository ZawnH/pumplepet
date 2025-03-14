'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PremiumPage() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

    const plans = {
        monthly: {
            price: 14.99,
            savings: 0,
            period: 'month'
        },
        yearly: {
            price: 7.99,
            savings: 47,
            period: 'month',
            billedAs: '95.88 billed annually'
        }
    };

    const features = [
        'Unlimited likes',
        'See who likes your profile',
        'Advanced filters',
        'Priority matching with shelters',
        'Spotlight your profile once a month',
        'Unlimited rewinds',
        'Ad-free experience'
    ];

    return (
        <div className="max-w-md mx-auto p-4 pb-20">
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={() => router.back()}
                    className="text-gray-500"
                >
                    ← Back
                </button>
                <h1 className="text-2xl font-bold text-center">PumplePet Premium</h1>
                <div className="w-8"></div> {/* Empty div for spacing */}
            </div>

            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-center text-black mb-8">
                <h2 className="text-2xl font-bold mb-2">Upgrade Your Pet Search</h2>
                <p>Get unlimited access to premium features and find your perfect pet companion faster.</p>
            </div>

            {/* Plan Selection */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="flex border-b">
                    <button
                        className={`flex-1 py-4 text-center font-semibold ${
                            selectedPlan === 'monthly' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-500'
                        }`}
                        onClick={() => setSelectedPlan('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-semibold ${
                            selectedPlan === 'yearly' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-500'
                        }`}
                        onClick={() => setSelectedPlan('yearly')}
                    >
                        Yearly
                        {plans.yearly.savings > 0 && (
                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Save {plans.yearly.savings}%
                            </span>
                        )}
                    </button>
                </div>

                <div className="p-6 text-center">
                    <div className="text-3xl font-bold">
                        ${plans[selectedPlan].price}
                        <span className="text-sm text-gray-500 font-normal">/{plans[selectedPlan].period}</span>
                    </div>
                    
                    {selectedPlan === 'yearly' && (
                        <div className="text-sm text-gray-500 mt-1">
                            {plans.yearly.billedAs}
                        </div>
                    )}
                    
                    <button className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition mt-6">
                        Continue
                    </button>
                </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Premium Features</h3>
                    
                    <ul className="space-y-3">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <span className="text-yellow-500 mr-3">✓</span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-6">
                <p>
                    Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period.
                </p>
            </div>
        </div>
    );
} 