// import { Link, useLocation } from "react-router-dom";
// import { ShoppingCart, Menu, X } from "lucide-react";
// import { Button } from "./ui/button";
// import { useCart } from "@/hooks/useCart";
// import { useState } from "react";
// import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

// const Header = () => {
//   const location = useLocation();
//   const totalItems = useCart((state) => state.getTotalItems());
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navLinks = [
//     { path: "/", label: "Home" },
//     { path: "/products", label: "Products" },
//     { path: "/faq", label: "FAQ" },
//     { path: "/contact", label: "Contact Us" },
//     { path: "/about", label: "About Us" },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="flex items-center space-x-2">
//           <h1 className="font-serif text-2xl font-bold text-primary">
//             Pure Supply
//           </h1>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-6">
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               className={`text-sm font-medium transition-colors hover:text-primary ${
//                 isActive(link.path) ? "text-primary" : "text-muted-foreground"
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="flex items-center gap-2">
//           {/* Cart Icon */}
//           <Link to="/cart">
//             <Button variant="ghost" size="icon" className="relative">
//               <ShoppingCart className="h-5 w-5" />
//               {totalItems > 0 && (
//                 <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs font-bold flex items-center justify-center text-accent-foreground">
//                   {totalItems}
//                 </span>
//               )}
//             </Button>
//           </Link>

//           {/* Mobile Menu */}
//           <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
//             <SheetTrigger asChild className="md:hidden">
//               <Button variant="ghost" size="icon">
//                 {mobileMenuOpen ? (
//                   <X className="h-5 w-5" />
//                 ) : (
//                   <Menu className="h-5 w-5" />
//                 )}
//               </Button>
//             </SheetTrigger>
//             <SheetContent
//               side="right"
//               className="w-[300px] p-6 transition-transform duration-300 ease-in-out"
//             >
//               {/* Overlay handled by Sheet internally */}
//               <nav className="flex flex-col space-y-4 mt-8">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.path}
//                     to={link.path}
//                     onClick={() => setMobileMenuOpen(false)}
//                     className={`text-lg font-medium transition-colors hover:text-primary ${
//                       isActive(link.path)
//                         ? "text-primary"
//                         : "text-muted-foreground"
//                     }`}
//                   >
//                     {link.label}
//                   </Link>
//                 ))}
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
// 🖼️ Optional: import your logo if it's in src/assets
// import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();
  const totalItems = useCart((state) => state.getTotalItems());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/faq", label: "FAQ" },
    { path: "/contact", label: "Contact Us" },
    { path: "/about", label: "About Us" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo + Brand Name */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo.jpg" // ✅ if logo is in public folder; use `logo` variable if imported
            alt="Pure Supply Logo"
            className="h-10 w-10 rounded-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <h1 className="font-serif text-2xl font-bold text-primary">
            Pure Supply
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.path) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Cart Icon */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs font-bold flex items-center justify-center text-accent-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] p-6 transition-transform duration-300 ease-in-out"
            >
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive(link.path)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
