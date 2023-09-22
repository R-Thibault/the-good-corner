import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Ad } from "./Ad";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column()
  createdAt!: Date;

  @BeforeInsert()
  updatedDates() {
    this.createdAt = new Date();
  }

  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads!: Ad[];
}
