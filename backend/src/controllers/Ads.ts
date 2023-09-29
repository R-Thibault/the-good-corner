import { Controller } from ".";
import { Request, Response } from "express";
import { Ad } from "../entities/Ad";
import { validate } from "class-validator";
import { In, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";

export class AdsController extends Controller {
  getAll = async (req: Request, res: Response) => {
    // console.log(req);
    const where: any = {};

    if (typeof req.query.categoryId === "string") {
      where.category = { id: Number(req.query.categoryId) };
    }

    if (typeof req.query.categoryIn === "string") {
      where.category = { id: In(req.query.categoryIn.split(",")) };
    }

    if (typeof req.query.searchTitle === "string") {
      where.category = Like(`%${req.query.searchTitle}%`);
    }

    if (typeof req.query.priceGte === "string") {
      where.category = MoreThanOrEqual(Number(req.query.searchTitle));
    }

    if (typeof req.query.priceLte === "string") {
      where.category = LessThanOrEqual(Number(req.query.searchTitle));
    }
    const order: any = {};
    if (
      typeof req.query.orderByTitle === "string" &&
      ["ASC", "DESC"].includes(req.query.orderByTitle)
    ) {
      order.orderByTitle = req.query.orderByTitle;
    }

    if (
      typeof req.query.orderByDate === "string" &&
      ["ASC", "DESC"].includes(req.query.orderByDate)
    ) {
      order.orderByDate = req.query.orderByDate;
    }

    if (
      typeof req.query.orderByPrice === "string" &&
      ["ASC", "DESC"].includes(req.query.orderByPrice)
    ) {
      order.orderByPrice = req.query.orderByPrice;
    }

    const ads = await Ad.find({
      where,
      order,
      relations: {
        category: true,
        tags: true,
      },
    });
    res.status(200).json(ads);
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const ad = await Ad.findOne({
        relations: {
          category: true,
          tags: true,
        },
        where: { id: Number(req.params.id) },
      });
      res.send(ad);
    } catch (err: any) {
      console.error(err);
      res.status(500).json(err);
    }
  };

  createOne = async (req: Request, res: Response) => {
    try {
      const newAd = new Ad();
      newAd.title = req.body.title;
      newAd.description = req.body.description;
      newAd.author = req.body.author;
      newAd.imgUrl = req.body.imgUrl;
      newAd.location = req.body.location;
      newAd.price = req.body.price;
      newAd.category = req.body.category;
      newAd.tags = req.body.tags;
      const errors = await validate(newAd);
      if (errors.length === 0) {
        await newAd.save();
        res.status(200).json(newAd);
      } else {
        res.status(400).json(errors);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Good luck !");
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    try {
      const ad = await Ad.findOne({ where: { id: Number(req.params.id) } });
      if (ad) {
        await ad.remove();
        res.status(204).send();
      } else {
        res.status(404).json();
      }
    } catch (err: any) {
      // typeguards
      console.error(err);
      res.status(500).json(err);
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
        res.status(404).json("no ad");
      }
    } catch (err: any) {
      console.error(err);
      res.status(500).json(err);
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
        res.status(404).json("Not Found");
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
        res.status(404).json("Not Found");
      }
    } else if (Object.keys(req.query) !== allowedFields && !req.query) {
      res.status(404).json("Not Found");
    }
  };

  searchByCat = async (req: Request, res: Response): Promise<void> => {
    console.log(req);
    if (req.query.category) {
      try {
        const catId = req.query.category;
        const ads = await Ad.find({
          relations: {
            category: true,
          },
          where: {
            category: { id: Number(catId) },
          },
        });
        console.log("Got it !");
        res.status(200).send(ads);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    }
  };
}
