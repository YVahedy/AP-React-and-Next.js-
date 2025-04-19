import { useRouter } from 'next/router';
import Link from 'next/link';

const InfoPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  const renderContent = () => {
    if (!slug || slug.length === 0) {
      return <p>Welcome to the Info Page. Please select a section.</p>;
    }

    if (slug[0] === 'faqs') {
      return (
        <div>
          <h2>Frequently Asked Questions</h2>
          <ul>
            <li>
              <strong>Q: What is Book Store?</strong>
              <p>A: Book Store is a comprehensive book management application built with Next.js. It allows users to browse, search, and view detailed information about books, genres, and authors.</p>
            </li>
            <li>
              <strong>Q: How can I search for a book?</strong>
              <p>A: You can use the search functionality on the homepage to search for books by title, author, or genre.</p>
            </li>
            <li>
              <strong>Q: How do I view detailed information about a book?</strong>
              <p>A: Click on any book from the list to view detailed information, including the author, genre, price, and description.</p>
            </li>
            <li>
              <strong>Q: Can I filter books by genre?</strong>
              <p>A: Yes, you can filter books by genre using the dropdown menu on the homepage.</p>
            </li>
            <li>
              <strong>Q: How is the data stored?</strong>
              <p>A: The data is stored in Firebase and fetched dynamically using Next.js features for optimized performance.</p>
            </li>
          </ul>
        </div>
      );
    }

    if (slug[0] === 'support') {
      return (
        <div>
          <h2>Support</h2>
          <p>If you need assistance with the Book Store application, please contact our support team.</p>
          <ul>
            <li>Email: support@bookstore.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Library St, FAST City, LHR 12345</li>
          </ul>
          <p>Our support team is available Monday to Friday, 9 AM to 5 PM.</p>
        </div>
      );
    }

    return <p>Section not found.</p>;
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'cursive' }}>
      <h1>Information Page</h1>
      <nav>
        <ul>
          <li>
            <Link href="/info/faqs">FAQs</Link>
          </li>
          <li>
            <Link href="/info/support">Support</Link>
          </li>
        </ul>
      </nav>
      {renderContent()}
    </div>
  );
};

export default InfoPage;