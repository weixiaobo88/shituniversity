function ScheduleFactory(grades, allCourses, allPractices) {
    this.grades = grades;
    this.allCourses = allCourses;
    this.allPractices =  allPractices;
}

ScheduleFactory.prototype.create = function(replacementStrategy, displayStrategy, gradeRules) {
    var myCoursesBeforeReplace = gradeRules.getMyGradesOfCourse(this.grades, this.allCourses).myCourses;

    var infoAfterReplace = this.getMyGradesAfterReplace(myCoursesBeforeReplace, replacementStrategy, gradeRules);

    var result = displayStrategy.calculate(myCoursesBeforeReplace, infoAfterReplace);

// TODO ?passing result as an object or passing each attribute
    var schedule = new Schedule(result.courseCredits, result.practiceCredits, result.achievedCredits, result.leftCredits, result.average);

    return schedule;
};

ScheduleFactory.prototype.getMyGradesAfterReplace = function (myCoursesBeforeReplace, replacementStrategy, gradeRules) {

    var myPractices = gradeRules.getMyGradesOfPractices(this.grades, this.allPractices).myPractices;

    var qualifiedPractices = gradeRules.qualifiedGrades(myPractices);

    var replaceablePractices = gradeRules.removeUnreplaceablePractices(qualifiedPractices);

    var infoAfterReplace = replacementStrategy.replace(replaceablePractices, myCoursesBeforeReplace);

    return infoAfterReplace;
};

ScheduleFactory.prototype.replace = function (replaceablePractices, myCoursesBeforeReplace, replacementStrategy) {
    var replacement = replacementStrategy(replaceablePractices, myCoursesBeforeReplace);

    var myCoursesAfterReplace = Object.create(replacement.myCoursesAfterReplace);
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
//  TODO ?return  myCoursesBeforeReplace: myCoursesBeforeReplace,
//  TODO then function displayStrategy instead of another parameter
        myCoursesAfterReplace: myCoursesAfterReplace,
        myReplacedCoursesByReplaceablePractices: myReplacedCoursesByReplaceablePractices,
        practicesCantReplace: practicesCantReplace,
        myIncreasedCoursesByReplaceablePractices: myIncreasedCoursesByReplaceablePractices
    };
};

