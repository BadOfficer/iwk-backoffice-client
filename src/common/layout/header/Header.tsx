import styles from './Header.module.scss';

import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router';

import logo from '@/assets/logo.svg';
import { Container, IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSidebar } from '@/common/hooks/useSidebar';

export function Header() {
  const { isOpen, toggle } = useSidebar();

  return (
    <header className={styles.header}>
      <Container className={styles.contentWrapper}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <img src={logo} alt="Logo" />
        </Link>
        <IconButton onClick={toggle}>
          {isOpen ? (
            <CloseIcon className={styles.menuBtnIcon} />
          ) : (
            <MenuIcon className={styles.menuBtnIcon} />
          )}
        </IconButton>
      </Container>
    </header>
  );
}
