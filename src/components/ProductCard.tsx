// import { Product } from "@/types/product";
// import { Card, CardContent, CardFooter } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { Link } from "react-router-dom";

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   return (
//     <Link to={`/product/${product.id}`}>
//       <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
//         <div className="relative aspect-square overflow-hidden">
//           <img
//             src={product.images[0]}
//             alt={product.name}
//             className="w-full h-full object-cover transition-transform hover:scale-105"
//           />
//           {!product.inStock && (
//             <Badge className="absolute top-2 right-2 bg-destructive">
//               Out of Stock
//             </Badge>
//           )}
//           {product.featured && product.inStock && (
//             <Badge className="absolute top-2 right-2 bg-accent">Featured</Badge>
//           )}
//         </div>
//         <CardContent className="pt-4">
//           <h3 className="font-semibold text-lg mb-2 line-clamp-1">
//             {product.name}
//           </h3>
//           <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
//             {product.description}
//           </p>
//           <div className="flex items-center justify-between">
//             <span className="text-lg font-bold text-primary">
//               ₹{product.quantities[0].price}
//             </span>
//             <span className="text-xs text-muted-foreground">
//               {product.quantities[0].value}
//               {product.quantities[0].unit}
//             </span>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button className="w-full" disabled={!product.inStock}>
//             {product.inStock ? "View Details" : "Out of Stock"}
//           </Button>
//         </CardFooter>
//       </Card>
//     </Link>
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
    e.stopPropagation(); // Prevent navigation
    if (!product || !selectedQuantity) return;
    addItem(product, selectedQuantity);
    setCartQty(1);
  };

  const increment = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product || !selectedQuantity) return;
    addItem(product, selectedQuantity);
    setCartQty((prev) => prev + 1);
  };

  const decrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartQty > 1) {
      if (product && selectedQuantity) addItem(product, selectedQuantity);
      setCartQty((prev) => prev - 1);
    } else {
      setCartQty(0); // Reset to Add to Cart button
    }
  };

  return (
    <Card
      className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]?.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {!product.in_stock && (
          <Badge className="absolute top-2 right-2 bg-destructive">
            Out of Stock
          </Badge>
        )}
        {product.featured && product.in_stock && (
          <Badge className="absolute top-2 right-2 bg-accent">Featured</Badge>
        )}
      </div>

      <CardContent className="pt-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Size Dropdown + Price */}
        <div className="flex items-center justify-between gap-2 mt-1">
          <Select
            value={`${selectedQuantity.value}${selectedQuantity.unit}`}
            onValueChange={(value) => {
              const qty = product.quantities.find(
                (q) => `${q.value}${q.unit}` === value
              );
              if (qty) setSelectedQuantity(qty);
            }}
          >
            <SelectTrigger className="w-24 h-8 text-sm">
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

          {/* Price Display */}
          <span className="text-lg font-bold text-primary">
            ₹{selectedQuantity.price}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        {cartQty === 0 ? (
          <Button
            className="w-full flex items-center justify-center gap-2"
            disabled={!product.in_stock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" /> Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={decrement}
              className="flex items-center justify-center"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold">{cartQty}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={increment}
              className="flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
