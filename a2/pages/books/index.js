import { getAllBooks, getAllGenres } from "@/Data";
import BookList from "@/components/books/BookList";
import BookSearch from "@/components/books/BookSearch";

export default function FeaturedBooksPage(props) {
  const { books, genres } = props;
  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>All Books</h1>
      <BookSearch genres={genres} />
      <BookList list={books} />
    </div>
  );
}

export async function getStaticProps() {
  const books = await getAllBooks();
  const genres = await getAllGenres();
  return {
    props: {
      books,
      genres,
    },
    revalidate: 600,
  };
}