import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BookList from "@/components/books/BookList";

export default function FilteredBooksPage(props) {
    return (
        <div>
            <h1>Filtered Books</h1>
            <BookList list={props.books} />
        </div>
    );
}

export async function getStaticProps(context) {
    const { params } = context;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres/${params.id}/books`);
        if (!res.ok) {
            throw new Error('Failed to fetch filtered books');
        }
        const books = await res.json();

        return {
            props: {
                books,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                books: [],
            },
        };
    }
}

export async function getStaticPaths() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`);
        if (!res.ok) {
            throw new Error('Failed to fetch genres');
        }
        const genres = await res.json();

        const paths = genres.map((genre) => ({
            params: { id: genre.id.toString() },
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