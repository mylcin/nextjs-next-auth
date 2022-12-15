import Head from "next/head";
import { Fragment } from "react";
import MainNavigation from "./main-navigation";

function Layout({ children }) {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MainNavigation />
      <main>{children}</main>
    </Fragment>
  );
}

export default Layout;
