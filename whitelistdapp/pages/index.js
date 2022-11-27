import Head from "next/head";
import styles from "../styles/Home.module.css";
import web3modal from "web3modal";
import { providers, Contract } from "ethers";
import { useEffect, useState, useRef } from "react";
import { ChainConfig } from "../config";

export default function Home() {
  const chainConfig = ChainConfig.mumbai.testnet;
  const abi = chainConfig.abi;
  const contractAddress = chainConfig.address;
  const chainId = chainConfig.ChainConfig.chainId;
  const chainName = chainConfig.ChainConfig.chainName;
  const rpcUrl = chainConfig.ChainConfig.rpcUrls;

  const [walletConnected, setWalletConnected] = useState(false);
  const [joinedWhiteList, setJoinedWhiteList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numberofWhitelisted, setNumberofWhitelisted] = useState(0);
  const web3ModalRef = useRef();
  const [account, updateAccount] = useState(null);

  const getProviderorSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const _chainId = await web3Provider.getNetwork();
    if (_chainId.chainId != 97) {
      window.alert("Change network to bsctesnet");
      throw new Error("Change the network to right one");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const addAddresstoWhiteList = async () => {
    try {
      const signer = await getProviderorSigner(true);
      const WhiteListContract = new Contract(contractAddress, abi, signer);
      const tx = await WhiteListContract.AddtoWhitelist();
      setLoading(true);
      await tx.wait();
      setLoading(false);

      const numberofWhitelistAdd = await WhiteListContract.WhitelistedAdd();
      setNumberofWhitelisted(numberofWhitelistAdd);
      setJoinedWhiteList(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getNumberOfWhitelisted = async () => {
    try {
      const provider = await getProviderorSigner();
      const whitelistContract = new Contract(contractAddress, abi, provider);
      // call the numAddressesWhitelisted from the contract
      const _numberOfWhitelisted = await whitelistContract.WhitelistedAdd();
      setNumberofWhitelisted(_numberOfWhitelisted);
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfAddressInWhitelist = async () => {
    try {
      const signer = await getProviderorSigner(true);
      const whitelistContract = new Contract(contractAddress, abi, signer);
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await signer.getAddress();
      console.log("ddddddddddddddddddddddddd");
      const _joinedWhitelist = await whitelistContract.Whitelisted(address);

      setJoinedWhiteList(_joinedWhitelist);
      console.log({ joinedWhiteList });
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderorSigner();
      setWalletConnected(true);
      updateAccount(await getAccounts());
      checkIfAddressInWhitelist();
      getNumberOfWhitelisted();
    } catch (err) {
      console.error(err);
    }
  };

  const getAccounts = async () => {
    const signer = await getProviderorSigner(true);
    const whitelistContract = new Contract(contractAddress, abi, signer);
    // Get the address associated to the signer which is connected to  MetaMask
    const address = await signer.getAddress();
    console.log(address);
    return address;
  };

  const renderButton = () => {
    if (walletConnected) {
      if (joinedWhiteList == true) {
        return (
          <div className={styles.description}>
            Thanks for Joining WhiteList!
          </div>
        );
      } else if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else {
        return (
          <button onClick={addAddresstoWhiteList} className={styles.button}>
            {" "}
            Join the WhiteList
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect Wallet
        </button>
      );
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new web3modal({
        network: "bnbt",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  useEffect(() => {
    (async () => {
      window.ethereum._metamask
        .isUnlocked()
        .then(async (e) => {
          window.ethereum.on("accountsChanged", async () => {
            updateAccount(await getAccounts());
            checkIfAddressInWhitelist();
            getNumberOfWhitelisted();
          });
        })
        .catch((e) => {
          updateAccount(null);
          window.alert("Please Check the Metamask Icon!");
          return;
        });
    })();
    // else {
    //   // toast.error("Please Install Metamask!");
    // }}
  }, [joinedWhiteList, account]);

  return (
    <div>
      <Head>
        <title>WhiteList Dapp</title>
        <meta name="description" content="WhiteList-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Great Welcome!!</h1>
          <div className={styles.description}>
            Its an upcoming Hot NFT Collection!!
          </div>
          <div className={styles.description}>
            {numberofWhitelisted.toString()} have already joined WhiteList
          </div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src="./crypto-devs.svg" />
        </div>
      </div>
      <footer className={styles.footer}>Made with Love!!</footer>
    </div>
  );
}
