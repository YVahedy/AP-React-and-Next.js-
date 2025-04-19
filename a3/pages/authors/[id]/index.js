import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';

export default function DetailedAuthorPage(props) {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (router.isFallback) {
        return <p>Loading...</p>;
    }

    if (!props.author) {
        return <p>No author found!</p>;
    }

    return (
        <div>
            <h1>Author Details</h1>
            <h2>{props.author.name}</h2>
            <p>{props.author.biography}</p>
        </div>
    );
}

export async function getStaticProps(context) {
    const { params } = context;
    const authorId = params.id;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authors/${authorId}`);
        if (!res.ok) {
            throw new Error('Failed to fetch author');
        }
        const author = await res.json();

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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authors`);
        if (!res.ok) {
            throw new Error('Failed to fetch authors');
        }
        const authors = await res.json();

        const paths = authors.map((author) => ({
            params: { id: author.id.toString() },
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