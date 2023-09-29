import { AdType } from "@/components/AdCard";
import { AdForm } from "@/components/AdForm";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Patch() {
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
    <Layout title="AdEdit">
      <main className="main-content">{ad && <AdForm ad={ad} />}</main>
    </Layout>
  );
}
