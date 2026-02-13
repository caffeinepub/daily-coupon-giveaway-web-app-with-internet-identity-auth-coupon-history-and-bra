import { useState } from 'react';
import BottomNav from './BottomNav';
import AppHeader from './AppHeader';
import HomePage from '../../features/coupons/HomePage';
import CouponsPage from '../../features/coupons/CouponsPage';
import BrandsPage from '../../features/brands/BrandsPage';
import ProfilePage from '../../features/profile/ProfilePage';
import NewCouponBanner from '../feedback/NewCouponBanner';

export type TabView = 'home' | 'coupons' | 'brands' | 'profile';

export default function BottomNavLayout() {
  const [activeTab, setActiveTab] = useState<TabView>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'coupons':
        return <CouponsPage />;
      case 'brands':
        return <BrandsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <AppHeader />
      <NewCouponBanner />
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          {renderContent()}
        </div>
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
