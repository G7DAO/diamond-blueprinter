import { IFacetsProps } from './FacetsProps';
import styles from './Facets.module.scss';
import { Facet } from './Facet/Facet';
import { FacetGroups } from './FacetGroups';
import { IFacetGroup } from '@/types';
export const Facets: React.FC<IFacetsProps> = () => {
  const facetGroups: IFacetGroup[] = [
    {
      icon: '🛠',
      name: 'Craft',
      facets: [
        {
          name: 'NOP - everything disallowed',
          address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
          methods: [
            { name: 'method1', color: 'red' },
            { name: 'method2', color: 'blue' },
            { name: 'method3', color: 'green' },
          ],
        },
        {
          name: 'Simple',
          address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
          methods: [
            { name: 'method1', color: 'red' },
            { name: 'method2', color: 'blue' },
          ],
        },
        {
          name: 'NOP - everything disallowed',
          address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
          methods: [
            { name: 'method1', color: 'red' },
            { name: 'method2', color: 'blue' },
            { name: 'method3', color: 'green' },
          ],
        },
        {
          name: 'MinecraftLike',
          address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
          methods: [
            { name: 'method1', color: 'red' },
            { name: 'method2', color: 'blue' },
            { name: 'method3', color: 'green' },
          ],
        },
        {
          name: 'NOP - everything disallowed',
          address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
          methods: [
            { name: 'method1', color: 'red' },
            { name: 'method2', color: 'blue' },
            { name: 'method3', color: 'green' },
          ],
        },
      ],
    },
    {
      icon: '🚶‍♂️️',
      name: 'Movement',
      facets: [
        {
          name: 'NOP - everything disallowed',
          address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
          methods: [],
        },
        {
          name: 'MinecraftLike',
          address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
          methods: [],
        },
        {
          name: 'NOP - everything disallowed',
          address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
          methods: [],
        },
      ],
    },
    {
      icon: '⚔️️️',
      name: 'Fight',
      facets: [
        {
          name: 'NOP - everything disallowed',
          address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
          methods: [],
        },
        {
          name: 'MinecraftLike',
          address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
          methods: [],
        },
        {
          name: 'NOP - everything disallowed',
          address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
          methods: [],
        },
      ],
    },
    {
      icon: '🗺️',
      name: 'Maps',
      facets: [
        {
          name: 'NOP - everything disallowed',
          address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
          methods: [],
        },
        {
          name: 'MinecraftLike',
          address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
          methods: [],
        },
        {
          name: 'NOP - everything disallowed',
          address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
          methods: [],
        },
      ],
    },
  ];
  const addNewFacetHandler: React.MouseEventHandler = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2 className={styles.h2}>Facets</h2>
        <div className={styles.addNew}>
          <button onClick={addNewFacetHandler}>Add New</button>
        </div>
      </div>
      <div className={styles.facets}>
        {facetGroups.map((facetGroup, index) => (
          <FacetGroups key={index} {...facetGroup} />
        ))}
      </div>
    </div>
  );
};
