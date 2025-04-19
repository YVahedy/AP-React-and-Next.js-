import Genre from "./Genre";
import styles from './GenreList.module.css';

export default function GenreList(props) {
    const genres = props.list || [];

    return (
        <div>
          <ul className={styles.list}>
            {Array.isArray(genres) && genres.map(genre => {
              if (genre.name!=undefined){
                return <Genre key={genre.id} id={genre.id} n={genre.name}/>
              }
            })}
          </ul>
        </div>
    );
}