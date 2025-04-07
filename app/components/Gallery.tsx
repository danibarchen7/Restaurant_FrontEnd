
// export default function Gallery() {
//   return (
//     <section className="bg-brandYellow">
//       <div className="w-screen overflow-hidden">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
//           {[...Array(12)].map((_, i) => (
//             <img
//               key={i}
//               src={`/image/dish${i + 1}.jpg`}
//               alt={`Dish ${i + 1}`}
//               className="w-full aspect-square object-cover block"
//               style={{ 
//                 minWidth: '100%',
//                 height: 'auto',
//                 display: 'block',
//                 margin: 0,
//                 padding: 0
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import Image from "next/image";

export default function Gallery() {
  return (
    <section className="bg-brandYellow">
      <div className="w-screen overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
          {[...Array(12)].map((_, i) => (
            <Image
              key={i}
              src={`/image/Dish${i + 1}.jpg`}
              alt={`Dish ${i + 1}`}
              width={300} // Adjust width & height based on your layout
              height={300}
              className="w-full aspect-square object-cover block"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
