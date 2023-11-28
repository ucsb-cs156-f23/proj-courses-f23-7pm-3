import React from "react";
import SectionsInstructorTableBase from "main/components/SectionsInstructorTableBase";
import {
  oneSection,
  threeSections,
  fiveSections,
  gigaSections,
} from "fixtures/sectionFixtures";
import { yyyyqToQyy } from "main/utils/quarterUtilities.js";
import {
  convertToFraction,
  formatDays,
  formatInstructors,
  formatLocation,
  formatTime,
} from "main/utils/sectionUtils.js";

export default {
  title: "components/SectionsInstructorTableBase",
  component: SectionsInstructorTableBase,
};

const Template = (args) => {
  return <SectionsInstructorTableBase {...args} />;
};

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

export const Empty = Template.bind({});

Empty.args = {
  data: [],
  columns: columns,
  testid: `${testid}-empty`,
};

export const OneSection = Template.bind({});

OneSection.args = {
  data: oneSection,
  columns: columns,
  testid: `${testid}-OneSection`,
};

export const ThreeSections = Template.bind({});

ThreeSections.args = {
  data: threeSections,
  columns: columns,
  testid: `${testid}-ThreeSections`,
};

export const FiveSections = Template.bind({});

FiveSections.args = {
  data: fiveSections,
  columns: columns,
  testid: `${testid}-FiveSections`,
};

export const GigaSections = Template.bind({});

GigaSections.args = {
  data: gigaSections,
  columns: columns,
  testid: `${testid}-GigaSections`,
};
