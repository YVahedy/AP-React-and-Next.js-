import { useRouter } from 'next/router';
import Button from '@/components/ui/button'; // Adjust the import path as needed
import styles from './main-header.module.css'; // Adjust the import path as needed

export default function MainHeader() {
    const router = useRouter();

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
        </header>
    );
}