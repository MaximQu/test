import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MemesModule } from './memes/memes.module';
import { PingController } from './ping/ping.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MemesModule,
  ],
  controllers: [PingController],
  providers: [],
})
export class AppModule {}
