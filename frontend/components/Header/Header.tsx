/* eslint-disable @next/next/no-img-element */
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { IHeaderProps } from './HeaderProps';
import styles from './Header.module.scss';
import Link from 'next/link';
export const Header: React.FC<IHeaderProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href='/'>
          <div className={styles.logo}>
            <img src='/images/logo.png' alt='logo' />
            <div className={styles.title}>DIAMOND BluePrinter</div>
          </div>
        </Link>
        <div className={styles.connect}>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};
