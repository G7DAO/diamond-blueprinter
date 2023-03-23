import { IFacetGroupsProps } from './FacetGroupsProps';
import styles from './FacetGroups.module.scss';
import { Facet } from '../Facet/Facet';
export const FacetGroups: React.FC<IFacetGroupsProps> = ({ facets, icon, name }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.contains}>
        <div className={styles.title}>{name}</div>
        <div className={styles.facets}>
          {facets.map((facet, index) => (
            <Facet key={index} {...facet} />
          ))}
        </div>
      </div>
    </div>
  );
};
