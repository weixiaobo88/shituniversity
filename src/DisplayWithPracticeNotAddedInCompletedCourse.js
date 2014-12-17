function DisplayWithPracticeNotAddedInCompletedCourse() {
    DisplayStrategy.call(this);
};

DisplayWithPracticeNotAddedInCompletedCourse.prototype = Object.create(DisplayStrategy.prototype);

DisplayWithPracticeNotAddedInCompletedCourse.prototype.constructor = DisplayStrategy;
DisplayWithPracticeNotAddedInCompletedCourse.prototype.parent = DisplayStrategy.prototype;

DisplayWithPracticeNotAddedInCompletedCourse.prototype.calculate = function(myCourses, myGradesAfterReplace, gradeRules) {
    var courseCredits = Calculator.calculateCourseCredits(myCourses, myGradesAfterReplace, gradeRules).originalCourseCredits;
    var practiceCredits = Calculator.calculatePracticeCredits(myGradesAfterReplace, gradeRules).combinedCredits;

    var combinedCredits = this.parent.calculate(myGradesAfterReplace);

    return {
        courseCredits: courseCredits,
        practiceCredits: practiceCredits,
        achievedCredits: combinedCredits.achievedCredits,
        leftCredits: combinedCredits.leftCredits,
        average: combinedCredits.average
    };
};