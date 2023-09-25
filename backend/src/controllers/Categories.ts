import { Controller } from ".";
import { Request, Response } from "express";
import { Category } from "../entities/Category";
import { validate } from "class-validator";

export class CategoriesController extends Controller {
  getAll = async (req: Request, res: Response) => {
    try {
      const cats = await Category.find();
      res.status(200).send(cats);
    } catch (err) {
      console.log(err);
      res.status(404).send("Not Found");
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const cat = await Category.findOne({
        where: { id: Number(req.params.id) },
      });
      res.send(cat);
    } catch (err: any) {
      console.error(err);
      res.status(500).send();
    }
  };

  createOne = async (req: Request, res: Response) => {
    try {
      const newCategory = new Category();
      newCategory.name = req.body.name;

      const errors = await validate(newCategory);
      if (errors.length === 0) {
        await newCategory.save();
        res.send(newCategory);
      } else {
        res.status(400).json({ errors: errors });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    try {
      const cat = await Category.findOne({
        where: { id: Number(req.params.id) },
      });
      if (cat) {
        await cat.remove();
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
      const cat = await Category.findOne({
        where: { id: Number(req.params.id) },
      });

      if (cat) {
        Object.assign(cat, req.body, { id: cat.id });
        const errors = await validate(cat);
        if (errors.length === 0) {
          await cat.save();
          res.status(204).send();
        } else {
          res.status(400).json({ errors: errors });
        }
      } else {
        res.status(404).send();
      }
    } catch (err: any) {
      console.error(err);
      res.status(500).send();
    }
  };
}
