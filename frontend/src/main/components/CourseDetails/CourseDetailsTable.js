import React from "react";
import OurTable from "main/components/OurTable";
import {
  convertToFraction,
  formatInstructors,
  formatLocation,
  formatTime,
} from "main/utils/sectionUtils.js";

import { yyyyqToQyy } from "main/utils/quarterUtilities.js";

export default function CourseDetailsTable({ courses }) {
  console.log(courses);
  const columns = [
    {
      Header: "Quarter",
      accessor: (row) => yyyyqToQyy(row.quarter),
      id: "quarter",
    },
    {
      Header: "Course ID",
      accessor: "courseId",
      id: "courseId",
    },
    {
      Header: "Enroll Code",
      accessor: (row) => row.classSections[0].enrollCode,
      id: "enrollCode",
    },
    {
      Header: "Section",
      accessor: (row) => row.classSections[0].section,
      id: "section",
    },
    {
      Header: "Title",
      accessor: "title",
      id: "title",
    },
    {
      Header: "Enrolled",
      accessor: (row) =>
        convertToFraction(
          row.classSections[0].enrolledTotal,
          row.classSections[0].maxEnroll,
        ),
      id: "enrolled",
    },
    {
      Header: "Location",
      accessor: (row) => formatLocation(row.classSections[0].timeLocations),
      id: "location",
    },
    {
      Header: "Days",
      accessor: (row) => row.classSections[0].timeLocations[0].days,
      id: "days",
    },
    {
      Header: "Time",
      accessor: (row) => formatTime(row.classSections[0].timeLocations),
      id: "time",
    },
    {
      Header: "Instructor",
      accessor: (row) => formatInstructors(row.classSections[0].instructors),
      id: "instructor",
    },
  ];

  return (
    <OurTable data={courses} columns={columns} testid={"CourseDetailsTable"} />
  );
}
