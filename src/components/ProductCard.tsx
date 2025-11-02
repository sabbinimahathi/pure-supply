import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          {!product.inStock && (
            <Badge className="absolute top-2 right-2 bg-destructive">
              Out of Stock
            </Badge>
          )}
          {product.featured && product.inStock && (
            <Badge className="absolute top-2 right-2 bg-accent">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="pt-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ₹{product.quantities[0].price}
            </span>
            <span className="text-xs text-muted-foreground">
              {product.quantities[0].value}
              {product.quantities[0].unit}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={!product.inStock}>
            {product.inStock ? "View Details" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
