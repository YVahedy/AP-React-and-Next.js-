import DetailedAuthorPage from "@/pages/authors/[id]/index.js";

export default function BookAuthorPage(props) {
    return <DetailedAuthorPage {...props} />;
}

export async function getStaticProps(context) {
    const { params } = context;

    try {
        // Fetch the book details to get the author ID
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

        // Fetch the author details using the author ID from the book
        const authorRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authors/${book.author_id}`);
        if (!authorRes.ok) {
            throw new Error('Failed to fetch author');
        }
        const author = await authorRes.json();

        return {
            props: {
                author,
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
        // Fetch all books to generate paths
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