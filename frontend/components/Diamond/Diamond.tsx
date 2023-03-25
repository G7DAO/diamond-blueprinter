/* eslint-disable @next/next/no-img-element */
import { IDiamondProps } from './DiamondProps';
import styles from './Diamond.module.scss';
import { Picked } from './Picked';
import { IFacet, IMethod, IPickedElement } from '@/types';
import { useDiamondContext } from '@/contexts';
import { useEffect, useState } from 'react';
export const Diamond: React.FC<IDiamondProps> = () => {
  // const pickedElems: IPickedElement[] = [
  //   {
  //     groupName: 'Movement',
  //     name: 'Simple',
  //     address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
  //     methods: [
  //       { name: 'method1', color: 'red' },
  //       { name: 'method2', color: 'green' },
  //     ],
  //   },
  //   {
  //     groupName: 'Craft',
  //     name: 'MinecraftLike',
  //     address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
  //     methods: [
  //       { name: 'method1', color: 'red' },
  //       { name: 'method2', color: 'green' },
  //     ],
  //   },
  //   {
  //     groupName: null,
  //     name: null,
  //     address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
  //     methods: [
  //       { name: 'method1', color: 'red' },
  //       { name: 'method2', color: 'green' },
  //     ],
  //   },
  // ];

  const { cuttedFacets, selectedFacets, showPopup } = useDiamondContext();
  // const [facets, setFacets] = useState<IFacet[]>([]);
  // const pickedElems: any = [];

  const clickFacetHandler =
    (facet: IFacet): React.MouseEventHandler =>
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      showPopup({ facet });
    };

  // useEffect(() => {
  //   console.log('cuttedFacets', cuttedFacets);
  //   console.log('selectedFacets', selectedFacets);
  //   const selectedFacesAddress = selectedFacets.map((facet) => facet.address);
  //   const mappedFacets = cuttedFacets.map((facet) => {
  //     const inSelected = selectedFacets.find(
  //       (selectedFacet) => selectedFacet.address === facet.address,
  //     );
  //     if (inSelected) {
  //       const combinedMethod = [...facet.methods, ...inSelected.methods].reduce<IMethod[]>(
  //         (acc, val) => {
  //           if (acc.find((el) => el.name === val.name)) return acc;
  //           acc.push(val);
  //           return acc;
  //         },
  //         [],
  //       );
  //       // console.log(combinedMethod);
  //       return { ...facet, methods: combinedMethod };
  //     }
  //     return facet;
  //   });
  //   console.log(mappedFacets);
  //   setFacets(mappedFacets);
  // }, [cuttedFacets, selectedFacets]);
  // console.log('diamond', selectedFacets);

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Diamond</h2>
      <div className={styles.contains}>
        <div className={styles.diamonBlock}>
          <div className={styles.background}>
            <img className={styles.img} src='/images/full-diamond.png' alt='half-diamond'></img>
          </div>

          <div className={styles.picked}>
            {/* {!!facets && pickedElems.length > 0 && <h3 className={styles.h3}>Picked</h3>} */}
            {!!selectedFacets && selectedFacets.length > 0 && (
              <div className={styles.pickedElements}>
                {selectedFacets.map((facet, index) => (
                  <Picked key={index} {...facet} onClick={clickFacetHandler(facet)} />
                ))}
              </div>
            )}
            {/* {!pickedElems ||
              (pickedElems.length === 0 && (
                <div className={styles.empty}>
                  Your diamond has no facets yet. choose what you like on the side and start
                  building a beautiful and correct dream code!
                </div>

              ))} */}

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
