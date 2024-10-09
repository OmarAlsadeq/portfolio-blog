import { NextResponse } from 'next/server';
import BlogPost from '@/models/BlogPost';
import Tag from '@/models/Tag';
import { initializeModels } from '@/lib/models';

// Ensure models and associations are initialized
initializeModels();

// Handle GET requests to fetch paginated blog posts
export async function GET(request: Request) {
  try {
    const url = new URL(request.url); // Parse the request URL
    let page = parseInt(url.searchParams.get('page') || '1', 10); // Get the 'page' query param, default to 1
    let limit = parseInt(url.searchParams.get('limit') || '5', 10); // Get the 'limit' query param, default to 5
    const tagFilter = url.searchParams.get('tag'); // Get the 'tag' query param

    // Ensure page and limit are positive integers, fallback to defaults if invalid
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    if (isNaN(limit) || limit < 1) {
      limit = 5;
    }

    const offset = (page - 1) * limit; // Calculate the offset based on the page and limit

    // Build query options
    let include: any = [
      {
        model: Tag,
        as: 'tags',
        required: false, // Don't require tag filter if not provided
      },
    ];

    // If a tag filter is provided, include it in the query
    if (tagFilter) {
      include = [
        {
          model: Tag,
          as: 'tags',
          where: { name: tagFilter }, // Filter by the tag name
          required: true, // Require the tag filter
        },
      ];
    }

    // Fetch the total count of blog posts (with optional tag filter)
    const totalPosts = await BlogPost.count({ include });

    // Fetch the paginated blog posts (with optional tag filter)
    const posts = await BlogPost.findAll({
      attributes: ['id', 'slug', 'title', 'excerpt', 'content', 'createdAt'],
      limit,
      offset,
      order: [['createdAt', 'DESC']], // Order posts by most recent
      include, // Include tags for filtering
    });

    const totalPages = Math.ceil(totalPosts / limit); // Calculate total number of pages

    return NextResponse.json({ posts, page, totalPages });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}



export async function POST(request: Request) {
  try {
    const { title, slug, excerpt, content, tags } = await request.json();

    // Check required fields
    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Title, slug, and content are required.' }, { status: 400 });
    }

    // Check for duplicate slug
    const existingPost = await BlogPost.findOne({ where: { slug } });
    if (existingPost) {
      return NextResponse.json({ error: 'Slug already exists.' }, { status: 400 });
    }

    // Create the blog post
    const newPost = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
    });

    // Handle tags if provided
    if (tags && tags.length > 0) {
      const tagInstances = await Promise.all(
        tags.map((tagName: string) =>
          Tag.findOrCreate({ where: { name: tagName } }) // Find or create each tag
        )
      );

      // Associate tags with the blog post
      await newPost.setTags(tagInstances.map(([tag]) => tag));
    }

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create post.' }, { status: 500 });
  }
}


