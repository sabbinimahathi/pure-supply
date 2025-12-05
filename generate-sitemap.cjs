const axios = require("axios");
const fs = require("fs");

async function generate() {
  const baseUrl = "https://www.puresupply.in";

  // Fetch products from your Django API
  let products = [];
  try {
    const res = await axios.get("https://api.puresupply.in/products/");
    products = res.data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }

  const staticPages = [
    "",
    "/products",
    "/about",
    "/contact",
    "/faq"
  ];

  const productPages = products.map((p) => `/product/${p.id}`);

  const urls = [...staticPages, ...productPages];

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

  // ensure dist exists (important for Vercel)
  if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
  }

  fs.writeFileSync("./dist/sitemap.xml", xml);
  console.log("✔ Sitemap generated successfully!");
}

generate();
