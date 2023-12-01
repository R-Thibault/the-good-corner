import { Layout } from "@/components/Layout";

import { TagForm } from "@/components/TagForm";

export default function NewAd() {
  return (
    <>
      <Layout title="Home">
        <main className="main-content">
          <TagForm />
        </main>
      </Layout>
    </>
  );
}
