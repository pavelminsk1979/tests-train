import { Injectable } from '@nestjs/common';
import { Blog, BlogDocument } from '../domains/domain-blog';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateBlogInputModel } from '../api/types/models';

@Injectable()
export class BlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async save(newBlog: BlogDocument) {
    return newBlog.save();
  }

  async deleteBlogById(blogId: string) {
    const result = await this.blogModel.deleteOne({
      _id: new Types.ObjectId(blogId),
    });

    return !!result.deletedCount;
  }

  async updateBlog(
    bologId: string,
    updateBlogInputModel: UpdateBlogInputModel,
  ) {
    const { name, websiteUrl, description } = updateBlogInputModel;

    const result = await this.blogModel.updateOne(
      {
        _id: new Types.ObjectId(bologId),
      },

      {
        $set: {
          name: name,
          description: description,
          websiteUrl: websiteUrl,
        },
      },
    );

    return !!result.matchedCount;
  }

  async findBlog(blogId: string): Promise<BlogDocument | null> {
    /*этот метод автоматом преобразует id в обект*/
    return this.blogModel.findById(blogId);
  }
}
