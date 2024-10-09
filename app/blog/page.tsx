'use client'

import Head from 'next/head'; // Import Head component from Next.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]); // Initialize with an empty array
  const [tags, setTags] = useState<string[]>([]); // List of available tags
  const [selectedTag, setSelectedTag] = useState<string>(''); // Tag filter
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/blog?page=${page}&limit=5&tag=${selectedTag}`);
        const data = await response.json();

        setPosts(data.posts || []); // Ensure posts is always an array
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
      setLoading(false);
    };

    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags'); // Assuming an endpoint for fetching all tags
        const data = await response.json();
        setTags(data.tags || []); // Ensure tags is always an array
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchPosts();
    fetchTags();
  }, [page, selectedTag]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    setPage(1); // Reset to first page when filtering
  };

  return (
    <>
      {/* Add Head component for SEO */}
      <Head>
        <title>My Blog | Learnings and Projects</title>
        <meta name="description" content="Read through my blog where I document my learnings, projects, and progress as a developer." />
      </Head>

      <section className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Blog Posts</h1>

          {/* Button to create a new post */}
          <Link href="/blog/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create New Post
          </Link>
        </div>

        {/* Tag Filter */}
        <div className="mb-4">
          <label htmlFor="tags" className="block mb-2 text-lg font-medium">Filter by Tag:</label>
          <select
            id="tags"
            value={selectedTag}
            onChange={(e) => handleTagSelect(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Blog Posts */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-md h-64 w-64 flex flex-col justify-between">
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
                    Read More
                  </Link>
                </div>
              ))
            ) : (
              <p>No blog posts available.</p>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
