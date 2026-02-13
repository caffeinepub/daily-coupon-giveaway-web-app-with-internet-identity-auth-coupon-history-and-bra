import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket, Gift, Sparkles, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Logo and Hero */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-3">
            <img
              src="/assets/generated/coupon-logo.dim_512x512.png"
              alt="Daily Deals Logo"
              className="h-16 w-16 rounded-2xl shadow-lg"
            />
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Daily Deals
            </h1>
          </div>
          <p className="mb-8 max-w-md text-lg text-muted-foreground">
            Unlock exclusive discount codes every day from your favorite brands. Save money, shop smarter.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12 w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl">
          <img
            src="/assets/generated/coupon-hero.dim_1600x900.png"
            alt="Daily coupon deals"
            className="h-auto w-full object-cover"
          />
        </div>

        {/* CTA */}
        <Card className="w-full max-w-md border-2 shadow-glow">
          <CardContent className="p-8">
            <Button
              onClick={login}
              disabled={isLoggingIn}
              size="lg"
              className="w-full text-lg font-semibold shadow-lg transition-all hover:shadow-glow"
            >
              {isLoggingIn ? (
                <>
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Connecting...
                </>
              ) : (
                <>
                  <Ticket className="mr-2 h-5 w-5" />
                  Get Started
                </>
              )}
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Sign in securely with Internet Identity
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-16 grid w-full max-w-4xl gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Gift className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Daily Coupons</h3>
            <p className="text-sm text-muted-foreground">
              Fresh discount codes delivered every single day
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
              <Sparkles className="h-7 w-7 text-accent" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Top Brands</h3>
            <p className="text-sm text-muted-foreground">
              Exclusive deals from leading retailers
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-chart-2/10">
              <TrendingUp className="h-7 w-7 text-chart-2" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Save More</h3>
            <p className="text-sm text-muted-foreground">
              Track your savings and coupon history
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} · Built with love using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'daily-deals'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
