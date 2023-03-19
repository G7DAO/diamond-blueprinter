import { IDeployButtonProps } from './DeployButtonProps';
import styles from './DeployButton.module.scss';
export const DeployButton: React.FC<IDeployButtonProps> = ({ onClick, deploying }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick} disabled={deploying}>
        {deploying ? 'Deploying...' : 'Deploy Contract'}
      </button>
    </div>
  );
};
