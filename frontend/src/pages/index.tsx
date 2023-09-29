import { RecentAds } from "@/components/RecentAds";
import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Layout title="Home">
        <main className="main-content">
          <RecentAds />
        </main>
      </Layout>
    </>
  );
}
