import { RecentAds } from "@/components/RecentAds";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchForm } from "@/components/SearchForm";

export default function Home() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState<string>();
  const [filterCategories, setFilterCategories] = useState<string>();
  const [filterTags, setFilterTags] = useState<string>();
  useEffect(() => {
    if (typeof router.query.searchWord === "string") {
      setSearchWord(router.query.searchWord);
    }
  }, [router.query]);
  useEffect(() => {
    if (typeof router.query.filterCategories === "string") {
      setFilterCategories(router.query.filterCategories);
    }
  }, [router.query]);
  useEffect(() => {
    if (typeof router.query.filterTags === "string") {
      setFilterTags(router.query.filterTags);
    }
  }, [router.query]);
  return (
    <>
      <Layout title="Home">
        <main className="main">
          <SearchForm />
          <RecentAds
            searchWord={searchWord}
            filterCategories={filterCategories}
            filterTags={filterTags}
          />
        </main>
      </Layout>
    </>
  );
}
