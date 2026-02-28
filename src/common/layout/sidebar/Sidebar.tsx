import { Link, NavLink, useLocation } from 'react-router';
import styles from './Sidebar.module.scss';
import { ROUTES } from '@/constants/routes';

import HomeIcon from '@mui/icons-material/Home';
import RoomIcon from '@mui/icons-material/Room';
import LogoutIcon from '@mui/icons-material/Logout';
import { Backdrop, Typography } from '@mui/material';
import classNames from 'classnames';

import logo from '@/assets/logo.svg';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useSidebar } from '@/common/hooks/useSidebar';
import { useEffect, useRef } from 'react';

const links = [
  {
    id: 1,
    icon: <HomeIcon />,
    label: 'Home',
    path: ROUTES.ORDERS,
  },
  {
    id: 2,
    icon: <RoomIcon />,
    label: 'Map',
    path: ROUTES.ORDERS_MAP,
  },
];

export function Sidebar() {
  const { logout } = useAuth();
  const { close, isOpen } = useSidebar();
  const location = useLocation();

  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current && isOpen) {
      close();
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname, isOpen, close]);

  return (
    <>
      {isOpen && (
        <Backdrop
          open={isOpen}
          onClick={close}
          sx={{
            zIndex: 100,
            display: {
              md: 'none',
              xs: 'block',
            },
          }}
        />
      )}

      <aside
        className={classNames(styles.sidebar, {
          [styles.activeSidebar]: isOpen,
        })}
      >
        <div className={styles.content}>
          <Link to={ROUTES.HOME} className={styles.logo}>
            <img src={logo} alt="Logo" />
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {links.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      classNames(styles.link, {
                        [styles.activeLink]: isActive,
                      })
                    }
                  >
                    {item.icon}
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      className={styles.linkText}
                    >
                      {item.label}
                    </Typography>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={classNames(styles.logoutBtn, styles.link)}
            onClick={logout}
          >
            <LogoutIcon />
            <Typography
              variant="body2"
              className={styles.linkText}
              fontWeight={500}
            >
              Logout
            </Typography>
          </button>
        </div>
      </aside>
    </>
  );
}
