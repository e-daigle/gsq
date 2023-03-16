import { DDashLargeSection, DDashTable } from "@emile-daigle/d-dash";
import React from "react";
import withAdminLayout from "../../../Admin/components/withAdminLayout";
import IGarage from "../../../interfaces/IGarage";
import { getGarages } from "../../../lib/database/garages";

const columns = [
  {
    field: "id",
    title: "ID",
  },
  {
    field: "name",
    title: "Nom",
  },
  {
    field: "link",
    title: "Lien",
  },
  {
    field: "phone",
    title: "Téléphone",
  },
  {
    field: "address",
    title: "Adresse",
  },
];

type Props = {
  garages: IGarage[];
};
const Index = ({ garages }: Props) => {
  return (
    <>
      <DDashLargeSection>
        <DDashTable columns={columns} data={garages} uniqueField={"id"} />
      </DDashLargeSection>
    </>
  );
};

export default Index;

export const getServerSideProps = async () => {
  try {
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
