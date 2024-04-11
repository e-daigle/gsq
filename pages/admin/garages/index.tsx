import { DDashLargeSection, DDashTable } from "@emile-daigle/d-dash";
import { RowMenuAction } from "@emile-daigle/d-dash/types";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import withAdminLayout from "../../../Admin/components/withAdminLayout";
import ErrorPage from "../../../components/ErrorPage";
import IGarage from "../../../interfaces/IGarage";
import { checkServerAuth } from "../../../lib/Database/checkSession";
import { deleteGarage, getGarages } from "../../../lib/Database/garages";
import { garagesColumns } from "../../../lib/tableColumns";
import { Database } from "../../../lib/Database/supabase";

type Props = {
  garages: IGarage[];
  error?: string;
};

const Index = ({ garages, error }: Props) => {
  const supabaseClient = useSupabaseClient<Database>();

  if (error) return <ErrorPage message={error} />;
  if (!garages) return <ErrorPage message={"Données manquante"} />;

  const garagesActions: RowMenuAction[] = [
    {
      name: "Supprimer",
      onClick: (idx: string) => deleteGarage(supabaseClient, parseInt(idx)),
    },
    {
      name: "Modifier",
      onClick: (idx: string) => deleteGarage(supabaseClient, parseInt(idx)),
    },
  ];

  return (
    <>
      <DDashLargeSection>
        <DDashTable
          columns={garagesColumns}
          data={garages}
          uniqueField={"id"}
          rowActions={garagesActions}
        />
      </DDashLargeSection>
    </>
  );
};

export default Index;

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
    const garages = await getGarages();
    return {
      props: {
        garages,
      },
    };
  } catch (error) {
    return error;
  }
};
Index.getLayout = withAdminLayout();
