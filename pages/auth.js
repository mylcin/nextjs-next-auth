import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Head>
        <title>{isLogin ? "Next-Auth Login" : "Next-Auth Register"}</title>
      </Head>
      <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  return {
    props: { session: session },
  };
}
export default AuthPage;
