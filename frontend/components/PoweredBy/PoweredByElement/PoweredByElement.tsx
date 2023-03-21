/* eslint-disable @next/next/no-img-element */
import { IPoweredByElementProps } from './PoweredByElementProps';
import styles from './PoweredByElement.module.scss';
export const PoweredByElement: React.FC<IPoweredByElementProps> = ({ imageURL, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={imageURL} alt='logo' />
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
