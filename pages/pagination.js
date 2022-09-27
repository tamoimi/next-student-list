import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";

export default function PagingComponent() {
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (page === handleFetchData().length) {
      handleFetchData();
    }
  }, [page]);

  const handleFetchData = async () => {
    const resData = await (
      await fetch("/api/students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      })
    ).json();
    console.log(handleFetchData);
  };
  return (
    <>
      <Pagination
        count={5}
        onChange={(event, value) => setPage(value)}
        page={page}
      />
    </>
  );
}
