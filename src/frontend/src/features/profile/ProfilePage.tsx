import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useCoupons } from '../coupons/useCoupons';
import { LogOut, User, Ticket, CheckCircle2, Gift } from 'lucide-react';

export default function ProfilePage() {
  const { identity, clear } = useInternetIdentity();
  const { allCoupons } = useCoupons();

  const principal = identity?.getPrincipal().toString() || '';
  const shortPrincipal = principal
    ? `${principal.slice(0, 8)}...${principal.slice(-6)}`
    : '';

  const redeemedCount = allCoupons.filter((c) => c.redeemed).length;
  const totalCount = allCoupons.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-display text-3xl font-bold text-foreground">Profile</h2>
        <p className="text-muted-foreground">Manage your account and view your stats</p>
      </div>

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-1 text-sm font-medium text-muted-foreground">Principal ID</p>
            <div className="flex items-center gap-2">
              <code className="rounded bg-muted px-2 py-1 text-sm font-mono">
                {shortPrincipal}
              </code>
              <Badge variant="secondary">Verified</Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Full ID: <span className="break-all font-mono">{principal}</span>
            </p>
          </div>

          <Separator />

          <Button onClick={clear} variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Your Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <div className="mb-2 flex items-center justify-center">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{totalCount}</p>
              <p className="text-sm text-muted-foreground">Total Coupons</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <div className="mb-2 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-accent" />
              </div>
              <p className="text-2xl font-bold text-foreground">{redeemedCount}</p>
              <p className="text-sm text-muted-foreground">Redeemed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="pt-8 text-center text-sm text-muted-foreground">
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
      </div>
    </div>
  );
}
