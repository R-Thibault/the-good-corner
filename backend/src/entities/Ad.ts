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
import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { ObjectId } from "./ObjectId";
import { User } from "./User";
// import { OrderByEnum } from "./OrderByEnum";

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

  @Column({ length: 255 })
  @Field()
  imgUrl!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  @Field({ nullable: true })
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

  @ManyToOne(() => User, (user) => user.ads)
  @Field(() => User)
  createdBy!: User;

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
  imgUrl!: string;
  @Field({ nullable: true })
  location!: string;
  @Field(() => Int)
  price!: number;
  @Field()
  category!: ObjectId;
  @Field(() => [ObjectId], { nullable: true })
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
  @Field(() => ID, { nullable: true })
  user!: number;
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

// registerEnumType(OrderByEnum, {
//   name: "OrderBy",
// });

@InputType()
export class AdsOrderBy {
  @Field({ nullable: true })
  orderByTitle!: string;
  @Field({ nullable: true })
  orderByDate!: string;
  @Field({ nullable: true })
  orderByPrice!: string;
}
