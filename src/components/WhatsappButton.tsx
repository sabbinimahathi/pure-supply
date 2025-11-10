// import { FaWhatsapp } from "react-icons/fa";
// import { useCart } from "@/hooks/useCart";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Tooltip,
//   TooltipTrigger,
//   TooltipContent,
// } from "@/components/ui/tooltip";

// export default function WhatsAppButton() {
//   const { items, promoCode, discount, getTotalPrice } = useCart();
//   const { toast } = useToast();
//   const phoneNumber = "919705947947"; // Replace with your WhatsApp number

//   const subtotal = items.reduce(
//     (total, item) => total + item.quantity.price * item.count,
//     0
//   );
//   const total = getTotalPrice();

//   const handleClick = () => {
//     // ✅ If cart empty — show toast and stop
//     if (items.length === 0) {
//       toast({
//         title: "Your cart is empty!",
//         description: "Add some products to order via WhatsApp.",
//       });
//       return;
//     }

//     // ✅ Build WhatsApp message
//     const message = `Hello! I would like to order:\n\n${items
//       .map(
//         (item) =>
//           `${item.product.name} (${item.quantity.value}${
//             item.quantity.unit
//           }) x ${item.count} = ₹${item.quantity.price * item.count}`
//       )
//       .join("\n")}\n\nSubtotal: ₹${subtotal}${
//       promoCode ? `\nPromo Code: ${promoCode} (-${discount}%)` : ""
//     }\n\nTotal: ₹${total.toFixed(2)}`;

//     const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <button
//           onClick={handleClick}
//           className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none"
//           aria-label="Chat on WhatsApp"
//         >
//           <FaWhatsapp size={28} />
//         </button>
//       </TooltipTrigger>

//       <TooltipContent side="left" className="bg-black text-white">
//         Chat or Checkout via WhatsApp
//       </TooltipContent>
//     </Tooltip>
//   );
// }
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function WhatsAppButton() {
  const { items, promoCode, discount, getTotalPrice } = useCart();
  const { toast } = useToast();
  const phoneNumber = "919705947947"; // Replace with your WhatsApp number

  const subtotal = items.reduce(
    (total, item) => total + item.quantity.price * item.count,
    0
  );
  const total = getTotalPrice();

  const handleClick = () => {
    let message = "";

    if (items.length === 0) {
      // 💬 If cart empty → allow message but simpler
      message = "Hi! I’d like to order something.";
    } else {
      // 🛒 If items exist → build full order message
      message = `Hello! I would like to order:\n\n${items
        .map(
          (item) =>
            `${item.product.name} (${item.quantity.value}${
              item.quantity.unit
            }) x ${item.count} = ₹${item.quantity.price * item.count}`
        )
        .join("\n")}\n\nSubtotal: ₹${subtotal}${
        promoCode ? `\nPromo Code: ${promoCode} (-${discount}%)` : ""
      }\n\nTotal: ₹${total.toFixed(2)}`;
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={28} />
        </button>
      </TooltipTrigger>

      <TooltipContent side="left" className="bg-black text-white">
        Chat or Checkout via WhatsApp
      </TooltipContent>
    </Tooltip>
  );
}
