import { DDashLargeSection, DDashTable } from "@emile-daigle/d-dash";
import { RowMenuAction } from "@emile-daigle/d-dash/types";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import withAdminLayout from "../../../Admin/components/withAdminLayout";
import ErrorPage from "../../../components/ErrorPage";
import IGarage from "../../../interfaces/IGarage";
import { checkServerAuth } from "../../../lib/Database/checkSession";
import { deleteGarage } from "../../../lib/Database/garages";
import { getGuides } from "../../../lib/Database/guides";
import { guidesColumns } from "../../../lib/tableColumns";
import { Database } from "../../../lib/Database/supabase";

type Props = {
  guides: IGarage[];
  error?: string;
};

const Index = ({ guides, error }: Props) => {
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();

  if (error) return <ErrorPage message={error} />;
  if (!guides) return <ErrorPage message={"Données manquante"} />;

  const guidesActions: RowMenuAction[] = [
    {
      name: "Modifier",
      onClick: (idx: string) => router.push("/admin/guides/" + idx),
    },
  ];

  return (
    <>
      <DDashLargeSection>
        <DDashTable
          columns={guidesColumns}
          data={guides}
          uniqueField={"link"}
          rowActions={guidesActions}
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
    const guides = await getGuides();
    return {
      props: {
        guides,
      },
    };
  } catch (error) {
    return error;
  }
};
Index.getLayout = withAdminLayout();
