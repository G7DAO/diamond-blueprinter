import cn from 'classnames';
import { IFacetPopupProps } from './FacetPopupProps';
import { Storage } from '../Storages';
import styles from './FacetPopup.module.scss';
import { IFacet, IMethod, IStoragaData } from '@/types';
import { useDiamondContext } from '@/contexts';
import { useEffect, useState } from 'react';
export const FacetPopup: React.FC<IFacetPopupProps> = () => {
  // const { name, storages, methods } = facet;
  const { hidePopup, popupData, updateFacet, selectedFacets, facets, updateSelectedFacets } =
    useDiamondContext();

  // console.log('popupData', popupData);

  const [facet, setFacet] = useState<IFacet | null>(null);
  const [selectedMethodNames, setSelectedMethodNames] = useState<IMethod['name'][]>([]);
  const [groupname, setGroupname] = useState<string | null>(null);

  const closeButtonHandler: React.MouseEventHandler = (event) => {
    event.preventDefault();
    hidePopup();
  };

  const editButtonHandler: React.MouseEventHandler = (event) => {
    event.preventDefault();
  };

  const saveButtonHandler: React.MouseEventHandler = (event) => {
    event.preventDefault();
    // console.log('save facet', facet);
    if (!facet) return;

    const updatedCurrentSelectedFacet: IFacet = {
      ...facet!,
      methods: facet.methods.filter((method) => selectedMethodNames.includes(method.name)),
    };
    // console.log(updatedCurrentSelectedFacet);
    // if (!!facet) updateFacet(facet);
    updateSelectedFacets(updatedCurrentSelectedFacet);
    hidePopup();
  };

  const clickMethodHandler =
    (method: IMethod): React.MouseEventHandler =>
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      // console.log(method);
      const selectedIndex = selectedMethodNames.indexOf(method.name);
      // console.log(selectedIndex);
      const updatedSelectedNames =
        selectedIndex >= 0
          ? selectedMethodNames.filter((name) => name !== method.name)
          : [...selectedMethodNames, method.name];
      setSelectedMethodNames(updatedSelectedNames);
    };

  useEffect(() => {
    if (!!popupData) {
      const currentFacet = facets.find((facet) => facet.address === popupData.facet.address);
      setFacet((prev) => (currentFacet ? { ...currentFacet } : prev));
      const currentFacetInSelectedMethodNames = selectedFacets
        .find((selectedFacet) => selectedFacet.address === popupData.facet.address)
        ?.methods.map((method) => method.name);
      setSelectedMethodNames((prev) =>
        currentFacetInSelectedMethodNames ? currentFacetInSelectedMethodNames : prev,
      );

      setGroupname(popupData.facet.group);
    }
  }, [popupData, facets, selectedFacets]);

  return (
    <div className={styles.container} onClick={() => hidePopup()}>
      <div className={styles.shade}></div>
      <div className={styles.dialog} onClick={(event) => event.stopPropagation()}>
        {popupData && (
          <div className={styles.contains}>
            <div className={styles.header}>
              <div className={styles.groupName}>{String(groupname)}</div>
              <div className={styles.facetName}>
                Facet name: <span>{facet?.name}</span>
              </div>
            </div>
            <div className={styles.storage}>
              <div className={styles.title}>
                {!!facet?.storages && facet.storages.length > 0
                  ? 'Storages using:'
                  : 'No storages in use'}
              </div>
              {!!facet?.storages && facet.storages.length > 0 && (
                <div className={styles.storages}>
                  {facet.storages.map((storage, index) => (
                    <Storage key={storage.name + index} {...storage} />
                  ))}
                </div>
              )}
            </div>
            <div className={styles.methods}>
              <div className={styles.title}>Methods</div>
              <div className={styles.methodsList}>
                {facet?.methods.map((method, index) => (
                  <div
                    className={styles.methodElement}
                    style={
                      selectedMethodNames?.includes(method.name)
                        ? { backgroundColor: `${method.color}`, color: 'white' }
                        : undefined
                    }
                    key={method.name + index}
                    onClick={clickMethodHandler(method)}
                  >
                    {method.name}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.code}>Code</div>
            <div className={styles.controls}>
              <button className={styles.button} onClick={closeButtonHandler}>
                Close
              </button>
              <button className={styles.button} onClick={editButtonHandler}>
                Edit
              </button>
              <button className={cn(styles.button, styles.close)} onClick={saveButtonHandler}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
