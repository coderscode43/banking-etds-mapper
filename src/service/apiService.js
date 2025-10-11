import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export const paginationWithSearchListData = async () =>
  // entity,
  // pageNo,
  // searchParams
  {
    // try {
    // const response = await axios.get(
    //   `${API_BASE_URL}${entity}/search/get/${pageNo}/100/${searchParams}`
    // );
    return [];
    // } catch (error) {
    //   console.error("Error in fetching search entities:", error);
    // }
  };
