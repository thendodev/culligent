import { ApiResponse } from '@/global/response.types';
import { HttpStatusCode } from 'axios';
import { ObjectId } from 'mongodb';
import { TPost } from '@/validations/posts';
import Posts from '@/models/Post';
import Pipelines from '@/models/Pipelines';

export const createPostService = async (
  post: TPost,
): Promise<ApiResponse<TPost>> => {
  const postCreated = await Posts.create(post);
  if (!postCreated)
    return {
      data: null,
      success: false,
      message: 'Post not created',
      code: HttpStatusCode.InternalServerError,
    };

  return {
    data: postCreated,
    success: true,
    message: 'Post created successfully',
    code: HttpStatusCode.Ok,
  };
};

export const getPostsService = async (
  userId: ObjectId,
): Promise<ApiResponse<TPost[]>> => {
  const post = await Posts.find({
    userId: userId,
    isArchived: {
      $eq: false,
    },
  });

  if (!post) {
    return {
      data: null,
      success: false,
      message: 'Cases not found',
      code: HttpStatusCode.NotFound,
    };
  }

  return {
    data: post,
    success: true,
    message: 'Cases found successfully',
    code: HttpStatusCode.Ok,
  };
};

export const getPostByIdService = async (
  postId: ObjectId,
): Promise<ApiResponse<TPost>> => {
  const postAggregate = await Posts.aggregate([
    {
      $match: {
        _id: new ObjectId(postId),
        isArchived: false,
      },
    },
    {
      $lookup: {
        from: Pipelines.collection.name,
        localField: '_id',
        foreignField: 'postId',
        as: 'pipeline',
      },
    },
    {
      $unwind: {
        path: '$pipeline',
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  const post = postAggregate?.[0];

  if (!post) {
    return {
      data: null,
      success: false,
      message: 'Post not found',
      code: HttpStatusCode.NotFound,
    };
  }

  return {
    data: post,
    success: true,
    message: 'Post found successfully',
    code: HttpStatusCode.Ok,
  };
};

export const updatePostService = async (
  userId: ObjectId,
  postId: ObjectId,
  data: Partial<TPost>,
): Promise<ApiResponse<TPost>> => {
  const updatedPost = await Posts.findOneAndUpdate(
    {
      _id: new ObjectId(postId),
      userId: new ObjectId(userId),
      isArchived: {
        $eq: false,
      },
    },
    {
      $set: data,
    },
    {
      returnDocument: 'after',
    },
  );

  if (!updatedPost) {
    return {
      success: false,
      message: 'Post not found',
      code: HttpStatusCode.NotFound,
    };
  }

  return {
    data: updatedPost,
    success: true,
    message: 'Post updated successfully',
    code: HttpStatusCode.Ok,
  };
};
export const deletePostService = async (
  postId: ObjectId,
): Promise<ApiResponse<TPost>> => {
  const updatedPost = await Posts.findOneAndUpdate(
    {
      _id: postId,
      isArchived: {
        $eq: false,
      },
    },
    {
      $set: {
        isArchived: true,
      },
    },
    {
      returnDocument: 'after',
    },
  );

  if (!updatedPost) {
    return {
      success: false,
      message: 'Sorry, Something went wrong',
      code: HttpStatusCode.NotFound,
    };
  }

  return {
    success: true,
    message: 'Post deleted successfully',
    code: HttpStatusCode.Ok,
  };
};
