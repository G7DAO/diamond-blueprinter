import cn from 'classnames';
import { IDeployButtonProps } from './DeployButtonProps';
import styles from './DeployButton.module.scss';
export const DeployButton: React.FC<IDeployButtonProps> = ({ onClick, deploying, error }) => {
  
  return (
    <div className={styles.container}>
      <button
        className={cn(styles.button, error ? styles.error : null)}
        onClick={onClick}
        disabled={deploying}
      >
        <div className={styles.background}></div>
        <span className={styles.title}>
          {error && (
            <span className={styles.error}>
              Something went wrong, please check your transaction
            </span>
          )}
          {!error &&
            (deploying ? (
              <span className={styles.diamond}>Deploying...</span>
            ) : (
              <span>
                Make your <span className={styles.diamond}>diamond</span>
              </span>
            ))}
        </span>
      </button>
    </div>
  );
};
