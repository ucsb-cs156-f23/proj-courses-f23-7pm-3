import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CourseForm from "main/components/Courses/CourseForm";
import { Navigate } from "react-router-dom";
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
import { useState } from "react";
import { useBackend } from "main/utils/useBackend";

export default function CoursesCreatePage() {
  const objectToAxiosParams = (course) => ({
    url: "/api/courses/post",
    method: "POST",
    params: {
      enrollCd: course.enrollCd,
      psId: schedule,
    },
  });

  const {
    data: schedules,
    error: _error,
    status: _status,
  } = useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/personalschedules/all"],
    { method: "GET", url: "/api/personalschedules/all" },
    [],
  );

  const controlId = "CoursesCreatePage";

  const localSearchSchedule = localStorage.getItem(controlId);

  const onSuccess = (course) => {
    toast(`New course Created - id: ${course.id} enrollCd: ${course.enrollCd}`);
  };

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/courses/user/all"],
  );

  const { isSuccess } = mutation;

  const { schedule, setSchedule } = useState(localSearchSchedule);

  const onScheduleChange = (event) => {
    setSchedule(event.target.value);
  }

  // Code from PersonalSchedulesCreatePage, we want to turn schedule string into int ID
  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    return <Navigate to="/courses/list" />;
  }
  if (mutation.isError) {
    return (
      <BasicLayout>
        <div className="pt-2">
          <h1>Create New Course</h1>

          <CourseForm 
            submitAction={onSubmit}
            schedules={schedules}
            schedule={schedule}
            setSchedule={setSchedule}
            onScheduleChange={onScheduleChange}
          />
          <p data-testid="PSCourseCreate-Error">
            Error: {mutation.error.response.data?.message}
          </p>
        </div>
      </BasicLayout>
    );
  }
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Course</h1>

        <CourseForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  );
}
