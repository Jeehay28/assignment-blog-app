import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllPosts } from '../utils/mdxUtils';

type BlogPost = {
  slug: string;
  title: string;
};

type HomeProps = {
  posts: BlogPost[];
};

export default function Home({ posts }: HomeProps) {

  console.log(posts)
  return (
    <div>
      <h1>Blog Posts</h1>
      
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
           <Link href={`/${post.slug.replace('.md', '')}`}>
              {post.title}
          </Link>

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
