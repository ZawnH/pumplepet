'use client';

import { ROUTES } from '@/constants';
import { availablePets, matches } from '@/mockData';
import Link from 'next/link';

export default function MatchesPage() {
    // Combine match data with pet data
    const matchesWithPetData = matches.map(match => {
        const pet = availablePets.find(p => p.id === match.petId);
        return { ...match, pet };
    });

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Your Matches</h1>

            {matchesWithPetData.length > 0 ? (
                <div className="space-y-4">
                    {matchesWithPetData.map(match => (
                        <Link
                            href={`${ROUTES.MESSAGES}/${match.userId}`}
                            key={match.id}
                            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                            <div className="h-16 w-16 rounded-full bg-gray-300 flex-shrink-0 mr-4">
                                {/* In a real app, you'd use the pet's photo */}
                                <div className="w-full h-full flex items-center justify-center text-2xl">
                                    {match.pet?.type === 'dog' ? '🐶' : match.pet?.type === 'cat' ? '🐱' : '🐾'}
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">{match.pet?.name || 'Pet'}</h3>
                                    <span className="text-xs text-gray-500">
                                        {new Date(match.matchedOn).toLocaleDateString()}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600">{match.pet?.breed}, {match.pet?.age}</p>
                                <p className="text-sm text-gray-600 truncate">{match.lastMessage}</p>
                            </div>

                            {match.unreadCount > 0 && (
                                <div className="ml-2 h-6 w-6 rounded-full bg-yellow-400 text-white text-xs flex items-center justify-center">
                                    {match.unreadCount}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500">No matches yet. Keep swiping to find your perfect pet!</p>
                    <button
                        onClick={() => window.location.href = ROUTES.DISCOVER}
                        className="mt-4 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg"
                    >
                        Discover Pets
                    </button>
                </div>
            )}
        </div>
    );
}
