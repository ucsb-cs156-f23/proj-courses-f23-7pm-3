import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import CourseForm from "main/components/Courses/CourseForm";
import { coursesFixtures } from "fixtures/pscourseFixtures";

import { QueryClient, QueryClientProvider } from "react-query";

const mockedNavigate = jest.fn();

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("CourseForm tests", () => {
  test("renders correctly", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CourseForm />
        </Router>
        ,
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/Schedule/)).toBeInTheDocument();
    expect(screen.getByText(/Enrollment Code/)).toBeInTheDocument();
    expect(screen.getByText(/Create/)).toBeInTheDocument();
  });

  test("renders correctly when passing in a Course", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CourseForm initialCourse={coursesFixtures.oneCourse} />
        </Router>
        ,
      </QueryClientProvider>,
    );

    expect(await screen.findByTestId(/CourseForm-id/)).toBeInTheDocument();
    expect(screen.getByText(/Id/)).toBeInTheDocument();
    expect(screen.getByTestId(/CourseForm-id/)).toHaveValue("27");
  });

  test("Correct Error messages on missing input", async () => {
    const mockSubmitAction = jest.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CourseForm submitAction={mockSubmitAction} />
        </Router>
        ,
      </QueryClientProvider>,
    );
    expect(await screen.findByTestId("CourseForm-submit")).toBeInTheDocument();
    const submitButton = screen.getByTestId("CourseForm-submit");

    localStorage.setItem("CourseForm-psId", 13);
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/Enroll Code is required./),
    ).toBeInTheDocument();
  });

  test("No Error messages on good input", async () => {
    const mockSubmitAction = jest.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CourseForm submitAction={mockSubmitAction} />
        </Router>
        ,
      </QueryClientProvider>,
    );

    expect(await screen.findByTestId("CourseForm-psId")).toBeInTheDocument();

    const enrollCd = screen.getByTestId("CourseForm-enrollCd");
    const submitButton = screen.getByTestId("CourseForm-submit");

    localStorage.setItem("CourseForm-psId", 13);
    fireEvent.change(enrollCd, { target: { value: "20124" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    expect(
      screen.queryByText(/Enroll Code is required./),
    ).not.toBeInTheDocument();
    expect(enrollCd).toHaveValue("20124");
    expect(localStorage.getItem("CourseForm-psId")).toEqual("13");
  });

  test("that navigate(-1) is called when Cancel is clicked", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CourseForm />
        </Router>
        ,
      </QueryClientProvider>,
    );
    expect(await screen.findByTestId("CourseForm-cancel")).toBeInTheDocument();
    const cancelButton = screen.getByTestId("CourseForm-cancel");

    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });
});
