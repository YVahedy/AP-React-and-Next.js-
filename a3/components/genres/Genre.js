import Link from "next/link";
import styles from './Genre.module.css';
import Button from "../ui/button";

export default function Genre(props) {
    return (
        <li className={styles.item}>
            <div className={styles.content}>
                <h2>{props.n}</h2>
            </div>
            <div className={styles.actions}>
                 <Button link={'/genres/'+props.id}>Books</Button>
            </div>
       </li>
      
    );
  }