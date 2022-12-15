import classes from "./starting-page.module.css";
import { useSession } from "next-auth/react";

function StartingPageContent() {
  const { data: session, status } = useSession();
  if (status === "loading")
    return <h2 className={classes.starting}>Loading...</h2>;
  return (
    <section className={classes.starting}>
      <h1>Welcome to Home!</h1>
      {status === "authenticated" ? (
        <h2>Hello {session.user.email}!</h2>
      ) : (
        <h2>You are not logged in.</h2>
      )}
    </section>
  );
}

export default StartingPageContent;
