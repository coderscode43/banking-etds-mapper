import common from "@/common/common";
import Pagination from "@/components/Pagination";
import { TooltipWrapper } from "@/components/Tooltip";
import DynamicTable from "@/components/tables/DynamicTable";
import staticDataContext from "@/context/staticDataContext";
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
  { name: "Import Raw Files" },
  { name: "Import GL Files" },
  { name: "Import GH15 File" },
  { name: "Import LDC Files" },
  { name: "Import Refund & Recovery File" },
  { name: "Latest Updated PAN" },
];

const FilterSelect = ({ label, name, options, value, onChange }) => (
  <div className="w-full">
    <label className="font-semibold text-[var(--primary-color)]">{label}</label>
    <select
      name={name}
      id={name}
      className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
      value={value}
      onChange={onChange}
    >
      <option value="">Select {label}</option>
      {options &&
        options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
    </select>
  </div>
);

const ImportDeducteeDetails = () => {
  const entity = "importDeducteeDetails";

  const { params } = useParams();
  const { financialYear, Quarter, Month } = useContext(staticDataContext);

  const [listData, setListData] = useState([]);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    fy: "",
    month: "",
    quarter: "",
    typeOfFile: "",
  });

  useEffect(() => {
    const fetchListData = async () => {
      try {
        let response;
        if (params) {
          const pageNo = 0;
          response = await common.getSearchListData(entity, pageNo, params);
          setSearchParams({
            fy: "",
            month: "",
            quarter: "",
            typeOfFile: "",
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
    { key: "actionName", label: "Action Name" },
    { key: "Performed By", label: "Performed On" },
    { key: "status", label: "Status" },
    { key: "remarks", label: "Remarks" },
    { key: "updates", label: "Updates" },
  ];

  const tableData = listData?.map((data, index) => ({
    srNo: (currentPage - 1) * 100 + (index + 1),
    ...data,
  }));

  const handleSearchParamsChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => {
      return { ...prev, [name]: value };
    });
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
                onChange={handleSearchParamsChange}
              />
              <FilterSelect
                label="Month"
                name="month"
                options={Month}
                value={searchParams.month}
                onChange={handleSearchParamsChange}
              />

              {/* <div className="w-full">
                <label className="font-semibold text-[var(--primary-color)]">
                  Financial Year
                </label>
                <select
                  name="fy"
                  id="fy"
                  className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  onChange={(e) =>
                    common.handleSearchInputChange(e, setSearchParams)
                  }
                >
                  <option value="">Financial Year</option>
                  {financialYear &&
                    financialYear.length > 0 &&
                    financialYear.map((state, index) => {
                      return (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      );
                    })}
                </select>
              </div> */}

              {/* <div className="w-full">
                <label className="font-semibold text-[var(--primary-color)]">
                  Month
                </label>
                <select
                  name="month"
                  id="month"
                  className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  onChange={(e) =>
                    common.handleSearchInputChange(e, setSearchParams)
                  }
                >
                  <option value="">Select Month</option>
                  {Month &&
                    Month.length > 0 &&
                    Month.map((state, index) => {
                      return (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      );
                    })}
                </select>
              </div> */}
            </div>

            <div className="flex w-full items-end gap-5">
              <button className="cursor-pointer space-x-2 rounded-sm bg-[#1761fd] px-3 py-[7px] text-white">
                <FileText className="inline-block" size={20} />
                <span>Open Additional Details</span>
              </button>
              <button className="cursor-pointer space-x-2 rounded-sm bg-[#1761fd] px-3 py-[7px] text-white">
                <FolderOpen className="inline-block" size={20} />
                <span>Open Folder</span>
              </button>
              <button className="cursor-pointer space-x-2 rounded-sm bg-[#1761fd] px-3 py-[7px] text-white">
                <RefreshCw className="inline-block" size={20} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-5">
            {/* <div className="w-full">
              <label className="font-semibold text-[var(--primary-color)]">
                Quarter
              </label>
              <select
                name="quarter"
                id="quarter"
                className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Quarter</option>
                {Quarter &&
                  Quarter.length > 0 &&
                  Quarter.map((state, index) => {
                    return (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    );
                  })}
              </select>
            </div> */}

            {/* <div className="w-full">
              <label className="font-semibold text-[var(--primary-color)]">
                Type of file
              </label>
              <select
                name="typeOfFile"
                id="typeOfFile"
                className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Type of file</option>
                {Month &&
                  Month.length > 0 &&
                  Month.map((state, index) => {
                    return (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    );
                  })}
              </select>
            </div> */}

            <FilterSelect
              label="Quarter"
              name="quarter"
              options={Quarter}
              value={searchParams.quarter}
              onChange={handleSearchParamsChange}
            />
            <FilterSelect
              label="Type of file"
              name="typeOfFile"
              options={Month}
              value={searchParams.typeOfFile}
              onChange={handleSearchParamsChange}
            />
          </div>
        </div>

        <div className="rounded-md border border-gray-100 p-5 shadow-lg">
          <div className="flex">
            <div>
              <TabGroup>
                <div className="rounded-md bg-gray-200 p-1.5">
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
                        <button className="cursor-pointer items-center justify-center space-x-2 rounded-sm bg-[#1761fd] px-3 py-[7px] text-white">
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
            <button className="cursor-pointer space-x-2 rounded-sm bg-[#1761fd] px-10 py-5 text-white">
              <FileChartColumnIncreasing className="inline-block" size={20} />
              <span>Generate Report</span>
            </button>

            <button className="cursor-pointer space-x-2 rounded-sm bg-[#1761fd] px-10 py-5 text-white">
              <CircleCheckBig className="inline-block" size={20} />
              <span>Launch Refund & Recovery Excel</span>
            </button>

            <button className="cursor-pointer space-x-2 rounded-sm bg-[#1761fd] px-10 py-5 text-white">
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
            entity={entity}
            tableHead={tableHead}
            tableData={tableData}
          />
        </div>
      </div>

      {/* Pagination */}
      {listData.length > 0 && (
        <Pagination
          entity={entity}
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
