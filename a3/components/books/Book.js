import Link from "next/link";
import styles from './Book.module.css';
import Button from "../ui/button";
import Image from 'next/image';
export default function Book(props) {
    return (
        <li className={styles.item}>
        <Image src={'/images/'+props.id+'.jpg'} alt={props.t} width={200} height={300}/>
            <div className={styles.content}>
                <div className={styles.summary}>
                    <h2>{props.t}</h2>
                </div>
                
                <div className={styles.date}>
                    <h3>Price: ${props.p}</h3>
                </div>
                <div className={styles.address}>
                    <h3>Rating: {props.r}</h3>
                </div>
            </div>
            <div className={styles.actions}>
                 <Button link={'/books/'+props.id}>Details</Button>
            </div>
       </li>
      
    );
  }