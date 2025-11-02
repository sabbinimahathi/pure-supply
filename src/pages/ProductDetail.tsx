import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { QuantityOption } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = products.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState<QuantityOption | null>(null);
  const addItem = useCart((state) => state.addItem);

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedQuantity) {
      toast({
        title: "Please select a quantity",
        variant: "destructive",
      });
      return;
    }

    addItem(product, selectedQuantity);
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedQuantity.value}${selectedQuantity.unit})`,
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

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
                src={product.images[currentImageIndex]}
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
              {product.images.map((image, index) => (
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
                    src={image}
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
              {!product.inStock ? (
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

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Select Quantity
                </label>
                <Select
                  onValueChange={(value) => {
                    const quantity = product.quantities.find(
                      (q) => `${q.value}${q.unit}` === value
                    );
                    setSelectedQuantity(quantity || null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.quantities.map((quantity) => (
                      <SelectItem
                        key={`${quantity.value}${quantity.unit}`}
                        value={`${quantity.value}${quantity.unit}`}
                      >
                        {quantity.value}
                        {quantity.unit} - ₹{quantity.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedQuantity && (
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{selectedQuantity.price}
                    </span>
                  </div>
                </div>
              )}

              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
