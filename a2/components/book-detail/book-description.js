import Book from '../books/Book';
import classes from './book-description.module.css';

function BookContent(props) {
  return (
    <section className={classes.content}>
      {props.children}
    </section>
  );
}

export default BookContent;
