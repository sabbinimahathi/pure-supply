// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "./ui/button";
// import { bannerImages } from "@/data/products";

// const BannerCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   const goToPrevious = () => {
//     setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
//   };

//   const goToNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
//   };

//   return (
//     <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
//       {bannerImages.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-500 ${
//             index === currentIndex ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <img
//             src={image}
//             alt={`Banner ${index + 1}`}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       ))}

//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={goToPrevious}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
//       >
//         <ChevronLeft className="h-6 w-6" />
//       </Button>

//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={goToNext}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
//       >
//         <ChevronRight className="h-6 w-6" />
//       </Button>

//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//         {bannerImages.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentIndex ? "bg-primary w-8" : "bg-background/50"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BannerCarousel;

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

interface Banner {
  id: number;
  image: string;
  link?: string; // optional if you want banners clickable
}

const BannerCarousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiBaseUrl}/api/banners/`);
        setBanners(response.data.results);
      } catch (error) {
        console.error("Failed to fetch banners", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  if (loading) return <p className="text-center py-12">Loading banners...</p>;
  if (banners.length === 0)
    return <p className="text-center py-12">No banners found.</p>;

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={banner.image}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-primary w-8" : "bg-background/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
