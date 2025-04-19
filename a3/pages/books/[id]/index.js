import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import BookTitle from '@/components/book-detail/book-title';
import BookPnR from '@/components/book-detail/book-PnR';
import BookContent from '@/components/book-detail/book-description';
import ReviewList from '@/components/reviews/ReviewList';
import ReviewForm from '@/components/reviews/ReviewForm';

export default function DetailedBookPage({ book, author, reviews }) {
  const router = useRouter();
  const { user } = useAuth();
  const [reviewList, setReviewList] = useState(reviews);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>No book found!</p>;
  }

  const handleAddReview = async (review) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const res = await fetch(`/api/books/${book.id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(review),
    });
    if (res.ok) {
      const newReview = await res.json();
      setReviewList((prevReviews) => [...prevReviews, newReview]);
    } else {
      alert('Failed to add review');
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>Detailed Book Page</h1>
      <BookTitle title={book.title} />
      <BookPnR author={author ? author.name : "Unknown"} price={book.price} rating={book.rating} id={book.id} t={book.title} />
      <BookContent>
        <p>{book.description}</p>
      </BookContent>
      {author && (
        <Link href={`/authors/${author.id}`}>
          More about {author.name}
        </Link>
      )}
      <ReviewList reviews={reviewList} />
      {user && <ReviewForm onAddReview={handleAddReview} />}
    </div>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  try {
    const bookRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${params.id}`);
    if (!bookRes.ok) {
      throw new Error('Failed to fetch book');
    }
    const book = await bookRes.json();

    if (!book) {
      return {
        notFound: true,
      };
    }

    const authorRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authors/${book.author_id}`);
    if (!authorRes.ok) {
      throw new Error('Failed to fetch author');
    }
    const author = await authorRes.json();

    const reviewsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${params.id}/reviews`);
    if (!reviewsRes.ok) {
      throw new Error('Failed to fetch reviews');
    }
    const reviews = await reviewsRes.json();

    return {
      props: {
        book,
        author,
        reviews,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`);
    if (!res.ok) {
      throw new Error('Failed to fetch books');
    }
    const books = await res.json();

    const paths = books.map((book) => ({
      params: { id: book.id.toString() },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
}