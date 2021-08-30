import { useState, useContext } from "react";
import Head from "next/head";
import router, { useRouter } from "next/router";

import { DroneDeliveryContext } from "@/state/Context";

import styles from "@/styles/Home.module.css";
import Button from "@/components/Button";

export default function VerifyPage() {
  const { user, handleChangeUser } = useContext(DroneDeliveryContext);

  function verifiedSubmit(e) {
    e.preventDefault();

    // Put data from context into db

    // Redirect to the thanks page
    router.push("/thanks");
    // Clear out context
    handleChangeUser({});
  }

  function unVerifiedSubmit(e) {
    e.preventDefault();
    router.push("/");
  }

  // If context is empty, go back to home page
  if (user.name === "") return <div>Go back</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Drone Delivery</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <p>
            {user.name} please verify that{" "}
            <span className="border border-green-500 bg-green-100 text-green-800 rounded-md px-1">
              {user.street}, {user.city}, {user.state} {user.zipcode}
            </span>
            is your correct address.
          </p>
        </div>

        <div className="flex gap-5">
          <Button handleSubmit={verifiedSubmit}>Verify</Button>
          <Button handleSubmit={unVerifiedSubmit}>This is Incorrect</Button>
        </div>
      </main>
    </div>
  );
}
