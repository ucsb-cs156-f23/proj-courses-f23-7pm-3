import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import { useBackend, _useBackendMutation } from "main/utils/useBackend";
import CourseDetailsTable from "main/components/CourseDetails/CourseDetailsTable";

export default function CourseDetailsPage() {
  let { yyyyq, enrollCd } = useParams();

  const {
    data: courseDetail,
    _error,
    _status,
  } = useBackend(
    // Stryker disable next-line all : hard to test for query caching
    [`/api/sections/sectionsearch?qtr=${yyyyq}&enrollCode=${enrollCd}`],
    {
      // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
      method: "GET",
      url: `/api/sections/sectionsearch?qtr=${yyyyq}&enrollCode=${enrollCd}`,
      params: {
        yyyyq,
        enrollCd,
      },
    },
  );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Course Details</h1>
        {courseDetail && <CourseDetailsTable courses={[courseDetail]} />}
      </div>
    </BasicLayout>
  );
}
