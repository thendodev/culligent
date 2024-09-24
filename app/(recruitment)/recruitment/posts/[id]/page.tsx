import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import Posts, { TPost } from '@/models/Posts';
import { Dbconnect, Dbdisconnect } from '@/lib/database/papr';
import { dateFormat, EDateRegions } from '@/global/config';
import SharePost from './components/share-post';
interface IPostPageProps {
  params: {
    id: string;
  };
}

const PostPage = async ({ params: { id } }: IPostPageProps) => {
  const queryClient = new QueryClient();

  const post = await queryClient.fetchQuery<TPost | null>({
    queryKey: ['posts', id],
    queryFn: async () => {
      await Dbconnect();
      const post = await Posts.findById(id);
      await Dbdisconnect();
      if (!post) return null;
      return post;
    },
  });

  const region = EDateRegions['United States'];

  return (
    <div className="border border-[var(--cruto-border)] w-full bg-[var(--cruto-foreground)] p-2">
      <div className="p-4 w-full flex justify-between">
        <div>
          <h1 className="text-sm text-gray-500">Job Title</h1>
          <p className="text-semibold font-bold">{post?.title}</p>
        </div>
        <div>
          <p className="text-sm text-[var(--cruto-pale-grey)]">
            Created : {post?.createdAt.toLocaleDateString(region, dateFormat)}
          </p>
          <p className="text-sm text-[var(--cruto-pale-grey)]">
            Updated : {post?.updatedAt.toLocaleDateString(region, dateFormat)}
          </p>
        </div>
      </div>
      <div className="p-4 w-full">
        <h1 className="text-sm text-gray-500">Job Description</h1>
        <p className="text-md font-normal">{post?.description}</p>
      </div>
    </div>
  );
};

export default PostPage;
