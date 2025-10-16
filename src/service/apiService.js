import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL ?? "/";
axios.defaults.withCredentials = true;

// Pagination Functionality
export const paginationListData = async () =>
  // entity, pageNo
  {
    // try {
    //   const response = await axios.get(
    //     `${API_BASE_URL}${entity}/list/get/${pageNo}/100`
    //   );
    return [];
    // } catch (error) {
    //   console.error("Error in fetching entities:", error);
    // }
  };

export const paginationWithSearchListData = async (
  entity,
  pageNo,
  resultPerPage,
  refinedSearchParams
) => {
  const response = await axios.get(
    `api${entity}/list/processCount/${pageNo}/${resultPerPage}`,
    {
      params: {
        processData: refinedSearchParams,
      },
    }
  );
  return response;
};

export const fileList = async (entity, formData) => {
  const response = await axios.get(`api${entity}/getFileList`, {
    params: {
      formData: formData,
    },
  });
  return response;
};
