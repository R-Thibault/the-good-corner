import { Controller } from ".";
import { Request, Response } from "express";
import { Ad } from "../entities/Ad";
import { validate } from "class-validator";
import { Like } from "typeorm";

export class AdsController extends Controller {
  getAll = async (req: Request, res: Response) => {
    try {
      const ads = await Ad.find({
        relations: {
          category: true,
          tags: true,
        },
      });
      res.status(200).send(ads);
    } catch (err) {
      console.log(err);
      res.status(404).send("Not Found");
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const ad = await Ad.find({
        relations: {
          category: true,
          tags: true,
        },
        where: { id: Number(req.params.id) },
      });
      res.send(ad);
    } catch (err: any) {
      console.error(err);
      res.status(500).send();
    }
  };

  createOne = async (req: Request, res: Response) => {
    try {
      const newAd = new Ad();
      newAd.title = req.body.title;
      newAd.description = req.body.description;
      newAd.owner = req.body.owner;
      newAd.location = req.body.location;
      newAd.price = req.body.price;
      newAd.category = req.body.category;
      newAd.tags = req.body.tags;
      const errors = await validate(newAd);
      if (errors.length === 0) {
        await newAd.save();
        res.status(200).send(newAd);
      } else {
        throw new Error("Validation failed!");
      }
    } catch (err) {
      console.log(err);
      res.status(404).send("Not Found");
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    try {
      const ad = await Ad.findOne({ where: { id: Number(req.params.id) } });
      if (ad) {
        await ad.remove();
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (err: any) {
      // typeguards
      console.error(err);
      res.status(500).send();
    }
  };

  patchOne = async (req: Request, res: Response) => {
    try {
      const ad = await Ad.findOne({ where: { id: Number(req.params.id) } });

      if (ad) {
        console.log(req.body);
        Object.assign(ad, req.body, { id: ad.id });
        const errors = await validate(ad);
        if (errors.length === 0) {
          await ad.save();
          res.status(204).send(ad);
        } else {
          res.status(400).json({ errors: errors });
        }
      } else {
        res.status(404).send("no add");
      }
    } catch (err: any) {
      console.error(err);
      res.status(500).send();
    }
  };

  searchWithFilter = async (req: Request, res: Response): Promise<void> => {
    const allowedFields = ["title", "location"];
    // console.log(req);
    if (req.query.title) {
      try {
        const title = req.query.title;
        const ads = await Ad.find({
          relations: {
            category: true,
          },
          where: {
            title: Like(`%${title}%`),
          },
        });
        console.log("Got it !");
        res.status(200).send(ads);
      } catch (err) {
        console.log(err);
        res.status(404).send("Not Found");
      }
    } else if (req.query.location) {
      try {
        const location = req.query.location;
        const ads = await Ad.find({
          relations: {
            category: true,
          },
          where: {
            location: Like(`%${location}%`),
          },
        });
        console.log("Got it !");
        res.status(200).send(ads);
      } catch (err) {
        console.log(err);
        res.status(404).send("Not Found");
      }
    } else if (Object.keys(req.query) !== allowedFields && !req.query) {
      res.status(404).send("Not Found");
    }
  };
}
