import DetailedAuthorPage from "@/pages/authors/[id]/index.js";
import { getAuthorByBookId,getAllBooks } from "@/Data";
export default function BookAuthorPage(props) {
    return <DetailedAuthorPage {...props} />;
}

export async function getStaticProps(context) {
    const { params } = context;
    const author = await getAuthorByBookId(params.id) || null;
    if (!author) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            author,
        },
    };
}
export async function getStaticPaths() {
    const books = await getAllBooks();
    const paths = books.map((book) => ({
        params: { id: book.id },
    }));

    return {
        paths,
        fallback: false,
    };
}