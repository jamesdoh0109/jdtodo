import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

function Root() {
  return (
    <>
      <Navigation />
      <div className="flex h-screen bg-slate-200">
        <Outlet />
      </div>
    </>
  )
}

export default Root;