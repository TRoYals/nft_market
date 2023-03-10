import { CryptoHookFactory } from "@_types/hooks";
import useSWR from "swr";
import { useEffect } from "react";

type UseAccountResponse = {
  connect: () => void;
};

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>;

export type UseAccountHook = ReturnType<AccountHookFactory>;
export const hookFactory: AccountHookFactory =
  ({ provider, ethereum }) =>
  () => {
    const swrRes = useSWR(
      provider ? "web3/useAccount" : null,
      async () => {
        const accounts = await provider!.listAccounts();
        const account = accounts[0];
        console.log(account);
        if (!account) {
          throw "cannot connect to the web3 wallet";
        }
        return accounts;
      },
      {
        revalidateOnFocus: false,
      }
    );
    useEffect(() => {
      ethereum?.on("accountsChanged", handleAccountsChanged);
      return () => {
        ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      };
    });

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (accounts.length === 0) {
        console.error("Please, connect to Web3 wallet");
      } else if (accounts[0] !== String(swrRes.data)) {
        swrRes.mutate(accounts[0])
      }
    };

    const connect = async () => {
      try {
        ethereum?.request({ method: "eth_requestAccounts" });
      } catch (e) {
        console.error(e);
      }
    };

    return {
      ...swrRes,
      connect,
    };
  };
