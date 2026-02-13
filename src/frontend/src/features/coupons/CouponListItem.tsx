import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle2, Gift, Calendar } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRedeemCoupon } from './useRedeemCoupon';
import type { CouponStatus } from '../../backend';

interface CouponListItemProps {
  couponStatus: CouponStatus;
}

export default function CouponListItem({ couponStatus }: CouponListItemProps) {
  const { coupon, redeemed } = couponStatus;
  const [copied, setCopied] = useState(false);
  const { redeemCoupon, isRedeeming } = useRedeemCoupon();

  const validUntilDate = new Date(Number(coupon.validUntil) / 1000000);
  const isExpired = validUntilDate < new Date();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.description);
      setCopied(true);
      toast.success('Coupon code copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const handleRedeem = async () => {
    try {
      await redeemCoupon(coupon.id);
      toast.success('Coupon redeemed successfully!');
    } catch (err) {
      if (err instanceof Error && err.message.includes('already redeemed')) {
        toast.info('You already redeemed this coupon');
      } else {
        toast.error('Failed to redeem coupon');
      }
    }
  };

  return (
    <Card className={`transition-all hover:shadow-md ${isExpired ? 'opacity-60' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{coupon.brand}</h3>
              {redeemed && (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Redeemed
                </Badge>
              )}
              {isExpired && (
                <Badge variant="outline" className="text-muted-foreground">
                  Expired
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Valid until {validUntilDate.toLocaleDateString()}</span>
            </div>

            <div className="rounded-lg border border-dashed border-primary/30 bg-muted/50 px-3 py-2">
              <p className="font-mono text-sm font-semibold text-primary">
                {coupon.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              disabled={copied}
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            {!isExpired && (
              <Button
                onClick={handleRedeem}
                size="sm"
                disabled={redeemed || isRedeeming}
              >
                {isRedeeming ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : redeemed ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Gift className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
