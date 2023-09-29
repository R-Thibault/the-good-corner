import { AdCard, AdType } from "@/components/AdCard";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Ad() {
  const [ad, setAd] = useState<AdType>();

  const router = useRouter();
  const adId = router.query.id as string;

  async function fetchAd() {
    const result = await axios.get<AdType>(`${API_URL}/ads/${adId}`);
    console.log(result);
    setAd(result.data);
  }

  useEffect(() => {
    // mounting
    if (adId !== undefined) {
      fetchAd();
    }
  }, [adId]);

  return (
    <Layout title="Ad">
      <main className="main-content">
        <p>TEST ID: {router.query.id}</p>
        {ad ? (
          <>
            <AdCard
              id={ad.id}
              title={ad.title}
              description={ad.description}
              price={ad.price}
              imgUrl={ad.imgUrl}
              link={""}
              onDelete={fetchAd}
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
