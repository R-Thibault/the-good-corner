import { useEffect, useState } from "react";
import { AdCard, AdCardProps, AdType } from "./AdCard";
import axios from "axios";
import { API_URL } from "@/config";

type RecentAdsProps = {
  categoryId?: number;
  searchWord?: string;
};

export function RecentAds(props: RecentAdsProps): React.ReactNode {
  const [ads, setAds] = useState([] as AdCardProps[]);

  async function fetchAds() {
    // be careful here, I'm injected a category ID filter
    // but it depends on how you implement your filter on your API
    let url = `${API_URL}/ads?`;

    if (props.categoryId) {
      url += `categoryIn=${props.categoryId}&`;
    }

    const result = await axios.get(url);
    setAds(result.data);
  }

  useEffect(() => {
    // mounting
    fetchAds();
  }, [props.categoryId]);

  return (
    <main className="main-content">
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
              onDelete={fetchAds}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
