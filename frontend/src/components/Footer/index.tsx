import './styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import {Text} from "@chakra-ui/react";
import DarkMode from "../../DarkMode";


const Footer = () => {
    return (
        <>
            <nav className={'footerContent'}>
                <div className="footerInner">
                    <div className={"contentLeft"}>
                        <Text>Facet.wiki</Text>
                        <DarkMode/>
                    </div>
                    <div className="contentRight">
                        <a href='#'><img src={'/assets/TwitterLogo.svg'} /></a>
                        <a href='#'><img alt={"discord"} src={'/assets/DiscordLogo.svg'} /></a>
                        <a href='#'><img src={'/assets/telegram.svg'} /></a>
                        <a href='https://github.com/jrcarlos2000/eth-vietnam-frontend'><img src={'/assets/github.svg'} /></a>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Footer