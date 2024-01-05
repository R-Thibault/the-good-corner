import { Layout } from "@/components/Layout";

import { CategoryForm } from "@/components/CategoryForm";

export default function NewAd() {
  return (
    <>
      <Layout title="Home">
        <main className="main-content">
          <CategoryForm />
        </main>
      </Layout>
    </>
  );
}
