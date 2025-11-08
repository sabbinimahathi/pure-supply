import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BannerCarousel from "@/components/BannerCarousel";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Leaf, Shield, Truck } from "lucide-react";
import axios from "axios";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://web-production-fe5b6.up.railway.app/api/products/?featured=true"
        );
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="container py-8">
        <BannerCarousel />
      </section>

      {/* Features */}
      <section className="bg-secondary/30 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Organic</h3>
              <p className="text-sm text-muted-foreground">
                All products are certified organic and naturally sourced
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                Rigorous quality checks ensure premium products
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Quick and secure delivery to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-2">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Handpicked premium products for you
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-center py-12">Loading featured products...</p>
        ) : featuredProducts.length === 0 ? (
          <p className="text-center py-12">No featured products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Experience Pure, Natural Goodness
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of happy customers who trust us for their organic
            needs
          </p>
          <Link to="/products">
            <Button size="lg" variant="secondary">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
