import { useEffect, useState } from 'react';
import { useCoupons } from '../coupons/useCoupons';

const STORAGE_KEY = 'last-seen-coupon-id';

export function useNewCouponNotice() {
  const { todayCoupon } = useCoupons();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!todayCoupon) return;

    const lastSeenId = localStorage.getItem(STORAGE_KEY);
    
    if (lastSeenId !== todayCoupon.coupon.id) {
      setShouldShow(true);
    }
  }, [todayCoupon]);

  const dismiss = () => {
    if (todayCoupon) {
      localStorage.setItem(STORAGE_KEY, todayCoupon.coupon.id);
    }
    setShouldShow(false);
  };

  return { shouldShow, dismiss };
}
