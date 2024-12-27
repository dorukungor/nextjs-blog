import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hakkımda - Doruk Üngör</title>
        <meta name="description" content="Yazılım geliştirici olarak deneyimlerim ve yeteneklerim" />
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
        <h1 className={styles.title}>Doruk Üngör</h1>
        
        <div className={styles.content}>
          <section className={styles.section}>
            <div className={styles.contactInfo}>
              <p>20.04.2001</p>
              <p>Fatih / İstanbul</p>
              <p>+90 533 247 54 56</p>
              <p>doruk.ungor01@gmail.com</p>
              <div className={styles.socialLinks}>
                <a href="https://www.linkedin.com/in/doruk-%C3%BCng%C3%B6r-6b3bb9323/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  LinkedIn
                </a>
                <a href="https://github.com/dorukungor" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  GitHub
                </a>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Eğitim</h2>
            <div className={styles.education}>
              <h3>Bahçeşehir Üniversitesi</h3>
              <p>Yazılım Mühendisliği, İngilizce</p>
              <p className={styles.date}>2019-2024</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Deneyim</h2>
            <div className={styles.experience}>
              <div className={styles.job}>
                <h3>Intertech Information Technology</h3>
                <p className={styles.position}>Yazılım Mühendisliği Stajyeri</p>
                <p className={styles.date}>06.02.2023 - Günümüz</p>
                <ul className={styles.responsibilities}>
                  <li><strong>Backend:</strong> C# (.NET Framework), Microsoft SQL ve stored procedure'ler ile uygulama geliştirme</li>
                  <li><strong>Frontend:</strong> Şirket kütüphanesi ve JavaScript kullanarak kullanıcı arayüzleri tasarlama</li>
                  <li><strong>API'ler:</strong> RESTful API'lerin geliştirilmesi ve test edilmesi</li>
                  <li>Şirket kodlama standartlarına uygun kod optimizasyonu ve geliştirmesi</li>
                  <li>Agile metodoloji süreçlerine katılım (sprint planlama, değerlendirme ve sunumlar)</li>
                  <li>Farklı ortamlarda (geliştirme, test, üretim) deployment yönetimi</li>
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Teknik Yetenekler</h2>
            <div className={styles.skills}>
              <div className={styles.skillCategory}>
                <h3>Programlama Dilleri:</h3>
                <p>C#, JavaScript</p>
              </div>
              <div className={styles.skillCategory}>
                <h3>Framework & Kütüphaneler:</h3>
                <p>.NET Framework, RESTful API Development</p>
              </div>
              <div className={styles.skillCategory}>
                <h3>Veritabanı Yönetimi:</h3>
                <p>Microsoft SQL, Stored Procedures</p>
              </div>
              <div className={styles.skillCategory}>
                <h3>Versiyon Kontrol & CI/CD:</h3>
                <p>Git, Jenkins</p>
              </div>
              <div className={styles.skillCategory}>
                <h3>İşbirliği & Dökümantasyon:</h3>
                <p>Jira, Confluence, Beamer</p>
              </div>
              <div className={styles.skillCategory}>
                <h3>Diğer Araçlar:</h3>
                <p>Postman (API Testing), Visual Studio, SQL Server Management Studio</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Topluluklar</h2>
            <ul className={styles.communities}>
              <li>Bahçeşehir Üniversitesi Yazılım & Bilişim Kulübü</li>
              <li>Bahçeşehir Üniversitesi Yapay Zeka Kulübü</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Yabancı Dil</h2>
            <p><strong>İngilizce:</strong> Akıcı</p>
          </section>
        </div>
      </main>
    </div>
  );
} 