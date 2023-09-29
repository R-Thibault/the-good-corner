import { RecentAds } from "@/components/RecentAds";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";

export default function Category() {
  const router = useRouter();
  const categoryId = Number(router.query.id);
  console.log(router.query.id);

  return (
    <>
      <Layout title="Category">
        <main className="main-content">
          <RecentAds categoryId={categoryId} />
        </main>
      </Layout>
    </>
  );
}
