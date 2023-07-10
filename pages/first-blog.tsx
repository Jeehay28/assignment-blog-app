import { GetStaticProps } from 'next';
import matter from 'gray-matter';
import { promises as fs } from 'fs';
import { join } from 'path';

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

type FirstBlogProps = {
  post: BlogPost;
};

export default function FirstBlog({ post }: FirstBlogProps) {
  return (
    <div>
      <h1>{post.title}</h1>
      <h2>{post.date}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<FirstBlogProps> = async () => {
  const filePath = join(process.cwd(), '_posts', 'first-blog.md');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    props: {
      post: {
        slug: 'first-blog',
        title: data.title,
        date: data.date.toISOString().split('T')[0],
        content,
      },
    },
  };
};
