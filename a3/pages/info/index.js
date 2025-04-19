import { useRouter } from 'next/router';
import Link from 'next/link';

const InfoPage = () => {

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
    </div>
  );
};

export default InfoPage;