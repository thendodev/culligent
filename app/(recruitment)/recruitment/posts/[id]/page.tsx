import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import Posts from '@/models/Posts';
import { Dbconnect, Dbdisconnect } from '@/lib/database/papr';
import { dateFormat, EDateRegions } from '@/global/config';
import { TPost } from '@/validations/posts';
interface IPostPageProps {
  params: {
    id: string;
  };
}

/**
 * Renders a page for displaying the details of a single job post.
 *
 * @param params - An object containing the `id` parameter from the URL path.
 * @returns A React component that displays the job post details.
 */
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
      <div className="p-4 w-full flex justify-between space-y-2">
        <div>
          <h1 className="text-xl font-bold">Job Title</h1>
          <p className="text-md font-normal">{post?.title}</p>
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
        <h1 className="text-xl font-bold">Role</h1>
        <p className="text-md font-normal">{post?.role}</p>
      </div>
      <div className="p-4 w-full">
        <h1 className="text-md font-bold">Job Description</h1>
        <p className="text-md font-normal">{post?.description}</p>
      </div>
      <div className="p-4 w-full">
        <h1 className="text-md font-bold">Ideal Candidate</h1>
        <p className="text-md font-normal">
          education: {post?.idealCandidate?.education}
        </p>
        <p className="text-md font-normal">
          experience: {post?.idealCandidate?.experience}
        </p>
        <h1 className="text-md font-bold">Certifications</h1>
        {post?.idealCandidate?.certifications?.map((certs, index) => (
          <p key={certs.name + index} className="text-sm font-normal">
            {certs.name}, {certs.level}
          </p>
        ))}
        <h1 className="text-md font-bold">Skills</h1>
        {post?.idealCandidate?.skills?.map((skill, index) => (
          <p key={skill.name + index} className="text-sm font-normal">
            {skill.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
