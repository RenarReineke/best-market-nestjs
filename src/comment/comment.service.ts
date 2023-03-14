import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { Profile } from 'src/profile/profile.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async getAll(): Promise<Comment[]> {
    return await this.commentRepository.find({
      relations: {
        product: true,
      },
    });
  }

  async getOne(id: number): Promise<Comment> {
    return await this.commentRepository.findOne({
      where: { id },
      relations: { product: true },
    });
  }

  async create(
    newComment: CreateCommentDto,
    product: Product,
    profile: Profile,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.message = newComment.message;
    comment.product = product;
    comment.profile = profile;
    return await this.commentRepository.save(comment);
  }

  async update(newComment: UpdateCommentDto, id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    comment.message = newComment.message;
    return await this.commentRepository.save(comment);
  }

  async delete(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
