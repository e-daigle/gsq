export const errorsColumns = [
  {
    title: "ID",
    field: "id",
  },
  {
    title: "Date",
    field: "created_at",
    filter: (input: string): string => {
      const filteredString = input.slice(0,10);
      return filteredString;
    }
  },
  {
    title: "Page",
    field: "page",
  },
  {
    title: "Erreur",
    field: "error",
  },
];

export const garagesColumns = [
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
  }
];

export const guidesColumns = [
  {
    field: "id",
    title: "ID",
  },
  {
    field: "titre",
    title: "Titre",
  },
  {
    field: "link",
    title: "Lien",
  },
  {
    field: "desc",
    title: "Description",
  }
];