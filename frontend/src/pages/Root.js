import { Outlet } from "react-router-dom";
import Navigation from "components/Navigation/Navigation";

function Root() {
  return (
    <>
      <Navigation />
      <main className="flex h-screen">
        <Outlet />
      </main>
    </>
  )
}

export default Root;