import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle2, Calendar } from 'lucide-react';
import { useBrands } from './useBrands';
import { useState } from 'react';
import { toast } from 'sonner';

interface BrandDetailSheetProps {
  brandName: string;
  onClose: () => void;
}

export default function BrandDetailSheet({ brandName, onClose }: BrandDetailSheetProps) {
  const { brands } = useBrands();
  const brand = brands.find((b) => b.name === brandName);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!brand) return null;

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      toast.success('Coupon code copied!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">{brand.name}</SheetTitle>
          <SheetDescription>
            {brand.couponCount} {brand.couponCount === 1 ? 'coupon' : 'coupons'} available
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {brand.coupons.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No coupons available for this brand at the moment.
            </p>
          ) : (
            brand.coupons.map((couponStatus) => {
              const { coupon, redeemed } = couponStatus;
              const validUntilDate = new Date(Number(coupon.validUntil) / 1000000);
              const isExpired = validUntilDate < new Date();

              return (
                <div
                  key={coupon.id}
                  className={`rounded-lg border p-4 ${isExpired ? 'opacity-60' : ''}`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Valid until {validUntilDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2">
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
                  </div>

                  <div className="mb-3 rounded-lg border border-dashed border-primary/30 bg-muted/50 px-3 py-2">
                    <p className="font-mono text-sm font-semibold text-primary">
                      {coupon.description}
                    </p>
                  </div>

                  <Button
                    onClick={() => handleCopy(coupon.description, coupon.id)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={copiedId === coupon.id}
                  >
                    {copiedId === coupon.id ? (
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
                </div>
              );
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
