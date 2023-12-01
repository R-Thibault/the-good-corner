import { DataSource } from "typeorm";
import { Category } from "./entities/Category";
import { Ad } from "./entities/Ad";
import { Tag } from "./entities/Tag";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "superuser",
  password: "supersecret",
  database: "thegoodcorner",
  entities: [Category, Ad, Tag],
  synchronize: true,
  logging: true,
});
