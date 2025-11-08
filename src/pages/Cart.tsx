import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    items,
    removeItem,
    updateItemCount,
    promoCode,
    discount,
    applyPromoCode,
    removePromoCode,
    getTotalPrice,
    clearCart,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.quantity.price * item.count,
    0
  );

  // Total after discount
  const total = getTotalPrice();

  // -----------------------------
  // Validate promo code from Django
  // -----------------------------
  const handleApplyPromo = async () => {
    if (!promoInput) return;

    try {
      const res = await axios.post(
        "https://web-production-fe5b6.up.railway.app/api/promocodes/validate/",
        {
          code: promoInput.toUpperCase(),
        }
      );

      if (res.data.valid) {
        applyPromoCode(promoInput.toUpperCase(), res.data.discount);
        toast({
          title: "Promo code applied!",
          description: `You got ${res.data.discount}% discount`,
        });
        setPromoInput("");
      } else {
        toast({
          title: res.data.message || "Invalid promo code",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Invalid promo code",
        variant: "destructive",
      });
    }
  };

  //   const handleCheckout = () => {
  //     if (items.length === 0) return;

  //     // Determine dynamic column widths
  //     const nameWidth = Math.max(
  //       "Product".length,
  //       ...items.map((item) => item.product.name.length)
  //     );
  //     const qtyWidth = Math.max(
  //       "Qty".length,
  //       ...items.map(
  //         (item) =>
  //           `${item.quantity.value}${item.quantity.unit} x${item.count}`.length
  //       )
  //     );
  //     const priceWidth = Math.max(
  //       "Price".length,
  //       ...items.map((item) => `₹${item.quantity.price * item.count}`.length)
  //     );

  //     const repeat = (char, count) => char.repeat(count);

  //     // Table header
  //     const header = `┌${repeat("─", nameWidth + 2)}┬${repeat(
  //       "─",
  //       qtyWidth + 2
  //     )}┬${repeat("─", priceWidth + 2)}┐
  // │ ${"Product".padEnd(nameWidth)} │ ${"Qty".padEnd(qtyWidth)} │ ${"Price".padEnd(
  //       priceWidth
  //     )} │
  // ├${repeat("─", nameWidth + 2)}┼${repeat("─", qtyWidth + 2)}┼${repeat(
  //       "─",
  //       priceWidth + 2
  //     )}┤`;

  //     // Table rows
  //     const rows = items
  //       .map((item) => {
  //         const productName = item.product.name.padEnd(nameWidth, " ");
  //         const quantity =
  //           `${item.quantity.value}${item.quantity.unit} x${item.count}`.padEnd(
  //             qtyWidth,
  //             " "
  //           );
  //         const price = `₹${item.quantity.price * item.count}`.padEnd(
  //           priceWidth,
  //           " "
  //         );
  //         return `│ ${productName} │ ${quantity} │ ${price} │`;
  //       })
  //       .join("\n");

  //     // Table footer
  //     const footer = `└${repeat("─", nameWidth + 2)}┴${repeat(
  //       "─",
  //       qtyWidth + 2
  //     )}┴${repeat("─", priceWidth + 2)}┘`;

  //     // Only show discount if applied
  //     const extraInfo = promoCode ? `Discount Applied: -${discount}%` : "";

  //     // Wrap entire table in triple backticks for monospace in WhatsApp
  //     const message = `Hello! I would like to order:\n\n\`\`\`
  // ${header}
  // ${rows}
  // ${footer}\`\`\`${
  //       extraInfo ? `\n\n${extraInfo}` : ""
  //     }\n\nTotal: ₹${total.toFixed(2)}`;

  //     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  //     window.open(whatsappUrl, "_blank");
  //   };
  const handleCheckout = () => {
    if (items.length === 0) return;

    // Calculate total
    const totalAmount = items.reduce(
      (sum, item) => sum + item.quantity.price * item.count,
      0
    );

    // Build order lines
    const orderLines = items
      .map((item, index) => {
        const name = item.product.name;
        const qty = `${item.quantity.value}${item.quantity.unit} x${item.count}`;
        const price = `₹${item.quantity.price * item.count}`;
        return `${index + 1}. *${name}*\n   Qty: ${qty}\n   Price: ${price}`;
      })
      .join("\n\n");

    // Discount info (optional)
    const discountInfo = promoCode ? `\nDiscount Applied: -${discount}%` : "";

    // Final WhatsApp message
    const message = `Hello! I would like to order:\n\n${orderLines}${discountInfo}\n\n*Total:* ₹${totalAmount.toFixed(
      2
    )}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some products to get started!
          </p>
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
                      src={item.product.images[0]?.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {item.product.name}
                      </h3>
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
                            updateItemCount(
                              item.product.id,
                              item.quantity.value,
                              item.count - 1
                            )
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
                            updateItemCount(
                              item.product.id,
                              item.quantity.value,
                              item.count + 1
                            )
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg mb-2">
                        ₹{item.quantity.price * item.count}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          removeItem(item.product.id, item.quantity.value)
                        }
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
                    <span>
                      ₹
                      {promoCode
                        ? (subtotal * (1 - discount / 100)).toFixed(2)
                        : total.toFixed(2)}
                    </span>
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
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={removePromoCode}
                    >
                      Remove Promo Code
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleApplyPromo}
                    >
                      Apply Code
                    </Button>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Checkout via WhatsApp
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate("/products")}
                >
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
