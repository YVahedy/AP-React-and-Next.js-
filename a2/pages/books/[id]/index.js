import { getBookById, getAllBooks, getAuthorById } from "@/Data";
import BookContent from "@/components/book-detail/book-description";
import BookTitle from "@/components/book-detail/book-title";
import BookPnR from "@/components/book-detail/book-PnR";
import { useRouter } from 'next/router';

export default function DetailedBookPage({ book, author }) {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Loading...</p>;
    }

    if (!book) {
        return <p>No book found!</p>;
    }

    return (
        <div style={{ textAlign: "center", fontFamily: "cursive" }}>
            <h1>Detailed Book Page</h1>
            <BookTitle title={book.title} />
            <BookPnR author={author ? author.name : "Unknown"} price={book.price} rating={book.rating} id={book.id} t={book.title} />
            <BookContent>
                <p>{book.description}</p>
            </BookContent>
        </div>
    );
}

export async function getStaticProps(context) {
    const { params } = context;
    const book = await getBookById(params.id);
    if (!book) {
        return {
            notFound: true,
        };
    }
    const author = await getAuthorById(book.authorId) || null;
    return {
        props: {
            book,
            author,
        },
    };
}

export async function getStaticPaths() {
    const books = await getAllBooks();
    const paths = books
        .filter(book => book.id) // Ensure only valid book IDs are used
        .map((book) => ({
            params: { id: book.id },
        }));

    return {
        paths,
        fallback: true,
    };
}