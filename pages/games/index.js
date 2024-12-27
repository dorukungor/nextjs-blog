import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Games.module.css';

export default function Games() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Oyunlar</title>
        <meta name="description" content="Eğlenceli oyunlar" />
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
        <h1 className={styles.title}>Oyunlar</h1>
        
        <div className={styles.gamesGrid}>
          <Link href="/games/tetris" className={styles.gameCard}>
            <h2>Tetris</h2>
            <p>Klasik Tetris oyunu. Blokları yerleştir, satırları tamamla!</p>
          </Link>

          <Link href="/games/flappy" className={styles.gameCard}>
            <h2>Flappy Bird</h2>
            <p>Kuşu engellere çarpmadan uçur! (Yapım aşamasında)</p>
          </Link>
        </div>
      </main>
    </div>
  );
} 