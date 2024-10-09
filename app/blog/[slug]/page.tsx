import { NextResponse } from 'next/server';
import BlogPost from '@/models/BlogPost';  // Import your Sequelize BlogPost model
import { Sequelize } from 'sequelize';

// Get a blog post by slug
export async function GET(request: Request) {
  try {
    // Extract slug from the URL
    const { slug } = await request.json();

    // Find the post by slug
    const post = await BlogPost.findOne({ where: { slug } });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Return the post as JSON
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
