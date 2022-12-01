import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import "./style.css";
import { useSigner } from 'wagmi'
import { useAppState } from "../../context/appState";
import { ethers } from 'ethers';

const FacetDetail = () => {
  const { data: signer, isError, isLoading } = useSigner();
  const { diamondAddress } = useAppState();
  const [selectors, setSelectors] = useState<any>([]);
  const [facetName, setFacetName] = useState<string>("");
  const { facetAddress } = useParams()
  useEffect(() => {
    facetAddress && fetchDetails(facetAddress);
  }, []);
  console.log('diamondAddress: ', diamondAddress);
  const fetchDetails = async (addr: string) => {
    const result = await axios.post(`${API_URL}/get-facet-selectors`, { facetAddr: addr });
    console.log('result ', JSON.stringify(result.data));
    setSelectors(result.data.selectors);
    if (result.data.selectors.length > 0) {
      setFacetName(result.data.selectors[0].facetName);
    }
  }
  const addFunction = async (funcName: string) => {
    // const diamondAddress = prompt("please enter your diamond address") || "";
    console.log('functionNames ', funcName, facetAddress, diamondAddress);
    const result = await axios.post(`${API_URL}/update-diamond`, {
      funcList: [funcName],
      action: 'add',
      facetAddr: facetAddress
    });
    console.log('post result: ', JSON.stringify(result.data));

    const response = await signer?.sendTransaction(
      {
        data: result.data.payload,
        to: diamondAddress,
        gasLimit: '1000000'
      }
    );
    console.log('response: ', response);

  }
  const addFacet = async () => {
    const functionNames = selectors.map((s: any) => s.functionName);
    // const diamondAddress = prompt("please enter your diamond address") || "";
    console.log('functionNames ', functionNames, facetAddress, diamondAddress);
    const result = await axios.post(`${API_URL}/update-diamond`, {
      funcList: functionNames,
      action: 'add',
      facetAddr: facetAddress
    });
    console.log('post result: ', JSON.stringify(result.data));

    const txCount = await signer?.getTransactionCount();
    console.log('txCount ', txCount);
    const response = await signer?.sendTransaction(
      {
        data: result.data.payload,
        to: diamondAddress,
        gasLimit: '1000000',
        nonce: ethers.utils.hexlify(txCount!),
      }
    );
    console.log('response: ', response);
  }

  console.log('facetAddress ', facetAddress);
  return (
    <div className="facetDetailContainer">
      <div className="facetDetail">
        <div className="facetDetailHeading">
          <h2 className="facetTitle">{facetName}</h2>
          <div className="facetAddr">{facetAddress}</div>
          <button className="buttonGeneric selectorAdd" onClick={() => addFacet()}>add facet</button>
        </div>
        <div className="selectorsList">
          {selectors.map((select: any, i: number) => (
            <div className="selectorsRow" key={i}>
              <div className="selectorsLeft">
                <div className="functionName">
                  {select.functionName}
                </div>  
                <div className="selectorName">
                  {select.selector}
                </div> 
              </div> 
              <button className="buttonGeneric selectorAdd" onClick={() => addFunction(select.functionName)}>add</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FacetDetail; 