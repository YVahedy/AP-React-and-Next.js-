import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = url => fetch(url).then(res => res.json());

export default function Authors() {
    const { data, error } = useSWR('https://books-ac171-default-rtdb.asia-southeast1.firebasedatabase.app/authors.json', fetcher);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        if (data && authors.length === 0) {
            setAuthors(Object.keys(data).map((key) => ({ id: key, ...data[key] })));
        }
    }, [data, authors]);
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