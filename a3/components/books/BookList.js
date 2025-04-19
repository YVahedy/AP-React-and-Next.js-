import Book from "./Book";
import styles from './BookList.module.css';

export default function BookList(props) {
    const books = props.list || []; // Default to an empty array if props.list is undefined or null

    return (
        <div>
          <ul className={styles.list}>
            {Array.isArray(books) && books.map(book => {
              if (book.title!=undefined)
               {return <Book key={book.id} id={book.id} t={book.title} p={book.price} r={book.rating} />}
            })}
          </ul>
        </div>
    );
}