'use client';

import { currentUser } from '@/mockData';
import { useState } from 'react';

export default function ProfilePage() {
    const [user] = useState(currentUser);

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Your Profile</h1>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Profile header */}
                <div className="relative h-40 bg-yellow-400">
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                        <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center text-4xl">
                            👤
                        </div>
                    </div>
                </div>

                {/* Profile info */}
                <div className="pt-20 pb-6 px-6">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold">{user.name}, {user.age}</h2>
                        <p className="text-gray-600">{user.location}</p>
                    </div>

                    <div className="space-y-4">
                        <ProfileSection title="About Me">
                            <p>{user.bio}</p>
                        </ProfileSection>

                        <ProfileSection title="Job">
                            <p>{user.job}</p>
                        </ProfileSection>

                        <ProfileSection title="Education">
                            <p>{user.school}</p>
                        </ProfileSection>

                        <ProfileSection title="Interests">
                            <div className="flex flex-wrap gap-2">
                                {user.interests.map((interest, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                                    >
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </ProfileSection>
                    </div>
                </div>

                {/* Edit profile button */}
                <div className="px-6 pb-6">
                    <button
                        className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Settings section */}
            <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">Settings</h3>
                    
                    <SettingsItem icon="🔔" label="Notifications" />
                    <SettingsItem icon="🔒" label="Privacy" />
                    <SettingsItem icon="🛡️" label="Security" />
                    <SettingsItem icon="❓" label="Help & Support" />
                    <SettingsItem icon="📝" label="Terms of Service" />
                    
                    <button
                        className="w-full py-3 mt-4 border border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}

interface ProfileSectionProps {
    title: string;
    children: React.ReactNode;
}

function ProfileSection({ title, children }: ProfileSectionProps) {
    return (
        <div>
            <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
            <div className="text-gray-600">{children}</div>
        </div>
    );
}

interface SettingsItemProps {
    icon: string;
    label: string;
}

function SettingsItem({ icon, label }: SettingsItemProps) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 px-2 rounded">
            <div className="flex items-center">
                <span className="text-xl mr-3">{icon}</span>
                <span>{label}</span>
            </div>
            <span className="text-gray-400">→</span>
        </div>
    );
}