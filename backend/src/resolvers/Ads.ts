import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import {
  Ad,
  AdCreateInput,
  AdUpdateInput,
  AdsOrderBy,
  AdsWhere,
} from "../entities/Ad";
import { validate } from "class-validator";
import { In, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";
import { merge } from "../utils";
import { ContextType } from "../auth";

export function getAdQueryWhere(grapqlWhere?: AdsWhere): {
  [key: string]: unknown;
} {
  const where: any = {};

  if (grapqlWhere?.user) {
    where.user = { id: grapqlWhere?.user };
  }

  if (grapqlWhere?.categoriesIn) {
    where.category = { id: In(grapqlWhere?.categoriesIn) };
  }

  if (grapqlWhere?.tagsIn) {
    where.tags = { id: In(grapqlWhere?.tagsIn) };
  }

  if (grapqlWhere?.searchTitle) {
    where.title = Like(`%${grapqlWhere?.searchTitle}%`);
  }

  if (grapqlWhere?.priceGte) {
    where.price = MoreThanOrEqual(Number(grapqlWhere?.priceGte));
  }

  if (grapqlWhere?.priceLte) {
    where.price = LessThanOrEqual(Number(grapqlWhere?.priceLte));
  }
  return where;
}

@Resolver(Ad)
export class AdsResolver {
  @Query(() => [Ad])
  async allAds(
    @Arg("take", () => Int, { nullable: true }) take?: number,
    @Arg("skip", () => Int, { nullable: true }) skip?: number,
    @Arg("where", () => AdsWhere, { nullable: true }) where?: AdsWhere,
    @Arg("orderBy", () => AdsOrderBy, { nullable: true }) orderBy?: AdsOrderBy
  ): Promise<Ad[]> {
    // Define search Fields
    const queryWhere = getAdQueryWhere(where);
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
      take: take ?? 50,
      skip: skip,
      where: queryWhere,
      order: queryOrderBy,
      relations: {
        createdBy: true,
        category: true,
        tags: true,
      },
    });
    return ads;
  }

  @Query(() => Int)
  async allAdsCount(
    @Arg("where", () => AdsWhere, { nullable: true }) where?: AdsWhere
  ): Promise<number> {
    // Define search Fields
    const queryWhere = getAdQueryWhere(where);

    const ads = await Ad.count({
      where: queryWhere,
    });
    return ads;
  }

  @Query(() => Ad, { nullable: true })
  async oneAd(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
      relations: { createdBy: true, category: true, tags: true },
    });

    return ad!;
  }

  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Ctx() context: ContextType,
    @Arg("data", () => AdCreateInput) data: AdCreateInput
  ): Promise<Ad> {
    const newAd = new Ad();
    Object.assign(newAd, data, {
      createdBy: context.user,
    });

    const errors = await validate(newAd);
    if (errors.length === 0) {
      await newAd.save();
      return newAd;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  @Authorized()
  @Mutation(() => Ad, { nullable: true })
  async deleteAd(
    @Ctx() context: ContextType,
    @Arg("id", () => ID) id: number
  ): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
      relations: { createdBy: true },
    });
    if (ad && ad.createdBy.id === context.user?.id) {
      await ad.remove();

      ad.id = id;
    }
    return ad;
  }

  @Authorized()
  @Mutation(() => Ad, { nullable: true })
  async updateAd(
    @Ctx() context: ContextType,
    @Arg("id", () => ID) id: number,
    @Arg("data") data: AdUpdateInput
  ): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
      relations: { tags: true, createdBy: true },
    });
    if (ad && ad.createdBy.id === context.user?.id) {
      merge(ad, data);
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
