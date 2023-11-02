import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import {
  Ad,
  AdCreateInput,
  AdUpdateInput,
  AdsOrderBy,
  AdsWhere,
} from "../entities/Ad";
import { validate } from "class-validator";
import { In, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";

@Resolver(Ad)
export class AdsResolver {
  @Query(() => [Ad])
  async allAds(
    @Arg("where", () => AdsWhere, { nullable: true }) where?: AdsWhere,
    @Arg("orderBy", () => AdsOrderBy, { nullable: true }) orderBy?: AdsOrderBy
  ): Promise<Ad[]> {
    // Define search Fields
    const queryWhere: any = {};

    if (where?.categoryId) {
      queryWhere.category = { id: Number(where?.categoryId) };
    }

    if (where?.categoriesIn) {
      queryWhere.category = { id: In(where?.categoriesIn) };
    }

    if (where?.tagId) {
      queryWhere.tags = { id: Number(where?.tagId) };
    }

    if (where?.tagsIn) {
      queryWhere.tags = { id: In(where?.tagsIn) };
    }

    if (where?.searchTitle) {
      queryWhere.title = Like(`%${where?.searchTitle}%`);
    }

    if (where?.priceGte) {
      queryWhere.price = MoreThanOrEqual(Number(where?.priceGte));
    }

    if (where?.priceLte) {
      queryWhere.price = LessThanOrEqual(Number(where?.priceLte));
    }

    // Define orderBy
    const queryOrderBy: any = {};

    if (
      orderBy?.orderByTitle &&
      ["ASC", "DESC"].includes(orderBy?.orderByTitle)
    ) {
      queryOrderBy.title = orderBy?.orderByTitle;
    }

    if (
      orderBy?.orderByDate &&
      ["ASC", "DESC"].includes(orderBy?.orderByDate)
    ) {
      queryOrderBy.createdAt = orderBy?.orderByDate;
    }

    if (
      orderBy?.orderByPrice &&
      ["ASC", "DESC"].includes(orderBy?.orderByPrice)
    ) {
      queryOrderBy.price = orderBy?.orderByPrice;
    }

    const ads = await Ad.find({
      where: queryWhere,
      order: queryOrderBy,
      relations: {
        category: true,
        tags: true,
      },
    });
    return ads;
  }

  @Query(() => Ad, { nullable: true })
  async oneAd(@Arg("id", () => [ID]) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
      relations: { category: true, tags: true },
    });

    return ad!;
  }

  @Mutation(() => Ad)
  async createAd(
    @Arg("data", () => AdCreateInput) data: AdCreateInput
  ): Promise<Ad> {
    const newAd = new Ad();
    Object.assign(newAd, data);

    const errors = await validate(newAd);
    if (errors.length === 0) {
      await newAd.save();
      return newAd;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  @Mutation(() => Ad, { nullable: true })
  async deleteAd(@Arg("id") id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
    });
    if (ad) {
      await ad.remove();
      console.log("ad supprimer");
      return ad;
    } else {
      console.log("Error occured");
      throw new Error("Error occured");
    }
  }

  @Mutation(() => Ad, { nullable: true })
  async updateAd(
    @Arg("id") id: number,
    @Arg("data", () => AdUpdateInput) data: AdUpdateInput
  ): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
    });
    if (ad) {
      Object.assign(ad, data);
      const errors = await validate(ad);
      if (errors.length === 0) {
        await ad.save();
        return await Ad.findOne({
          where: { id: id },
          relations: { category: true, tags: true },
        });
      } else {
        throw new Error(`Error occured: ${JSON.stringify(errors)}`);
      }
    } else {
      console.log("Error occured");
      throw new Error("Error occured");
    }
  }
}
