import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

import { ProductService } from 'src/product/product.service';
import { Profile } from 'src/profile/profile.entity';
import { ProfileService } from 'src/profile/profile.service';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly productService: ProductService,
    private readonly profileService: ProfileService,
  ) {}
  @Get()
  comments() {
    return this.commentService.getAll();
  }

  @Get(':id')
  comment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createComment(@Request() req, @Body() newComment: CreateCommentDto) {
    const product = await this.productService.getOne(newComment.productId);
    const profileId = req.user.profileId;
    const profile = await this.profileService.getOne(profileId);
    return this.commentService.create(newComment, product, profile);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateComment(
    @Request() req,
    @Body() newComment: UpdateCommentDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const profile: Profile = await this.profileService.getOne(
      req.user.profileId,
    );
    if (!profile.comments.find((comment) => comment.id === id)) {
      throw new HttpException(
        'Вы не можете изменить чужой комментарий',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.commentService.update(newComment, id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteComment(@Request() req, @Param('id') id: string) {
    const profile: Profile = await this.profileService.getOne(
      req.user.profileId,
    );
    if (!profile.comments.find((comment) => comment.id === +id)) {
      throw new HttpException(
        'Вы не можете изменить чужой комментарий',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.commentService.delete(id);
  }
}
