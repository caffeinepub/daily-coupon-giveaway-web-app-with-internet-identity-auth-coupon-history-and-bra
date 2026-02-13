import { useQuery } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import type { CouponStatus } from '../../backend';

export function useCoupons() {
  const { actor, isFetching: isActorFetching } = useActor();

  const { data: allCoupons = [], isLoading, error } = useQuery<CouponStatus[]>({
    queryKey: ['coupons'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCouponHistory();
    },
    enabled: !!actor && !isActorFetching,
  });

  // Derive today's coupon (most recent valid coupon)
  const todayCoupon = allCoupons.length > 0
    ? allCoupons.reduce((latest, current) => {
        if (!latest) return current;
        return Number(current.coupon.validUntil) > Number(latest.coupon.validUntil)
          ? current
          : latest;
      })
    : null;

  return {
    allCoupons,
    todayCoupon,
    isLoading,
    error,
  };
}
