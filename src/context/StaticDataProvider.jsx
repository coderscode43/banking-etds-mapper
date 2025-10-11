import axios from "axios";
import { useEffect, useState } from "react";
import StaticDataContext from "./staticDataContext";

const INDEX_API_BASE_URL = import.meta.env.VITE_INDEX_API_BASE_URL;

const credentials = {
  withCredentials: true,
};

const StaticDataProvider = ({ children }) => {
  const [staticData, setStaticData] = useState({});

  useEffect(() => {
    const getStaticData = async () => {
      const response = await axios.get(
        `${INDEX_API_BASE_URL}/index/staticData`,
        credentials
      );
      setStaticData(response.data || {});
    };
    getStaticData();
  }, []);

  return (
    <StaticDataContext.Provider value={staticData}>
      {children}
    </StaticDataContext.Provider>
  );
};

export default StaticDataProvider;
