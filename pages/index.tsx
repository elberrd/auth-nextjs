import type { NextPage } from "next";
import { useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
//import useRequireAuth from "../lib/useRequireAuth";

const Home: NextPage = () => {
  const { data: session } = useSession();

  // const session = useRequireAuth();
  // if (!session) {
  //   return <div>loading...</div>;
  // }

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">
            {`Hi ${session?.user?.name}, welcome back!`}
          </h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7"></div>
            <div className="p-5">
              <div className="grid">
                <Button
                  onClick={() => (setIsButtonLoading(true), signOut())}
                  //className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  isLoading={isButtonLoading}
                >
                  Sair do Sistema
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Button({ isLoading, children, ...props }) {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
      {...props}
    >
      {isLoading ? "Saindo..." : children}
    </button>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Home;
