import { getAuthorById,getAllAuthors } from "@/Data";

export default function DetailedAuthorPage(props) {
    return (
        <div>
            <h1>Author Details</h1>
            <h2>{props.author.name}</h2>
            <p>{props.author.biography}</p>
        </div>
    )
}

export async function getStaticProps(context) {
    const { params } = context;
    const authorId = params.id;
    const author = await getAuthorById(authorId);
    return {
        props: {
            author,
        }
    }
}

export async function getStaticPaths() {
    const authors = await getAllAuthors();
    const paths = authors.map((author) => ({
        params: { id: author.id },
    }));

    return {
        paths,
        fallback: false,
    };
}