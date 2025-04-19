import GenreList from "@/components/genres/GenreList";

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
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`);
    if (!res.ok) {
      throw new Error('Failed to fetch genres');
    }
    const genres = await res.json();

    return {
      props: {
        genres,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        genres: [],
      },
    };
  }
}