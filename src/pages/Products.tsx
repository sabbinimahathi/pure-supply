// import { useState, useEffect } from "react";
// import ProductCard from "@/components/ProductCard";
// import { Product } from "@/types/product";
// import { Button } from "@/components/ui/button";
// import { Search } from "lucide-react"; // for elegant search icon

// interface Category {
//   id: string;
//   name: string;
//   slug: string;
// }

// const Products = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>("all");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
//         const res = await fetch(`${apiBaseUrl}/api/products/`);
//         if (!res.ok) throw new Error("Failed to fetch products");
//         const data = await res.json();

//         // const mapped: Product[] = data.results.map((p: any) => ({
//         //   id: p.id.toString(),
//         //   name: p.name,
//         //   category: p.category.slug,
//         //   description: p.description,
//         //   featured: p.featured,
//         //   in_stock: p.in_stock,
//         //   images: p.images.map((img: any) => ({ image: img.image })),
//         //   quantities: p.quantities,
//         // }));
//         const mapped: Product[] = Array.isArray(data.results)
//           ? data.results.map((p: any) => ({
//               id: p.id?.toString() || "0",
//               name: p.name || "Untitled",
//               category: p.category?.slug || "uncategorized",
//               description: p.description || "",
//               featured: p.featured || false,
//               in_stock: p.in_stock || false,
//               images: Array.isArray(p.images)
//                 ? p.images.map((img: any) => ({ image: img.image || "" }))
//                 : [],
//               quantities: Array.isArray(p.quantities) ? p.quantities : [],
//             }))
//           : [];

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
//         const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
//         const res = await fetch(`${apiBaseUrl}/api/categories/`);
//         if (!res.ok) throw new Error("Failed to fetch categories");
//         const data = await res.json();
//         setCategories(Array.isArray(data.results) ? data.results : []);
//       } catch (err: any) {
//         console.error(err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Filter products based on category and search
//   const filteredProducts = products.filter((p) => {
//     const matchesCategory =
//       selectedCategory === "all" || p.category === selectedCategory;
//     const matchesSearch =
//       p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.description.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-secondary/30 py-12">
//         <div className="container">
//           <h1 className="font-serif text-4xl font-bold mb-4">Our Products</h1>
//           <p className="text-lg text-muted-foreground">
//             Explore our range of premium organic products
//           </p>
//         </div>
//       </section>

//       {/* Search + Categories */}
//       <section className="container py-12">
//         {/* 🔍 Elegant Search Bar */}
//         <div className="relative max-w-lg mx-auto mb-8">
//           <input
//             type="text"
//             placeholder="Search for products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-300 shadow-sm placeholder:text-gray-400"
//           />
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
//             size={20}
//           />
//         </div>

//         {/* Category Filter Buttons */}
//         <div className="flex flex-wrap justify-center gap-2 mb-10">
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

//         {/* Product Grid */}
//         {loading ? (
//           <p className="text-center text-muted-foreground">Loading...</p>
//         ) : error ? (
//           <p className="text-red-500 text-center">{error}</p>
//         ) : filteredProducts.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground">
//               No products match your search.
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
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import { Search } from "lucide-react";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${apiBaseUrl}/api/products/`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        const mapped: Product[] = Array.isArray(data.results)
          ? data.results.map((p: any) => ({
              id: p.id?.toString() || "0",
              name: p.name || "Untitled",
              category: p.category?.slug || "uncategorized",
              description: p.description || "",
              featured: p.featured || false,
              in_stock: p.in_stock || false,
              images: Array.isArray(p.images)
                ? p.images.map((img: any) => ({ image: img.image || "" }))
                : [],
              quantities: Array.isArray(p.quantities) ? p.quantities : [],
            }))
          : [];

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${apiBaseUrl}/api/categories/`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(Array.isArray(data.results) ? data.results : []);
      } catch (err: any) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* 🌿 Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-12 text-center">
        <div className="container">
          <h1 className="font-serif text-4xl font-bold mb-4 text-green-800">
            Our Products
          </h1>
          <p className="text-lg text-green-700">
            Explore our range of premium, eco-friendly organic products 🌱
          </p>
        </div>
      </section>

      {/* 🔍 Search + Categories */}
      <section className="container py-12">
        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-green-700 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 shadow-sm placeholder:text-gray-400"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600"
            size={20}
          />
        </div>

        {/* 🌿 Animated Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: "all", name: "All Products", slug: "all" },
            ...categories,
          ].map((category) => {
            const isActive = selectedCategory === category.slug;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md backdrop-blur-sm
                  ${
                    isActive
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white border border-green-700 shadow-green-300 hover:shadow-green-400 hover:brightness-105"
                      : "bg-white text-green-800 border border-green-400 hover:bg-green-50 hover:text-green-700"
                  }
                `}
              >
                {category.name}
              </motion.button>
            );
          })}
        </div>

        {/* Product Grid */}
        {loading ? (
          <p className="text-center text-green-700">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products match your search.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Products;
