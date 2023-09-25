import { DataSource } from "typeorm";
import { Category } from "./entities/Category";
import { Ad } from "./entities/Ad";
import { Tag } from "./entities/Tag";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./good_corner.sqlite",
  entities: [Category, Ad, Tag],
  synchronize: true,
  logging: true,
});
