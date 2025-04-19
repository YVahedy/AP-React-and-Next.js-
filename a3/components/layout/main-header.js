import { useRouter } from 'next/router';
import Button from '@/components/ui/button'; // Adjust the import path as needed
import styles from './main-header.module.css'; // Adjust the import path as needed
import { useAuth } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';
// import Button from '@mui/material/Button';

export default function MainHeader() {
    const router = useRouter();
    const { user, login, logout } = useAuth();
    const { mode, toggleTheme } = useThemeContext();

    const navigateTo = (path) => {
        router.push(path);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Button onClick={() => navigateTo('/')}>Home</Button>
            </div>
            <div className={styles.logo}>
                <Button onClick={() => navigateTo('/books')}>Books</Button>
            </div>
            <div className={styles.logo}>
                <Button onClick={() => navigateTo('/authors')}>Authors</Button>
            </div>
            <div className={styles.logo}>
                <Button onClick={() => navigateTo('/genres')}>Genres</Button>
            </div>
            <div className={styles.logo}>
                <Button onClick={() => navigateTo('/info')}>Info</Button>
            </div>
            <div className={styles.logo}>
                {user ? (
                    <Button onClick={logout}>Logout</Button>
                ) : (
                    <Button onClick={() => navigateTo('/login')}>Login</Button>
                )}
            </div>
            <div className={styles.logo}>
                <Button onClick={toggleTheme}>
                    {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>
            </div>
        </header>
    );
}




