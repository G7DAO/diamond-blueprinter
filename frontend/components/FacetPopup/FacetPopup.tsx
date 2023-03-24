import cn from 'classnames';
import { IFacetPopupProps } from './FacetPopupProps';
import { Storage } from '../Storages';
import styles from './FacetPopup.module.scss';
import { IFacet, IStoragaData } from '@/types';
import { group } from 'console';
import classNames from 'classnames';
export const FacetPopup: React.FC<IFacetPopupProps> = ({ facet, groupName }) => {


  const { name, storages, methods } = facet;

  return (
    <div className={styles.container}>
      <div className={styles.shade}></div>
      <div className={styles.dialog}>
        <div className={styles.contains}>
          <div className={styles.header}>
            <div className={styles.groupName}>{groupName}</div>
            <div className={styles.facetName}>
              Facet name: <span>{name}</span>
            </div>
          </div>
          <div className={styles.storage}>
            <div className={styles.title}>
              {!!storages && storages.length > 0 ? 'Storages using:' : 'No storages in use'}
            </div>
            {storages && storages.length > 0 && (
              <div className={styles.storages}>
                {storages.map((storage, index) => (
                  <Storage key={storage.name + index} {...storage} />
                ))}
              </div>
            )}
          </div>
          <div className={styles.methods}>
            <div className={styles.title}>Methods</div>
            <div className={styles.methodsList}>
              {methods.map((method, index) => (
                <div
                  className={styles.methodElement}
                  style={{ backgroundColor: `${method.color}`, color: 'white' }}
                  key={method.name + index}
                >
                  {method.name}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.code}>Code</div>
          <div className={styles.controls}>
            <button className={styles.button}>Close</button>
            <button className={styles.button}>Edit</button>
            <button className={cn(styles.button, styles.close)}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};
