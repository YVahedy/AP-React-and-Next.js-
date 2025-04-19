import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = url => fetch(url).then(res => res.json());

export default function Authors() {
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/authors`, fetcher);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        console.log('Fetched data:', data);
        if (data && Array.isArray(data)) {
            setAuthors(data);
        } else {
            setAuthors([]);
        }
    }, [data]);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>Authors</h1>
            <ul>
                {authors.map(author => (
                    <li key={author.id}>
                        <Link href={`/authors/${author.id}`}>
                            {author.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}