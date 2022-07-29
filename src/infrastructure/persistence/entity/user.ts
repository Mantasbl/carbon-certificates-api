import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
