import { GetStaticProps } from 'next';
import { getAllPosts } from '../utils/mdxUtils';
import Link from 'next/link';

type Post = {
  slug: string;
  title: string;
};

type HomeProps = {
  posts: Post[];
};

export default function Home({ posts }: HomeProps) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/${post.slug}`}>{post.title}</a>
          </li>
          
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
};
