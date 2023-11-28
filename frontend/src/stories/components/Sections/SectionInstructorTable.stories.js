import React from "react";

import SectionsInstructorTable from "main/components/Sections/SectionsInstructorTable";
import {
  oneSection,
  threeSections,
  fiveSections,
  gigaSections,
} from "fixtures/sectionFixtures";

export default {
  title: "components/Sections/SectionsInstructorTable",
  component: SectionsInstructorTable,
};

const Template = (args) => {
  return <SectionsInstructorTable {...args} />;
};

export const Empty = Template.bind({});

Empty.args = {
  sections: [],
};

export const OneSection = Template.bind({});

OneSection.args = {
  sections: oneSection,
};

export const ThreeSections = Template.bind({});

ThreeSections.args = {
  sections: threeSections,
};

export const FiveSections = Template.bind({});

FiveSections.args = {
  sections: fiveSections,
};

export const GigaSections = Template.bind({});

GigaSections.args = {
  sections: gigaSections,
};
