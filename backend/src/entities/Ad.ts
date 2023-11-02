import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { ObjectId } from "./ObjectId";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 100 })
  @Field()
  title!: string;

  @Column()
  @Field()
  description!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  @Field()
  author!: string;

  @Column({ length: 255 })
  @Field()
  imgUrl!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  @Field()
  location!: string;

  @Column()
  @Field(() => Int)
  price!: number;

  @Column()
  @Field()
  createdAt!: Date;

  @BeforeInsert()
  updatedDates() {
    this.createdAt = new Date();
  }

  @ManyToOne(() => Category, (category) => category.ads)
  @Field(() => Category)
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  @Field(() => [Tag])
  tags!: Tag[];
}

@InputType()
export class AdCreateInput {
  @Field()
  title!: string;
  @Field()
  description!: string;
  @Field()
  author!: string;
  @Field()
  imgUrl!: string;
  @Field()
  location!: string;
  @Field(() => Int)
  price!: number;
  @Field()
  category!: ObjectId;
  @Field(() => [ObjectId])
  tags!: ObjectId[];
}

@InputType()
export class AdUpdateInput {
  @Field({ nullable: true })
  title!: string;
  @Field({ nullable: true })
  description!: string;
  @Field({ nullable: true })
  author!: string;
  @Field({ nullable: true })
  imgUrl!: string;
  @Field({ nullable: true })
  location!: string;
  @Field(() => Int, { nullable: true })
  price!: number;
  @Field({ nullable: true })
  category!: ObjectId;
  @Field(() => [ObjectId], { nullable: true })
  tags!: ObjectId[];
}

@InputType()
export class AdsWhere {
  @Field(() => [ID], { nullable: true })
  categoriesIn!: number[];
  @Field(() => ID, { nullable: true })
  categoryId!: number;
  @Field(() => [ID], { nullable: true })
  tagsIn!: number[];
  @Field(() => ID, { nullable: true })
  tagId!: number;
  @Field({ nullable: true })
  searchTitle!: string;
  @Field({ nullable: true })
  priceGte!: number;
  @Field({ nullable: true })
  priceLte!: number;
}

@InputType()
export class AdsOrderBy {
  @Field({ nullable: true })
  orderByTitle!: string;
  @Field({ nullable: true })
  orderByDate!: string;
  @Field({ nullable: true })
  orderByPrice!: string;
}
