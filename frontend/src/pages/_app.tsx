import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  useQuery,
} from "@apollo/client";
import { queryMe } from "@/graphQl/queryMe";
import { useEffect } from "react";
import { useRouter } from "next/router";

const link = createHttpLink({
  uri: "http://localhost:5000",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
const publicPages = ["/", "/ads/[id]", "/signin", "/signup"];

function Auth(props: { children: React.ReactNode }) {
  const { data, loading, error } = useQuery(queryMe);
  const router = useRouter();
  useEffect(() => {
    if (publicPages.includes(router.pathname) === false) {
      if (!data?.item) {
        router.replace("/signin");
      }
    }
  }, [router, data]);

  if (loading) {
    return <p>Chargement</p>;
  }

  return props.children;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
