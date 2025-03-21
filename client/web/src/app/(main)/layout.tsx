import Navigation from '@/components/Navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-16 min-h-screen bg-gray-50">
      {children}
      <Navigation />
    </div>
  );
}
