import React from "react";
import OurTable from "main/components/OurTable";

import { yyyyqToQyy } from "main/utils/quarterUtilities.js";

export default function CourseDetailsTable({ courses }) {
  const columns = [
    {
      Header: "Quarter",
      accessor: (row, _rowIndex) => yyyyqToQyy(row.quarter),
      id: "quarter",
    },
    {
      Header: "Enrollment Code",
      accessor: "enrollmentCode",
    },
  ];

  return (
    <OurTable data={courses} columns={columns} testid={"CourseDetailsTable"} />
  );
}
