import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import CourseDetailsPage from "main/pages/CourseDetails/CourseDetailsPage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { render, screen } from "@testing-library/react";
import { courseDetailsFixtures } from "fixtures/courseDetailsFixtures";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useParams: () => ({
      yyyyq: "20231",
      enrollCd: "07492",
    }),
    Navigate: (x) => {
      mockNavigate(x);
      return null;
    },
  };
});

const mockToast = jest.fn();
jest.mock("react-toastify", () => {
  const originalModule = jest.requireActual("react-toastify");
  return {
    __esModule: true,
    ...originalModule,
    toast: (x) => mockToast(x),
  };
});

describe("Course Details Page tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);
  beforeEach(() => {
    jest.spyOn(console, "error");
    console.error.mockImplementation(() => null);
  });

  beforeEach(() => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
    axiosMock
      .onGet("/api/sections/sectionsearch?qtr=20231&enrollCode=07492", {
        params: { yyyyq: "20231", enrollCd: "07492" },
      })
      .reply(200, courseDetailsFixtures.oneCoursePage);
  });

  const queryClient = new QueryClient();
  test("renders without crashing", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CourseDetailsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("Calls UCSB Section Search api correctly and displays correct information", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CourseDetailsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      screen.getByText("Course Details"),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(`CourseDetailsTable-cell-row-0-col-quarter`),
    ).toHaveTextContent("W23");
  });
});