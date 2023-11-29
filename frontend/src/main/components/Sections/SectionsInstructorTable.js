import SectionsInstructorTableBase from "main/components/SectionsInstructorTableBase";

import { yyyyqToQyy } from "main/utils/quarterUtilities.js";
import {
  convertToFraction,
  formatDays,
  formatInstructors,
  formatLocation,
  formatTime,
} from "main/utils/sectionUtils.js";

export default function SectionsInstructorTable({ sections }) {
  const columns = [
    {
      Header: "Course ID",
      accessor: "courseInfo.courseId",

      Cell: ({ cell: { value } }) => value.substring(0, value.length - 2),
    },
    {
      Header: "Quarter",
      accessor: (row) => yyyyqToQyy(row.courseInfo.quarter),
      id: "quarter",
    },
    {
      Header: "Title",
      accessor: "courseInfo.title",
    },
    {
      Header: "Enrolled",
      accessor: (row) =>
        convertToFraction(row.section.enrolledTotal, row.section.maxEnroll),
      id: "enrolled",
    },
    {
      Header: "Location",
      accessor: (row) => formatLocation(row.section.timeLocations),
      id: "location",
    },
    {
      Header: "Days",
      accessor: (row) => formatDays(row.section.timeLocations),
      id: "days",
    },
    {
      Header: "Time",
      accessor: (row) => formatTime(row.section.timeLocations),
      id: "time",
    },
    {
      Header: "Instructor",
      accessor: (row) => formatInstructors(row.section.instructors),
      id: "instructor",
    },
    {
      Header: "Enroll Code",
      accessor: "section.enrollCode",
    },
  ];

  const testid = "SectionsInstructorTable";

  return (
    <SectionsInstructorTableBase
      data={sections}
      columns={columns}
      testid={testid}
    />
  );
}
