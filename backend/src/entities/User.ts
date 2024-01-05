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
import {
  Authorized,
  Field,
  ID,
  InputType,
  ObjectType,
  UseMiddleware,
} from "type-graphql";
import { IsEmail, Matches } from "class-validator";
import { Ad } from "./Ad";
import { emailDisplay } from "../emailDisplay";
import { UserPrivateField } from "../utils";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Authorized()
  @UseMiddleware(UserPrivateField)
  @Column({ type: "varchar", length: 255, unique: true })
  @Field()
  email!: string;

  @Column({ type: "varchar", length: 255 })
  hashedPassword!: string;

  @Column({ type: "varchar", length: 100, default: "USER" })
  role!: string;

  @OneToMany(() => Ad, (ad) => ad.createdBy)
  @Field(() => [Ad])
  ads!: Ad[];
}

@InputType()
export class UserCreateInput {
  @IsEmail()
  @Field()
  email!: string;

  @Field()
  @Matches(/^.{8,50}$/)
  password!: string;
}
