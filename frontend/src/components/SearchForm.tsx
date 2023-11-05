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
  const router = useRouter();
  // const {
  //   data: categoriesData,
  //   error: categoriesError,
  //   loading: categoriesLoading,
  // } = useQuery<{ items: CategoryType[] }>(queryAllCategories);
  const {
    data: tagsData,
    error: tagsError,
    loading: tagsLoading,
  } = useQuery<{ items: TagType[] }>(queryAllTags);
  //const categories = categoriesData ? categoriesData.items : [];
  const tags = tagsData ? tagsData.items : [];

  const filterHandler = (event: {
    target: { checked: any; value: string };
  }) => {
    console.log(event.target.value);
    if (event.target.checked) {
      setFilterTags([...filterTags, event.target.value]);
    } else {
      setFilterTags(
        filterTags.filter((filterTag) => filterTag !== event.target.value)
      );
    }
  };

  useEffect(() => {
    router.push(`/?filterTags=${filterTags}`);
  }, [filterTags]);
  //console.log(filterTags);

  return (
    <div className={styles.formContent}>
      <div className={styles.categoriesDiv}>
        <span>Tags</span>
        <div className={styles.categoriesFields}>
          {tags.map((tag) => (
            <div key={tag.id}>
              <label>{tag.name}</label>
              <input type="checkbox" value={tag.id} onChange={filterHandler} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
