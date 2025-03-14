// src/components/Navigation.tsx
'use client';

import { ROUTES } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
            <div className="flex justify-around items-center max-w-md mx-auto">
                <NavItem
                    href={ROUTES.DISCOVER}
                    icon="🐾"
                    label="Discover"
                    isActive={isActive(ROUTES.DISCOVER)}
                />
                <NavItem
                    href={ROUTES.MATCHES}
                    icon="❤️"
                    label="Matches"
                    isActive={isActive(ROUTES.MATCHES)}
                />
                <NavItem
                    href={ROUTES.MESSAGES}
                    icon="💬"
                    label="Messages"
                    isActive={isActive(ROUTES.MESSAGES)}
                />
                <NavItem
                    href={ROUTES.PROFILE}
                    icon="👤"
                    label="Profile"
                    isActive={isActive(ROUTES.PROFILE)}
                />
            </div>
        </nav>
    );
}

interface NavItemProps {
    href: string;
    icon: string;
    label: string;
    isActive: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
    return (
        <Link
            href={href}
            className={`flex flex-col items-center ${isActive ? 'text-yellow-400' : 'text-gray-500'}`}
        >
            <span className="text-2xl">{icon}</span>
            <span className="text-xs mt-1">{label}</span>
        </Link>
    );
}