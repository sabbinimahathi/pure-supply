// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
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
// import { useToast } from "@/hooks/use-toast";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import axios from "axios";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const addItem = useCart((state) => state.addItem);

//   const [product, setProduct] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedQuantity, setSelectedQuantity] = useState<any>(null);
//   const [cartQty, setCartQty] = useState(0);

//   // Fetch product from API
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
//         const response = await axios.get(`${apiBaseUrl}/api/products/${id}`);
//         setProduct(response.data);
//         setSelectedQuantity(response.data.quantities[0]);
//       } catch (error) {
//         console.error("Failed to fetch product", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // Automatic image sliding
//   useEffect(() => {
//     if (!product || !product.images) return;
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [product]);

//   if (loading) return <p className="text-center py-12">Loading...</p>;
//   if (!product) return <p className="text-center py-12">Product not found.</p>;

//   const handleAddToCart = () => {
//     if (!selectedQuantity) {
//       toast({ title: "Please select a size", variant: "destructive" });
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
//                 src={product.images[currentImageIndex].image}
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

//             <div className="flex gap-2">
//               {product.images.map((img: any, index: number) => (
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
//                     src={img.image}
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
//               {!product.in_stock ? (
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

//             {/* Size & Price */}
//             <div className="flex flex-col gap-4 w-48">
//               <div className="flex items-center justify-between gap-2 w-full">
//                 <Select
//                   value={`${selectedQuantity.value}${selectedQuantity.unit}`}
//                   onValueChange={(value) => {
//                     const qty = product.quantities.find(
//                       (q: any) => `${q.value}${q.unit}` === value
//                     );
//                     if (qty) setSelectedQuantity(qty);
//                   }}
//                 >
//                   <SelectTrigger className="flex-1 h-10 text-base">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent className="w-full">
//                     {product.quantities.map((qty: any) => (
//                       <SelectItem
//                         key={`${qty.value}${qty.unit}`}
//                         value={`${qty.value}${qty.unit}`}
//                       >
//                         {qty.value}
//                         {qty.unit}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>

//                 <span className="text-2xl font-bold text-primary">
//                   ₹{selectedQuantity.price}
//                 </span>
//               </div>

//               {/* Add to Cart / Quantity */}
//               {cartQty === 0 ? (
//                 <Button
//                   size="sm"
//                   className="w-full flex items-center justify-center gap-2"
//                   disabled={!product.in_stock}
//                   onClick={handleAddToCart}
//                 >
//                   <ShoppingCart className="h-5 w-5" /> Add to Cart
//                 </Button>
//               ) : (
//                 <div className="flex items-center justify-between w-full">
//                   <Button variant="outline" size="sm" onClick={decrement}>
//                     <Minus className="h-4 w-4" />
//                   </Button>
//                   <span className="text-lg font-semibold">{cartQty}</span>
//                   <Button variant="outline" size="sm" onClick={increment}>
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
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiBaseUrl}/api/products/${id}`);
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

  // Calculate discount percentage and amount
  const discountPercentage = selectedQuantity?.mrp
    ? Math.round(
        ((selectedQuantity.mrp - selectedQuantity.price) /
          selectedQuantity.mrp) *
          100
      )
    : 0;

  const discountAmount = selectedQuantity?.mrp
    ? selectedQuantity.mrp - selectedQuantity.price
    : 0;

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="container py-6 sm:py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="mb-4 sm:mb-6 text-green-700 hover:text-green-800 hover:bg-green-100"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4 border-2 border-green-200">
              <img
                src={product.images[currentImageIndex].image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Discount Badge on Image */}
              {discountPercentage > 0 && product.in_stock && (
                <Badge className="absolute top-3 left-3 bg-red-500 text-white text-sm sm:text-base px-3 py-1 font-bold shadow-lg">
                  {discountPercentage}% OFF
                </Badge>
              )}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded overflow-hidden border-2 flex-shrink-0 transition-all ${
                    currentImageIndex === index
                      ? "border-green-600 ring-2 ring-green-300"
                      : "border-gray-300 hover:border-green-400"
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
          <div className="flex flex-col">
            <div className="mb-3 sm:mb-4 flex items-center gap-2">
              {!product.in_stock ? (
                <Badge variant="destructive" className="text-sm px-3 py-1">
                  Out of Stock
                </Badge>
              ) : product.featured ? (
                <Badge className="bg-green-600 text-white text-sm px-3 py-1">
                  Featured
                </Badge>
              ) : null}
              {discountPercentage > 0 && product.in_stock && (
                <Badge className="bg-orange-500 text-white text-sm px-3 py-1">
                  Limited Time Offer
                </Badge>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-green-900">
              {product.name}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Price Section */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 sm:p-5 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                {/* Quantity Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm font-medium text-gray-600">
                    Select Size
                  </label>
                  <Select
                    value={`${selectedQuantity.value}${selectedQuantity.unit}`}
                    onValueChange={(value) => {
                      const qty = product.quantities.find(
                        (q: any) => `${q.value}${q.unit}` === value
                      );
                      if (qty) setSelectedQuantity(qty);
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-32 h-10 text-sm sm:text-base border-green-300 focus:ring-green-500 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {product.quantities.map((qty: any) => (
                        <SelectItem
                          key={`${qty.value}${qty.unit}`}
                          value={`${qty.value}${qty.unit}`}
                          className="text-sm sm:text-base"
                        >
                          {qty.value}
                          {qty.unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Display */}
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {selectedQuantity?.mrp &&
                      selectedQuantity.mrp > selectedQuantity.price && (
                        <>
                          <span className="text-base sm:text-xl text-gray-500 line-through decoration-red-500 decoration-2">
                            ₹{selectedQuantity.mrp}
                          </span>
                          <Badge className="bg-red-100 text-red-700 text-xs sm:text-sm px-2 py-0.5">
                            Save ₹{discountAmount}
                          </Badge>
                        </>
                      )}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      Price:
                    </span>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700">
                      ₹{selectedQuantity.price}
                    </span>
                  </div>
                  {discountPercentage > 0 && (
                    <span className="text-xs sm:text-sm text-green-600 font-semibold">
                      ({discountPercentage}% OFF)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Add to Cart / Quantity Controls */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {cartQty === 0 ? (
                <Button
                  size="lg"
                  className="w-full sm:w-auto sm:min-w-[280px] flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg py-5 sm:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  disabled={!product.in_stock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" /> Add to Cart
                </Button>
              ) : (
                <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 bg-white border-2 border-green-300 rounded-lg p-3 sm:p-4 w-full sm:w-auto sm:min-w-[280px]">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={decrement}
                    className="border-green-400 text-green-700 hover:bg-green-100 w-12 h-12 sm:w-14 sm:h-14 rounded-lg"
                  >
                    <Minus className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                  <span className="text-xl sm:text-2xl font-bold text-green-700 min-w-[60px] text-center">
                    {cartQty}
                  </span>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={increment}
                    className="border-green-400 text-green-700 hover:bg-green-100 w-12 h-12 sm:w-14 sm:h-14 rounded-lg"
                  >
                    <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
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
