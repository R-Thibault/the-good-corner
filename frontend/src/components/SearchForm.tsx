import styles from "@/components/SearchForm.module.css";
import { queryAllCategories } from "@/graphQl/queryAllCategories";
import { queryAllTags } from "@/graphQl/queryAllTags";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { CategoryType } from "./Category";
import { TagType } from "./Tag";
import router from "next/router";

export function SearchForm() {
  const [searchByTags, setSearchByTags] = useState<number>();
  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
  } = useQuery<{ items: CategoryType[] }>(queryAllCategories);
  const {
    data: tagsData,
    error: tagsError,
    loading: tagsLoading,
  } = useQuery<{ items: TagType[] }>(queryAllTags);
  const categories = categoriesData ? categoriesData.items : [];
  const tags = tagsData ? tagsData.items : [];

  async function validateForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/?searchByTags=${searchByTags}`);
  }

  return (
    <div className={styles.formContent}>
      <form action="" onSubmit={validateForm} className={styles.form}>
        <div className={styles.categoriesDiv}>
          <span>Tags</span>
          <div className={styles.categoriesFields}>
            {tags.map((tag) => (
              <React.Fragment key={tag.id}>
                <label>{tag.name}</label>
                <input type="checkbox" name={tag.name} value={tag.id} />
              </React.Fragment>
            ))}
          </div>
        </div>
        <button>Filtrer</button>
      </form>
    </div>
  );
}
