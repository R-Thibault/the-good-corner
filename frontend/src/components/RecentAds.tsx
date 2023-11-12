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
  //const [filterTags, setFilterTags] = useState<string[]>([]);
  //console.log(props);
  const {
    data: adsData,
    error,
    loading,
  } = useQuery<{ items: AdType[] }>(queryAllAds, {
    variables: {
      where: {
        ...(props.filterCategories
          ? { categoriesIn: [props.filterCategories] }
          : {}),
        ...(props.filterTags ? { tagsIn: [props.filterTags] } : {}),
        ...(props.searchWord ? { searchTitle: props.searchWord } : {}),
      },
    },
  });
  const ads = adsData ? adsData.items : [];

  function fetchAds() {
    router.replace("/");
  }

  return (
    <div className="main-content">
      <h2>Annonces récentes</h2>
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
