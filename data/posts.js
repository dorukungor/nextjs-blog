export const posts = [
  {
    id: 'react-hooks-kullanimi',
    title: 'React Hooks: Modern React Geliştirmede Temel Yaklaşımlar',
    excerpt: 'React Hooks, fonksiyonel bileşenlerde state yönetimi ve yaşam döngüsü özelliklerini kullanmamızı sağlayan güçlü bir özelliktir...',
    content: `React Hooks, fonksiyonel bileşenlerde state yönetimi ve yaşam döngüsü özelliklerini kullanmamızı sağlayan güçlü bir özelliktir. 

React 16.8 ile birlikte gelen bu özellik, class bileşenlerine olan ihtiyacı büyük ölçüde azaltmıştır.

## En Çok Kullanılan Hooks

### 1. useState
State yönetimi için en temel hook'tur. Örnek kullanım:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

### 2. useEffect
Yan etkileri yönetmek için kullanılır:

\`\`\`javascript
useEffect(() => {
  document.title = \`Sayaç: \${count}\`;
}, [count]);
\`\`\`

### 3. useContext
Context API ile state yönetimi için kullanılır.

## Hooks Kullanım Kuralları
- Hooks sadece fonksiyonel bileşenlerde kullanılabilir
- Hooks her zaman en üst seviyede çağrılmalıdır
- Hooks koşullu ifadelerin içinde kullanılmamalıdır`,
    date: '2023-12-26'
  },
  {
    id: 'nextjs-nedir',
    title: 'Next.js ile Modern Web Uygulamaları Geliştirme',
    excerpt: 'Next.js, React tabanlı web uygulamaları geliştirmek için kullanılan güçlü bir framework\'tür...',
    content: `Next.js, React tabanlı web uygulamaları geliştirmek için kullanılan güçlü bir framework'tür. 

## Next.js'in Avantajları

### 1. Sayfa Yönlendirme
Next.js, dosya sistemi tabanlı routing özelliği sunar. \`pages\` klasörü altında oluşturduğunuz her dosya otomatik olarak bir route olur.

### 2. Server-Side Rendering (SSR)
Next.js ile sayfalarınızı server tarafında render edebilirsiniz:

\`\`\`javascript
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}
\`\`\`

### 3. Static Site Generation (SSG)
Statik sayfalar oluşturarak performansı artırabilirsiniz.

## Next.js Projesi Başlatma
1. Create Next App kullanarak yeni proje oluşturma
2. Gerekli bağımlılıkları yükleme
3. Geliştirmeye başlama

Next.js, modern web uygulamaları geliştirmek için mükemmel bir seçenektir.`,
    date: '2023-12-25'
  },
  {
    id: 'typescript-basics',
    title: 'TypeScript Temelleri ve Best Practices',
    excerpt: 'TypeScript, JavaScript\'e tip güvenliği ekleyen ve geliştirme sürecini daha güvenli hale getiren bir programlama dilidir...',
    content: `TypeScript, JavaScript'e tip güvenliği ekleyen ve geliştirme sürecini daha güvenli hale getiren bir programlama dilidir.

## Neden TypeScript?

- Tip güvenliği
- Daha iyi IDE desteği
- Daha az hata
- Daha kolay bakım

## Temel Tipler

\`\`\`typescript
// Temel tipler
let isActive: boolean = true;
let count: number = 42;
let name: string = "TypeScript";

// Diziler
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Interface
interface User {
  id: number;
  name: string;
  email?: string; // Opsiyonel alan
}
\`\`\`

## Generic Kullanımı

\`\`\`typescript
function getFirst<T>(array: T[]): T {
  return array[0];
}
\`\`\`

TypeScript, modern web geliştirmede vazgeçilmez bir araç haline gelmiştir.`,
    date: '2023-12-24'
  }
]; 