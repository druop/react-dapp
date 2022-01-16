import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Button } from 'antd';
import SimpleStorage from './contracts/SimpleStorage.json';
import './App.css';
import { getAccounts, getBalance, getCoinBase, getNetId, initWeb3 } from './utils/web3';

type NetIdType = keyof typeof SimpleStorage.networks;

function App() {
    const [web3, setWeb3] = useState<Web3>();
    const [accounts, setAccounts] = useState<string[]>();
    const [address, setAddress] = useState<string>();
    const [netId, setNetId] = useState<number>();
    const [balance, setBalance] = useState<string>();
    const [network, setNetwork] = useState<any>();

    const linkWeb3 = async () => {
        const web3Example = await initWeb3();
        setWeb3(web3Example);

        setAccounts(await getAccounts(web3Example));
        setAddress(await getCoinBase(web3Example));
        setNetId(await getNetId(web3Example));
    };

    useEffect(() => {
        console.log(address);
        if (address) {
            getBalance(address, web3)?.then((res) => {
                setBalance(res);
            });
        }
    }, [address, web3]);

    useEffect(() => {
        if (netId) {
            //  获取当前网络
            const id = netId as unknown as NetIdType;
            const network = SimpleStorage.networks[id];
            setNetwork(network);
        }
    }, [netId, web3]);

    return (
        <div className="App">
            <Button onClick={linkWeb3}>测试链接</Button>
            <div>
                <h2>地址： {address}</h2>
                {accounts?.map((account, index) => (
                    <span key={index}>
                        账户{index} :{account}
                    </span>
                ))}
            </div>
            <div>
                <h2>netId: {netId}</h2>
                <h2>余额： {balance}</h2>
                <h2>当前网络： {network?.address || 'None'}</h2>
            </div>
        </div>
    );
}

export default App;
