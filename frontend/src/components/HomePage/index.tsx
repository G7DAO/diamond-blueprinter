
import './styles.css';
import UploadFacet from "../UploadFacet";
import FacetsTable from '../FacetsTable/index';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [facets, setFacets] = useState<any>([]);
    useEffect(() => {
        loadFacets();
    }, []);

    const loadFacets = async () => {
        const result = await axios.get('https://shark-app-ciezx.ondigitalocean.app/facets');
        console.log(`resutl: ${JSON.stringify(result.data.facets)}`);
        
        setFacets(result?.data?.facets);
    }

    return (
        <div className="homeContainer">
            <div className="leaderboardContainer">
               <FacetsTable data={facets} />
            </div>
            <div className={"searchContainer"}>
                <h3 className={"aboveFieldText"}>Search for Facets</h3>
                <input className={"inputField inputField--keyword"} placeholder={"Keyword"} />
                <h3 className={"aboveFieldText2"}>Facets visualizers</h3>
                <input className={"inputField inputField--address"} placeholder={"Enter address"}  />
            </div>
        </div>
    )
}
export default HomePage;