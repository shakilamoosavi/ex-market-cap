import FormattedDate from "@/components/FormattedDate";
import { Metadata } from "next";

// -------------------------------------------------------
// MOCK API CALL
// -------------------------------------------------------
async function fetchNewsDetail(id: string) {
  await new Promise((r) => setTimeout(r, 300));

  return {
    id,
    title: `Breaking News: Sample Article #${id}`,
    image: `https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=80`,
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Phasellus et sem sed sapien gravida placerat. Nam nec ultrices dui.
      Curabitur commodo, sapien sed facilisis gravida, lacus est dictum massa,
      a mattis velit justo non urna.

      In hac habitasse platea dictumst. Duis convallis nunc vitae ipsum 
      tristique, eget tincidunt massa gravida. Integer vitae nibh ac nisi 
      ullamcorper pellentesque. Sed id luctus lorem.

      Sed at varius elit. Vivamus ut urna ut urna tempor consequat.
      `.repeat(3),

    publishedAt: new Date().toISOString(),
    author: "John Doe",
    description: "A beautifully styled sample article for demonstration and SEO purposes."
  };
}

// -------------------------------------------------------
// SEO - FIXED VERSION (NO INVALID KEYS)
// -------------------------------------------------------
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await fetchNewsDetail(params.id);

  return {
    title: data.title,
    description: data.description,

    openGraph: {
      type: "article",           // ✔ valid
      title: data.title,         // ✔ valid
      description: data.description,
      images: [
        {
          url: data.image,       // ✔ must be object, not string
          width: 1200,
          height: 630,
          alt: data.title,
        }
      ]
    }
  };
}

// -------------------------------------------------------
// PAGE COMPONENT (SERVER COMPONENT)
// -------------------------------------------------------
export default async function NewsDetailPage({ params }: any) {
  const data = await fetchNewsDetail(params.id);

  return (
    <div className="-mt-4 w-full pb-20">

      {/* HEADER IMAGE WITH OVERLAY */}
      <div className="relative h-[360px] w-full overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

        {/* Title on top of image */}
        <div className="absolute bottom-8 left-8 text-white max-w-2xl">
          <h1 className="text-4xl font-extrabold leading-snug drop-shadow-lg">
            {data.title}
          </h1>

          <p className="text-gray-200 mt-3 text-sm">
            By {data.author} • <FormattedDate iso={data.publishedAt} />
          </p>
        </div>
      </div>

      {/* ARTICLE CARD */}
      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <article className="prose prose-neutral max-w-none leading-7 text-[16px]">
          {data.content.split("\n").map((line, i) => (
            <p key={i}>{line.trim()}</p>
          ))}
        </article>
      </div>
    </div>
  );
}
