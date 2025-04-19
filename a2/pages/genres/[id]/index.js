import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BookList from "@/components/books/BookList";
import { getFilteredBooks } from "@/Data";
import { getAllGenres } from "@/Data";


export default function FilteredBooksPage(props)
{
    return (
        <div>
            <h1>Filtered Books</h1>
            <BookList list={props.books} />
        </div>
    );
}

export async function getStaticProps(context) {
    const { params } = context;
    const books = await getFilteredBooks(params.id);
  
    return {
      props: {
        books,
      },
    };
  }
  
  export async function getStaticPaths() {
    const genres = await getAllGenres();
    const paths = genres.map((genre) => ({
      params: { id: genre.id },
    }));
  
    return {
      paths,
      fallback: false,
    };
  }