import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface CouponStatus {
    redeemed: boolean;
    coupon: Coupon;
}
export interface Coupon {
    id: string;
    description: string;
    brand: string;
    validUntil: Time;
}
export interface backendInterface {
    addCoupon(coupon: Coupon): Promise<void>;
    getAllCoupons(): Promise<Array<Coupon>>;
    getCouponHistory(): Promise<Array<CouponStatus>>;
    redeemCoupon(couponId: string): Promise<CouponStatus>;
}
