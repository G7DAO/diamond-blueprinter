import './styles.css';
import { useEffect, useState } from 'react';
import FacetsList from '../FacetsList';
import FacetsHistory from '../FacetsHistory';
import axios from 'axios';
import { useAppState } from "../../context/appState";
import { API_URL } from '../../utils/constants';

// const demoFacet = {
//     facetName: 'DemoFacet',
//     facetAddr: '0x4dD955166E2d614dd30951b0b7D1788aeFbA02AB',
// }
const Dashboard = () => {
    const { setDiamondAddress, diamondAddress } = useAppState();
    const [facets, setFacets] = useState<any>([]);
    const [history, setHistory] = useState<any>([]);
    const [address, setAddress] = useState<string>("");
    useEffect(() => {
        if (diamondAddress) {
            setAddress(diamondAddress);
        }
    }, []);

    const handleSubmit = async () => {
        const result: any = await axios.post(`${API_URL}/get-diamond-info`, { "address": address });
        console.log(`result: ${JSON.stringify(result)}`);

        setFacets(result.data.facets);
        setHistory(result.data.history);
        setDiamondAddress(address);
    }

    return (
        <div className="dashboardContainer">
            <h1 className={"title"}>Dashboard</h1>
            <div className="dashboardInputContainer">
                <label className={"addressLabel"}>diamond address</label>
                <input className={"inputField addressInput"} value={address} placeholder={"address"} onChange={(e: any) => setAddress(e.target.value)} />
                <button className="buttonGeneric addressSubmit" onClick={handleSubmit}>inspect</button>
            </div>
            <div className="dashbaordBodyContainer">
                <FacetsList facets={facets} address={address} />  
                <FacetsHistory history={history} />
            </div>
        </div>
    )
}
export default Dashboard;