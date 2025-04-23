'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PostActions from './post-actions';
import { CalendarDays, PersonStanding } from 'lucide-react';
import { getPostsHandler } from '@/handlers/handle-posts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { usePostContext } from '../state/state';
import { motion } from 'framer-motion';
import { TPost } from '@/validations/posts';
import { TWithId } from '@/global/types';
import { containerChild } from '../animation';

const PostCard = () => {
  const queryKey = usePostContext((state) => state.state.queryKey);

  const { data } = useSuspenseQuery<TWithId<TPost>[]>({
    queryKey,
    queryFn: getPostsHandler,
  });

  return (
    <div className="flex flex-wrap gap-1">
      {data.map((item) => (
        <motion.div key={item._id} variants={containerChild} className="flex">
          <Card className="w-[20rem] shadow-none">
            <CardHeader>
              <CardTitle className="flex justify-between align-middle items-center">
                {item.title} <PostActions data={item} />
              </CardTitle>
              <CardDescription>{item.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-sm font-semibold">Description</span>
              <h1 className=" text-sm">
                {item.description?.slice(0, 30)}
                {item.description?.length > 30 && <>....</>}
              </h1>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-1">
              <div className="flex items-center align-middle gap-1 text-[0.60rem] border rounded-md p-1">
                <PersonStanding className="w-4- h-4" /> Candidates:{' '}
                {item.applicants?.length}
              </div>
              <div className="flex items-center align-middle gap-1 text-[0.60rem] border rounded-md p-1">
                <CalendarDays className="w-4- h-4" />{' '}
                {item?.createdAt?.toString()}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PostCard;
