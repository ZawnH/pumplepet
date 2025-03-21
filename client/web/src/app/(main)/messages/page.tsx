// src/app/(main)/messages/page.tsx
'use client';

import Link from 'next/link';
import { matches, potentialMatches, conversations } from '@/mockData';
import { ROUTES } from '@/constants';

export default function MessagesPage() {
    // Combine match data with user data and last message
    const matchesWithData = matches.map(match => {
        const user = potentialMatches.find(u => u.id === match.userId);
        const convo = conversations[match.userId] || [];
        const lastMessage = convo.length > 0 ? convo[convo.length - 1] : null;

        return {
            ...match,
            user,
            lastMessageText: lastMessage?.text || '',
            lastMessageTime: lastMessage?.timestamp || new Date(),
        };
    });

    // Sort by most recent message
    matchesWithData.sort((a, b) =>
        new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Messages</h1>

            {matchesWithData.length > 0 ? (
                <div className="space-y-4">
                    {matchesWithData.map(match => (
                        <Link
                            href={`${ROUTES.MESSAGES}/${match.userId}`}
                            key={match.id}
                            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                            <div className="h-16 w-16 rounded-full bg-gray-300 flex-shrink-0 mr-4">
                                {/* In a real app, you'd use the user's photo */}
                                <div className="w-full h-full flex items-center justify-center">
                                    👤
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">{match.user?.name}</h3>
                                    <span className="text-xs text-gray-500">
                                        {formatMessageTime(match.lastMessageTime)}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 truncate">{match.lastMessageText}</p>
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
                    <p className="text-gray-500">No messages yet. Start a conversation!</p>
                </div>
            )}
        </div>
    );
}

function formatMessageTime(date: Date): string {
    const now = new Date();
    const messageDate = new Date(date);

    // If today, show time
    if (messageDate.toDateString() === now.toDateString()) {
        return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // If this week, show day name
    const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
        return messageDate.toLocaleDateString([], { weekday: 'short' });
    }

    // Otherwise show date
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
}