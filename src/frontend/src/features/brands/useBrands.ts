import { useMemo } from 'react';
import { useCoupons } from '../coupons/useCoupons';
import type { CouponStatus } from '../../backend';

interface Brand {
  name: string;
  couponCount: number;
  coupons: CouponStatus[];
}

export function useBrands() {
  const { allCoupons, isLoading, error } = useCoupons();

  const brands = useMemo(() => {
    const brandMap = new Map<string, CouponStatus[]>();

    allCoupons.forEach((couponStatus) => {
      const brandName = couponStatus.coupon.brand;
      if (!brandMap.has(brandName)) {
        brandMap.set(brandName, []);
      }
      brandMap.get(brandName)!.push(couponStatus);
    });

    const brandList: Brand[] = Array.from(brandMap.entries()).map(([name, coupons]) => ({
      name,
      couponCount: coupons.length,
      coupons,
    }));

    return brandList.sort((a, b) => a.name.localeCompare(b.name));
  }, [allCoupons]);

  return {
    brands,
    isLoading,
    error,
  };
}
