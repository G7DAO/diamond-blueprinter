import './styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletButton = () => {
    return (
        <div className={"connect-button"}>
            <ConnectButton showBalance={true} chainStatus={"name"} />
        </div>
    )
}

export default WalletButton;