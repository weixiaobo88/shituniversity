function ScheduleFactory(grades, allCourses, allPractices) {
    this.grades = grades;
    this.allCourses = allCourses;
    this.allPractices =  allPractices;
}

ScheduleFactory.prototype.create = function(replacementStrategy, displayStrategy) {
    var myCoursesBeforeReplace = Feature.getMyGradesOfCourse(this.grades, this.allCourses).myCourses;

// TODO ? duplicate with function generatePracticeCredits [resolved]
//    var infoAfterReplace = this.generatePracticeCredits(this.grades, this.allPractices, this.allCourses, replacementStrategy);

    var infoAfterReplace = this.generatePracticeCredits(this.grades, this.allPractices, myCoursesBeforeReplace, replacementStrategy);

    var result = displayStrategy(myCoursesBeforeReplace, infoAfterReplace);

// TODO ?passing result as an object or passing each attribute
    var schedule = new Schedule(result.courseCredits, result.practiceCredits, result.achievedCredits, result.leftCredits, result.average);

    return schedule;
};

ScheduleFactory.prototype.generatePracticeCredits = function (grades, allPractices, myCoursesBeforeReplace, replacementStrategy) {
    var myPractices = Feature.extractMyPractices(grades, allPractices).myPractices;

    var qualifiedPractices = Feature.qualifiedGrades(myPractices);

    var replaceablePractices = Feature.removeUnreplaceablePractices(qualifiedPractices);
//    var myCoursesBeforeReplace = Feature.getMyGradesOfCourse(grades, allCourses).myCourses;

    var infoAfterReplace = this.replace(replaceablePractices, myCoursesBeforeReplace, replacementStrategy);

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

