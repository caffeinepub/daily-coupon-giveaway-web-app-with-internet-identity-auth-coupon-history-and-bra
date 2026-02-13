import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  public type Coupon = {
    id : Text;
    brand : Text;
    description : Text;
    validUntil : Time.Time;
  };

  module Coupon {
    public func compare(c1 : Coupon, c2 : Coupon) : Order.Order {
      Text.compare(c1.id, c2.id);
    };
  };

  public type CouponStatus = {
    coupon : Coupon;
    redeemed : Bool;
  };

  module CouponStatus {
    public func compare(cs1 : CouponStatus, cs2 : CouponStatus) : Order.Order {
      Coupon.compare(cs1.coupon, cs2.coupon);
    };
  };

  let coupons = Map.empty<Text, Coupon>();
  let userRedemptions = Map.empty<Principal, Map.Map<Text, Bool>>();

  // Admin: Add new coupon
  public shared ({ caller }) func addCoupon(coupon : Coupon) : async () {
    coupons.add(coupon.id, coupon);
  };

  // Get all coupons (sorted by id)
  public query ({ caller }) func getAllCoupons() : async [Coupon] {
    coupons.values().toArray().sort();
  };

  // Redeem a coupon if not already redeemed by the user
  public shared ({ caller }) func redeemCoupon(couponId : Text) : async CouponStatus {
    let userId = caller;

    switch (coupons.get(couponId)) {
      case (null) { Runtime.trap("Coupon not found") };
      case (?coupon) {
        let userCoupons = switch (userRedemptions.get(userId)) {
          case (null) {
            let newMap = Map.empty<Text, Bool>();
            userRedemptions.add(userId, newMap);
            newMap;
          };
          case (?existingMap) { existingMap };
        };

        switch (userCoupons.get(couponId)) {
          case (null) {
            userCoupons.add(couponId, true);
            { coupon; redeemed = true };
          };
          case (?alreadyRedeemed) {
            if (alreadyRedeemed) {
              Runtime.trap("Coupon already redeemed");
            } else {
              userCoupons.add(couponId, true);
              { coupon; redeemed = true };
            };
          };
        };
      };
    };
  };

  // Get user's coupon history with redemption status
  public query ({ caller }) func getCouponHistory() : async [CouponStatus] {
    let userId = caller;
    let userCoupons = switch (userRedemptions.get(userId)) {
      case (null) { Map.empty<Text, Bool>() };
      case (?map) { map };
    };

    coupons.values().flatMap(
      func(coupon) {
        switch (userCoupons.get(coupon.id)) {
          case (null) {
            [({ coupon; redeemed = false })].values();
          };
          case (?redeemed) {
            [({ coupon; redeemed })].values();
          };
        };
      }
    ).toArray().sort();
  };
};
