import { Layout } from "@/components/Layout";
import { queryMe } from "@/graphQl/queryMe";
import { UserType } from "@/types";
import { useQuery } from "@apollo/client";

export default function Me() {
  const { data: meData } = useQuery<{ item: UserType | null }>(queryMe);
  const me = meData?.item;
  console.log(me);
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
