import { IFacetsProps } from './FacetsProps';
import styles from './Facets.module.scss';
import { Facet } from './Facet/Facet';
import { FacetGroups } from './FacetGroups';
import { IFacetGroup } from '@/types';
import { useDiamondContext } from '@/contexts';
export const Facets: React.FC<IFacetsProps> = () => {
  const { facets } = useDiamondContext();

  const groupIconsMap: { [id: string]: string } = {
    craft: '🛠',
    movement: '🚶‍♂️️',
    fight: '⚔️️️',
    map: '🗺️',
  };

  const groupedFacets: IFacetGroup[] = facets.reduce<IFacetGroup[]>((acc, val) => {
    const group = acc.find((group) => group.name === val.group);
    if (!group) {
      acc.push({
        name: val.group ? val.group : 'Ungrouped',
        facets: [val],
        icon: groupIconsMap[String(val.group).toLowerCase()]
          ? groupIconsMap[String(val.group).toLowerCase()]
          : '🇯🇲',
      });
    } else {
      group.facets.push(val);
    }

    return acc;
  }, []);
  const addNewFacetHandler: React.MouseEventHandler = () => {};

  const clickFacetHandler: React.MouseEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2 className={styles.h2}>Facets</h2>
        <div className={styles.addNew}>
          <button onClick={addNewFacetHandler}>Add New</button>
        </div>
      </div>
      <div className={styles.facets}>
        {groupedFacets.map((facetGroup, index) => (
          <FacetGroups key={index} {...facetGroup} />
        ))}
      </div>
    </div>
  );
};
