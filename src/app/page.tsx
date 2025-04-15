"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  const fetchMeetings = async () => {
    const res = await fetch("/api/meetings");
    const data = await res.json();
    console.log("Meetings:", data);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div>
        <h1>Google Meet OAuth Demo</h1>
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <button onClick={fetchMeetings}>Fetch Meetings</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
