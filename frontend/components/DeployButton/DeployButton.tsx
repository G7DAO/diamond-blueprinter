import { IDeployButtonProps } from './DeployButtonProps';
import styles from './DeployButton.module.scss';
export const DeployButton: React.FC<IDeployButtonProps> = () => {
  return <div className={styles.container}>Deploy Contract</div>;
};
