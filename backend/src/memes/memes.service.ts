import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meme } from './entities/meme.entity';
import { MemeDto } from './dto/meme.dto';

@Injectable()
export class MemesService {
  constructor(
    @InjectRepository(Meme)
    private readonly memeRepository: Repository<Meme>,
  ) {}

  async findAll(): Promise<Meme[]> {
    return this.memeRepository.find();
  }

  async update(id: string, memeDto: MemeDto) {
    const meme = await this.memeRepository.findOneBy({ id });
    if (!meme) {
      throw new NotFoundException(`Meme with ID ${id} not found`);
    }
    console.log(memeDto);
    Object.assign(meme, memeDto);

    return await this.memeRepository.save(meme);
  }
}
