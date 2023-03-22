import { IPoweredByProps } from './PoweredByProps';
import styles from './PoweredBy.module.scss';
import { PoweredByElement } from './PoweredByElement';
export const PoweredBy: React.FC<IPoweredByProps> = () => {
  return (
    <div className={styles.container}>
      <h5 className={styles.h4}>Powered by</h5>
      <div className={styles.elements}>
        <PoweredByElement imageURL='/images/mantle.png' title='Mantle' />
        <PoweredByElement imageURL='/images/polygon.png' title='Polygon' />
        {/* <PoweredByElement imageURL='/images/polybase.jpeg' title='Polybase' /> */}
        <PoweredByElement imageURL='/images/graph.jpeg' title='Graph' />
        {/* <PoweredByElement imageURL='/images/filecoin.png' title='Filecoin' /> */}
        {/* <PoweredByElement imageURL='/images/connext.png' title='Connext' /> */}
      </div>
    </div>
  );
};
