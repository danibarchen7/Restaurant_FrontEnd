"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

interface MenuItem {
  id: string;
  name: string;
}

interface OrderItem {
  meal: string;
  count: number;
}

export default function OrderForm() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    time: string;
    payOnline: boolean;
    items: OrderItem[];
  }>({
    name: "",
    email: "",
    time: "",
    payOnline: false,
    items: [{ meal: "", count: 1 }]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("https://restaurant-ieuk.onrender.com/Menu/Resturant/menu-items/");
        if (!response.ok) throw new Error("Failed to load menu");
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
        // Fallback to empty array if API fails
        setMenuItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const addMealSection = () => {
    if (formData.items.length < 10) {
      setFormData((prev) => ({
        ...prev,
        items: [...prev.items, { meal: "", count: 1 }]
      }));
    }
  };

  const updateMealItem = <K extends keyof OrderItem>(
    index: number,
    field: K,
    value: OrderItem[K]
  ) => {
    const newItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const removeMealItem = (index: number) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, items: newItems }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://restaurant-ieuk.onrender.com/api/send-email/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          time: formData.time || new Date().toTimeString().slice(0, 5)
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Order failed");

      alert("Order submitted successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Submission error:", error.message);
        alert(error.message || "Failed to submit order");
      } else {
        console.error("Unexpected error:", error);
        alert("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="order" className="bg-yellow-400 text-black py-8">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Customer Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Place Your Order</h2>
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          {/* Meal Items */}
          <div className="space-y-6">
            {formData.items.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Item #{index + 1}</h3>
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMealItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Meal</label>
                    <select
                      value={item.meal}
                      onChange={(e) =>
                        updateMealItem(index, "meal", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select a meal</option>
                      {isLoading ? (
                        <option>Loading meals...</option>
                      ) : (
                        menuItems.map((menuItem) => (
                          <option key={menuItem.id} value={menuItem.name}>
                            {menuItem.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={item.count}
                      onChange={(e) =>
                        updateMealItem(
                          index,
                          "count",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addMealSection}
              disabled={formData.items.length >= 10}
              className="px-4 py-2 text-black-600 bg-blue-50 rounded-lg hover:bg-blue-100 disabled:opacity-50"
            >
              + Add Another Meal
            </button>
          </div>

          {/* Time & Payment */}
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Preferred Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="p-2 border rounded"
                required
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.payOnline}
                onChange={(e) =>
                  setFormData({ ...formData, payOnline: e.target.checked })
                }
                className="w-4 h-4"
              />
              <span>Pay Online</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </form>
        {/* Contact Us */}
        <div id="contact">
          <h2 className="mb-4 text-xl font-bold">Contact Us</h2>
          <p className="mb-2">Hofmark 33 | 4742 pram</p>
          <p className="mb-2">Call Us Any</p>
          <p className="mb-2">Phone: 0690/105 55 199</p>
          <p className="mb-2">Mobile: 17736/6140</p>
          <p className="mb-2">WhatsApp: +43 690 10355199</p>
          <p className="mb-2">Email: aufgewartetzumwohl@gmail.com</p>
          <p className="mb-2">Address: Insert full location</p>
          {/* Chef Image */}
          <div className="hidden md:flex items-center justify-center w-50">
            {/* <img
              src="/image/image.svg"
              alt="Chef"
              className="w-full max-w-[250px] h-auto object-contain"
            /> */}
                        <Image
              src="/image/image.svg"
              alt="Chef"
              width={250}           // specify appropriate width
              height={250}          // specify appropriate height
              className="object-contain"  // you can add other Tailwind classes as needed
            />
          </div>
        </div>
        {/* Quick Links & Hours */}
        <div>
          <h2 className="mb-4 text-xl font-bold">Quick Links</h2>
          <ul className="mb-8 space-y-1">
            <li>
              {/* <a href="/#hero" className="underline hover:no-underline">
                Home
              </a> */}
              <Link href="/#hero">
                Home
              </Link>
            </li>
            <li>
              {/* <a href="/menu" className="underline hover:no-underline">
                Menu
              </a> */}
              <Link href="/menu">
                Home
              </Link>
            </li>
            <li>
              {/* <a href="#contact" className="underline hover:no-underline">
                Contact Us
              </a> */}
              <Link href="#contact">
                Home
              </Link>
            </li>
          </ul>

          <h2 className="mb-2 text-xl font-bold">Hours of Operation</h2>
          <p className="mb-1">6 DAYS OPEN</p>
          <p className="mb-1">
            Mo - S0: 11:00 - 14:00 | 16:00 - 22:00 Uhr
          </p>
          <p className="mb-1">Donnerstag Ruhetag</p>
          <p className="mb-1">Küche geöffnet:</p>
          <p className="mb-1">Mo, Sa until 21:00 Uhr</p>
          <p className="mb-1">So bis 20:00 Uhr</p>
        </div>
      </div>
    </footer>
  );
}
// "use client";
// import { useState, useEffect } from "react";

// const meals = ["Pizza", "Burger", "Salad", "Pasta", "Steak"];
// interface MenuItem {
//   id: string;
//   name: string;
// }


// export default function OrderForm() {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     time: "",
//     payOnline: false,
//     items: [{ meal: "", count: 1 }]
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   // useEffect(() => {
//   //   const fetchMenuItems = async () => {
//   //     try {
//   //       const response = await fetch("http://localhost:8000/Resturant/menu-items/");
//   //       const data = await response.json();
//   //       setMenuItems(data);
//   //     } catch (error) {
//   //       console.error("Error fetching menu items:", error);
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };

//   //   fetchMenuItems();
//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch("https://restaurant-ieuk.onrender.com/Menu/Resturant/menu-items/");
//         if (!response.ok) throw new Error("Failed to load menu");
//         const data = await response.json();
//         setMenuItems(data);
//       } catch (error) {
//         console.error("Error fetching menu:", error);
//         // Fallback to empty array if API fails
//         setMenuItems([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchMenuItems();
//   }, []);
//   const addMealSection = () => {
//     if (formData.items.length < 10) {
//       setFormData(prev => ({
//         ...prev,
//         items: [...prev.items, { meal: "", count: 1 }]
//       }));
//     }
//   };

//   const updateMealItem = (index: number, field: string, value: number) => {
//     const newItems = formData.items.map((item, i) => 
//       i === index ? { ...item, [field]: value } : item
//     );
//     setFormData(prev => ({ ...prev, items: newItems }));
//   };

//   const removeMealItem = (index: number) => {
//     if (formData.items.length > 1) {
//       const newItems = formData.items.filter((_, i) => i !== index);
//       setFormData(prev => ({ ...prev, items: newItems }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch("https://restaurant-ieuk.onrender.com/api/send-email/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           time: formData.time || new Date().toTimeString().slice(0,5)
//         })
//       });

//       const data = await response.json();
      
//       if (!response.ok) throw new Error(data.error || "Order failed");
      
//       alert("Order submitted successfully!");
      
      
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         console.error("Submission error:", error.message);
//         alert(error.message || "Failed to submit order");
//       } else {
//         console.error("Unexpected error:", error);
//         alert("An unknown error occurred.");
//       }
//     }
//   };

//   return (
//     <footer id="order" className="bg-yellow-400 text-black py-8">
//     <div  className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
//     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
//       {/* Customer Info */}
//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold">Place Your Order</h2>
        
//         <div>
//           <label className="block mb-2 font-medium">Name</label>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium">Email</label>
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//       </div>

//       {/* Meal Items */}
//       <div className="space-y-6">
//         {formData.items.map((item, index) => (
//           <div key={index} className="p-4 border rounded-lg">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="font-medium">Item #{index + 1}</h3>
//               {formData.items.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeMealItem(index)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//               <label className="block mb-2">Meal</label>
//               <select
//                       value={item.meal}
//                       onChange={(e) => updateMealItem(index, 'meal', e.target.value)}
//                       className="w-full p-2 border rounded"
//                       required
//                     >
//                       <option value="">Select a meal</option>
//                       {isLoading ? (
//                         <option>Loading meals...</option>
//                       ) : (
//                         menuItems.map((menuItem) => (
//                           <option key={menuItem.id} value={menuItem.name}>
//                             {menuItem.name}
//                           </option>
//                         ))
//                       )}
//                     </select>
//               </div>

//               <div>
//                 <label className="block mb-2">Quantity</label>
//                 <input
//                   type="number"
//                   min="1"
//                   max="10"
//                   value={item.count}
//                   onChange={(e) => updateMealItem(index, 'count', parseInt(e.target.value))}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={addMealSection}
//           disabled={formData.items.length >= 10}
//           className="px-4 py-2 text-black-600 bg-blue-50 rounded-lg hover:bg-blue-100 disabled:opacity-50"
//         >
//           + Add Another Meal
//         </button>
//       </div>

//       {/* Time & Payment */}
//       <div className="space-y-4">
//         <div>
//           <label className="block mb-2 font-medium">Preferred Time</label>
//           <input
//             type="time"
//             value={formData.time}
//             onChange={(e) => setFormData({ ...formData, time: e.target.value })}
//             className="p-2 border rounded"
//             required
//           />
//         </div>

//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={formData.payOnline}
//             onChange={(e) => setFormData({ ...formData, payOnline: e.target.checked })}
//             className="w-4 h-4"
//           />
//           <span>Pay Online</span>
//         </label>
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full py-3 font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50"
//       >
//         {isSubmitting ? 'Processing...' : 'Place Order'}
//       </button>
//     </form>
//       {/* Contact Us */}
//       <div id="contact">
//           <h2 className="mb-4 text-xl font-bold">Contact Us</h2>
//           <p className="mb-2">Hofmark 33 | 4742 pram</p>
//           <p className="mb-2">Call Us Any</p>
//           <p className="mb-2">Phone: 0690/105 55 199</p>
//           <p className="mb-2">Mobile: 17736/6140</p>
//           <p className="mb-2">WhatsApp: +43 690 10355199</p>
//           <p className="mb-2">Email: aufgewartetzumwohl@gmail.com</p>
//           <p className="mb-2">Address: Insert full location</p>
//             {/* Chef Image */}
//             <div className="hidden md:flex items-center justify-center w-50">
//                 <img
//                   src="/image/image.svg"
//                   alt="Chef"
//                   className="w-full max-w-[250px] h-auto object-contain"
//                 />
//               </div>
//         </div>

//         {/* Quick Links & Hours */}
//         <div>
//           <h2 className="mb-4 text-xl font-bold">Quick Links</h2>
//           <ul className="mb-8 space-y-1">
//             <li>
//               <a href="/#hero" className="underline hover:no-underline">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="/menu" className="underline hover:no-underline">
//                 Menu
//               </a>
//             </li>
//             <li>
//               <a href="#contact" className="underline hover:no-underline">
//                 Contact Us
//               </a>
//             </li>
//           </ul>

//           <h2 className="mb-2 text-xl font-bold">Hours of Operation</h2>
//           <p className="mb-1">6 DAYS OPEN</p>
//           <p className="mb-1">
//             Mo - S0: 11:00 - 14:00 | 16:00 - 22:00 Uhr
//           </p>
//           <p className="mb-1">Donnerstag Ruhetag</p>
//           <p className="mb-1">Küche geöffnet:</p>
//           <p className="mb-1">Mo, Sa until 21:00 Uhr</p>
//           <p className="mb-1">So bis 20:00 Uhr</p>
//         </div>
//       </div>
//     </footer>
//   );
// }
