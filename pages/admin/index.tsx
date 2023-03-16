import {
  DDashLargeSection,
  DDashSmallCard,
  DDashSmallSection,
  DDashTable,
} from "@emile-daigle/d-dash";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import withAdminLayout from "../../Admin/components/withAdminLayout";
import { checkServerAuth } from "../../lib/database/checkSession";
import { getLastMonthViews } from "../../lib/database/stats";
import IconUsers from "../../components/icons/IconUsers";
import { getGaragesCount } from "../../lib/database/garages";
import { getGuidesCount } from "../../lib/database/guides";
import { Database } from "../../lib/database/supabase";
import {
  addError,
  getErrorsCount,
  getUnHandledErrors,
} from "../../lib/database/errors";
import { signOut } from "../../lib/database/signIn";
import IErrorRecord from "../../interfaces/IErrorRecord";
import handleError from "../../utils/handleError";
import { errorsColumns } from "../../lib/tableColumns";

type Props = {
  viewsCount: number | null;
  errorsCount: number | null;
  garagesCount: number | null;
  guidesCount: number | null;
  errorsData: IErrorRecord[];
};

const Index = ({
  viewsCount,
  errorsCount,
  garagesCount,
  guidesCount,
  errorsData
}: Props) => {
  const supabaseClient = useSupabaseClient<Database>();

  return (
    <>
      <DDashSmallSection>
        <DDashSmallCard
          title="Nombre d'erreurs 30 derniers jours"
          value={errorsCount !== null ? errorsCount.toString() : "Erreur"}
        />
        <DDashSmallCard
          title="Utilisateurs ce mois"
          value={viewsCount !== null ? viewsCount.toString() : "Erreur"}
          image={{ component: <IconUsers />, type: "icon" }}
        />
      </DDashSmallSection>
      <DDashSmallSection>
        <DDashSmallCard
          title="Nombre de garages"
          value={garagesCount !== null ? garagesCount.toString() : "Erreur"}
        />
        <DDashSmallCard
          title="Nombre de guides"
          value={guidesCount !== null ? guidesCount.toString() : "Erreur"}
        />
      </DDashSmallSection>
      <DDashLargeSection>
        <DDashTable columns={errorsColumns} data={errorsData} uniqueField={"id"} numberPerPage={10} title="Erreurs à régler"/>
      </DDashLargeSection>
      <DDashSmallSection>
        <DDashSmallCard
          title="Nombre de garages"
          value={garagesCount !== null ? garagesCount.toString() : "Erreur"}
        />
        <button onClick={() => signOut(supabaseClient)}>Sign out</button>
        <p>{true}</p>
      </DDashSmallSection>
    </>
  );
};

export default Index;

Index.getLayout = withAdminLayout();

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const supabase = createServerSupabaseClient<Database>(ctx);
    const session = await checkServerAuth(supabase);
    if (!session)
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    const viewsCount = await getLastMonthViews(supabase);
    if (!viewsCount) await addError("View count", "Admin index");
    const garagesCount = await getGaragesCount();
    if (!garagesCount) await addError("Garages count", "Admin index");
    const guidesCount = await getGuidesCount();
    if (!guidesCount) await addError("Guides count", "Admin index");
    const errorsCount = await getErrorsCount(supabase);
    if (!errorsCount) await addError("Errors count", "Admin index");

    var errorsData: IErrorRecord[] = [];
    try {
      errorsData = await getUnHandledErrors(supabase);
    } catch (error) {
      const errorMessage = handleError(error);
      addError(errorMessage, "Admin index");
    }
    return {
      props: {
        viewsCount,
        errorsCount,
        garagesCount,
        guidesCount,
        errorsData,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
