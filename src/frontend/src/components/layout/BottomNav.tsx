import { Home, Ticket, Store, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { TabView } from './BottomNavLayout';

interface BottomNavProps {
  activeTab: TabView;
  onTabChange: (tab: TabView) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as TabView, label: 'Home', icon: Home },
    { id: 'coupons' as TabView, label: 'Coupons', icon: Ticket },
    { id: 'brands' as TabView, label: 'Brands', icon: Store },
    { id: 'profile' as TabView, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex max-w-4xl items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'fill-primary/20' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
