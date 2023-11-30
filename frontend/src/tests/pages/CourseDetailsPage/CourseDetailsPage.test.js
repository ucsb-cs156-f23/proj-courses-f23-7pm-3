// import { render, screen } from "@testing-library/react";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { MemoryRouter } from "react-router-dom";
// import axios from "axios";
// import AxiosMockAdapter from "axios-mock-adapter";
// import CourseDetailsPage from "main/pages/CourseDetails/CourseDetailsPage";
// import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
// import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

// describe("CourseDetailsPage tests", () => {
//   const axiosMock = new AxiosMockAdapter(axios);

//   const setupUserOnly = () => {
//     axiosMock.reset();
//     axiosMock.resetHistory();
//     axiosMock
//       .onGet("/api/currentUser")
//       .reply(200, apiCurrentUserFixtures.userOnly);
//     axiosMock
//       .onGet("/api/systemInfo")
//       .reply(200, systemInfoFixtures.showingNeither);
//   };

//   const queryClient = new QueryClient();
//   test("Renders expected content", () => {
//     // arrange

//     setupUserOnly();

//     const queryClient = new QueryClient();
//     const course = {
//       quarter: "20223",
//       enrollmentCode: "23456",
//       courseId: "CMPSC 156",
//       title: "Advanced App Development",
//       enrolled: "70",
//       location: "South Hall 1314",
//       days: "T R",
//       time: "2:00-3:15",
//       instructor: "P Conrad",
//     };

//     axiosMock.onPost("/api/public/basicsearch")

//     // act
//     render(
//       <QueryClientProvider client={queryClient}>
//         <MemoryRouter>
//           <CourseDetailsPage />
//         </MemoryRouter>
//       </QueryClientProvider>,
//     );

//     // assert
//     expect(screen.getByText("Welcome to the UCSB Course Details Page!")).toBeInTheDocument();
//     // expect(axiosMock.history.get[0].params).toEqual({
//     //   quarter: "20223",
//     //   enrollmentCode: "23456",
//     //   courseId: "CMPSC 156",
//     //   title: "Advanced App Development",
//     //   enrolled: "70",
//     //   location: "South Hall 1314",
//     //   days: "T R",
//     //   time: "2:00-3:15",
//     //   instructor: "P Conrad",
//     // }).toBeInTheDocument();
//     // expect(
//     //   screen.getByText("yyyq and enroll code information will be here"),
//     // ).toBeInTheDocument();
//   });
// });


import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import CourseDetailsPage from "main/pages/CourseDetails/CourseDetailsPage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

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
    axiosMock.onGet(`/api/sections/sectionsearch?qtr=20231&enrollCode=12345`).reply(200, {
      qtr: 20231,
      enrollCd: 12345,
      // id: 17,
      // user: {
      //   id: 1,
      //   email: "phtcon@ucsb.edu",
      //   googleSub: "115856948234298493496",
      //   pictureUrl:
      //     "https://lh3.googleusercontent.com/-bQynVrzVIrU/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmkGuVsELD1ZeV5iDUAUfe6_K-p8w/s96-c/photo.jpg",
      //   fullName: "Phill Conrad",
      //   givenName: "Phill",
      //   familyName: "Conrad",
      //   emailVerified: true,
      //   locale: "en",
      //   hostedDomain: "ucsb.edu",
      //   admin: true,
      // },
      // description: "My Winter Courses",
      // quarter: "20221",
      // name: "CS156",
      
    });
    axiosMock.onGet(`/api/sections/sectionsearch?qtr=20231&enrollCode=12345`).reply(200, [
      {
        // quarter: "20221",
        // courseId: "ECE       1A ",
        // title: "COMP ENGR SEMINAR",
        // description:
        //   "Introductory seminar to expose students to a broad range of topics in computer   engineering.",
        // classSections: [
        //   {
        //     enrollCode: "12583",
        //     section: "0100",
        //     session: null,
        //     classClosed: null,
        //     courseCancelled: null,
        //     gradingOptionCode: null,
        //     enrolledTotal: 84,
        //     maxEnroll: 100,
        //     secondaryStatus: null,
        //     departmentApprovalRequired: false,
        //     instructorApprovalRequired: false,
        //     restrictionLevel: null,
        //     restrictionMajor: "+PRCME+CMPEN",
        //     restrictionMajorPass: null,
        //     restrictionMinor: null,
        //     restrictionMinorPass: null,
        //     concurrentCourses: [],
        //     timeLocations: [
        //       {
        //         room: "1930",
        //         building: "BUCHN",
        //         roomCapacity: "100",
        //         days: "M      ",
        //         beginTime: "15:00",
        //         endTime: "15:50",
        //       },
        //     ],
        //     instructors: [
        //       {
        //         instructor: "WANG L C",
        //         functionCode: "Teaching and in charge",
        //       },
        //     ],
        //   },
        // ],
        // generalEducation: [],
        // finalExam: null,
        
      quarter: "20231",
      enrollmentCode: "12345",
      courseId: "CMPSC 156",
      title: "Advanced App Development",
      enrolled: "70",
      location: "South Hall 1314",
      days: "T R",
      time: "2:00-3:15",
      instructor: "P Conrad",
      },
    ]);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CourseDetailsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expect(
        screen.getByText("Course Details"),
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByTestId(`${testId}-cell-row-0-col-quarter`),
      ).toHaveTextContent("20231");
    });

    await waitFor(() => {
      expect(
        screen.getByTestId(`${testId}-cell-row-0-col-enrollmentCode`),
      ).toHaveTextContent("12345");
    });

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-courseId`),
    ).toHaveTextContent("CMPSC 156");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-title`),
    ).toHaveTextContent("Advanced App Development");
    expect(
      screen.getByTestId(
        `${testId}-cell-row-0-col-classSections[0].enrolled`,
      ),
    ).toHaveTextContent("70");
    expect(
      screen.getByTestId(
        `${testId}-cell-row-0-col-classSections[0].location`,
      ),
    ).toHaveTextContent("South Hall 1314");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-days`),
    ).toHaveTextContent("T R");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-time`),
    ).toHaveTextContent("2:00-3:15");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-instructor`),
    ).toHaveTextContent("P Conrad");
    // expect(
    //   screen.getByTestId(
    //     `PersonalSectionsTable-cell-row-0-col-classSections[0].timeLocations[0].days`,
    //   ),
    // ).toHaveTextContent("M");
    // expect(
    //   screen.getByTestId(`PersonalSectionsTable-cell-row-0-col-time`),
    // ).toHaveTextContent("3:00 PM - 3:50 PM");
    // expect(
    //   screen.getByTestId(`PersonalSectionsTable-cell-row-0-col-instructor`),
    // ).toHaveTextContent("WANG L C");
  });
});
