import { Leaf, Heart, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-secondary/30 py-12">
        <div className="container">
          <h1 className="font-serif text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-muted-foreground">
            Your trusted source for premium organic products
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Elysian Emporium was founded with a simple mission: to bring pure, natural, and sustainably sourced organic products to every home. We believe that good health starts with what we consume, and that's why we're committed to providing only the finest organic products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Organic</h3>
              <p className="text-sm text-muted-foreground">
                Every product is certified organic and free from harmful chemicals
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Made with Love</h3>
              <p className="text-sm text-muted-foreground">
                Carefully sourced and processed with traditional methods
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                Rigorous quality checks ensure only the best reaches you
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3"></span>
                <span><strong>Sustainability:</strong> We prioritize eco-friendly practices and support local farmers</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3"></span>
                <span><strong>Transparency:</strong> Complete honesty about our sourcing and production methods</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3"></span>
                <span><strong>Quality:</strong> Never compromising on the purity and quality of our products</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3"></span>
                <span><strong>Customer First:</strong> Your health and satisfaction are our top priorities</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
