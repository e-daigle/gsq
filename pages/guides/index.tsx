import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import GuideCard from "../../components/GuideCard";
import SearchBar from "../../components/SearchBar";
import withLayout from "../../layouts/withLayout";
import IGuide from "../../interfaces/IGuide";
import { getGuides } from "../../lib/Database/guides";
import styles from "../../styles/guides.module.css";
import handleError from "../../utils/handleError";
import ErrorPage from "../../components/ErrorPage";
import { addError } from "../../lib/Database/errors";
import Head from "next/head";

type Props = {
  guides?: IGuide[];
  error?: string;
};

const Guides = ({ guides, error }: Props) => {
  const [searchWord, setSearchWord] = useState("");
  if (error) return <ErrorPage message={error} />;
  if (!guides) return <ErrorPage message={"Données manquante"} />;

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Retrouvez des guides sur la modification et l'entretien de votre véhicule Subaru."
          key="description"
        />
        <meta
          property="og:title"
          content="Guide Subaru Québec - Guides"
          key="og:title"
        />
        <meta
          property="og:description"
          content="Guides sur l'entretien et la modification de voitures Subaru."
          key="og:description"
        />
        <meta
          property="og:url"
          content="https://guidesubaruquebec.com/guides"
          key="og:url"
        />
      </Head>
      <div className={styles.container}>
        <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
        {
          <div className={styles.cards}>
            {guides
              .filter((guide) =>
                (guide.titre.toLowerCase() + guide.desc.toLowerCase()).includes(
                  searchWord.toLowerCase()
                )
              )
              .map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
          </div>
        }
      </div>
    </>
  );
};

export default Guides;

Guides.getLayout = withLayout();

export const getStaticProps: GetStaticProps = async () => {
  try {
    const guides = await getGuides();
    if (!guides) throw new Error("Erreur dans la base de données des guides");
    return {
      props: {
        guides,
      },
      revalidate: 300,
    };
  } catch (error) {
    const errorMessage = handleError(error);
    addError(errorMessage, "Admin index");
    return {
      props: {
        error: errorMessage,
      },
      revalidate: 10,
    };
  }
};
