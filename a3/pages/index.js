import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import BookList from "@/components/books/BookList";
import { useAuth } from '../context/AuthContext';
import { Box, Button } from '@mui/material';

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
  const { user, logout } = useAuth();
  const arr = props.books;
  return (
    <div>
      <h1>Home Page: All Featured Books</h1>
      {user && <p>Welcome, {user.email}</p>}
      <BookList list={arr} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/featured`);
  const books = await res.json();
  return {
    props: {
      books,
    },
  };
}
