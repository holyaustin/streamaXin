/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from "react";
import { jsx, Box } from 'theme-ui';
import { NFTStorage } from "nft.storage";
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from 'axios'
import { rgba } from 'polished';
import { Wallet, providers } from "ethers";

import 'dotenv/config';
import fileNFT from "../../artifacts/contracts/Genic.sol/FileNFT.json";
import { fileShareAddress } from "../../config";
// const APIKEY = [process.env.NFT_STORAGE_API_KEY];
const APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA4Zjc4ODAwMkUzZDAwNEIxMDI3NTFGMUQ0OTJlNmI1NjNFODE3NmMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzA1NjE4NzM4MCwibmFtZSI6InBlbnNpb25maSJ9.agI-2V-FeK_eVRAZ-T6KGGfE9ltWrTUQ7brFzzYVwdM";

const MintFile = () => {
  const navigate = useRouter();
  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState('')
  const [fileName, setFileName] = useState('')
  const [desc, setDesc] = useState('')
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({ name: "" });

  const handleFileUpload = (event) => {
    console.log("file for upload selected...");
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };

  const uploadNFTContent = async (inputFile) => {
    //const { name } = formInput;
    const { description } = formInput;
    if (! description || !inputFile) return;

    const nftStorage = new NFTStorage({ token: APIKEY, });
    try {

      console.log("Trying to upload file to ipfs");
      setTxStatus("Uploading Item to decentralized storage.");
      console.log("close to metadata");
      const metaData = await nftStorage.store({
        name: inputFile.name,
        description: description,
        image: inputFile,
      });
      setMetaDataURl(metaData.url);
      console.log("metadata is: ", { metaData });

      console.log("description is:", description);
      setDesc(description);
  
      console.log("File Name is:", inputFile.name);
      setFileName(inputFile.name)
  
      console.log("File Size is:", inputFile.size);
      setFileSize(inputFile.size)
  
      console.log("About to upload file", inputFile)
      setFile(inputFile.size)
  
      console.log("Usestate Initialized>>>>>>>>>")

      return metaData;
    } catch (error) {
      setErrorMessage("Could store file to NFT.Storage - Aborted file upload.");
      console.log("Error Uploading Content", error);
    }
  };

  const sendTxToBlockchain = async (metadata) => {
    try {
      setTxStatus("Adding transaction to XDC Apothem Blockchain..");
      console.log("Adding transaction to  XDC Apothem Blockchain..");
      const file_descrip = metadata.data.description;
      const file_name =  metadata.data.name;
      const file_size = uploadedFile.size;

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      // const privatefile = formInput.privatefile.toString();

      const connectedContract = new ethers.Contract(fileShareAddress, fileNFT.abi, provider.getSigner());
      console.log("Connected to contract", fileShareAddress);
      console.log("IPFS blockchain uri is ", metadata.url);

      //const mintNFTTx = await connectedContract.createFile(metadata.url);
      const mintNFTTx = await connectedContract.createFile(metadata.url, file_name, file_descrip, file_size);
      console.log("File successfully created and added to Blockchain");
      await mintNFTTx.wait();
      return mintNFTTx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Apothem.");
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    console.log("getIPFSGatewayURL2 two is ...");
    const imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
    console.log("image ipfs path is", imgViewString);
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));
    setTxURL(`https://explorer.apothem.network/txs/${mintNFTTx.hash}`);
    setTxStatus("File addition was successfully!");
    console.log("File preview completed");
  };

  const mintNFTFile = async (e, uploadedFile) => {
    e.preventDefault();
    // 1. upload File content via NFT.storage
    const metaData = await uploadNFTContent(uploadedFile);

    // 2. Mint a NFT token on XDC Chain
    const mintNFTTx = await sendTxToBlockchain(metaData);

    // 3. preview the minted nft
   previewNFT(metaData, mintNFTTx);

    //4. Mint Reward
    // mintReward();

    //5. navigate("/explore");
    navigate.push('/explore');
  };

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    console.log("urlArray = ", urlArray);
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    console.log("ipfsGateWayURL = ", ipfsGateWayURL)
    return ipfsGateWayURL;
  };

  return (
    <Box as="section"  sx={styles.section}>
      <div className="bg-blue-100 text-center text-black text-xl font-bold pt-10 pb-2">
        <h1> Upload your news</h1>
      </div>
      <div className="flex justify-center bg-blue-100">
        
        <div className="w-1/2 flex flex-col pb-12 ">
          <label htmlFor='file' className='text-xl db mb1 text-left font-bold'>Description</label>
        <input
            placeholder="Brief Description"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput,  description: e.target.value })}
          />
          <br />

          <div className="MintNFT text-black text-xl">
            <form>
              <h3 className='text-xl db mb1 text-left font-bold'> Select a File</h3>
              <input type="file" onChange={handleFileUpload} className="text-black mt-2 border rounded"/>
            </form>
            {txStatus && <p>{txStatus}</p>}
            
            {metaDataURL && <p className="text-blue"><a href={metaDataURL} className="text-blue">Metadata on IPFS</a></p>}
            
            {txURL && <p><a href={txURL} className="text-blue">See the mint transaction</a></p>}
           
            {errorMessage}

            
            {imageView && (
            <iframe
              className="mb-10"
              title="File"
              src={imageView}
              alt="File preview"
              frameBorder="0"
              scrolling="auto"
              height="50%"
              width="100%"
            />
            )}

          </div>

          <button type="button" onClick={(e) => mintNFTFile(e, uploadedFile)} className="font-bold mt-20 bg-blue-900 text-white text-2xl rounded p-4 shadow-lg">
            Publish  News
          </button>
        </div>
      </div>
    </Box>

  );
};
export default MintFile;

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
};
