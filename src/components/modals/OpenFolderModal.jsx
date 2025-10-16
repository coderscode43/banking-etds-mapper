import React from "react";
import DynamicTable from "../tables/DynamicTable";
import { useState } from "react";
import AddFolderModal from "./AddFolderModal";
import AddDocumentModal from "./AddDocumentModal";
import CreateFolderModal from "./CreateFolderModal";

const OpenFolderModal = ({ onClose }) => {
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);

  const handleAddFolder = (folderName) => {
    console.log("Selected folder:", folderName);
  };

  const handleAddDocument = (folderName) => {
    console.log("Selected folder:", folderName);
  };

  const handleCreateFolder = (folderName) => {
    console.log("Selected folder:", folderName);
  };

  // Table Details
  const tableHead = [
    { key: "select", label: "Select" },
    { key: "fileName", label: "File Name" },
    { key: "lastModified", label: "Last Modified" },
    { key: "fileType", label: "File Type" },
    { key: "fileSize", label: "File Size" },
    { key: "action", label: "Action" },
  ];

  const tableData = [];

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Working File
            </h2>
            <button
              onClick={onClose}
              className="cursor-pointer text-xl text-gray-600"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Body */}
          <div className="space-y-5 p-6">
            {/* Top Buttons */}
            <div className="flex gap-3">
              <button
                className="cursor-pointer space-x-1 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                onClick={() => setShowAddFolderModal(true)}
              >
                <i className="fa-solid fa-folder"></i> <span>Add Folder</span>
              </button>
              <button
                className="cursor-pointer space-x-1 rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                onClick={() => setShowAddDocumentModal(true)}
              >
                <i className="fa-solid fa-file"></i> <span>Add Document</span>
              </button>
              <button
                className="cursor-pointer space-x-1 rounded-md bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"
                onClick={() => setShowCreateFolderModal(true)}
              >
                <i className="fa-solid fa-folder-plus"></i>{" "}
                <span>Create Folder</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add Bulk Token Number"
                className="flex-grow rounded-md border border-gray-300 px-4 py-1.5 focus:outline-none"
              />
              <button className="cursor-pointer space-x-1 rounded-md bg-green-500 px-3 py-1.5 text-white hover:bg-green-600">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            {/* Table */}
            <DynamicTable tableHead={tableHead} tableData={tableData} />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 bg-blue-100 px-6 py-4">
            <button className="cursor-pointer space-x-1 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
              <i className="fa-solid fa-file-zipper"></i>{" "}
              <span>Generate Zip</span>
            </button>
            <button className="cursor-pointer space-x-1 rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700">
              <i className="fa-solid fa-trash"></i> <span>Delete</span>
            </button>
            <button className="cursor-pointer space-x-1 rounded-md bg-gray-600 px-4 py-2 font-semibold text-white hover:bg-gray-700">
              <i className="fa-solid fa-arrow-left"></i> <span>Back</span>
            </button>
          </div>
        </div>
      </div>

      {showAddFolderModal && (
        <AddFolderModal
          onClose={() => setShowAddFolderModal(false)}
          onAddFolder={handleAddFolder}
        />
      )}

      {showAddDocumentModal && (
        <AddDocumentModal
          onClose={() => setShowAddDocumentModal(false)}
          onAddDocument={handleAddDocument}
        />
      )}

      {showCreateFolderModal && (
        <CreateFolderModal
          onClose={() => setShowCreateFolderModal(false)}
          onCreateFolder={handleCreateFolder}
        />
      )}
    </>
  );
};

export default OpenFolderModal;
