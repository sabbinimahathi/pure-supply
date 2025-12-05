const axios = require("axios");
const fs = require("fs");

async function generate() {
  const baseUrl = "https://www.puresupply.in";

  // Fetch products from your Django API
  let products = [];
  try {
    const res = await axios.get("https://api.puresupply.in/api/products/");
    // API returns an object with 'results' array
    products = Array.isArray(res.data.results) ? res.data.results : [];
    console.log(`Fetched ${products.length} products for sitemap.`);
  } catch (err) {
    console.error("Failed to fetch products:", err.message);
    products = []; // fallback to empty array
  }

  // Static pages
  const staticPages = [
    "",
    "/products",
    "/about",
    "/contact",
    "/faq"
  ];

  // Dynamic product pages
  const productPages = products.map((p) => `/product/${p.id}`);

  const urls = [...staticPages, ...productPages];

  // Generate sitemap XML
  const xml = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${baseUrl}${url}</loc>
  </url>`
  )
  .join("")}
</urlset>`.trim();

  // Ensure 'dist' exists (important for Vercel deployments)
  if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
  }

  // Write sitemap to file
  //fs.writeFileSync("./dist/sitemap.xml", xml);
  fs.writeFileSync("./public/sitemap.xml", xml);
  console.log("✔ Sitemap generated successfully!");
}

generate();
