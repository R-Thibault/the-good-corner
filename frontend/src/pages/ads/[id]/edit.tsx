import { AdType } from "@/components/AdCard";
import { AdForm } from "@/components/AdForm";
import { Layout } from "@/components/Layout";
import { queryAd } from "@/graphQl/queryAd";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function Patch() {
  const router = useRouter();
  const adId = router.query.id as string;

  const { data } = useQuery<{ item: AdType }>(queryAd, {
    variables: { id: adId },
  });

  const ad = data ? data?.item : null;
  return (
    <Layout title="AdEdit">
      <main className="main-content">{ad && <AdForm ad={ad} />}</main>
    </Layout>
  );
}
