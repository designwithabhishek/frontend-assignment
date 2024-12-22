import { useState } from "react";
import "./App.css";
import RecordsCountSelector from "./components/records-count-selector/RecordsCountSelector";
import CustomTable from "./components/custom-table/CustomTable";
import useFetch from "./custom-hooks/useFetch";
import { API } from "./common/constants";
import Pagination from "./components/pagination/Pagination";

function App() {
  const [activePage, setActivePage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const { isLoading, data, errorMessage } = useFetch<
    { "s.no": number; "amt.pledged": number; "percentage.funded": number }[]
  >(API.TABLE_DATA);

  const handleSelect = (selectedPageCount: number) => {
    setNumberOfPages(selectedPageCount);
    setActivePage(1)
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>Error: {errorMessage}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const transformedData = data.map((item) => ({
    "S.No": item["s.no"],
    "Amount Pledged": item["amt.pledged"],
    "Percentage Funded": item["percentage.funded"],
  }));

  const columns = ["S.No", "Amount Pledged", "Percentage Funded"] as const;

  const startIndex = (activePage - 1) * numberOfPages;
  const endIndex = startIndex + numberOfPages;
  const paginatedData = transformedData.slice(startIndex, endIndex);

  return (
    <>
      <RecordsCountSelector max={5} handleSelect={handleSelect} />
      <CustomTable data={paginatedData} columns={columns} />
      <Pagination
        total={transformedData.length}
        selectedNumberOfRecordsPerPage={numberOfPages}
        activePage={activePage}
        onPageSelect={setActivePage}
      />
    </>
  );
}

export default App;
