import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/react";
import Head from "next/head";

function ProfilePage() {
  return (
    <>
      <Head>
        <title>Next-Auth Profile</title>
      </Head>
      <UserProfile />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: { session: session },
  };
}

export default ProfilePage;
