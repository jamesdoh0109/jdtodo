import { useState } from "react";
import { ListGroup } from "flowbite-react";
import EditProfile from "../components/Account/EditProfile";
import DeleteAccount from "../components/Account/DeleteAccount";
import ChangePassword from "../components/Account/ChangePassword";

export default function Account() {
  const [activeSection, setActiveSection] = useState("Profile");

  const toggleSections = (
    <div className="w-48">
      <ListGroup>
        <ListGroup.Item
          active={activeSection === "Profile"}
          onClick={() => setActiveSection("Profile")}
        >
          Profile
        </ListGroup.Item>
        <ListGroup.Item
          active={activeSection === "Change Password"}
          onClick={() => setActiveSection("Change Password")}
        >
          Change Password
        </ListGroup.Item>
        <ListGroup.Item
          active={activeSection === "Delete Account"}
          onClick={() => setActiveSection("Delete Account")}
        >
          Delete Account
        </ListGroup.Item>
      </ListGroup>
    </div>
  );

  return (
    <div className="flex justify-center w-full">
      <div className="w-4/5">
        <div className="flex mt-32">
          {toggleSections}
          <div className="ml-8 w-full">
            {activeSection === "Profile" && <EditProfile />}
            {activeSection === "Change Password" && <ChangePassword />}
            {activeSection === "Delete Account" && <DeleteAccount />}
          </div>
        </div>
      </div>
    </div>
  );
}
