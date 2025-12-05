const axios = require("axios");
const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

async function generateSitemap() {
  const smStream = new SitemapStream({
    hostname: "https://puresupply.in"
  });

  const writeStream = createWriteStream("./public/sitemap.xml");
  smStream.pipe(writeStream);

  // STATIC ROUTES
  const staticRoutes = [
    "/", 
    "/products",
    "/about",
    "/contact",
    "/faq"
  ];
  staticRoutes.forEach((route) => smStream.write({ url: route }));

  // DYNAMIC PRODUCT ROUTES
  try {
    const response = await axios.get("https://api.puresupply.in/api/products/");
    const products = response.data;

    products.forEach((product) => {
      smStream.write({ url: `/product/${product.id}` });
    });
  } catch (err) {
    console.error("Error fetching product list:", err.message);
  }

  smStream.end();
  await streamToPromise(smStream);

  console.log("Sitemap generated: /public/sitemap.xml");
}

generateSitemap();
