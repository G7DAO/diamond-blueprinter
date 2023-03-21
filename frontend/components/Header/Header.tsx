/* eslint-disable @next/next/no-img-element */
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { IHeaderProps } from './HeaderProps';
import styles from './Header.module.scss';
import Link from 'next/link';
import { Navigation } from '../Navigation';

export const Header: React.FC<IHeaderProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link href='/'>
            <img src='/images/logo.png' alt='logo' />
          </Link>
        </div>
        <div className={styles.connect}>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};
