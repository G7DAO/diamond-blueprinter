import './styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import WalletButton from "./WalletButton";
import { useNavigate, useParams } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    let {landingView} = useParams();
    
    return (
        <nav className={'headerContent'}>
                <div className={'headerLeft'}>
                    <div onClick={() => navigate('/')}>
                        <p className={"headerTitle"}>Facets.wiki</p>
                    </div>
                    <img src={'/assets/facets-logo.svg'} alt={"logo"} className={"headerLogo"} />
                    <div className={"headerEthText"}>
                        <p>Ethereum Diamond Facets Library and Inspector</p>
                    </div>
                </div>
                <div className={'headerRight'}>
                    <button className={"headerButton"} onClick={() => navigate('/upload-facet')}>Upload</button>
                    <button className={"headerButton"} onClick={() => window.location.href = 'https://carlos-ramos.gitbook.io/facets-wiki/'}>Wiki</button>
                    <button className={"headerButton"} onClick={() => navigate('/dashboard')} >Dashboard</button>
                    <WalletButton />
                </div>
        </nav>
      
    )
}
export default Header;