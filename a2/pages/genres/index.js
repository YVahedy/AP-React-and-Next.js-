import GenreList from "@/components/genres/GenreList";
import { getAllGenres } from "@/Data";

export default function AllGenresPage(props) {
  const { genres } = props;
  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>All Genres</h1>
      <GenreList list={genres} />
    </div>
  );
}

export async function getServerSideProps() {
  const genres = await getAllGenres();

  return {
    props: {
      genres,
    },
  };
}