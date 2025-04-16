import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meme {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  sourceLink: string;

  @Column()
  likes: number;
}
