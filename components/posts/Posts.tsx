"use client"

import { type PostType, posts } from "@/lib/data"
import { Post } from "./post/post"
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
type DataItem = {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  image: string;
  slug: string;
  content: string;
};

export const Posts: React.FC = () => {

  const [data, setData] = useState<DataItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreData = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { data } = await axiosInstance.get(`/story/getAllStories?page=${page}`)
      setData((prevData) => [...prevData, ...data.query]);
      setPage((prevPage) => prevPage + 1);
      if (data.query.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore) {
        console.log("yes here")
        loadMoreData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreData, hasMore]);

  useEffect(() => {
    loadMoreData(); // Initial data load
    // console.log("loadMoreData")
  }, []);

  // console.log(data)
  // console.log(page)
  return (
    <>
      <div className="md:grid md:grid-cols-3 gap-y-3.5 gap-x-8 p-4 md:gap-x-3 md:gap-y-2 md:space-y-2 space-y-2">

        {
          data.map(({ author, id, content, createdAt, image, slug, title }: PostType) => (
            <Post key={id} id={id} slug={slug} author={author} content={content} image={image} title={title} createdAt={createdAt} />

          ))
        }
      </div>
    </>
  )
}
