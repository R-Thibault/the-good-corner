import { AdCard, AdCardProps, AdType } from "./AdCard";
import { useQuery } from "@apollo/client";
import { queryAllAds } from "@/graphQl/queryAllAds";
import router from "next/router";

type RecentAdsProps = {
  categoryId?: number;
  searchWord?: string;
  searchCategory?: number;
  searchByTags?: number;
};

export function RecentAds(props: RecentAdsProps): React.ReactNode {
  console.log(props);
  const { data, error, loading } = useQuery<{ items: AdType[] }>(queryAllAds, {
    variables: {
      where: {
        ...(props.categoryId
          ? {
              categoriesIn: [props.categoryId],
            }
          : {}),
        ...(props.searchByTags ? { tagsIn: [props.searchByTags] } : {}),
        ...(props.searchWord ? { searchTitle: props.searchWord } : {}),
      },
    },
  });
  const ads = data ? data.items : [];

  function fetchAds() {
    router.replace("/");
  }

  return (
    <div className="main-content">
      <h2>Annonces récentes</h2>

      <section className="recent-ads">
        {ads.map((item) => (
          <div key={item.id}>
            <AdCard
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
          </div>
        ))}
      </section>
    </div>
  );
}
