import { DDashContainer, DDashSideMenu } from "@emile-daigle/d-dash";

interface Props {
  children: React.ReactElement;
}

const links = [
  {
    link: "/admin",
    displayName: "Accueil",
  },
  {
    link: "/admin/guides",
    displayName: "Guides",
  },
  {
    link: "/admin/garages",
    displayName: "Garages",
  },
];

const dialogConfig = {
  title: "Êtes-vous certain?",
  message: "Cette action est irréversible, voulez-vous continuer?",
  cancelButton: "Annuler",
  confirmButton: "Continuer",
};

export default function AdminLayout({ children }: Props) {
  return (
    <DDashContainer
      nav={{ component: <DDashSideMenu links={links} image={{src:"/GSQ.png", alt:"Logo"}} />, position: "left" }}
      defaultDialogText={dialogConfig}
    >
      {children}
    </DDashContainer>
  );
}
