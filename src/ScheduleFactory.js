function ScheduleFactory(grades, allCourses, allPractices) {
    this.grades = grades;
    this.allCourses = allCourses;
    this.allPractices =  allPractices;
}

ScheduleFactory.prototype.create = function(replacementStrategy, displayStrategy) {
    var gradesWithCourseDetail = this.generateCourseCredits(this.grades, this.allCourses);
    var infoAfterReplace = this.generatePracticeCredits(this.grades, this.allPractices, this.allCourses, replacementStrategy);

    var result = displayStrategy(gradesWithCourseDetail, infoAfterReplace);

    var schedule = new Schedule(result.courseCredits, result.practiceCredits, result.achievedCredits, result.leftCredits, result.average);

    return schedule;
};

ScheduleFactory.prototype.generateCourseCredits = function (grades, allCourses) {
    var gradesWithCourseDetail = Feature.getMyGradesOfCourse(grades, allCourses).myCourses;

    return gradesWithCourseDetail;
};

ScheduleFactory.prototype.generatePracticeCredits = function (grades, allPractices, allCourses, replacementStrategy) {
    var myPractices = Feature.extractMyPractices(grades, allPractices).myPractices;

    var qualifiedPractices = Feature.qualifiedGrades(myPractices);

    var replaceablePractices = Feature.removeUnreplaceablePractices(qualifiedPractices);

    var myCourses = Feature.getMyGradesOfCourse(grades, allCourses).myCourses;

    var infoAfterReplace = this.replace(replaceablePractices, myCourses, replacementStrategy);

    return infoAfterReplace;
};

ScheduleFactory.prototype.replace = function (replaceablePractices, myCourses, replacementStrategy) {
    var replacement = replacementStrategy(replaceablePractices, myCourses);

    var myCoursesAfterReplace = replacement.myCoursesAfterReplace;
    var myReplacedCoursesByReplaceablePractices = replacement.myReplacedCoursesByReplaceablePractices;
    var practicesCantReplace = replacement.practicesCantReplace;

    var myIncreasedCoursesByReplaceablePractices = [];

    practicesCantReplace.forEach(function(practice) {
        var newCourse = practice.replaceableCourses;
        newCourse.score = practice.score;
        myIncreasedCoursesByReplaceablePractices.push(newCourse);
        myCoursesAfterReplace.push(newCourse);
    });

    return {
        myCoursesAfterReplace: myCoursesAfterReplace,
        myReplacedCoursesByReplaceablePractices: myReplacedCoursesByReplaceablePractices,
        practicesCantReplace: practicesCantReplace,
        myIncreasedCoursesByReplaceablePractices: myIncreasedCoursesByReplaceablePractices
    };
};

