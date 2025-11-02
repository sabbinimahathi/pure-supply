import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Are all your products certified organic?",
      answer: "Yes, all our products are 100% certified organic. We source directly from certified organic farms and ensure rigorous quality checks throughout our supply chain.",
    },
    {
      question: "How do I place an order?",
      answer: "Browse our products, add items to your cart, and proceed to checkout. You'll be redirected to WhatsApp where you can complete your order with our team.",
    },
    {
      question: "What are your delivery areas?",
      answer: "We currently deliver across major cities in India. Delivery times vary based on your location, typically ranging from 3-7 business days.",
    },
    {
      question: "How do promo codes work?",
      answer: "Enter your promo code at checkout to receive discounts on your order. Promo codes have specific terms and validity periods. Check our announcements for current offers.",
    },
    {
      question: "What is your return policy?",
      answer: "We offer returns within 7 days of delivery if the product is unused and in original packaging. For damaged or defective products, please contact us immediately with photos.",
    },
    {
      question: "How should I store the products?",
      answer: "Store oils and ghee in a cool, dry place away from direct sunlight. Dry fruits and seeds should be kept in airtight containers. Refer to individual product labels for specific storage instructions.",
    },
    {
      question: "What is A2 Gir Cow Ghee?",
      answer: "A2 ghee is made from the milk of indigenous Gir cows, which produces A2 beta-casein protein. It's easier to digest and made using traditional bilona method for maximum nutritional benefits.",
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer special prices for bulk orders. Please contact us via WhatsApp with your requirements for a custom quote.",
    },
    {
      question: "Are your products suitable for cooking?",
      answer: "Absolutely! Our cold-pressed oils, ghee, and spices are perfect for cooking. They retain their natural nutrients and flavors, making your meals healthier and tastier.",
    },
    {
      question: "How can I track my order?",
      answer: "After placing your order via WhatsApp, our team will provide you with tracking information and updates throughout the delivery process.",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-secondary/30 py-12">
        <div className="container">
          <h1 className="font-serif text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our products and services
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
