// import Head from "next/head";
// import Header from "./components/Header"
// import Hero from "./components/Hero";
// import Gallery from "./components/Gallery";
// import MenuSection from "./components/MenuSection";
// import Footer from "./components/Footer";
// import First from "./components/First"

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Restaurant – Aufgewartet zum Wohl</title>
//         <meta name="description" content="Delicious meals and great ambiance" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Header />
//       <main>
//         <Hero />
//         <First/>
//         <Gallery />
//         <MenuSection />
//       </main>
//       <Footer />
//     </>
//   );
// }
// Make sure this export is at the top of the file!
// app/page.tsx or app/home/page.tsx (if you're using the app directory)
export const metadata = {
  title: "Restaurant – Aufgewartet zum Wohl",
  description: "Delicious meals and great ambiance",
  icons: {
    icon: "/favicon.ico",
  },
};

import Header from "./components/Header";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import MenuSection from "./components/MenuSection";
import Footer from "./components/Footer";
import First from "./components/First";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <First />
        <Gallery />
        <MenuSection />
      </main>
      <Footer />
    </>
  );
}
