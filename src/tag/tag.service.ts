import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity';
import { CreateTagDto } from './tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async getAll(): Promise<Tag[]> {
    return await this.tagRepository.find({
      relations: {
        products: true,
      },
    });
  }

  async getOne(id: number): Promise<Tag> {
    return await this.tagRepository.findOne({
      where: { id },
      relations: { products: true },
    });
  }

  async getFilteredTags(newTags: string[] | undefined): Promise<Tag[] | []> {
    if (newTags) {
      return await await this.tagRepository.findBy({ title: In(newTags) });
    } else {
      return [];
    }
  }

  async create(newTag: CreateTagDto): Promise<Tag> {
    return await this.tagRepository.save(newTag);
  }

  async update(newTag: CreateTagDto, id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOneBy({ id });
    tag.title = newTag.title;
    return await this.tagRepository.save(tag);
  }

  async delete(id: string): Promise<void> {
    await this.tagRepository.delete(id);
  }
}
