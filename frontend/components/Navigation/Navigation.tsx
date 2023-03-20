import cn from 'classnames';
import { INavigationProps } from './NavigationProps';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import { useState } from 'react';
export const Navigation: React.FC<INavigationProps> = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuToggler = () => setShowMenu(!showMenu);
  return (
    <div className={styles.container}>
      <ul className={cn(styles.list, showMenu ? styles.dropdown : null)}>
        <li className={styles.listElement}>
          <Link href='/'>Discord</Link>
        </li>
        <li className={styles.listElement}>
          <Link href='/'>Team</Link>
        </li>
        <li className={styles.listElement}>
          <Link href='/'>Git</Link>
        </li>
        <li className={styles.listElement}>
          <Link href='/'>Demo</Link>
        </li>
      </ul>
      <div className={cn(styles.menu, showMenu ? styles.activated : null)} onClick={menuToggler}>
        <div className={styles.bar}></div>
      </div>
    </div>
  );
};
