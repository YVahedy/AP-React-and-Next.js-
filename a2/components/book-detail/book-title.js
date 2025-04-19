import classes from './book-title.module.css';

function BookTitle(props) {


  return (
    <section className={classes.summary}>
      <h1>{props.title}</h1>
    </section>
  );
}

export default BookTitle;