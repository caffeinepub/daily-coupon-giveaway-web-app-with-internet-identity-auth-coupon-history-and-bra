import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';

export function useRedeemCoupon() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (couponId: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.redeemCoupon(couponId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
  });

  return {
    redeemCoupon: mutation.mutateAsync,
    isRedeeming: mutation.isPending,
  };
}
