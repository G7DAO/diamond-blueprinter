import './styles.css';
import { useState } from 'react';
import axios from 'axios';

const UploadFacet = () => {
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [ABI, setABI] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const handleSubmit = async () => {
        const result = await axios.post('https://shark-app-ciezx.ondigitalocean.app/add-facet', {
            name: title,
            description: desc,
            address,
            abi: ABI
            // name, src, address, description
        });
        console.log('result ->>>', JSON.stringify(result));
    }
    return (
        <div className="uploadFacet">
            <h1 className={"title"}>Upload a Facet</h1>
            <div className="uploadContainer">
                <label className={"label"} >title</label>
                <input className={"textInput titleInput"} onChange={(e: any) => setTitle(e.target.value)} placeholder={"title"}  />
                <label className={"label descriptionLabel"}>description</label>
                <input className={"textInput descriptionInput"} onChange={(e: any) => setDesc(e.target.value)} placeholder={"description"} />
                <label className={"label addressLabel"}>address</label>
                <input className={"textInput addressInput"} onChange={(e: any) => setAddress(e.target.value)} placeholder={"address"} />
                {/* <label className={"abiLabel"}>upload ABI</label>
                <input className={"abiInput"} placeholder={"Paste ABI code"} /> */}
                <label className={"label ABILabel"} >ABI code</label>
                <textarea rows={4} cols={50} className={"sourceInput"} placeholder={"Paste source code"} onChange={(e: any) => setABI(e.target.value)}></textarea>
                <button className={"buttonGeneric uploadSubmit"} onClick={handleSubmit}>submit</button>
            </div>
        </div>
    )
}
export default UploadFacet;