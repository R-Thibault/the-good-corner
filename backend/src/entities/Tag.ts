import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  ObjectId,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length } from "class-validator";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ length: 100 })
  @Length(3, 100)
  @Field()
  name!: string;

  @Column()
  @Field()
  createdAt!: Date;

  @BeforeInsert()
  updatedDates() {
    this.createdAt = new Date();
  }

  @ManyToMany(() => Ad, (ad) => ad.tags)
  @Field(() => [Ad])
  ads!: Ad[];
}

@InputType()
export class TagCreateInput {
  @Field()
  name!: string;
}

@InputType()
export class TagUpdateInput {
  @Field({ nullable: true })
  name!: string;
}
