import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('users')
@Unique('uniq_user_email_key', ['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email' })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'first_ame' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => PostEntity, (item) => item.user)
  posts: PostEntity[];
}
