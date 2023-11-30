import SectionsTableBase from "main/components/SectionsTableBase";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { yyyyqToQyy, qyyToYyyyq } from "main/utils/quarterUtilities.js";
import {
  convertToFraction,
  formatDays,
  formatInstructors,
  formatLocation,
  formatTime,
  isSection,
  isSectionCancelled,
  isSectionClosed,
  isSectionFull,
} from "main/utils/sectionUtils.js";

function getFirstVal(values) {
  return values[0];
}

export default function SectionsTable({ sections }) {
  const navigate = useNavigate();

  // Stryker disable next-line all : TODO try to make a good test for this
  const infoCallback = (cell) => {
    navigate(
      `/coursedetails/${qyyToYyyyq(cell.row.values.quarter)}/${
        cell.row.values["section.enrollCode"]
      }`,
    );
  };
  // Stryker restore all
  const columns = [
    {
      Header: "Quarter",
      accessor: (row) => yyyyqToQyy(row.courseInfo.quarter),
      id: "quarter",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Course ID",
      accessor: "courseInfo.courseId",

      Cell: ({ cell: { value } }) => value.substring(0, value.length - 2),
    },
    {
      Header: "Title",
      accessor: "courseInfo.title",
      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      Header: "Is Section?",
      accessor: (row) => isSection(row.section.section),
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      id: "isSection",
    },
    {
      Header: "Info",
      Cell: ({ cell }) => (
        <Button
          variant={"primary"}
          onClick={() => infoCallback(cell)}
          data-testid={`${testid}-cell-row-${cell.row.index}-col-${cell.column.id}-button`}
        >
          {"ℹ"}
        </Button>
      ),
    },
    {
      Header: "Status",
      accessor: (row) => {
        if (isSectionCancelled(row.section)) return "CANCELLED";
        else if (isSectionClosed(row.section)) return "CLOSED";
        else if (isSectionFull(row.section)) return "FULL";
        else return "OPEN";
      },
      id: "status",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Enrolled",
      accessor: (row) =>
        convertToFraction(row.section.enrolledTotal, row.section.maxEnroll),
      id: "enrolled",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Location",
      accessor: (row) => formatLocation(row.section.timeLocations),
      id: "location",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Days",
      accessor: (row) => formatDays(row.section.timeLocations),
      id: "days",
      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Time",
      accessor: (row) => formatTime(row.section.timeLocations),
      id: "time",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Instructor",
      accessor: (row) => formatInstructors(row.section.instructors),
      id: "instructor",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Enroll Code",
      accessor: "section.enrollCode",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
  ];

  const testid = "SectionsTable";

  const columnsToDisplay = columns;

  return (
    <SectionsTableBase
      data={sections}
      columns={columnsToDisplay}
      testid={testid}
    />
  );
}
