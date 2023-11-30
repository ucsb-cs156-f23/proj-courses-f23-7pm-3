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
    {
      Header: "Course Id",
      accessor: "courseId",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Enrolled",
      accessor: "enrolled",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Days",
      accessor: "days",
    },
    {
      Header: "Time",
      accessor: "time",
    },
    {
      Header: "Instructor",
      accessor: "instructor",
    },
  ];

  return (
    <OurTable data={courses} columns={columns} testid={"CourseDetailsTable"} />
  );
}
