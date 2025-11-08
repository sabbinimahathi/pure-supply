// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { products } from "@/data/products";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useCart } from "@/hooks/useCart";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ShoppingCart,
//   Plus,
//   Minus,
// } from "lucide-react";
// import { QuantityOption } from "@/types/product";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const product = products.find((p) => p.id === id);
//   const addItem = useCart((state) => state.addItem);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedQuantity, setSelectedQuantity] =
//     useState<QuantityOption | null>(product?.quantities[0] || null);
//   const [cartQty, setCartQty] = useState(0);

//   // Automatic image sliding
//   useEffect(() => {
//     if (!product) return;
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [product]);

//   if (!product) {
//     return (
//       <div className="container py-12 text-center">
//         <h1 className="text-2xl font-bold mb-4">Product not found</h1>
//         <Button onClick={() => navigate("/products")}>Back to Products</Button>
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     if (!selectedQuantity) {
//       toast({
//         title: "Please select a size",
//         variant: "destructive",
//       });
//       return;
//     }
//     addItem(product, selectedQuantity);
//     setCartQty(1);
//     toast({
//       title: "Added to cart",
//       description: `${product.name} (${selectedQuantity.value}${selectedQuantity.unit})`,
//     });
//   };

//   const increment = () => {
//     if (!selectedQuantity) return;
//     addItem(product, selectedQuantity);
//     setCartQty((prev) => prev + 1);
//   };

//   const decrement = () => {
//     if (cartQty > 1) {
//       addItem(product, selectedQuantity);
//       setCartQty((prev) => prev - 1);
//     } else {
//       setCartQty(0);
//     }
//   };

//   const nextImage = () =>
//     setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
//   const prevImage = () =>
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + product.images.length) % product.images.length
//     );

//   return (
//     <div className="min-h-screen">
//       <div className="container py-12">
//         <Button
//           variant="ghost"
//           onClick={() => navigate("/products")}
//           className="mb-6"
//         >
//           <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
//         </Button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Image Gallery */}
//           <div>
//             <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
//               <img
//                 src={product.images[currentImageIndex]}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//               {product.images.length > 1 && (
//                 <>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={prevImage}
//                     className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80"
//                   >
//                     <ChevronLeft className="h-6 w-6" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={nextImage}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80"
//                   >
//                     <ChevronRight className="h-6 w-6" />
//                   </Button>
//                 </>
//               )}
//             </div>

//             {/* Thumbnails */}
//             <div className="flex gap-2">
//               {product.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`w-20 h-20 rounded overflow-hidden border-2 ${
//                     currentImageIndex === index
//                       ? "border-primary"
//                       : "border-transparent"
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt={`${product.name} ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div>
//             <div className="mb-4">
//               {!product.inStock ? (
//                 <Badge variant="destructive">Out of Stock</Badge>
//               ) : product.featured ? (
//                 <Badge className="bg-accent">Featured</Badge>
//               ) : null}
//             </div>

//             <h1 className="font-serif text-4xl font-bold mb-4">
//               {product.name}
//             </h1>

//             <p className="text-lg text-muted-foreground mb-6">
//               {product.description}
//             </p>

//             {/* Size & Price horizontal */}
//             <div className="flex flex-col gap-4 w-48">
//               {selectedQuantity && (
//                 <div className="flex items-center justify-between gap-2 w-full">
//                   {/* Size selector */}
//                   <Select
//                     value={`${selectedQuantity.value}${selectedQuantity.unit}`}
//                     onValueChange={(value) => {
//                       const qty = product.quantities.find(
//                         (q) => `${q.value}${q.unit}` === value
//                       );
//                       if (qty) setSelectedQuantity(qty);
//                     }}
//                   >
//                     <SelectTrigger className="flex-1 h-10 text-base">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="w-full">
//                       {product.quantities.map((qty) => (
//                         <SelectItem
//                           key={`${qty.value}${qty.unit}`}
//                           value={`${qty.value}${qty.unit}`}
//                         >
//                           {qty.value}
//                           {qty.unit}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   {/* Price */}
//                   <span className="text-2xl font-bold text-primary">
//                     ₹{selectedQuantity.price}
//                   </span>
//                 </div>
//               )}

//               {/* Add to Cart / Quantity */}
//               {cartQty === 0 ? (
//                 <Button
//                   size="sm"
//                   className="w-full flex items-center justify-center gap-2"
//                   disabled={!product.inStock}
//                   onClick={handleAddToCart}
//                 >
//                   <ShoppingCart className="h-5 w-5" /> Add to Cart
//                 </Button>
//               ) : (
//                 <div className="flex items-center justify-between w-full">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={decrement}
//                     className="flex items-center justify-center"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </Button>
//                   <span className="text-lg font-semibold">{cartQty}</span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={increment}
//                     className="flex items-center justify-center"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const addItem = useCart((state) => state.addItem);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState<any>(null);
  const [cartQty, setCartQty] = useState(0);

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://web-production-fe5b6.up.railway.app/api/products/${id}/`
        );
        setProduct(response.data);
        setSelectedQuantity(response.data.quantities[0]);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Automatic image sliding
  useEffect(() => {
    if (!product || !product.images) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [product]);

  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (!product) return <p className="text-center py-12">Product not found.</p>;

  const handleAddToCart = () => {
    if (!selectedQuantity) {
      toast({ title: "Please select a size", variant: "destructive" });
      return;
    }
    addItem(product, selectedQuantity);
    setCartQty(1);
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedQuantity.value}${selectedQuantity.unit})`,
    });
  };

  const increment = () => {
    if (!selectedQuantity) return;
    addItem(product, selectedQuantity);
    setCartQty((prev) => prev + 1);
  };

  const decrement = () => {
    if (cartQty > 1) {
      setCartQty((prev) => prev - 1);
    } else {
      setCartQty(0);
    }
  };

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );

  return (
    <div className="min-h-screen">
      <div className="container py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="mb-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[currentImageIndex].image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>

            <div className="flex gap-2">
              {product.images.map((img: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded overflow-hidden border-2 ${
                    currentImageIndex === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img.image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              {!product.in_stock ? (
                <Badge variant="destructive">Out of Stock</Badge>
              ) : product.featured ? (
                <Badge className="bg-accent">Featured</Badge>
              ) : null}
            </div>

            <h1 className="font-serif text-4xl font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {product.description}
            </p>

            {/* Size & Price */}
            <div className="flex flex-col gap-4 w-48">
              <div className="flex items-center justify-between gap-2 w-full">
                <Select
                  value={`${selectedQuantity.value}${selectedQuantity.unit}`}
                  onValueChange={(value) => {
                    const qty = product.quantities.find(
                      (q: any) => `${q.value}${q.unit}` === value
                    );
                    if (qty) setSelectedQuantity(qty);
                  }}
                >
                  <SelectTrigger className="flex-1 h-10 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {product.quantities.map((qty: any) => (
                      <SelectItem
                        key={`${qty.value}${qty.unit}`}
                        value={`${qty.value}${qty.unit}`}
                      >
                        {qty.value}
                        {qty.unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="text-2xl font-bold text-primary">
                  ₹{selectedQuantity.price}
                </span>
              </div>

              {/* Add to Cart / Quantity */}
              {cartQty === 0 ? (
                <Button
                  size="sm"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={!product.in_stock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </Button>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <Button variant="outline" size="sm" onClick={decrement}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold">{cartQty}</span>
                  <Button variant="outline" size="sm" onClick={increment}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
