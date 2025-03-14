'use client';

import { ROUTES } from '@/constants';
import Link from 'next/link';

export default function SettingsPage() {
    return (
        <div className="max-w-md mx-auto p-4">
            <div className="flex items-center mb-6">
                <Link href={ROUTES.PROFILE} className="mr-4">
                    <span className="text-2xl">←</span>
                </Link>
                <h1 className="text-2xl font-bold">Settings</h1>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 space-y-6">
                    <SettingsSection title="Account">
                        <SettingsItem label="Phone Number" value="+1 (555) 123-4567" />
                        <SettingsItem label="Email" value="alex@example.com" />
                        <SettingsItem label="Verify ID" value="Not verified" />
                    </SettingsSection>

                    <SettingsSection title="Discovery">
                        <SettingsItem label="Location" value="San Francisco" />
                        <SettingsItem label="Distance Preference" value="10 miles" />
                        <SettingsItem label="Age Range" value="24-35" />
                        <SettingsItem label="Show Me" value="Everyone" />
                    </SettingsSection>

                    <SettingsSection title="Privacy">
                        <SettingsToggle label="Incognito Mode" description="Only people you like will see your profile" value={false} />
                        <SettingsToggle label="Travel Mode" description="Show your profile in a different location" value={false} />
                        <SettingsToggle label="Web Profile" description="Allow your profile to be visible on the web" value={true} />
                    </SettingsSection>

                    <SettingsSection title="Notifications">
                        <SettingsToggle label="New Matches" value={true} />
                        <SettingsToggle label="Messages" value={true} />
                        <SettingsToggle label="In-App Vibrations" value={true} />
                    </SettingsSection>

                    <div className="pt-4">
                        <button className="w-full py-3 border border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition">
                            Log Out
                        </button>

                        <button className="w-full py-3 mt-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
}

function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
}

interface SettingsItemProps {
    label: string;
    value: string;
}

function SettingsItem({ label, value }: SettingsItemProps) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 px-2 rounded">
            <span className="text-gray-700">{label}</span>
            <div className="flex items-center">
                <span className="text-gray-500 mr-2">{value}</span>
                <span className="text-gray-400">→</span>
            </div>
        </div>
    );
}

interface SettingsToggleProps {
    label: string;
    description?: string;
    value: boolean;
}

function SettingsToggle({ label, description, value }: SettingsToggleProps) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-100 px-2 rounded">
            <div>
                <span className="text-gray-700">{label}</span>
                {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                <input
                    type="checkbox"
                    className="absolute w-6 h-6 opacity-0 cursor-pointer z-10"
                    defaultChecked={value}
                />
                <div className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                <div
                    className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${value ? 'transform translate-x-6' : ''
                        }`}
                ></div>
            </div>
        </div>
    );
} 