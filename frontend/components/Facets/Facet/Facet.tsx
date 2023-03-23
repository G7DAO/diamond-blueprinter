import { IFacetProps } from './FacetProps';
import styles from './Facet.module.scss';
import Blockies from 'react-blockies';
export const Facet: React.FC<IFacetProps> = ({ name, methods, address }) => {
  const trunccatedAddress = address.slice(0, 5) + '...' + address.slice(-4);

  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      <div className={styles.address}>
        <div className={styles.addressIcon}>
          <Blockies
            seed={!!address ? address : '0x00000000000'}
            size={8}
            scale={3}
          />
        </div>
        <div className={styles.addressString}></div>
        {trunccatedAddress}
      </div>
      <div className={styles.methods}>
        {methods.map((method) => (
          <div
            key={method.name + address}
            className={styles.method}
            style={{ backgroundColor: `${method.color}` }}
          ></div>
        ))}
      </div>
    </div>
  );
};
