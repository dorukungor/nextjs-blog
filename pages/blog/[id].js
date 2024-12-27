import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { posts } from '../../data/posts';
import styles from '../../styles/Post.module.css';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const post = posts.find(p => p.id === id);

  if (!post) {
    return <div>Yazı bulunamadı...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{post.title} - Yazılım Blogum</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Blog
        </Link>
        <Link href="/about" className={styles.navLink}>
          Hakkımda
        </Link>
      </nav>

      <main className={styles.main}>
        <article className={styles.article}>
          <h1>{post.title}</h1>
          <div className={styles.meta}>
            <time>{post.date}</time>
          </div>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
        </article>
      </main>
    </div>
  );
} 