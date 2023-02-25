import { useHooks } from "@providers/web3";

export const useAccount = () => {
  const hooks = useHooks();
  const swrRes = hooks.useAccount("test");

  return {
    account: swrRes,
  };
};
