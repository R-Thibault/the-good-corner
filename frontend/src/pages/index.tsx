import { RecentAds } from "@/components/RecentAds";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchForm } from "@/components/SearchForm";
import { ParsedUrlQuery } from "node:querystring";

export default function Home() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState<string>();
  const [filterCategories, setFilterCategories] = useState<string>("");
  const [filterTags, setFilterTags] = useState<string>("");
  useEffect(() => {
    //console.log(router.query);
    if (typeof router.query.searchWord === "string") {
      setSearchWord(router.query.searchWord);
    }
    if (typeof router.query.filterCategories === "string") {
      setFilterCategories(router.query.filterCategories);
    } else {
      setFilterCategories("");
    }
    if (typeof router.query.filterTags === "string") {
      setFilterTags(router.query.filterTags);
    } else {
      setFilterTags("");
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
function empty(query: ParsedUrlQuery) {
  throw new Error("Function not implemented.");
}
