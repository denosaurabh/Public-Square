import { NextSeo } from "next-seo";

const SEO: React.FC = () => {
  return (
    <NextSeo
      title="Public Square"
      description="Place where Artists, Philosophers and Engineers can meet together to form a better world"
      canonical="https://publicsquare.vercel.app"
      openGraph={{
        url: "https://publicsquare.vercel.app",
        title: "Public Square",
        description:
          "Place where Artists, Philosophers and Engineers can meet together to form a better world",
        images: [
          {
            url: "/img/seo.webp",
            width: 1920,
            height: 1080,
            alt: "Public Square's Website",
          },
        ],
        site_name: "Public Square",
      }}
      twitter={{
        handle: "@denosaurabh",
        site: "@denosaurabh",
        cardType: "summary_large_image",
      }}
    />
  );
};

export default SEO;
