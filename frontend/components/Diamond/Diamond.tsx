import { IDiamondProps } from './DiamondProps';
import styles from './Diamond.module.scss';
export const Diamond: React.FC<IDiamondProps> = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Diamond</h2>
    </div>
  );
};
