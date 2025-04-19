import { useState, useEffect } from 'react';
import BookList from "@/components/books/BookList";
import BookSearch from "@/components/books/BookSearch";
import { useAuth } from '../../context/AuthContext';

export default function AllBooksPage(props) {
  const { books, genres } = props;
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState(books);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (user) {
      const storedSearches = localStorage.getItem('recentSearches');
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    }
  }, [user]);

  const handleSearch = async (query, genreId) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/books/search?query=${query}`;
    if (genreId) {
      url += `&genre=${genreId}`;
    }
    const res = await fetch(url);
    if (res.ok) {
      const results = await res.json();
      setSearchResults(results);

      if (user) {
        const updatedSearches = [query, ...recentSearches.filter(search => search !== query)].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>All Books</h1>
      <BookSearch genres={genres} onSearch={handleSearch} />
      {user && recentSearches.length > 0 && (
        <div>
          <h2>Recent Searches</h2>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index}>{search}</li>
            ))}
          </ul>
        </div>
      )}
      <BookList list={searchResults} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const booksRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`);
    const genresRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`);

    if (!booksRes.ok || !genresRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const books = await booksRes.json();
    const genres = await genresRes.json();

    return {
      props: {
        books,
        genres,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        books: [],
        genres: [],
      },
    };
  }
}