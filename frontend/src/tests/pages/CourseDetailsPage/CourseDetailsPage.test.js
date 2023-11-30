import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import CourseDetailsPage from "main/pages/CourseDetails/CourseDetailsPage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

describe("CourseDetailsPage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  const setupUserOnly = () => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  };

  const queryClient = new QueryClient();
  test("Renders expected content", () => {
    // arrange

    setupUserOnly();

    const queryClient = new QueryClient();
    const course = {
      quarter: "20223",
      enrollmentCode: "23456",
      courseId: "CMPSC 156",
      title: "Advanced App Development",
      enrolled: "70",
      location: "South Hall 1314",
      days: "T R",
      time: "2:00-3:15",
      instructor: "P Conrad",
    };

    axiosMock.onPost("/api/public/basicsearch")
    
    // act
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CourseDetailsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Welcome to the UCSB Course Details Page!")).toBeInTheDocument();
    // expect(axiosMock.history.get[0].params).toEqual({
    //   quarter: "20223",
    //   enrollmentCode: "23456",
    //   courseId: "CMPSC 156",
    //   title: "Advanced App Development",
    //   enrolled: "70",
    //   location: "South Hall 1314",
    //   days: "T R",
    //   time: "2:00-3:15",
    //   instructor: "P Conrad",
    // }).toBeInTheDocument();
    // expect(
    //   screen.getByText("yyyq and enroll code information will be here"),
  });
});
