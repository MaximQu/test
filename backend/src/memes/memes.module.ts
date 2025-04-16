import { Module } from '@nestjs/common';
import { MemesService } from './memes.service';
import { MemesController } from './memes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meme } from './entities/meme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meme])],
  controllers: [MemesController],
  providers: [MemesService],
})
export class MemesModule {}
