import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const imagesURLs = [
  "https://res.cloudinary.com/dg7ubxufe/image/upload/v1714022525/cld-sample-2.jpg",
  "https://res.cloudinary.com/dg7ubxufe/image/upload/v1714022525/cld-sample-3.jpg",
  "https://res.cloudinary.com/dg7ubxufe/image/upload/v1714022525/cld-sample-4.jpg",
  "https://res.cloudinary.com/dg7ubxufe/image/upload/v1714022525/cld-sample-5.jpg",
];

const images = [...imagesURLs, ...imagesURLs, ...imagesURLs].map(
  (url, index) => ({
    id: `${index + 1}`,
    src: url,
  }),
);

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  return (
    <main className="">
      Hello gallery app!
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {images.map(({ id, src }) => (
          <img key={id} src={src} className="w-48" />
        ))}
      </div>
    </main>
  );
}
