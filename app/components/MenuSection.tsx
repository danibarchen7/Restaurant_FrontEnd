import Link from 'next/link';
export default function MenuSection() {
    return (
      <section
        id="menu"
        className="bg-black text-white py-12 px-4 text-center"
        style={{
          backgroundImage: "url('/image/Dish1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // backgroundBlendMode: "multiply",
          // Adjust overlay color & opacity by tweaking these:
          // backgroundColor: "rgba(255, 238, 0, 0.85)",

        }}
      >
        <div className="container mx-auto">
          <h2 className="text-yellow-400 text-3xl md:text-8xl font-bold mb-6">Our Menu</h2>
          <hr className="w-[200px] h-1 border-t-8 border-white-400 mx-auto my-4" />

          <p className="bg-white bg-opacity-50 text-black max-w-7xl mx-auto mb-8 md:text-6xl ">
            Genieße eine Vielfalt an köstlichen Gerichten, liebevoll zubereitet 
            aus den frisch esten Zutaten. Unser Menu bietet für jeden Geschmack 
            etwas – von herzhaften Klassikern bis zu feinen Spezialitäten.
          </p>
          <br/><br/><br/>
        
          <Link href="/menu" passHref legacyBehavior>
  <a className="inline-block">
    <button className="bg-black text-yellow-400 px-12 py-5 text-lg font-semibold hover:opacity-90 transition-opacity">
    Schauen Sie sich das vollständige Menü an
    </button>
  </a>
</Link>
          <br/><br/><br/>
        </div>
      </section>
    );
  }
  