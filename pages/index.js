import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { posts } from '../data/posts';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Yazılım Blogum</title>
        <meta name="description" content="Yazılım üzerine düşünceler ve öğrendiklerim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Blog
        </Link>
        <Link href="/about" className={styles.navLink}>
          Hakkımda
        </Link>
        <Link href="/games" className={styles.navLink}>
          Oyunlar
        </Link>
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Yazılım Bloguma Hoş Geldiniz!
        </h1>

        <div className={styles.grid}>
          {posts.map(post => (
            <Link href={`/blog/${post.id}`} key={post.id} className={styles.card}>
              <h2>{post.title} &rarr;</h2>
              <p>{post.excerpt}</p>
              <div className={styles.date}>{post.date}</div>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2023 Yazılım Blogum. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}
