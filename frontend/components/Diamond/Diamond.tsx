/* eslint-disable @next/next/no-img-element */
import { IDiamondProps } from './DiamondProps';
import styles from './Diamond.module.scss';
import { Picked } from './Picked';
import { IPickedElement } from '@/types';
export const Diamond: React.FC<IDiamondProps> = () => {
  const pickedElems: IPickedElement[] = [
    {
      groupName: 'Movement',
      name: 'Simple',
      address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
      methods: [
        { name: 'method1', color: 'red' },
        { name: 'method2', color: 'green' },
      ],
    },
    {
      groupName: 'Craft',
      name: 'MinecraftLike',
      address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
      methods: [
        { name: 'method1', color: 'red' },
        { name: 'method2', color: 'green' },
      ],
    },
    {
      groupName: null,
      name: null,
      address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
      methods: [
        { name: 'method1', color: 'red' },
        { name: 'method2', color: 'green' },
      ],
    }
  ];
  // const pickedElems: any = [];
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Diamond</h2>
      <div className={styles.contains}>
        <div className={styles.diamonBlock}>
          <div className={styles.background}>
            <img className={styles.img} src='/images/full-diamond.png' alt='half-diamond'></img>
          </div>

          <div className={styles.picked}>
            {!!pickedElems && pickedElems.length > 0 && <h3 className={styles.h3}>Picked</h3>}
            {!!pickedElems && pickedElems.length > 0 && (
              <div className={styles.pickedElements}>
                {pickedElems.map((picked, index) => (
                  <Picked key={index} {...picked} />
                ))}
              </div>
            )}
            {!pickedElems ||
              (pickedElems.length === 0 && (
                <div className={styles.empty}>
                  Your diamond has no facets yet. choose what you like on the side and start
                  building a beautiful and correct dream code!
                </div>
              ))}
          </div>
        </div>
        <div className={styles.cutButton}>
          <button>Cut</button>
        </div>
        <div className={styles.zipButton}>
          <button>Download ZIP</button>
        </div>
      </div>
    </div>
  );
};
