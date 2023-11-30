import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CourseDetailsTable from "main/components/CourseDetails/CourseDetailsTable";
// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { useBackend, _useBackendMutation } from "main/utils/useBackend";
import { useBackendMutation } from "main/utils/useBackend";
// import BasicCourseTable from "main/components/Courses/BasicCourseTable";

export default function CourseDetailsPage() {

  // const [courseJSON, setCourseJSON] = useState([]);

  const objectToAxiosParams = (query) => ({
    url: "/api/public/basicsearch",
    params: {
      qtr: query.quarter,
      dept: query.subject,
      level: query.level,
    },
  });

  const onSuccess = (courses) => {
    setCourseJSON(courses.classes);
  };

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [],
  );

  async function fetchBasicCourseJSON(_event, query) {
    mutation.mutate(query);
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h5>Welcome to the UCSB Courses Description Search!</h5>
        {/* <BasicCourseSearchForm fetchJSON={fetchBasicCourseJSON} /> */}
        <CourseDetailsTable courses={fetchBasicCourseJSON} />
      </div>
    </BasicLayout>
  );
}