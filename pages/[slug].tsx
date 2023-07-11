import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostBySlug, getAllPosts } from '../utils/mdxUtils';

type Post = {
  slug: string;
  title: string;
  content: string;
};

type BlogProps = {
  post: Post;
};

export default function Blog({ post }: BlogProps) {
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);

  return {
    props: {
      post,
    },
  };
};
