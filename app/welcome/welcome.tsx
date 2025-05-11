import { Link } from "react-router";

export function Welcome() {
  return (
    <>
      <main className="flex-column items-center justify-center pt-16 pb-4 w-[100%] text-center">
        <h1>
          Taylor Jordan
        </h1>
        <p className="w-[100%]">3D Web Applications</p>
        <Link to="/scene">
          <button className="bg-teal-500 p-[0.3rem] mt-[1rem] rounded-md hover:bg-teal-400">
            See the 3D Scene!
          </button>
        </Link>
      </main>
    </>
  );
}

