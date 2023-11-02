import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category, CategoryUpdateInput } from "../entities/Category";
import { validate } from "class-validator";

@Resolver(Category)
export class CategorysResolver {
  @Query(() => [Category])
  async allCategories(): Promise<Category[]> {
    const categories = await Category.find({
      relations: { ads: true },
    });

    return categories;
  }

  @Query(() => Category, { nullable: true })
  async oneCategory(@Arg("id") id: number): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id: id },
      relations: { ads: true },
    });

    return category;
  }

  @Mutation(() => Category)
  async createCategory(@Arg("name") name: string): Promise<Category> {
    const newCategory = new Category();
    newCategory.name = name;

    const errors = await validate(newCategory);
    if (errors.length === 0) {
      await newCategory.save();
      return newCategory;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  @Mutation(() => Category, { nullable: true })
  async deleteCategory(@Arg("id") id: number): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id: id },
    });
    if (category) {
      await category.remove();
      category.id = id;
    }
    return category;
  }

  @Mutation(() => Category, { nullable: true })
  async updateCategory(
    @Arg("id") id: number,
    @Arg("data", () => CategoryUpdateInput) data: CategoryUpdateInput
  ): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id: id },
    });
    if (category) {
      Object.assign(category, data);

      const errors = await validate(category);
      if (errors.length === 0) {
        await category.save();
        return category;
      } else {
        throw new Error(`Error occured: ${JSON.stringify(errors)}`);
      }
    } else {
      throw new Error(`Error occured`);
    }
  }
}
