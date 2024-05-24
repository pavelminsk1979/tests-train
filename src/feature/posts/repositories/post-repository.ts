import { Injectable } from '@nestjs/common';
import { Post, PostDocument } from '../domains/domain-post';
import { UpdatePostInputModel } from '../types/models';
import { Model, Types, UpdateWriteOpResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async save(newPost: PostDocument) {
    return newPost.save();
  }

  async updatePost(
    postId: string,
    updatePostInputModel: UpdatePostInputModel,
  ): Promise<boolean> {
    const { content, shortDescription, title, blogId } = updatePostInputModel;

    const result: UpdateWriteOpResult = await this.postModel.updateOne(
      {
        _id: new Types.ObjectId(postId),
      },

      {
        $set: {
          content,
          shortDescription,
          title,
          blogId,
        },
      },
    );

    return !!result.matchedCount;
  }

  async deletePostById(postId: string) {
    const result = await this.postModel.deleteOne({
      _id: new Types.ObjectId(postId),
    });

    return !!result.deletedCount;
  }
}
