import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle2, Gift, Calendar } from 'lucide-react';
import { useCoupons } from './useCoupons';
import { useRedeemCoupon } from './useRedeemCoupon';
import { toast } from 'sonner';
import { useState } from 'react';

export default function HomePage() {
  const { todayCoupon, isLoading, error } = useCoupons();
  const { redeemCoupon, isRedeeming } = useRedeemCoupon();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!todayCoupon) return;
    
    try {
      await navigator.clipboard.writeText(todayCoupon.coupon.description);
      setCopied(true);
      toast.success('Coupon code copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const handleRedeem = async () => {
    if (!todayCoupon) return;
    
    try {
      await redeemCoupon(todayCoupon.coupon.id);
      toast.success('Coupon redeemed successfully!');
    } catch (err) {
      if (err instanceof Error && err.message.includes('already redeemed')) {
        toast.info('You already redeemed this coupon');
      } else {
        toast.error('Failed to redeem coupon');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">Loading today's deal...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="py-8 text-center">
          <p className="text-destructive">Failed to load coupon. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (!todayCoupon) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Gift className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">No coupon available today. Check back soon!</p>
        </CardContent>
      </Card>
    );
  }

  const validUntilDate = new Date(Number(todayCoupon.coupon.validUntil) / 1000000);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center">
        <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
          Today's Exclusive Deal
        </h2>
        <p className="text-muted-foreground">
          Save big with this limited-time offer
        </p>
      </div>

      {/* Main Coupon Card */}
      <Card className="overflow-hidden border-2 shadow-glow-lg">
        <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-6">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="mb-2 font-display text-2xl">
                  {todayCoupon.coupon.brand}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Valid until {validUntilDate.toLocaleDateString()}</span>
                </div>
              </div>
              {todayCoupon.redeemed && (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Redeemed
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4 p-0">
            {/* Coupon Code Display */}
            <div className="rounded-xl border-2 border-dashed border-primary/30 bg-card p-6 text-center">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Coupon Code
              </p>
              <p className="font-mono text-3xl font-bold tracking-wider text-primary">
                {todayCoupon.coupon.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="flex-1"
                disabled={copied}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                  </>
                )}
              </Button>
              <Button
                onClick={handleRedeem}
                disabled={todayCoupon.redeemed || isRedeeming}
                className="flex-1 shadow-lg"
              >
                {isRedeeming ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Redeeming...
                  </>
                ) : todayCoupon.redeemed ? (
                  'Already Redeemed'
                ) : (
                  <>
                    <Gift className="mr-2 h-4 w-4" />
                    Redeem Now
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="bg-muted/50">
        <CardContent className="py-4 text-center text-sm text-muted-foreground">
          <p>
            💡 <strong>Tip:</strong> Copy the code and use it at checkout to save money!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
