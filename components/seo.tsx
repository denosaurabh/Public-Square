import { NextSeo } from "next-seo";

const SEO: React.FC = () => {
  return (
    <NextSeo
      title="Public Square"
      description="Place where Artists, Philosophers and Engineers can meet together to form better world"
      canonical="https://publicsquare.vercel.app/"
      openGraph={{
        url: "https://publicsquare.vercel.app/",
        title: "Public Square",
        description:
          "Place where Artists, Philosophers and Engineers can meet together to form better world",
        images: [],
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
