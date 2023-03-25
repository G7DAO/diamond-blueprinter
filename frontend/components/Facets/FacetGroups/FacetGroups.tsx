import { IFacetGroupsProps } from './FacetGroupsProps';
import styles from './FacetGroups.module.scss';
import { Facet } from '../Facet/Facet';
import { useDiamondContext } from '@/contexts';
import { IFacet } from '@/types';
export const FacetGroups: React.FC<IFacetGroupsProps> = ({ facets, icon, name }) => {
  const { showPopup } = useDiamondContext();
  const clickFacetHandler =
    (facet: IFacet): React.MouseEventHandler =>
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      showPopup({ facet });
    };
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.contains}>
        <div className={styles.title}>{name}</div>
        <div className={styles.facets}>
          {facets.map((facet, index) => (
            <Facet key={index} {...facet} onClick={clickFacetHandler(facet)} />
          ))}
        </div>
      </div>
    </div>
  );
};
