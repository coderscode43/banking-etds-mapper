import common from "@/common/common";
import FilterSelect from "@/components/FilterSelect";
import OpenFolderModal from "@/components/modals/OpenFolderModal";
import Pagination from "@/components/Pagination";
import { TooltipWrapper } from "@/components/Tooltip";
import DynamicTable from "@/components/tables/DynamicTable";
import staticDataContext from "@/context/staticDataContext";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  CircleCheckBig,
  FileChartColumnIncreasing,
  FileText,
  FileType,
  FolderOpen,
  RefreshCw,
  Upload,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const categories = [
  { name: "Import Raw Files", panelName: "importRawFiles" },
  { name: "Import GL Files", panelName: "importGLFiles" },
  { name: "Import GH15 File", panelName: "importGH15File" },
  { name: "Import LDC Files", panelName: "importLDCFiles" },
  {
    name: "Import Refund & Recovery File",
    panelName: "importRefundRecoveryFile",
  },
  { name: "Latest Updated PAN", panelName: "latestUpdatedPAN" },
];

const ImportDeducteeDetails = () => {
  const pageName = "Import Deductee";

  const { params } = useParams();
  const { financialYear, Quarter, Month, clientDetails } =
    useContext(staticDataContext);

  const [listData, setListData] = useState([]);
  const [fileListData, setFileListData] = useState([]);
  const [showOpenFolderModal, setShowOpenFolderModal] = useState(false);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    fy: "",
    month: "",
    quarter: "",
    typeOfFile: "",
    panelName: params?.panelName || "",
  });
  useLockBodyScroll(showOpenFolderModal); // Custom hook to lock body scroll

  useEffect(() => {
    const fetchListData = async () => {
      try {
        let response;
        if (params) {
          const pageNo = 0;
          const resultPerPage = 100;
          const entity = "ProcessDetail";
          response = await common.getSearchListData(
            entity,
            pageNo,
            resultPerPage,
            params
          );
          setSearchParams({
            fy: "",
            month: "",
            quarter: "",
            typeOfFile: "",
            panelName: "",
          });
        }
        setListData(response?.data?.entities || []);

        const count = response?.data?.count || 0;
        const pages = Math.ceil(count / 100);
        setTotalPages(pages);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };
    fetchListData();
  }, [params]);

  // Table Details
  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "addedBy", label: "Added By" },
    { key: "addedOn", label: "Added On" },
    { key: "processName", label: "Process Name" },
    { key: "status", label: "Status" },
    { key: "remark", label: "Remark" },
    { key: "completedOn", label: "Completed On" },
    { key: "action", label: "Action" },
  ];

  const tableData = listData?.map((data, index) => ({
    srNo: (currentPage - 1) * 100 + (index + 1),
    ...data,
  }));

  const handleOpenFolderClick = async () => {
    setShowOpenFolderModal(true);

    try {
      const entity = "WorkingFile";
      const parsedParams = JSON.parse(params);
      const clientPAN = clientDetails?.ClientPAN || "";
      const formData = {
        ...parsedParams,
        pan: clientPAN,
        pageName: pageName,
      };

      const refinedFormData = common.getRefinedSearchParams(formData);
      const response = await common.getFileList(entity, refinedFormData);
      setFileListData(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Import Deductee Details
        </h1>

        <div className="space-y-6 rounded-md border border-gray-100 p-5 shadow-lg">
          <div className="flex items-end justify-between gap-4">
            <div className="flex w-full gap-5">
              <FilterSelect
                label="Financial Year"
                name="fy"
                options={financialYear}
                value={searchParams.fy}
                onChange={common.handleSearchInputChange}
              />
              <FilterSelect
                label="Month"
                name="month"
                options={Month}
                value={searchParams.month}
                onChange={common.handleSearchInputChange}
              />
            </div>

            <div className="flex w-full items-end gap-5">
              <button className="cursor-pointer space-x-2 rounded-sm bg-[var(--secondary-color)] px-3 py-[7px] text-white">
                <FileText className="inline-block" size={20} />
                <span>Open Additional Details</span>
              </button>
              <button
                onClick={() => handleOpenFolderClick()}
                className="cursor-pointer space-x-2 rounded-sm bg-[var(--secondary-color)] px-3 py-[7px] text-white"
              >
                <FolderOpen className="inline-block" size={20} />
                <span>Open Folder</span>
              </button>
              <button className="cursor-pointer space-x-2 rounded-sm bg-[var(--secondary-color)] px-3 py-[7px] text-white">
                <RefreshCw className="inline-block" size={20} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-5">
            <FilterSelect
              label="Quarter"
              name="quarter"
              options={Quarter}
              value={searchParams.quarter}
              onChange={common.handleSearchInputChange}
            />
            <FilterSelect
              label="Type of file"
              name="typeOfFile"
              options={Month}
              value={searchParams.typeOfFile}
              onChange={common.handleSearchInputChange}
            />
          </div>
        </div>

        <div className="rounded-md border border-gray-100 p-5 shadow-lg">
          <div className="flex">
            <div>
              <TabGroup className={"w-full"}>
                <div className="w-full rounded-md bg-gray-200 p-1.5">
                  <TabList className="flex gap-4">
                    {categories?.map(({ name }) => (
                      <Tab
                        key={name}
                        className={({ selected }) =>
                          `cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none ${
                            selected
                              ? "bg-white text-black shadow"
                              : "text-gray-800 hover:bg-gray-100"
                          }`
                        }
                      >
                        {name}
                      </Tab>
                    ))}
                  </TabList>
                </div>

                <TabPanels className="mt-3">
                  {categories?.map(({ name }) => {
                    return (
                      <TabPanel
                        key={name}
                        className="flex items-end gap-5 p-4 pl-0 focus:outline-none"
                      >
                        <div>
                          <label className="font-medium text-[var(--primary-color)]">
                            Select Folder
                          </label>
                          <input
                            type="file"
                            name="branchName"
                            id="branchName"
                            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 file:mr-3 file:cursor-pointer focus:outline-none"
                          />
                        </div>
                        <button className="cursor-pointer items-center justify-center space-x-2 rounded-sm bg-[var(--secondary-color)] px-3 py-[7px] text-white">
                          <Upload className="inline-block" size={20} />
                          <span>Import File</span>
                        </button>
                      </TabPanel>
                    );
                  })}
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-gray-100 p-5 shadow-lg">
          <div className="flex justify-between gap-4">
            <button className="cursor-pointer space-x-2 rounded-sm bg-[var(--secondary-color)] px-10 py-5 text-white">
              <FileChartColumnIncreasing className="inline-block" size={20} />
              <span>Generate Report</span>
            </button>

            <button className="cursor-pointer space-x-2 rounded-sm bg-[var(--secondary-color)] px-10 py-5 text-white">
              <CircleCheckBig className="inline-block" size={20} />
              <span>Launch Refund & Recovery Excel</span>
            </button>

            <button className="cursor-pointer space-x-2 rounded-sm bg-[var(--secondary-color)] px-10 py-5 text-white">
              <FileType className="inline-block" size={20} />
              <span>Validate Data & Segregate Data</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-md border border-gray-100 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-lg font-semibold text-[var(--primary-color)]">
                Activity Log
              </h1>
              <p>Track all the actions and their status</p>
            </div>
            <TooltipWrapper tooltipText={"Refresh"}>
              <div className="cursor-pointer rounded-md border border-gray-200 p-2 shadow-lg">
                <RefreshCw size={20} />
              </div>
            </TooltipWrapper>
          </div>
          <DynamicTable
            entity={pageName}
            tableHead={tableHead}
            tableData={tableData}
          />
        </div>

        {showOpenFolderModal && (
          <OpenFolderModal
            onClose={() => setShowOpenFolderModal(false)}
            fileListData={fileListData}
          />
        )}
      </div>

      {/* Pagination */}
      {listData.length > 0 && (
        <Pagination
          entity={pageName}
          setListData={setListData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          gotoPage={gotoPage}
          setGotoPage={setGotoPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default ImportDeducteeDetails;
