import { Layout } from "@/components/Layout";
import { queryMe } from "@/graphQl/queryMe";
import { useQuery } from "@apollo/client";

export default function Me() {
  const { data, loading, error } = useQuery(queryMe);
  const me = data?.item;
  return (
    <>
      <Layout title="Me">
        <main className="main-content">
          <p>Hello ! {me?.email}</p>
        </main>
      </Layout>
    </>
  );
}
