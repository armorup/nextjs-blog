import Link from 'next/link'
import { createClient } from 'edgedb';
import e from '~/dbschema/edgeql-js';

type Post = {
  id: string
  title: string
  content: string
}

const client = createClient();

export default async function Home() {
  // const posts: Post[] = [
  //   {
  //     id: 'post1',
  //     title: 'This one weird trick makes using databases fun',
  //     content: 'Use EdgeDB',
  //   },
  //   {
  //     id: 'post2',
  //     title: 'How to build a blog with EdgeDB and Next.js',
  //     content: "Start by scaffolding our app with `create-next-app`.",
  //   },
  // ]
  // const posts = await client.query<Post>(`\
  //  select BlogPost {
  //    id,
  //    title,
  //    content
  // };`)

  const selectPosts = e.select(e.BlogPost, () => ({
    id: true,
    title: true,
    content: true,
  }));
  const posts = await selectPosts.run(client);

  return (
    <div className="container mx-auto p-4 bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className="mb-4"
          >
            <Link
              href={`/post/${post.id}`}
              className="text-blue-500"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}