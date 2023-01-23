import React, { ReactNode, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/constants';
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type TTransactionContext = {
    currentAccount: any;
    contract: ethers.Contract | null;
    connectWallet: () => Promise<void>;
    sendTransaction: (args: { targetAddress: string, amount: number, message: string }) => Promise<void>;
}
export const TransactionContext = React.createContext<TTransactionContext>({
    currentAccount: null,
    contract: null,
    connectWallet: () => new Promise(r => r()),
    sendTransaction: () => new Promise(r => r()),
});

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum as any);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
    const [currentAccount, setCurrentAccount] = useState<string | null>(null);

    const getCurrentAccount = async (): Promise<string | null> => {
        const accounts = await ethereum.request<string[]>({ method: 'eth_accounts' });

        if (accounts && typeof accounts[0] === 'string') {
            return accounts[0];
        } else
            return null;
    }

    const checkIsWalletConnected = async () => {
        const account = await getCurrentAccount();

        if (account) {
            setCurrentAccount(account);
        }
    }

    const getCurrentAccountBalance = async (): Promise<number> => {
        const res = await ethereum.request({
            method: 'eth_getBalance',
            params: [currentAccount, 'latest']
        });

        return parseInt(res as string, 16) / Math.pow(10, 18);
    }

    const getAllTransactions = async (): Promise<void> =>  {
        const transactionContract = getEthereumContract();
        const transactions = await transactionContract.getAllTransactions();

        console.log({ transactions });
    }

    useEffect(() => {
        checkIsWalletConnected();
        getAllTransactions();
    }, []);

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please install Metamask!');

            const accounts = await ethereum.request<string[]>({ method: 'eth_requestAccounts' });

            if (accounts && typeof accounts[0] === 'string') {
                setCurrentAccount(accounts[0]);
            } else {
                alert('Account has not been added!')
            }
        } catch (e) {
            console.error(e);
        }
    }

    const sendTransaction = async ({ targetAddress, amount, message }: {targetAddress: string, amount: number, message: string}) => {
        try {
            if (!ethereum) return alert('Please install Metamask!');
            const transactionContract = getEthereumContract();

            const parsedAmount = ethers.utils.parseEther(String(amount));

            const res = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: targetAddress,
                    gas: '0x5208', // 21000 gwei,
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(targetAddress, parsedAmount, message, '');
            await transactionHash.wait();

            const { from , to } = transactionHash;

            alert(`Transaction from ${from} to ${to} successful!`);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <TransactionContext.Provider value={{ currentAccount, contract: getEthereumContract(), connectWallet, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
} 