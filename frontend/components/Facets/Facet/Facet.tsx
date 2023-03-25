import { IFacetProps } from './FacetProps';
import styles from './Facet.module.scss';
import Blockies from 'react-blockies';
import { useDiamondContext } from '@/contexts';
export const Facet: React.FC<IFacetProps> = ({
  name,
  methods,
  address,
  onClick,
  group,
  // selectedMethods,
}) => {
  const trunccatedAddress = address.slice(0, 5) + '...' + address.slice(-4);
  const { getSelectedFacetsMethodsNames } = useDiamondContext();

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.name}>{name}</div>
      <div className={styles.address}>
        <div className={styles.addressIcon}>
          <Blockies seed={!!address ? address : '0x00000000000'} size={8} scale={3} />
        </div>
        <div className={styles.addressString}></div>
        {trunccatedAddress}
      </div>
      <div className={styles.methods}>
        {methods.map((method) => (
          <div
            key={method.name + address}
            className={styles.method}
            style={
              getSelectedFacetsMethodsNames({ name, address, methods, group }).includes(method.name)
                ? { backgroundColor: `${method.color}`, color: 'white' }
                : undefined
            }
          ></div>
        ))}
      </div>
    </div>
  );
};
