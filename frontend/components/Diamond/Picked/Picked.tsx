import Blockies from 'react-blockies';
import { IPickedProps } from './PickedProps';
import styles from './Picked.module.scss';
export const Picked: React.FC<IPickedProps> = ({ name, group, address, methods, onClick }) => {
  // console.log(methods);
  const trunccatedAddress = address.slice(0, 5) + '...' + address.slice(-4);
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.groupName}>{group ? group : 'Ungrouped'}</div>

      {name ? (
        <div className={styles.name}>{name}</div>
      ) : (
        <div className={styles.address}>
          <div className={styles.addressIcon}>
            <Blockies seed={!!address ? address : '0x00000000000'} size={8} scale={3} />
          </div>
          <div className={styles.addressString}></div>
          {trunccatedAddress}
        </div>
      )}
      <div className={styles.methods}>
        {methods.map((method, index) => (
          <div
            className={styles.method}
            key={method.name + address + index}
            style={{ color: `${method.color}` }}
          >
            {method.name}
          </div>
        ))}
      </div>
    </div>
  );
};
