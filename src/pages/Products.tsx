// import { useState, useEffect } from "react";
// import ProductCard from "@/components/ProductCard";
// import { Product, ProductCategory } from "@/types/product";
// import { Button } from "@/components/ui/button";

// interface Category {
//   id: string;
//   name: string;
//   slug: string;
// }

// const Products = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>("all");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("http://localhost:8000/api/products/");
//         if (!res.ok) throw new Error("Failed to fetch products");
//         const data = await res.json();

//         const mapped: Product[] = data.map((p: any) => ({
//           id: p.id.toString(),
//           name: p.name,
//           category: p.category.slug, // now using slug from FK
//           description: p.description,
//           featured: p.featured,
//           in_stock: p.in_stock,
//           images: p.images.map((img: any) => ({ image: img.image })),
//           quantities: p.quantities,
//         }));

//         setProducts(mapped);
//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/categories/");
//         if (!res.ok) throw new Error("Failed to fetch categories");
//         const data = await res.json();
//         setCategories(data);
//       } catch (err: any) {
//         console.error(err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const filteredProducts =
//     selectedCategory === "all"
//       ? products
//       : products.filter((p) => p.category === selectedCategory);

//   return (
//     <div className="min-h-screen">
//       <section className="bg-secondary/30 py-12">
//         <div className="container">
//           <h1 className="font-serif text-4xl font-bold mb-4">Our Products</h1>
//           <p className="text-lg text-muted-foreground">
//             Explore our range of premium organic products
//           </p>
//         </div>
//       </section>

//       <section className="container py-12">
//         {/* Category Filter */}
//         <div className="flex flex-wrap gap-2 mb-8">
//           <Button
//             variant={selectedCategory === "all" ? "default" : "outline"}
//             onClick={() => setSelectedCategory("all")}
//           >
//             All Products
//           </Button>

//           {categories.map((category) => (
//             <Button
//               key={category.id}
//               variant={
//                 selectedCategory === category.slug ? "default" : "outline"
//               }
//               onClick={() => setSelectedCategory(category.slug)}
//             >
//               {category.name}
//             </Button>
//           ))}
//         </div>

//         {/* Products Grid */}
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : filteredProducts.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground">
//               No products found in this category.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Products;

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react"; // for elegant search icon

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "http://web-production-fe5b6.up.railway.app/api/products/"
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        const mapped: Product[] = data.map((p: any) => ({
          id: p.id.toString(),
          name: p.name,
          category: p.category.slug,
          description: p.description,
          featured: p.featured,
          in_stock: p.in_stock,
          images: p.images.map((img: any) => ({ image: img.image })),
          quantities: p.quantities,
        }));

        setProducts(mapped);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://web-production-fe5b6.up.railway.app/api/categories/"
        );
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // Filter products based on category and search
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-secondary/30 py-12">
        <div className="container">
          <h1 className="font-serif text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-lg text-muted-foreground">
            Explore our range of premium organic products
          </p>
        </div>
      </section>

      {/* Search + Categories */}
      <section className="container py-12">
        {/* 🔍 Elegant Search Bar */}
        <div className="relative max-w-lg mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-300 shadow-sm placeholder:text-gray-400"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={
                selectedCategory === category.slug ? "default" : "outline"
              }
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products match your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
