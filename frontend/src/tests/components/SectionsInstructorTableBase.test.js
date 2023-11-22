import { render, screen } from "@testing-library/react";
import SectionsInstructorTableBase from "main/components/SectionsInstructorTableBase";
import {
  oneLectureSectionWithNoDiscussion,
  gigaSections,
} from "fixtures/sectionFixtures";
import { yyyyqToQyy } from "main/utils/quarterUtilities.js";
import {
  convertToFraction,
  formatDays,
  formatInstructors,
  formatLocation,
  formatTime,
  isSection,
} from "main/utils/sectionUtils.js";

describe("SectionsInstructorTableBase tests", () => {
  const columns = [
    {
      Header: "Quarter",
      accessor: (row) => yyyyqToQyy(row.courseInfo.quarter),
      disableGroupBy: true,
      id: "quarter",
    },
    {
      Header: "Course ID",
      accessor: "courseInfo.courseId",

      Cell: ({ cell: { value } }) => value.substring(0, value.length - 2),
    },
    {
      Header: "Title",
      accessor: "courseInfo.title",
      disableGroupBy: true,
    },
    {
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      Header: "Is Section?",
      accessor: (row) => isSection(row.section.section),
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      id: "isSection",
    },
    {
      Header: "Enrolled",
      accessor: (row) =>
        convertToFraction(row.section.enrolledTotal, row.section.maxEnroll),
      disableGroupBy: true,
      id: "enrolled",
    },
    {
      Header: "Location",
      accessor: (row) => formatLocation(row.section.timeLocations),
      disableGroupBy: true,
      id: "location",
    },
    {
      Header: "Days",
      accessor: (row) => formatDays(row.section.timeLocations),
      disableGroupBy: true,
      id: "days",
    },
    {
      Header: "Time",
      accessor: (row) => formatTime(row.section.timeLocations),
      disableGroupBy: true,
      id: "time",
    },
    {
      Header: "Instructor",
      accessor: (row) => formatInstructors(row.section.instructors),
      disableGroupBy: true,
      id: "instructor",
    },
    {
      Header: "Enroll Code",
      accessor: "section.enrollCode",
      disableGroupBy: true,
    },
  ];

  test("renders an empty table without crashing", () => {
    render(
      <SectionsInstructorTableBase columns={columns} data={[]} group={false} />,
    );
  });

  test("renders an full table without crashing", () => {
    render(
      <SectionsInstructorTableBase
        columns={columns}
        data={gigaSections}
        group={false}
      />,
    );
  });

  test("renders a single lecture section correctly", async () => {
    render(
      <SectionsInstructorTableBase
        columns={columns}
        data={oneLectureSectionWithNoDiscussion}
        group={false}
      />,
    );

    expect(screen.queryByText("➖")).not.toBeInTheDocument();
    expect(screen.queryByText("➕")).not.toBeInTheDocument();
    expect(screen.queryByText("Is Section?")).not.toBeInTheDocument();

    expect(
      screen.getByTestId("testid-cell-row-0-col-courseInfo.courseId"),
    ).toHaveAttribute(
      "style",
      "background: rgb(52, 133, 155); color: rgb(239, 252, 244); font-weight: bold;",
    );
  });
});
