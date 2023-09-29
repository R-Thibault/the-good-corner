import { Layout } from "@/components/Layout";

import { AdForm } from "@/components/AdForm";

export default function NewAd() {
  return (
    <>
      <Layout title="Home">
        <main className="main-content">
          <AdForm />
        </main>
      </Layout>
    </>
  );
}
