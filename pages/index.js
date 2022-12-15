import Head from "next/head";
import StartingPageContent from "../components/starting-page/starting-page";

function HomePage() {
  return (
    <>
      <Head>
        <title>Next-Auth Home</title>
      </Head>
      <StartingPageContent />
    </>
  );
}

export default HomePage;
