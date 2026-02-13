import { Ticket } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 max-w-4xl items-center gap-3 px-4">
        <img
          src="/assets/generated/coupon-logo.dim_512x512.png"
          alt="Daily Deals"
          className="h-10 w-10 rounded-lg"
        />
        <div className="flex items-center gap-2">
          <h1 className="font-display text-xl font-bold text-foreground">Daily Deals</h1>
          <Ticket className="h-5 w-5 text-primary" />
        </div>
      </div>
    </header>
  );
}
