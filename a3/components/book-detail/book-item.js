import classes from './book-item.module.css';

function BookItem(props) {

  return (
    <li className={classes.item}>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default BookItem;
