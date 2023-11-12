import styles from "@/components/SearchForm.module.css";
import { queryAllCategories } from "@/graphQl/queryAllCategories";
import { queryAllTags } from "@/graphQl/queryAllTags";
import { empty, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CategoryType } from "./Category";
import { TagType } from "./Tag";
import router, { useRouter } from "next/router";

export function SearchForm() {
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const router = useRouter();
  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
  } = useQuery<{ items: CategoryType[] }>(queryAllCategories);
  const categories = categoriesData ? categoriesData.items : [];

  const {
    data: tagsData,
    error: tagsError,
    loading: tagsLoading,
  } = useQuery<{ items: TagType[] }>(queryAllTags);
  const tags = tagsData ? tagsData.items : [];

  const filterHandler = (event: {
    target: { checked: any; value: string; ariaLabel: string };
  }) => {
    if (event.target.checked) {
      if (event.target.ariaLabel === "tag") {
        setFilterTags([...filterTags, event.target.value]);
      } else if (event.target.ariaLabel === "category") {
        setFilterCategories([...filterCategories, event.target.value]);
      }
    } else {
      if (event.target.ariaLabel === "tag") {
        setFilterTags(
          filterTags.filter((filterTag) => filterTag !== event.target.value)
        );
      } else if (event.target.ariaLabel === "category") {
        setFilterCategories(
          filterCategories.filter(
            (filterCategory) => filterCategory !== event.target.value
          )
        );
      }
    }
  };

  useEffect(() => {
    router.push(`/?filterCategories=${filterCategories}`);
  }, [filterCategories]);

  useEffect(() => {
    router.push(`/?filterTags=${filterTags}`);
  }, [filterTags]);
  //console.log(filterTags);

  return (
    <div className={styles.formContent}>
      <div className={styles.categoriesDiv}>
        <span>Categories</span>
        <div className={styles.categoriesFields}>
          {categories.map((category) => (
            <div className={styles.checkboxDiv} key={category.id}>
              <label>{category.name}</label>
              <input
                aria-label="category"
                type="checkbox"
                value={category.id}
                onChange={filterHandler}
              />
            </div>
          ))}
        </div>
        <span>Tags</span>
        <div className={styles.categoriesFields}>
          {tags.map((tag) => (
            <div key={tag.id}>
              <label>{tag.name}</label>
              <input
                aria-label="tag"
                type="checkbox"
                value={tag.id}
                onChange={filterHandler}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
