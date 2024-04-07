import { NextApiResponse } from "next";
import { getGuides } from "../lib/Database/guides";
import IGuide from "../interfaces/IGuide";

const generateSitemap = (guides: IGuide[], origin: string) => {
  let xml = "";

  guides.map((guide) => {
    xml += `<url>
      <loc>${origin + "/guides/" + guide.link}</loc>
      <lastmod>${guide.modified_at}</lastmod>
    </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://guidesubaruquebec.com/</loc>
      <lastmod>2024-04-07T17:59:40+00:00</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://guidesubaruquebec.com/garages</loc>
      <lastmod>2024-04-07T17:59:40+00:00</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://guidesubaruquebec.com/guides</loc>
      <lastmod>2024-04-07T17:59:40+00:00</lastmod>
      <priority>0.80</priority>
    </url>
      ${xml}
    </urlset>`;
};

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const guides = await getGuides();

  res.setHeader("Content-Type", "text/xml");
  res.write(generateSitemap(guides ?? [], "https://guidesubaruquebec.com"));
  res.end();

  return {
    props: {},
  };
}

const SitemapIndex = () => null;
export default SitemapIndex;
