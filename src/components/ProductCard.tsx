// import { useState } from "react";
// import { Product, QuantityOption } from "@/types/product";
// import { Card, CardContent, CardFooter } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { useCart } from "@/hooks/useCart";
// import { ShoppingCart, Plus, Minus } from "lucide-react";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "./ui/select";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   const navigate = useNavigate();
//   const addItem = useCart((state) => state.addItem);

//   const [selectedQuantity, setSelectedQuantity] = useState<QuantityOption>(
//     product.quantities[0]
//   );
//   const [cartQty, setCartQty] = useState(0);

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (!product || !selectedQuantity) return;
//     addItem(product, selectedQuantity);
//     setCartQty(1);
//   };

//   const increment = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (!product || !selectedQuantity) return;
//     addItem(product, selectedQuantity);
//     setCartQty((prev) => prev + 1);
//   };

//   const decrement = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (cartQty > 1) {
//       if (product && selectedQuantity) addItem(product, selectedQuantity);
//       setCartQty((prev) => prev - 1);
//     } else {
//       setCartQty(0);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       transition={{ duration: 0.25 }}
//       className="cursor-pointer"
//     >
//       <Card
//         className="h-full overflow-hidden border border-green-200
//                    hover:border-green-500/70 hover:shadow-[0_4px_20px_rgba(34,197,94,0.15)]
//                    transition-all duration-300 rounded-2xl bg-white"
//         onClick={() => navigate(`/product/${product.id}`)}
//       >
//         {/* Product Image */}
//         <div className="relative aspect-square overflow-hidden">
//           <img
//             src={product.images[0]?.image}
//             alt={product.name}
//             className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//           />
//           {!product.in_stock && (
//             <Badge className="absolute top-2 right-2 bg-destructive">
//               Out of Stock
//             </Badge>
//           )}
//           {product.featured && product.in_stock && (
//             <Badge className="absolute top-2 right-2 bg-green-600 text-white">
//               Featured
//             </Badge>
//           )}
//         </div>

//         {/* Product Info */}
//         <CardContent className="pt-4 flex flex-col gap-2">
//           <h3 className="font-semibold text-lg line-clamp-1 text-green-800">
//             {product.name}
//           </h3>
//           <p className="text-sm text-muted-foreground line-clamp-2">
//             {product.description}
//           </p>

//           {/* Quantity + Price */}
//           <div
//             className="flex items-center justify-between gap-2 mt-1"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Select
//               value={`${selectedQuantity.value}${selectedQuantity.unit}`}
//               onValueChange={(value) => {
//                 const qty = product.quantities.find(
//                   (q) => `${q.value}${q.unit}` === value
//                 );
//                 if (qty) setSelectedQuantity(qty);
//               }}
//             >
//               <SelectTrigger className="w-24 h-8 text-sm border-green-300 focus:ring-green-500">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent className="w-24">
//                 {product.quantities.map((qty) => (
//                   <SelectItem
//                     key={`${qty.value}${qty.unit}`}
//                     value={`${qty.value}${qty.unit}`}
//                   >
//                     {qty.value}
//                     {qty.unit}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <span className="text-lg font-bold text-green-700">
//               ₹{selectedQuantity.price}
//             </span>
//           </div>
//         </CardContent>

//         {/* Add to Cart / Quantity Controls */}
//         <CardFooter>
//           {cartQty === 0 ? (
//             <Button
//               className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700
//                          text-white hover:scale-[1.02] transition-transform"
//               disabled={!product.in_stock}
//               onClick={handleAddToCart}
//             >
//               <ShoppingCart className="h-5 w-5" /> Add to Cart
//             </Button>
//           ) : (
//             <div className="flex items-center justify-between w-full">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={decrement}
//                 className="flex items-center justify-center border-green-400 text-green-700 hover:bg-green-100"
//               >
//                 <Minus className="h-4 w-4" />
//               </Button>
//               <span className="text-lg font-semibold text-green-700">
//                 {cartQty}
//               </span>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={increment}
//                 className="flex items-center justify-center border-green-400 text-green-700 hover:bg-green-100"
//               >
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>
//           )}
//         </CardFooter>
//       </Card>
//     </motion.div>
//   );
// };

// export default ProductCard;
import { useState } from "react";
import { Product, QuantityOption } from "@/types/product";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const addItem = useCart((state) => state.addItem);

  const [selectedQuantity, setSelectedQuantity] = useState<QuantityOption>(
    product.quantities[0]
  );
  const [cartQty, setCartQty] = useState(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product || !selectedQuantity) return;
    addItem(product, selectedQuantity);
    setCartQty(1);
  };

  const increment = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedQuantity);
    setCartQty((prev) => prev + 1);
  };

  const decrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartQty > 1) {
      addItem(product, selectedQuantity);
      setCartQty((prev) => prev - 1);
    } else {
      setCartQty(0);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="cursor-pointer w-[95%] mx-auto"
    >
      <Card
        className="overflow-hidden border border-green-200 
                   hover:border-green-500/70 hover:shadow-[0_4px_15px_rgba(34,197,94,0.1)]
                   transition-all duration-300 rounded-xl bg-white"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {/* Product Image */}
        <div className="relative aspect-[1/1.1] overflow-hidden">
          <img
            src={product.images[0]?.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {!product.in_stock && (
            <Badge className="absolute top-2 right-2 bg-destructive text-xs px-2 py-0.5">
              Out of Stock
            </Badge>
          )}
          {product.featured && product.in_stock && (
            <Badge className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-0.5">
              Featured
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <CardContent className="p-2 sm:p-3 flex flex-col gap-1.5">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-1 text-green-800">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          {/* Quantity + Price */}
          <div
            className="flex items-center justify-between gap-1 mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Select
              value={`${selectedQuantity.value}${selectedQuantity.unit}`}
              onValueChange={(value) => {
                const qty = product.quantities.find(
                  (q) => `${q.value}${q.unit}` === value
                );
                if (qty) setSelectedQuantity(qty);
              }}
            >
              <SelectTrigger className="w-20 h-7 text-xs sm:w-24 sm:h-8 sm:text-sm border-green-300 focus:ring-green-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-24">
                {product.quantities.map((qty) => (
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

            <span className="text-sm sm:text-base font-bold text-green-700">
              ₹{selectedQuantity.price}
            </span>
          </div>
        </CardContent>

        {/* Add to Cart / Quantity Controls */}
        <CardFooter className="px-2 pb-2 sm:px-3 sm:pb-3">
          {cartQty === 0 ? (
            <Button
              className="w-full flex items-center justify-center gap-1 sm:gap-2 
                         bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm py-2 sm:py-2.5"
              disabled={!product.in_stock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" /> Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={decrement}
                className="border-green-400 text-green-700 hover:bg-green-100 w-7 h-7 sm:w-9 sm:h-9"
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="text-sm sm:text-base font-semibold text-green-700">
                {cartQty}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={increment}
                className="border-green-400 text-green-700 hover:bg-green-100 w-7 h-7 sm:w-9 sm:h-9"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
