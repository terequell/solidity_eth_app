import React, { ReactNode, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/constants';

export type TTransactionContext = {
    currentAccount: any;
    connectWallet: () => Promise<void>;
}
export const TransactionContext = React.createContext<TTransactionContext>({
    currentAccount: null,
    connectWallet: () => new Promise(r => r()),
});

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
    const [currentAccount, setCurrentAccount] = useState(null);

    const checkIsWalletConnected = async () => {
        if (!ethereum) return alert('Please install Metamask!');

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length) {
            setCurrentAccount(accounts[0]);
        }

        console.log({accounts})
    }

    useEffect(() => {
        checkIsWalletConnected();
    }, []);

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please install Metamask!');

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (e) {
            console.error(e);
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Please install Metamask!');
            const transactionContract = getEthereumContract();

            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 gwei,
                    value: parsedAmount._hex,
                }]
            })

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            await transactionHash.wait(); 
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <TransactionContext.Provider value={{ currentAccount, connectWallet }}>
            {children}
        </TransactionContext.Provider>
    )
} 