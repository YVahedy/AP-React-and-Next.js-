import Link from 'next/link';
import BookItem from './book-item';
import classes from './book-PnR.module.css';
import Image from 'next/image';
function BookPnR(props) {

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/images/${props.id}.jpg`} alt={props.t} width={200} height={300} />
      </div>
      <ul className={classes.list}>
        <BookItem >
          <h3>By: <Link href={`/books/${props.id}/author`}>{props.author}</Link></h3>
        </BookItem>
        <BookItem >
          <h3>Price: ${props.price}</h3>
        </BookItem>
        <BookItem >
          <h3>Rating: {props.rating}</h3>
        </BookItem>
      </ul>
    </section>
  );
}

export default BookPnR;
