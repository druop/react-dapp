import Web3 from 'web3';
export const initWeb3 = async (): Promise<Web3 | undefined> => {
    try {
        const web3Provider = window.ethereum || Web3.givenProvider;
        const web3Instance = new Web3(web3Provider);
        await (window.ethereum as any).enable();
        console.log('web3Instance', web3Instance);
        return web3Instance;
    } catch (e) {
        console.error(e);
    }
};

export const getAccounts = (web3?: Web3) => web3?.eth.getAccounts();
export const getCoinBase = (web3?: Web3) => web3?.eth.getCoinbase();
export const getNetId = (web3?: Web3) => web3?.eth.net.getId();
export const getBalance = (address: string, web3?: Web3) => web3?.eth.getBalance(address);
