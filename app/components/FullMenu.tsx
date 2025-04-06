// pages/menu.tsx
"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from "next/image";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url?: string; 
}

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('https://restaurant-ieuk.onrender.com/Menu/Resturant/menu/');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="bg-yellow-400 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Full Menu</h1>
      <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <h2 className="text-xl font-bold text-black">{item.name}</h2>
            <p className="text-700 text-black">{item.description}</p>
            <p className="text-black font-semibold">€{item.price}</p>
            <Image
                src={item.image_url || "/placeholder.jpg"}
                alt={item.name}
                fill
                className="object-cover rounded-md"
                unoptimized={true} // Remove this if you want to enable optimization.
              />
            <Link href="#order" className="inline-block">
              <button className="bg-black text-yellow px-6 py-3 text-lg font-semibold hover:bg-gray-800 transition-colors">
                order
              </button>
            </Link>


          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
