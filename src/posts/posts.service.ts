import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostDto } from './dto/post.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: typeof PostEntity,
    private readonly userService: UsersService,
  ) {}

  async findAll() {
    const posts = await this.postsRepository.find<PostEntity>({
      relations: ['user'],
    });
    return posts.map((post) => new PostDto(post));
  }

  async findOne(id: string) {
    const post = await this.postsRepository.findOne<PostEntity>({
      relations: ['user'],
      where: { id },
    });
    if (!post) {
      throw new HttpException('No post found', HttpStatus.NOT_FOUND);
    }
    return new PostDto(post);
  }

  async create(userId: string, createPostDto: CreatePostDto): Promise<PostDto> {
    const user = await this.userService.getUserEntity(userId);

    const post = new PostEntity();
    post.user = user;
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    const res = await post.save();

    return new PostDto(res);
  }

  private async getUserPostEntity(
    id: string,
    userId: string,
  ): Promise<PostEntity> {
    const post = await this.postsRepository.findOne<PostEntity>({
      where: { id },
    });
    if (!post) {
      throw new HttpException('No post found', HttpStatus.NOT_FOUND);
    }
    if (post.user.id !== userId) {
      throw new HttpException(
        'You are unauthorized to manage this post',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return post;
  }

  private async getUserPost(id: string, userId: string): Promise<PostDto> {
    const post = await this.getUserPostEntity(id, userId);
    return new PostDto(post);
  }

  async update(
    id: string,
    userId: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostDto> {
    const post = await this.getUserPostEntity(id, userId);
    post.title = updatePostDto.title || post.title;
    post.content = updatePostDto.content || post.content;
    const res = await post.save();
    return new PostDto(res);
  }

  async delete(id: string, userId: string): Promise<PostDto> {
    const post = await this.getUserPostEntity(id, userId);
    await post.remove();
    return new PostDto(post);
  }
}
