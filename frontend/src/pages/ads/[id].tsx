import { AdCard, AdType } from "@/components/AdCard";
import { Layout } from "@/components/Layout";
import { queryAd } from "@/graphQl/queryAd";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function Ad() {
  const router = useRouter();
  const adId = router.query.id;

  const { data, error, loading } = useQuery<{ item: AdType }>(queryAd, {
    variables: { id: adId },
    skip: adId === undefined,
    fetchPolicy: "network-only",
  });

  const ad = data ? data.item : null;

  function fetchAd() {
    router.replace("/");
  }

  return (
    <Layout title="Ad">
      <main className="main-content">
        <p>TEST ID: {adId}</p>
        {ad ? (
          <>
            <AdCard
              id={ad.id}
              title={ad.title}
              description={ad.description}
              price={ad.price}
              imgUrl={ad.imgUrl}
              category={ad.category}
              tags={ad.tags}
              //link={""}
              onDelete={fetchAd}
              editLink={`/ads/${ad.id}/edit`}
            />
          </>
        ) : adId ? (
          "Chargement/erreur"
        ) : (
          "Il manque l'id dans l'URL"
        )}
      </main>
    </Layout>
  );
}
