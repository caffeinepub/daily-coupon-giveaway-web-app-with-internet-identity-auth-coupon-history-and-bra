import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Gift, X } from 'lucide-react';
import { useNewCouponNotice } from '../../features/notifications/useNewCouponNotice';

export default function NewCouponBanner() {
  const { shouldShow, dismiss } = useNewCouponNotice();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (shouldShow) {
      setIsVisible(true);
    }
  }, [shouldShow]);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    dismiss();
  };

  return (
    <div className="animate-slide-up border-b bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="container mx-auto max-w-4xl px-4 py-3">
        <Alert className="border-primary/20 bg-primary/5">
          <Gift className="h-5 w-5 text-primary" />
          <AlertDescription className="flex items-center justify-between">
            <span className="font-medium text-foreground">
              🎉 New coupon available today! Check it out below.
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="ml-2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
