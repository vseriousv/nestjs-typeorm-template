import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({ type: [PostDto] })
  findAll(): Promise<PostDto[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PostDto })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id', new ParseIntPipe()) id: string): Promise<PostDto> {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: PostDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() request,
  ): Promise<PostDto> {
    return this.postsService.create(request.user.id, createPostDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: PostDto })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Req() request,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostDto> {
    return this.postsService.update(id, request.user.id, updatePostDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PostDto })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  delete(
    @Param('id', new ParseIntPipe()) id: string,
    @Req() request,
  ): Promise<PostDto> {
    return this.postsService.delete(id, request.user.id);
  }
}
