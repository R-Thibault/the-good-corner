import { Controller } from ".";
import { Request, Response } from "express";
import { Category } from "../entities/Category";
import { validate } from "class-validator";
import { Ad } from "../entities/Ad";
import { Tag } from "../entities/Tag";

export class DataFixturesController extends Controller {
  createCategories = async (req: Request, res: Response) => {
    const categories = req.body;
    console.log(categories);
    for (const category of categories) {
      console.log(category);
      try {
        const newCategory = new Category();
        newCategory.name = category.name;

        const errors = await validate(newCategory);
        if (errors.length === 0) {
          await newCategory.save();
          // res.send(newCategory);
        } else {
          res.status(400).json({ errors: errors });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    }
  };

  createTags = async (req: Request, res: Response) => {
    const tags = req.body;
    for (const tag of tags) {
      try {
        const newTag = new Tag();
        newTag.name = tag.name;

        const errors = await validate(newTag);
        if (errors.length === 0) {
          await newTag.save();
          // res.send(newTag);
        } else {
          res.status(400).json({ errors: errors });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    }
  };

  createAds = async (req: Request, res: Response) => {
    const ads = req.body;
    for (const ad of ads) {
      try {
        const newAd = new Ad();
        newAd.title = ad.title;
        newAd.description = ad.description;
        newAd.author = ad.author;
        newAd.imgUrl = ad.imgUrl;
        newAd.location = ad.location;
        newAd.price = ad.price;
        newAd.category = ad.category;
        newAd.tags = ad.tags;
        const errors = await validate(newAd);
        if (errors.length === 0) {
          await newAd.save();
          //  res.status(200).json(newAd);
        } else {
          res.status(400).json(errors);
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Good luck !");
      }
    }
  };
}
