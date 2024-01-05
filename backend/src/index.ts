import "reflect-metadata";
import express from "express";
import cors from "cors";
import { dataSource } from "./datasource";
import { AdsController } from "./controllers/Ads";
import { CategoriesController } from "./controllers/Categories";
import { TagsController } from "./controllers/Tags";
import { DataFixturesController } from "./controllers/DataFixtures";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

function asyncController(controller: Function) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  };
}

//AD
const adsController = new AdsController();
app.get("/ads", asyncController(adsController.getAll));
app.get("/ads/:id", asyncController(adsController.getOne));
app.post("/ads", asyncController(adsController.createOne));
app.delete("/ads/:id", asyncController(adsController.deleteOne));
app.patch("/ads/:id", asyncController(adsController.patchOne));
app.get("/ads/search", asyncController(adsController.searchWithFilter));

//CATEGORY

const categoriesController = new CategoriesController();
app.get("/categories", asyncController(categoriesController.getAll));
app.get("/categories/:id", asyncController(categoriesController.getOne));
app.post("/categories", asyncController(categoriesController.createOne));
app.delete("/categories/:id", asyncController(categoriesController.deleteOne));
app.patch("/categories/:id", asyncController(categoriesController.patchOne));

//TAGS
const tagsController = new TagsController();
app.get("/tags", asyncController(tagsController.getAll));
app.get("/tags/:id", asyncController(tagsController.getOne));
app.post("/tags", asyncController(tagsController.createOne));
app.delete("/tags/:id", asyncController(tagsController.deleteOne));
app.patch("/tags/:id", asyncController(tagsController.patchOne));

//Data Fixtures
const dataFixturesController = new DataFixturesController();
app.post("/categories/many", dataFixturesController.createCategories);
app.post("/tags/many", dataFixturesController.createTags);
app.post("/ads/many", dataFixturesController.createAds);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
});
console.log("Hello, Server is running !");
