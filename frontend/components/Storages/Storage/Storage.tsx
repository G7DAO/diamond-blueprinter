import { IStorageProps } from './StorageProps';
import styles from './Storage.module.scss';
export const Storage: React.FC<IStorageProps> = ({ logo, name, description }) => {
  console.log(logo, name, description);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>{logo}</div>
      <div className={styles.contains}>
        <div className={styles.name}>{name}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
    </div>
  );
};
