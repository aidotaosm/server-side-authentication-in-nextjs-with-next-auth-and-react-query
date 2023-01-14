import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Fragment, useState } from "react";
import { AxiosInterceptorComponent } from "../src/components/AxiosInterceptorComponent";
import RefreshTokenHandler from "../src/components/RefreshTokenHandler";

interface CustomPageProps {
  dehydratedState: any;
}
const PMSWebApp: NextPage<AppProps<CustomPageProps>> = ({
  Component,
  pageProps,
}: AppProps<CustomPageProps>) => {
  const [queryClient] = useState(new QueryClient());
  return (
    <Fragment>
      <Head>
        <title>
          Server Side Authentication Flow with NextJs 13.1.2 and React-Query
        </title>
        <meta
          name="description"
          content="Server Side Authentication Flow with NextJs 13.1.2 and React-Query."
          key="description"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Fragment>
            <Fragment>
              <AxiosInterceptorComponent />
              <Component {...pageProps} />
              <RefreshTokenHandler />
            </Fragment>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </Fragment>
        </Hydrate>
      </QueryClientProvider>
    </Fragment>
  );
};

export default PMSWebApp;
