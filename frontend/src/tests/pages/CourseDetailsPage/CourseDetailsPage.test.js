import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import CourseDetailsPage from "main/pages/CourseDetails/CourseDetailsPage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { render, screen, waitFor } from "@testing-library/react";
import { courseDetailsFixtures } from "fixtures/courseDetailsFixtures";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useParams: () => ({
      yyyyq: 20231,
      enrollCd: 12345,
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

describe("CourseDetailsPage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  const testId = "CourseDetailsTable";

  const setupAdminUser = () => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.adminUser);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  };

  beforeEach(() => {
    jest.spyOn(console, "error");
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test("renders without crashing for regular user", () => {
    const queryClient = new QueryClient();
    axiosMock.onGet("/api/sections/sectionsearch").reply(200, []);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CourseDetailsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("shows the correct info for admin users", async () => {
    setupAdminUser();
    const queryClient = new QueryClient();
    // axiosMock
    //   .onGet(`/api/sections/sectionsearch?qtr=20231&enrollCode=12345`)
    //   .reply(200, {
    //     yyyyq: 20231,
    //     enrollCd: 12345,
    //   });
    axiosMock
      .onGet(`/api/sections/sectionsearch?qtr=20231&enrollCd=12345`)
      // .reply(200, [{ classes: courseDetailsFixtures.oneCourse }]);
      .reply(200, [
        // {
        //   quarter: "20231",
        //   courseId: "CMPSC 156",
        //   title: "Advanced App Development",
        //   classSections: [
        //     {
        //       enrollCode: "12345",
        //       section: "0100",
        //       enrolledTotal: 155,
        //       maxEnroll: 200,
        //       timeLocations: [
        //         {
        //           room: "HALL",
        //           building: "EMBAR",
        //           roomCapacity: 247,
        //           days: " T R   ",
        //           beginTime: "14:00",
        //           endTime: "15:15",
        //         },
        //       ],
        //       instructors: [
        //         {
        //           instructor: "CONRAD P",
        //           functionCode: "Teaching and in charge",
        //         },
        //       ],
        //     },
        //   ],
        // },
      ]);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CourseDetailsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Course Details")).toBeInTheDocument();
    });
    await waitFor(() => {
    expect(
      screen.getByTestId(`CourseDetailsTable-cell-row-0-col-quarter`),
    ).toHaveTextContent("W23");
    });

    //   await waitFor(() => {
    //     expect(
    //       screen.getByTestId(`${testId}-cell-row-0-col-enrollCode`),
    //     ).toHaveTextContent("12345");
    //   });

    //   expect(
    //     screen.getByTestId(`${testId}-cell-row-0-col-courseId`),
    //   ).toHaveTextContent("CMPSC 156");
    //   expect(
    //     screen.getByTestId(`${testId}-cell-row-0-col-title`),
    //   ).toHaveTextContent("Advanced App Development");
    //   expect(
    //     screen.getByTestId(
    //       `${testId}-cell-row-0-col-classSections[0].enrolled`,
    //     ),
    //   ).toHaveTextContent("155/200");
    //   expect(
    //     screen.getByTestId(
    //       `${testId}-cell-row-0-col-classSections[0].location`,
    //     ),
    //   ).toHaveTextContent("EMBAR HALL");
    //   expect(
    //     screen.getByTestId(`${testId}-cell-row-0-col-days`),
    //   ).toHaveTextContent("T R");
    //   expect(
    //     screen.getByTestId(`${testId}-cell-row-0-col-time`),
    //   ).toHaveTextContent("2:00 PM - 3:15 PM");
    //   expect(
    //     screen.getByTestId(`${testId}-cell-row-0-col-instructor`),
    //   ).toHaveTextContent("CONRAD P");
  });
});