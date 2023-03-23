import { IStoragesProps } from './StoragesProps';
import styles from './Storages.module.scss';
import { Storage } from './Storage/Storage';
import { IStoragaData } from '@/types';
export const Storages: React.FC<IStoragesProps> = () => {
  const storages: IStoragaData[] = [
    {
      logo: '📦',
      name: 'Smashcraft.Backpack.Storage',
      description: '💠 Simple(Movement)',
    },
    {
      logo: '🧭',
      name: 'Smashcraft.Worldmap.Storage',
      description: '💠 Simple(Movement)',
    },
    {
      logo: '📦',
      name: 'Smashcraft.CraftReceipt.Storage',
      description: '💠 Simple(Movement)',
    },
  ];
  
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Storages</h2>
      <div className={styles.storages}>
        {storages.map((data) => (
          <Storage key={data.name} {...data} />
        ))}
      </div>
    </div>
  );
};
