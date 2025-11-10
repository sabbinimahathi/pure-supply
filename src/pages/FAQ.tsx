// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// const FAQ = () => {
//   const faqs = [
//     {
//       question: "What are cold-pressed oils?",
//       answer:
//         "Cold-pressed oils are extracted using a traditional wooden press (Marachekku/Ghani) at low temperatures. This natural method helps retain the oil’s original aroma, nutrients, and antioxidants, unlike refined oils which are made using heat and chemicals.",
//     },
//     {
//       question: "Are Pure Supply oils organic?",
//       answer:
//         "Our oils are naturally extracted and completely free from chemicals and preservatives, but we do not claim them to be certified organic. We focus on offering oils that are 100% natural and chemical-free, made through traditional cold-press methods.",
//     },
//     {
//       question:
//         "What makes Pure Supply oils different from refined or market oils?",
//       answer:
//         "We use high-quality seeds, process them through wooden cold presses, and filter them naturally without adding chemicals. The result is a pure, nutrient-rich oil that retains its natural color, aroma, and flavor.",
//     },
//     {
//       question: "Why does cold-pressed oil have sediments at the bottom?",
//       answer:
//         "Sedimentation is a natural sign of authenticity. It happens because our oils are naturally extracted and only filtered, not refined or chemically processed. This ensures you get oil in its purest form.",
//     },
//     {
//       question: "How should I store cold-pressed oils?",
//       answer:
//         "Store your oil in a cool, dry place away from direct sunlight. Use airtight glass or steel containers to preserve freshness and prevent oxidation.",
//     },
//     {
//       question: "What other products do you offer besides cold-pressed oils?",
//       answer:
//         "Along with cold-pressed oils, we offer A2 Gir Cow Ghee, premium dry fruits, nutritious millets, freshly ground spices, and healthy rice varieties like Single Polish and HMT rice, directly sourced from trusted farmers.",
//     },
//     {
//       question: "Are your oils suitable for all types of cooking?",
//       answer:
//         "Absolutely! Our oils can be used for deep frying, sautéing, salad dressings, skincare, and traditional uses — depending on the oil type. Each oil retains its natural flavor and health benefits.",
//     },
//     {
//       question: "What is the customer feedback on your products?",
//       answer:
//         "We are proud to have maintained a 4.8/5 Google rating for over 7 years since our inception, reflecting the trust and satisfaction of thousands of happy customers.",
//     },
//     {
//       question: "How can I trust the purity of your products?",
//       answer:
//         "Our 90% repeat customer rate since 2018 is our strongest proof of quality. Every product is prepared in small batches, carefully checked, and naturally processed to deliver pure, fresh, and honest food products to your home.",
//     },
//     {
//       question: "How can I track my order?",
//       answer:
//         "After placing your order via WhatsApp, our team will provide you with tracking information and updates throughout the delivery process.",
//     },
//     {
//       question: "How do promo codes work?",
//       answer:
//         "Enter your promo code at checkout to receive discounts on your order. Promo codes have specific terms and validity periods. Check our announcements for current offers.",
//     },
//     {
//       question: "Do you deliver across India?",
//       answer:
//         "Yes, we have PAN-India delivery with applicable postal charges. We also offer free delivery within the west part of Hyderabad — with no minimum order quantity.",
//     },
//   ];

//   return (
//     <div className="min-h-screen">
//       <section className="bg-secondary/30 py-12">
//         <div className="container">
//           <h1 className="font-serif text-4xl font-bold mb-4">
//             Frequently Asked Questions
//           </h1>
//           <p className="text-lg text-muted-foreground">
//             Find answers to common questions about our products and services
//           </p>
//         </div>
//       </section>

//       <section className="container py-16">
//         <div className="max-w-3xl mx-auto">
//           <Accordion type="single" collapsible className="w-full">
//             {faqs.map((faq, index) => (
//               <AccordionItem key={index} value={`item-${index}`}>
//                 <AccordionTrigger className="text-left">
//                   {faq.question}
//                 </AccordionTrigger>
//                 <AccordionContent className="text-muted-foreground">
//                   {faq.answer}
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FAQ;
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What are cold-pressed oils?",
      answer:
        "Cold-pressed oils are extracted using a traditional wooden press (Marachekku/Ghani) at low temperatures. This natural method helps retain the oil’s original aroma, nutrients, and antioxidants, unlike refined oils which are made using heat and chemicals.",
    },
    {
      question: "Are Pure Supply oils organic?",
      answer:
        "Our oils are naturally extracted and completely free from chemicals and preservatives, but we do not claim them to be certified organic. We focus on offering oils that are 100% natural and chemical-free, made through traditional cold-press methods.",
    },
    {
      question:
        "What makes Pure Supply oils different from refined or market oils?",
      answer:
        "We use high-quality seeds, process them through wooden cold presses, and filter them naturally without adding chemicals. The result is a pure, nutrient-rich oil that retains its natural color, aroma, and flavor.",
    },
    {
      question: "Why does cold-pressed oil have sediments at the bottom?",
      answer:
        "Sedimentation is a natural sign of authenticity. It happens because our oils are naturally extracted and only filtered, not refined or chemically processed. This ensures you get oil in its purest form.",
    },
    {
      question: "How should I store cold-pressed oils?",
      answer:
        "Store your oil in a cool, dry place away from direct sunlight. Use airtight glass or steel containers to preserve freshness and prevent oxidation.",
    },
    {
      question: "What other products do you offer besides cold-pressed oils?",
      answer:
        "Along with cold-pressed oils, we offer A2 Gir Cow Ghee, premium dry fruits, nutritious millets, freshly ground spices, and healthy rice varieties like Single Polish and HMT rice, directly sourced from trusted farmers.",
    },
    {
      question: "Are your oils suitable for all types of cooking?",
      answer:
        "Absolutely! Our oils can be used for deep frying, sautéing, salad dressings, skincare, and traditional uses — depending on the oil type. Each oil retains its natural flavor and health benefits.",
    },
    {
      question: "What is the customer feedback on your products?",
      answer:
        "We are proud to have maintained a 4.8/5 Google rating for over 7 years since our inception, reflecting the trust and satisfaction of thousands of happy customers.",
    },
    {
      question: "How can I trust the purity of your products?",
      answer:
        "Our 90% repeat customer rate since 2018 is our strongest proof of quality. Every product is prepared in small batches, carefully checked, and naturally processed to deliver pure, fresh, and honest food products to your home.",
    },
    {
      question: "How can I track my order?",
      answer:
        "After placing your order via WhatsApp, our team will provide you with tracking information and updates throughout the delivery process.",
    },
    {
      question: "How do promo codes work?",
      answer:
        "Enter your promo code at checkout to receive discounts on your order. Promo codes have specific terms and validity periods. Check our announcements for current offers.",
    },
    {
      question: "Do you deliver across India?",
      answer:
        "Yes, we have PAN-India delivery with applicable postal charges. We also offer free delivery within the west part of Hyderabad — with no minimum order quantity.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 🌿 Hero Section */}
      <section className="py-16 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            Get all your doubts clarified about our natural, eco-friendly
            products and services 🌱
          </p>
        </motion.div>

        {/* Decorative soft green blur background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-100/40 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* 💬 FAQ Section */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md shadow-md border border-green-100 rounded-2xl p-6 sm:p-10"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-green-100"
              >
                <AccordionTrigger className="text-left text-green-800 font-medium hover:text-green-700 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-green-700/90 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* 🌱 Decorative bottom section */}
      <div className="pb-12 text-center text-green-700 text-sm">
        <p>
          🌿 We’re always here to help — reach us on WhatsApp for any query!
        </p>
      </div>
    </div>
  );
};

export default FAQ;
