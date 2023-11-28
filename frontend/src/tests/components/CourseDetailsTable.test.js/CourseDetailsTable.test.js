import { render, screen } from "@testing-library/react";
import { courseDetailsFixtures } from "fixtures/courseDetailsFixtures";
import CourseDetailsTable from "main/components/CourseDetails/CourseDetailsTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("CourseTable tests", () => {
  const queryClient = new QueryClient();

  test("renders without crashing for empty table", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CourseDetailsTable courses={[]} />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("Has the expected column headers and content", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CourseDetailsTable courses={courseDetailsFixtures.twoCourses} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const expectedHeaders = ["Quarter", "Enrollment Code"];
    const expectedFields = ["quarter", "enrollmentCode"];
    const testId = "CourseDetailsTable";

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-quarter`),
    ).toHaveTextContent("W21");
    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-enrollmentCode`),
    ).toHaveTextContent("CDF456");
  });
});
