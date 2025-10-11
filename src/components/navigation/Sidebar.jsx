import common from "@/common/common";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import DynamicModal from "../DynamicModal";
import staticDataContext from "@/context/staticDataContext";

const navItems = [
  {
    id: "importDeducteeDetails",
    label: "Import Deductee",
    page: "importDeducteeDetails",
    iconClass: "fa-solid fa-file-import",
  },
  {
    id: "settings",
    label: "Settings",
    page: "settings",
    iconClass: "fa-solid fa-gear",
  },
];

const Sidebar = ({ sideBarOpen }) => {
  const { crtFy, crtMonth, crtQuarter } = useContext(staticDataContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const searchObj = {
    fy: crtFy,
    month: crtMonth,
    quarter: crtQuarter,
  };
  const refinedParams = common.getRefinedSearchParams(searchObj);

  return (
    <>
      <div className="fixed top-14 z-10 h-screen">
        <nav
          className={`${sideBarOpen ? "w-60" : "w-16"} group transition-width flex h-[91%] w-16 flex-col overflow-hidden rounded-r-md border border-t-2 border-l-0 border-gray-300 bg-white p-2.5 text-gray-500 duration-300 ease-in-out hover:w-60`}
          style={{ transitionProperty: "width" }}
        >
          {/* Scrollable nav items */}
          <div className="hide-scrollbar flex-1 overflow-y-auto">
            <ul className="space-y-1 text-[15px]">
              {navItems?.map(({ id, label, page, iconClass, textIcon }) => {
                return (
                  <li key={id}>
                    <NavLink
                      to={
                        id === "importDeducteeDetails"
                          ? `/home/listSearch/${page}/${refinedParams}`
                          : `/home/list/${page}`
                      }
                      className={({ isActive }) =>
                        [
                          "flex cursor-pointer items-center justify-between rounded-md px-2 py-2 whitespace-nowrap hover:bg-gray-100",
                          isActive
                            ? "bg-blue-100 font-medium text-blue-500"
                            : "",
                        ].join(" ")
                      }
                    >
                      <div
                        className={`w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover:ml-2 group-hover:w-auto group-hover:opacity-100 ${sideBarOpen ? "ml-2 w-auto opacity-100" : " "}`}
                        style={{
                          transitionProperty: "opacity, width, margin-left",
                        }}
                      >
                        {label}
                      </div>
                      <div>
                        {iconClass ? (
                          <i
                            className={`${iconClass} w-[26px] text-center`}
                          ></i>
                        ) : (
                          <span className="text-center text-sm font-semibold">
                            {textIcon}
                          </span>
                        )}
                      </div>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>

      {/* Render the modal only when open */}
      {isModalOpen && (
        <DynamicModal
          title="Are you sure?"
          description="Do you want to logout !!!"
          isModalOpen={() => setIsModalOpen(true)}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Sidebar;
