import { Controller, Get, Body, Param, Put } from '@nestjs/common';

import { MemesService } from './memes.service';
import { MemeDto } from './dto/meme.dto';

@Controller('memes')
export class MemesController {
  constructor(private readonly memesService: MemesService) {}

  @Get()
  findAll() {
    return this.memesService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() memeDto: MemeDto) {
    return this.memesService.update(id, memeDto);
  }
}
