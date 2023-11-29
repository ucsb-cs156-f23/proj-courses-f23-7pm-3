// import React from "react";

// import CourseDetailsPage from "main/pages/CourseDetails/CourseDetailsPage";

// export default {
//   title: "pages/CourseDetails/CourseDetailsPage",
//   component: CourseDetailsPage,
// };

// const Template = () => <CourseDetailsPage />;

// export const Default = Template.bind({});


// import React from 'react';
// import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
// import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
// import { courseDetailsFixtures } from "fixtures/courseDetailsFixtures";
// import { rest } from "msw";

// import CourseDetailsPage from "main/pages/CourseDetails/CourseDetailsPage";

// export default {
//     title: 'pages/CourseDetails/CourseDetailsPage',
//     component: CourseDetailsPage
// };

// const Template = () => <CourseDetailsPage storybook={true}/>;

// export const Empty = Template.bind({});
// Empty.parameters = {
//     msw: [
//         rest.get('/api/currentUser', (_req, res, ctx) => {
//             return res(ctx.json(apiCurrentUserFixtures.userOnly));
//         }),
//         rest.get('/api/systemInfo', (_req, res, ctx) => {
//             return res(ctx.json(systemInfoFixtures.showingNeither));
//         }),
//         rest.get('/api/sections/sectionsearch', (_req, res, ctx) => {
//             return res(ctx.json([]));
//         }),
//     ]
// }

// export const ThreeItemsOrdinaryUser = Template.bind({});

// ThreeItemsOrdinaryUser.parameters = {
//     msw: [
//         rest.get('/api/currentUser', (_req, res, ctx) => {
//             return res( ctx.json(apiCurrentUserFixtures.userOnly));
//         }),
//         rest.get('/api/systemInfo', (_req, res, ctx) => {
//             return res(ctx.json(systemInfoFixtures.showingNeither));
//         }),
//         rest.get('/api/sections/sectionsearch', (_req, res, ctx) => {
//             return res(ctx.json(courseDetailsFixtures.twoCourses));
//         }),
//     ],
// }

// export const ThreeItemsAdminUser = Template.bind({});

// ThreeItemsAdminUser.parameters = {
//     msw: [
//         rest.get('/api/currentUser', (_req, res, ctx) => {
//             return res( ctx.json(apiCurrentUserFixtures.adminUser));
//         }),
//         rest.get('/api/systemInfo', (_req, res, ctx) => {
//             return res(ctx.json(systemInfoFixtures.showingNeither));
//         }),
//         rest.get('/api/articles/all', (_req, res, ctx) => {
//             return res(ctx.json(articlesFixtures.twoCourses));
//         }),
//         rest.delete('/api/articles', (req, res, ctx) => {
//             window.alert("DELETE: " + JSON.stringify(req.url));
//             return res(ctx.status(200),ctx.json({}));
//         }),
//     ],
// }

import React from "react";

import CourseDetailsPage from "main/pages/CourseDetails/CourseDetailsPage";

export default {
  title: "pages/CourseDetailsPage/CourseDetailsPage",
  component: CourseDetailsPage,
};

const Template = () => <CourseDetailsPage />;

export const Default = Template.bind({});
