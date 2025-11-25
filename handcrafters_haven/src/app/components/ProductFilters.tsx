"use client"; // Only needed if this component uses state/hooks

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ProductFilters() {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("all");

  async function fetchProducts(selectedCategory: string) {
    let query = supabase.from("products").select("*");
    if (selectedCategory !== "all") {
      query = query.eq("category", selectedCategory);
    }
    const { data, error } = await query;
    if (error) console.error(error);
    else setProducts(data);
  }

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  return (
    <div>
      <h2>Filter by Category</h2>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="all">All</option>
        <option value="jewelry">Jewelry</option>
        <option value="decor">Decor</option>
        <option value="clothing">Clothing</option>
      </select>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price} ({p.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
