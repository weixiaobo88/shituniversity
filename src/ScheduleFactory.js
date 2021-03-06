function ScheduleFactory(grades, allCourses, allPractices) {
    this.grades = grades;
    this.allCourses = allCourses;
    this.allPractices =  allPractices;
}

ScheduleFactory.prototype.create = function(replacementStrategy, displayStrategy, gradeRules) {
    var myCoursesBeforeReplace = gradeRules.getMyGradesOfCourse(this.grades, this.allCourses);

    var infoAfterReplace = this.getMyGradesAfterReplace(myCoursesBeforeReplace, replacementStrategy, gradeRules);

    // TODO ? factory knows displayStrategy.calculate interface
    var result = displayStrategy.calculate(myCoursesBeforeReplace, infoAfterReplace, gradeRules);

    // TODO ?passing result as an object or passing each attribute
    var schedule = new Schedule(result.courseCredits, result.practiceCredits, result.achievedCredits, result.leftCredits, result.average);

    return schedule;
};

ScheduleFactory.prototype.getMyGradesAfterReplace = function (myCoursesBeforeReplace, replacementStrategy, gradeRules) {

    var myPractices = gradeRules.getMyGradesOfPractices(this.grades, this.allPractices);

    var qualifiedPractices = gradeRules.qualifiedGrades(myPractices);

    var replaceablePractices = gradeRules.removeUnreplaceablePractices(qualifiedPractices);

    var infoAfterReplace = replacementStrategy.replace(replaceablePractices, myCoursesBeforeReplace);

    return infoAfterReplace;
};


