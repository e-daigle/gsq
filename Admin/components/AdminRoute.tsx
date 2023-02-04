import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    login && router.push("/account/login"); //or router.replace("/account/login");
  }, [login]);
  useEffect(() => {
    !user && setLogin(true);
  }, []);

  return (
    <>
      {user ? (
        children
      ) : (
        <div>
          <h4>
            You are not Authorized.{" "}
            <Link href="/account/login">
              <a>Please log in</a>
            </Link>
          </h4>
        </div>
      )}
    </>
  );
};
