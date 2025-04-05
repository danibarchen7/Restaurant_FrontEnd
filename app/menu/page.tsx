import Head from "next/head";
import Header from "../components/Header"
import Hero from "../components/Hero";
// import Gallery from "../components/Gallery";
// import MenuSection from "../components/MenuSection";
import Footer from "../components/Footer";
// import First from "../components/First"
import MenuPage from "../components/FullMenu";

export default function Menu() {
  return (
    <>
      <Head>
        <title>Restaurant – Aufgewartet zum Wohl</title>
        <meta name="description" content="Delicious meals and great ambiance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Hero />
        <MenuPage/>
        {/* <First/>
        <Gallery />
        <MenuSection /> */}
      </main>
      <Footer />
    </>
  );
}
