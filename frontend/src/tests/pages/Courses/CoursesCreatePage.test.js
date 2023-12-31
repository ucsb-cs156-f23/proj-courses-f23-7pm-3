import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CoursesCreatePage from "main/pages/Courses/PSCourseCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock("react-toastify", () => {
  const originalModule = jest.requireActual("react-toastify");
  return {
    __esModule: true,
    ...originalModule,
    toast: (x) => mockToast(x),
  };
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    Navigate: (x) => {
      mockNavigate(x);
      return null;
    },
  };
});

describe("CoursesCreatePage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  beforeEach(() => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  });

  test("renders without crashing", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("when you fill in the form and hit submit, it makes a request to the backend", async () => {
    const queryClient = new QueryClient();
    const courses = {
      id: "17",
      psId: 13,
      enrollCd: "08250",
    };

    axiosMock.onPost("/api/courses/post").reply(202, courses);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByTestId("CourseForm-enrollCd"),
    ).toBeInTheDocument();

    const psIdField = document.querySelector("#CourseForm-psId");
    const enrollCdField = screen.getByTestId("CourseForm-enrollCd");
    const submitButton = screen.getByTestId("CourseForm-submit");

    fireEvent.change(psIdField, { target: { value: 13 } });
    fireEvent.change(enrollCdField, { target: { value: "08250" } });

    localStorage.setItem("CourseForm-psId", 13);

    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

    // expect(quarterField).toHaveValue("20124");
    //expect(setQuarter).toBeCalledWith("20124"); //need this and axiosMock below?

    expect(axiosMock.history.post[0].params).toEqual({
      psId: "13",
      enrollCd: "08250",
    });

    expect(mockToast).toBeCalledWith(
      "New course Created - id: 17 enrollCd: 08250",
    );
    expect(mockNavigate).toBeCalledWith({ to: "/courses/list" });
  });

  test("If there is an available schedule in personalschedules, we update our local schedule too", async () => {
    const queryClient = new QueryClient();
    const schedules = [
      {
        id: "13",
        name: "Schedule-1-F23",
        description: "Fall 2023 test schedule",
        quarter: "F23",
      },
    ];
    //Copied from PersonalSchedulesDetailsPage test
    axiosMock.onGet("/api/personalschedules/all").reply(200, schedules);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByTestId("CourseForm-enrollCd"),
    ).toBeInTheDocument();
    expect(localStorage.getItem("CourseForm-psId")).toEqual("13");
  });

  test("when you input incorrect information, we get an error", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByTestId("CourseForm-enrollCd"),
    ).toBeInTheDocument();

    const enrollCdField = screen.getByTestId("CourseForm-enrollCd");
    const submitButton = screen.getByTestId("CourseForm-submit");

    localStorage.setItem("CourseForm-psId", 13);
    fireEvent.change(enrollCdField, { target: { value: "99881" } });

    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    await screen.findByTestId("PSCourseCreate-Error");
    const PSError = screen.getByTestId("PSCourseCreate-Error");
    expect(PSError).toBeInTheDocument();
  });
});
