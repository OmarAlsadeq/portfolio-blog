import BlogPost from '@/models/BlogPost'; // Import the BlogPost Sequelize model
import { Post } from '@/types/post'; // Adjust the Post type to match your model


// Fetch all posts from the database
export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await BlogPost.findAll({
      attributes: ['slug', 'title', 'excerpt', 'content', 'createdAt'], // Assuming you use createdAt for the date
    });

    return posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.createdAt.toISOString(), // Format date to a string
    }));
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

// Fetch a single post by slug from the database
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await BlogPost.findOne({
      where: { slug },
      attributes: ['slug', 'title', 'excerpt', 'content', 'createdAt'], // Assuming you use createdAt for the date
    });

    if (!post) return null;

    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.createdAt.toISOString(),
    };
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}
