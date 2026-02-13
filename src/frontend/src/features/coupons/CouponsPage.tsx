import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCoupons } from './useCoupons';
import CouponListItem from './CouponListItem';
import { Ticket } from 'lucide-react';

export default function CouponsPage() {
  const { allCoupons, isLoading, error } = useCoupons();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">Loading coupons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="py-8 text-center">
          <p className="text-destructive">Failed to load coupons. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  const sortedCoupons = [...allCoupons].sort((a, b) => {
    return Number(b.coupon.validUntil) - Number(a.coupon.validUntil);
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
          Coupon History
        </h2>
        <p className="text-muted-foreground">
          Browse all available coupons and track your redemptions
        </p>
      </div>

      {sortedCoupons.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Ticket className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No coupons available yet. Check back soon!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedCoupons.map((couponStatus) => (
            <CouponListItem
              key={couponStatus.coupon.id}
              couponStatus={couponStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
