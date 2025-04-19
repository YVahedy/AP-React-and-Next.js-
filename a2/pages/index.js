import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import {getFeaturedBooks} from "@/Data";
import BookList from "@/components/books/BookList";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function FeaturedBooksPage(props) {
  const arr = props.books;
  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>Home Page: All Featured Books</h1>
      <BookList list={arr} />
    </div>
  );
}

export async function getStaticProps() {
  const books = await getFeaturedBooks()
  return {
    props: {
      books,
    },
  };
}