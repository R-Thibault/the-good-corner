import { AdCard, AdCardProps, AdType } from "./AdCard";
import { useQuery } from "@apollo/client";
import { queryAllAds } from "@/graphQl/queryAllAds";
import router from "next/router";
import { useState } from "react";
import { Flipped, Flipper, spring } from "react-flip-toolkit";

type RecentAdsProps = {
  categoryId?: number;
  searchWord?: string;
  filterCategories?: string;
  filterTags?: string;
};

export function RecentAds(props: RecentAdsProps): React.ReactNode {
  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(0);
  // console.log(props);
  const {
    data: data,
    error,
    loading,
    fetchMore,
  } = useQuery<{ items: AdType[]; count: number }>(queryAllAds, {
    variables: {
      take: pageSize,
      skip: page * pageSize,
      where: {
        ...(props.filterCategories
          ? { categoriesIn: [props.filterCategories] }
          : {}),
        ...(props.filterTags ? { tagsIn: [props.filterTags] } : {}),
        ...(props.searchWord ? { searchTitle: props.searchWord } : {}),
      },
    },
  });
  const ads = data ? data.items : [];

  const count = data ? data.count : 0;
  const pagesCount = Math.ceil(count / pageSize);

  function fetchAds() {
    router.replace("/");
  }

  return (
    <div className="main-content">
      <h2>Annonces récentes</h2>
      <nav>
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          className="button-primary"
        >
          Previous
        </button>
        <span className="info">Page {page + 1}</span>
        <button
          className="button-primary"
          disabled={page === pagesCount - 1}
          onClick={() => setPage((prev) => Math.min(page + 1, pagesCount))}
        >
          Next
        </button>
      </nav>
      <Flipper flipKey={ads.join("")} spring="stiff">
        <section className="recent-ads">
          {ads.map((item) => (
            <AdCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              price={item.price}
              imgUrl={item.imgUrl}
              link={`/ads/${item.id}`}
              category={item.category}
              tags={item.tags}
              onDelete={fetchAds}
              editLink={`/ads/${item.id}/edit`}
            />
          ))}
        </section>
      </Flipper>
    </div>
  );
}
