// import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

// export default function CourseDetailsPage() {
//   // Stryker disable all : placeholder for future implementation
//   return (
//     <BasicLayout>
//       <div className="pt-2">
//         <h1>Course Details Page</h1>
//         <h2>yyyq and enroll code information will be here</h2>
//       </div>
//     </BasicLayout>
//   );
// }




// import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
// import { useParams } from "react-router-dom";
// import CourseDetailsTable from "main/components/CourseDetails/CourseDetailsTable";
// import { useBackend, _useBackendMutation } from "main/utils/useBackend";

// export default function CourseDetailsPage() {
//   let { yyyyq, enrollmentCode } = useParams();

//   const {
//     data: courseDetails,
//     _error,
//     _status,
//   } = useBackend(
//     // Stryker disable all : hard to test for query caching
//     [`/api/sections/sectionsearch`],
//     {
//       // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
//       method: "GET",
//       //url: `/api/sections/sectionsearch?qtr=${yyyyq}&enrollmentCode=${enrollmentCode}`,
//       url: `/api/sections/sectionsearch}`,
//       params: {
//         qtr: yyyyq,
//         enrollmentCode
//       },
//     },
//   );

//   return (
//     <BasicLayout>
//       <div className="pt-2">
//         <h1>Course Details Page</h1>
//         {courseDetails && (
//           <CourseDetailsTable
//             courseDetails={[courseDetails]}
//           />
//         )}
//       </div>
//     </BasicLayout>
//   );
// }



import { useState } from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm";
import CourseDetailsTable from "main/components/CourseDetails/CourseDetailsTable";
import { useBackendMutation } from "main/utils/useBackend";

export default function CourseDetailsPage() {
  // Stryker disable next-line all : Can't test state because hook is internal
  const [courseJSON] = useState([]);

  const objectToAxiosParams = (query) => ({
    url: "/api/sections/sectionsearch",
    params: {
      qtr: query.quarter,
      enrollCd: query.enrollCd,
    },
  });

  // const onSuccess = (courses) => {
  //   setCourseJSON(courses.classes);
  // };

  // // const mutation = useBackendMutation(
  // //   objectToAxiosParams,
  // //   { onSuccess },
  // //   // Stryker disable next-line all : hard to set up test for caching
  // //   [],
  // // );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h5>Welcome to the UCSB Course Details Page!</h5>
        <CourseDetailsTable courses={courseJSON} />
      </div>
    </BasicLayout>
  );
}