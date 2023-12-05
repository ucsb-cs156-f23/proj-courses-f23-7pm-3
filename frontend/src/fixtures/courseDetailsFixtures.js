const courseDetailsFixtures = {
  oneCoursePage: {
    quarter: "20231",
    courseId: "CMPSC     5B ",
    title: "INTRO DATA SCI 2",
    contactHours: 30,
    description:
      "Students explore the data science lifecycle, including question formulation , data collection and cleaning, exploratory data analysis and visualization , statistical inference and prediction, and decision-making. The course foc us is on transforming and analyzing data; machine learning methods includin g regression, classification and clustering; principles behind data visuali zations; concepts of measurement error and prediction; and techniques for s calable data processing.",
    college: "ENGR",
    objLevelCode: "U",
    subjectArea: "CMPSC   ",
    unitsFixed: 4,
    unitsVariableHigh: null,
    unitsVariableLow: null,
    delayedSectioning: null,
    inProgressCourse: null,
    gradingOption: "L",
    instructionType: "LEC",
    onLineCourse: false,
    deptCode: "CMPSC",
    generalEducation: [
      {
        geCode: "C  ",
        geCollege: "L&S ",
      },
      {
        geCode: "QNT",
        geCollege: "L&S ",
      },
    ],
    classSections: [
      {
        enrollCode: "07492",
        section: "0102",
        session: null,
        classClosed: null,
        courseCancelled: null,
        gradingOptionCode: null,
        enrolledTotal: null,
        maxEnroll: 15,
        secondaryStatus: null,
        departmentApprovalRequired: false,
        instructorApprovalRequired: false,
        restrictionLevel: null,
        restrictionMajor: "-CMPSC",
        restrictionMajorPass: null,
        restrictionMinor: null,
        restrictionMinorPass: null,
        concurrentCourses: [],
        timeLocations: [
          {
            room: "2116",
            building: "GIRV",
            roomCapacity: 30,
            days: "   R   ",
            beginTime: "18:00",
            endTime: "18:50",
          },
        ],
        instructors: [],
      },
    ],
  },
  oneCourse: [
    {
      quarter: "20231",
      courseId: "CMPSC 111",
      title: "Intro to Computational Science",
      classSections: [
        {
          enrollCode: "07492",
          section: "0100",
          enrolledTotal: 155,
          maxEnroll: 200,
          timeLocations: [
            {
              room: "HALL",
              building: "EMBAR",
              roomCapacity: 247,
              days: " T R   ",
              beginTime: "14:00",
              endTime: "15:15",
            },
          ],
          instructors: [
            {
              instructor: "GRIESSBAUM N",
              functionCode: "Teaching and in charge",
            },
          ],
        },
      ],
    },
  ],
  twoCourses: [
    {
      quarter: "20232",
      courseId: "CMPSC 156",
      title: "Advanced App development",
      classSections: [
        {
          enrollCode: "01234",
          section: "0101",
          enrolledTotal: 100,
          maxEnroll: 100,
          timeLocations: [
            {
              room: "2201",
              building: "ILP",
              roomCapacity: 247,
              days: " M W   ",
              beginTime: "10:00",
              endTime: "11:15",
            },
          ],
          instructors: [
            {
              instructor: "CONRAD P",
              functionCode: "Teaching and in charge",
            },
          ],
        },
      ],
    },
    {
      quarter: "20233",
      courseId: "CMPSC 130",
      title: "Data Structures Algorithms",
      classSections: [
        {
          enrollCode: "12345",
          section: "0180",
          enrolledTotal: 65,
          maxEnroll: 70,
          timeLocations: [
            {
              room: "1535",
              building: "Phelps Hall",
              roomCapacity: 247,
              days: " T R   ",
              beginTime: "12:30",
              endTime: "13:45",
            },
          ],
          instructors: [
            {
              instructor: "VIGODA E",
              functionCode: "Teaching and in charge",
            },
          ],
        },
      ],
    },
  ],
};

export { courseDetailsFixtures };
