import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { promoCodes } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, removeItem, updateItemCount, promoCode, discount, applyPromoCode, removePromoCode, getTotalPrice, clearCart } = useCart();
  const [promoInput, setPromoInput] = useState("");

  const subtotal = items.reduce((total, item) => total + item.quantity.price * item.count, 0);
  const total = getTotalPrice();

  const handleApplyPromo = () => {
    const code = promoCodes.find((c) => c.code === promoInput.toUpperCase() && c.active);
    if (code) {
      applyPromoCode(code.code, code.discount);
      toast({
        title: "Promo code applied!",
        description: `You got ${code.discount}% discount`,
      });
      setPromoInput("");
    } else {
      toast({
        title: "Invalid promo code",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    const message = `Hello! I would like to order:\n\n${items
      .map((item) => `${item.product.name} (${item.quantity.value}${item.quantity.unit}) x ${item.count} = ₹${item.quantity.price * item.count}`)
      .join("\n")}\n\nSubtotal: ₹${subtotal}${promoCode ? `\nPromo Code: ${promoCode} (-${discount}%)` : ""}\n\nTotal: ₹${total.toFixed(2)}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started!</p>
          <Button onClick={() => navigate("/products")}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="container py-12">
        <h1 className="font-serif text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.product.id}-${item.quantity.value}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.quantity.value}
                        {item.quantity.unit}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateItemCount(item.product.id, item.quantity.value, item.count - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center">{item.count}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateItemCount(item.product.id, item.quantity.value, item.count + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg mb-2">₹{item.quantity.price * item.count}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.product.id, item.quantity.value)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                {promoCode && (
                  <div className="flex justify-between text-primary">
                    <span>Discount ({promoCode})</span>
                    <span>-{discount}%</span>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="Promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    disabled={!!promoCode}
                  />
                  {promoCode ? (
                    <Button variant="outline" className="w-full" onClick={removePromoCode}>
                      Remove Promo Code
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={handleApplyPromo}>
                      Apply Code
                    </Button>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Checkout via WhatsApp
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => navigate("/products")}>
                  Continue Shopping
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
