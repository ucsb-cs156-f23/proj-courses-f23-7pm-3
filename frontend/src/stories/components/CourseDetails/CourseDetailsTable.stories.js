import React from "react";

import CourseDetailsTable from "main/components/CourseDetails/CourseDetailsTable";
import { courseDetailsFixtures } from "fixtures/courseDetailsFixtures";

export default {
  title: "components/CourseDetails/CourseDetailsTable",
  component: CourseDetailsTable,
};

const Template = (args) => {
  return <CourseDetailsTable {...args} />;
};

export const Empty = Template.bind({});
Empty.args = {
  courses: [],
};

export const oneCourse = Template.bind({});
oneCourse.args = {
  courses: courseDetailsFixtures.oneCourse,
};

export const twoCourses = Template.bind({});
twoCourses.args = {
  courses: courseDetailsFixtures.twoCourses,
};
