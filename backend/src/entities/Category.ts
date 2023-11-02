import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  ObjectId,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length, Min, Max } from "class-validator";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
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

  @OneToMany(() => Ad, (ad) => ad.category)
  @Field(() => [Ad])
  ads!: Ad[];
}

@InputType()
export class CategoryCreateInput {
  @Field()
  name!: string;
}

@InputType()
export class CategoryUpdateInput {
  @Field({ nullable: true })
  name!: string;
}
