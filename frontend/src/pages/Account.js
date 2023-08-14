import { useState } from "react";
import { Tabs } from "flowbite-react";
import EditProfile from "components/Account/EditProfile";
import DeleteAccount from "components/Account/DeleteAccount";
import ChangePassword from "components/Account/ChangePassword";

const customTheme = {
  base: "flex flex-col gap-2",
  tablist: {
    tabitem: {
      base: "flex items-center justify-center p-4 rounded-t-lg text-md font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:outline-none",
      styles: {
        default: {
          base: "rounded-t-lg",
          active: {
            on: "bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-500",
            off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300",
          },
        },
      },
    },
  },
};

export default function Account() {
  const [activeSection, setActiveSection] = useState("Profile");

  const toggleSections = (
    <Tabs.Group aria-label="Default tabs" theme={customTheme}>
      <Tabs.Item
        active={activeSection === "Profile"}
        title="Profile"
        onClick={() => setActiveSection("Profile")}
        className="text-md"
      >
        <EditProfile />
      </Tabs.Item>
      <Tabs.Item
        active={activeSection === "Change Password"}
        title="Change Password"
        onClick={() => setActiveSection("Change Password")}
      >
        <ChangePassword />
      </Tabs.Item>
      <Tabs.Item
        active={activeSection === "Delete Account"}
        title="Delete Account"
        onClick={() => setActiveSection("Delete Account")}
      >
        <DeleteAccount />
      </Tabs.Item>
    </Tabs.Group>
  );

  return (
    <div className="flex justify-center w-full">
      <div className="w-4/5">
        <div className="l-lg-h:mt-32 l-md-h:mt-24 l-sm-h:mt-16">
          {toggleSections}
        </div>
      </div>
    </div>
  );
}
