import Link from "next/link";
export default function First() {
    return (
      <section
        id="hero"
        className="bg-brandYellow text-white py-20 px-4 text-center"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          // backgroundBlendMode: "multiply",
          // Adjust overlay color & opacity by tweaking these:
          backgroundColor: "grand-yellow",
        }}
      >
        <div className="container mx-auto">
          
          <h2 className="text-2xl md:text-3xl mb-8 text-black">
            Zeit, Hingabe <br className="hidden md:block" />
            und verdient gutes Essen.
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-black ">
            Finde jetzt bei uns die perfekte Mahlzeit. Egal, ob du Lust auf ein
            schnelles Gericht oder ein ausgiebiges Menü hast – wir haben alles,
            was dein Herz begehrt.
          </p>
          <Link href="#contact" legacyBehavior>
          <a className="inline-block">
          <button className="bg-black text-white px-6 py-3 text-lg font-semibold hover:bg-gray-800 transition-colors">
            Unsere Reservierungen
          </button>
          </a>
          </Link>
        </div>
      </section>
    );
  }
  