import React, { useState } from "react";

const CreateFolderModal = ({ onClose, onCreateFolder }) => {
  const [createdFolder, setCreatedFolder] = useState(null);

  const handleDocumentChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setCreatedFolder(files[0].webkitRelativePath.split("/")[0]);
    } else {
      setCreatedFolder(null);
    }
  };

  const handleCreateFolder = () => {
    if (createdFolder) {
      onCreateFolder(createdFolder);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg border-b border-gray-200 bg-blue-100 px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-800">Create Folder</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-xl text-gray-500 transition hover:text-red-500"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 px-6 py-5">
          <label className="block font-medium text-gray-700">
            Select a document:
          </label>
          <input
            type="file"
            // webkitdirectory="true"
            // directory=""
            onChange={handleDocumentChange}
            className="w-full cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-sm"
          />
          {/* {selectedDocument && (
            <p className="text-sm text-gray-600">Selected: {selectedDocument}</p>
          )} */}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 rounded-b-lg border-t border-gray-200 bg-blue-100 px-6 py-4">
          <button
            onClick={onClose}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            <i className="fa-solid fa-xmark"></i> <span>Cancel</span>
          </button>
          <button
            onClick={handleCreateFolder}
            disabled={!createdFolder}
            className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-white transition ${
              createdFolder
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-blue-300"
            }`}
          >
            <i className="fa-solid fa-folder-plus"></i>{" "}
            <span>Create Folder</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;
