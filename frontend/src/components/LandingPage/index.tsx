import './styles.css';
import {useNavigate} from "react-router-dom";


const LandingPage = () => {const navigate = useNavigate();
    return (
        <div className='container'>
            <img alt={"logo"} src={'/assets/facets-logo.svg'} className='logo'/>
            <div className='center-body-text'>
                Best developer tools to manage and modularize your smart contracts. 
            </div>
            <div className='button-container'>
                <button onClick={() => navigate('/')} className={"button"}>Launch App</button>
            </div>
        </div>
    )
}

export default LandingPage;