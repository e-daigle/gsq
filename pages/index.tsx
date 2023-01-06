import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import HomeCards from "../components/HomeCards";
import Hero from "../components/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <section className="heroParallax">
        <Hero />
      </section>
      <section className="marginParallax">
        <HomeCards />
      </section>
    </>
  );
}
