import { Leaf, Heart, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-secondary/30 py-12">
        <div className="container">
          <h1 className="font-serif text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-muted-foreground">
            Your trusted source for premium organic and cold-pressed products
          </p>
        </div>
      </section>

      {/* About Story Section */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Our Story */}
          <div>
            <h2 className="font-serif text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Welcome to <strong>PureSupply Cold Press Oils</strong> — where
              purity meets tradition! Founded in <strong>2018</strong> by{" "}
              <strong>Raghuvamshi</strong>, an Agricultural Engineering graduate
              with a deep passion for healthy living, PureSupply began with a
              simple mission — to bring back the age-old tradition of using{" "}
              <strong>pure, natural, wood-pressed oils</strong> in every
              kitchen.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At a time when refined and adulterated oils flooded the market, we
              wanted to offer people a healthier alternative — oils that are{" "}
              <strong>100% natural, chemical-free, and nutrient-rich</strong>,
              just the way nature intended. Using the traditional{" "}
              <strong>wooden cold-press (Marachekku/Ghani)</strong> method, we
              extract oils at low temperatures to preserve their original aroma,
              flavor, and vital nutrients.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Thanks to our customers’ trust, PureSupply has grown steadily with{" "}
              <strong>over 90% repeat customers</strong> since inception — a
              true reflection of our commitment to{" "}
              <strong>quality, honesty,</strong> and <strong>purity.</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              During the COVID-19 pandemic, we expanded our product range to
              include <strong>premium-quality dry fruits</strong>, nutritious
              millets, and <strong>pure A2 Gir Cow Ghee</strong> — ensuring our
              customers always have access to healthy, natural foods.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Later, we introduced a range of{" "}
              <strong>freshly ground spices</strong>, adding authentic taste and
              aroma to every Indian kitchen. And now, in <strong>2025</strong>,
              we’ve taken another step forward — offering high-quality{" "}
              <strong>rice varieties</strong> such as Single Polish, HMT, and
              other traditional varieties directly sourced from trusted farmers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, <strong>PureSupply</strong> stands for{" "}
              <strong>purity, transparency, and wellness</strong> — delivering
              farm-fresh{" "}
              <strong>
                cold-pressed oils, millets, dry fruits, A2 ghee, spices,
              </strong>{" "}
              and <strong>rice</strong> right to your doorstep.
            </p>
          </div>

          {/* Icons Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Organic</h3>
              <p className="text-sm text-muted-foreground">
                Every product is certified organic and free from harmful
                chemicals
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Made with Love</h3>
              <p className="text-sm text-muted-foreground">
                Carefully sourced and processed using traditional wooden presses
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                Rigorous checks ensure only the purest and most natural products
                reach your home
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h2 className="font-serif text-3xl font-bold mb-4">
              Our Vision & Values
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our vision is simple — to make every Indian home healthier, one
              drop of pure oil and one grain of goodness at a time. These core
              values drive everything we do:
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3"></span>
                <span>
                  <strong>Sustainability:</strong> We prioritize eco-friendly
                  practices and support local farmers to encourage natural
                  agriculture.
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3"></span>
                <span>
                  <strong>Transparency:</strong> Complete honesty about our
                  sourcing, processing, and production methods.
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3"></span>
                <span>
                  <strong>Quality:</strong> Never compromising on purity and
                  maintaining the highest standards at every step.
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3"></span>
                <span>
                  <strong>Customer First:</strong> Your health, satisfaction,
                  and trust are at the heart of everything we do.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
