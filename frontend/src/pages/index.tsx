import { RecentAds } from "@/components/RecentAds";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchForm } from "@/components/SearchForm";

export default function Home() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState<string>();
  const [searchCategory, setSearchCategory] = useState<number>();
  const [searchByTags, setSearchByTags] = useState<number>();
  useEffect(() => {
    if (typeof router.query.searchWord === "string") {
      setSearchWord(router.query.searchWord);
    }
  }, [router.query]);
  useEffect(() => {
    if (typeof router.query.searchCategory === "number") {
      setSearchWord(router.query.searchCategory);
    }
  }, [router.query]);
  useEffect(() => {
    if (typeof router.query.searchByTags === "number") {
      setSearchWord(router.query.searchByTags);
    }
  }, [router.query]);
  return (
    <>
      <Layout title="Home">
        <main className="main">
          <SearchForm />
          <RecentAds
            searchWord={searchWord}
            searchCategory={searchCategory}
            searchByTags={searchByTags}
          />
        </main>
      </Layout>
    </>
  );
}
