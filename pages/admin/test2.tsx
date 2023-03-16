import { DDashSmallCard, DDashSmallSection } from "@emile-daigle/d-dash";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SupabaseClient,
  User,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import withAdminLayout from "../../Admin/components/withAdminLayout";
import { checkServerAuth } from "../../lib/database/checkSession";
import { getLastMonthViews } from "../../lib/database/stats";
import IconUsers from "../../components/icons/IconUsers";
import { getGaragesCount } from "../../lib/database/garages";
import { getGuidesCount } from "../../lib/database/guides";
import { Database, supabase } from "../../lib/database/supabase";
import { getErrorsCount } from "../../lib/database/errors";

type Props = {
  viewsCount: number | null;
  errorsCount: number | null;
  garagesCount: number | null;
  guidesCount: number | null;
};

const Index = ({
  viewsCount,
  errorsCount,
  garagesCount,
  guidesCount,
}: Props) => {
  const supabaseClient = useSupabaseClient<Database>();

  return (
    <>
      <DDashSmallSection>
        <DDashSmallCard
          title="Nombre d'erreurs ce mois"
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
    </>
  );
};

export default Index;

Index.getLayout = withAdminLayout();

export const getServerSideProps = async () => {
  try {
    const viewsCount = await getLastMonthViews(supabase);
    const garagesCount = await getGaragesCount();
    const guidesCount = await getGuidesCount();
    const errorsCount = await getErrorsCount(supabase);
    return {
      props: {
        viewsCount,
        errorsCount,
        garagesCount,
        guidesCount,
      },
    };
  } catch (error) {}
};
