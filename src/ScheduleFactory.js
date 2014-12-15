function ScheduleFactory(grades, allCourses, allPractices) {
    this.grades = grades;
    this.allCourses = allCourses;
    this.allPractices =  allPractices;
}

ScheduleFactory.prototype.create = function(replacementStrategy) {
    var courseCredits = this.generateCourseCredits(this.grades, this.allCourses);
    var practiceCredits = this.generatePracticeCredits(this.grades, this.allPractices, this.allCourses, replacementStrategy);
    var achievedCredits = this.generateAchievedCredits(courseCredits, practiceCredits);
    var leftCredits = this.generateLeftCredits(achievedCredits);
    var average = this.generateAverage();

    var schedule = new Schedule(courseCredits, practiceCredits, achievedCredits, leftCredits, average);

    return schedule;
};

ScheduleFactory.prototype.generateCourseCredits = function (grades, allCourses) {
    var gradesWithCourseDetail = Feature.gradesOfCourse(grades, allCourses).gradesOfCourseDetail;

    var compulsoryCredits = 0;
    var electiveCredits = 0;
    gradesWithCourseDetail.forEach(function(course) {
        compulsoryCredits += (course.type === CourseType.COMPULSORY ? course.credit : 0);
        electiveCredits += (course.type === CourseType.ELECTIVE ? course.credit : 0);
    });

    return {
        compulsory: compulsoryCredits,
        elective: electiveCredits
    };
};

ScheduleFactory.prototype.generatePracticeCredits = function (grades, allPractices, allCourses, replacementStrategy) {
    var myPractices = Feature.extractMyPractices(grades, allPractices).myPractices;

    var qualifiedPractices = Feature.qualifiedGrades(myPractices);

    var replaceablePractices = Feature.removeUnreplaceablePractices(qualifiedPractices);

    var gradesOfCourseCode = Feature.gradesOfCourse(grades, allCourses).gradesOfCourseCode;

//    有实践也修了相关课程的，分数高者有效
//    有实践没有修相关课程的，替换为相应课程
    var infoAfterReplace = this.replace(replaceablePractices, gradesOfCourseCode, replacementStrategy);

    var myReplacedCoursesByReplaceablePractices = infoAfterReplace.myReplacedCoursesByReplaceablePractices;
    var myIncreasedCoursesByReplaceablePractices = infoAfterReplace.myIncreasedCoursesByReplaceablePractices;
    //该如何修改，这里使用this来存储变量
    this.gradesAfterReplacement = infoAfterReplace.gradesAfterReplacement;

    var replacedCompulsoryCredits = 0;
    var electiveCredits = 0;

    myReplacedCoursesByReplaceablePractices.forEach(function(course) {
        replacedCompulsoryCredits += (course.type === CourseType.COMPULSORY ? course.credit : 0);
        electiveCredits += (course.type === CourseType.ELECTIVE ? course.credit : 0);
    });

    myIncreasedCoursesByReplaceablePractices.forEach(function(course) {
        replacedCompulsoryCredits += (course.type === CourseType.COMPULSORY ? course.credit : 0);
        electiveCredits += (course.type === CourseType.ELECTIVE ? course.credit : 0);
    });

    return  {
        compulsory: replacedCompulsoryCredits,
        elective: electiveCredits
    };
};

ScheduleFactory.prototype.replace = function (replaceablePractices, gradesOfCourseCode, replacementStrategy) {
    var replacement = replacementStrategy(replaceablePractices, gradesOfCourseCode);

    var gradesAfterReplacement = replacement.gradesAfterReplacement;
    var myReplacedCoursesByReplaceablePractices = replacement.myReplacedCoursesByReplaceablePractices;
    var practicesCantReplace = replacement.practicesCantReplace;

    var myIncreasedCoursesByReplaceablePractices = [];

    practicesCantReplace.forEach(function(practice) {
        var newCourse = practice.replaceableCourses;
        newCourse.score = practice.score;
        myIncreasedCoursesByReplaceablePractices.push(newCourse);
        gradesAfterReplacement.push(new Grade(newCourse, newCourse.score));
    });


    return {
        gradesAfterReplacement: gradesAfterReplacement,
        myReplacedCoursesByReplaceablePractices: myReplacedCoursesByReplaceablePractices,
        practicesCantReplace: practicesCantReplace,
        myIncreasedCoursesByReplaceablePractices: myIncreasedCoursesByReplaceablePractices
    };
};

ScheduleFactory.prototype.generateAchievedCredits = function (courseCredits, practiceCredits) {
    var achievedCredits = {
        compulsory: courseCredits.compulsory,
        elective: courseCredits.elective + practiceCredits.elective
    };

    return achievedCredits;
};


ScheduleFactory.prototype.generateLeftCredits = function (achievedCredits) {

    return {
        compulsory: Baseline.COMPULSORY - achievedCredits.compulsory,
        elective: Baseline.ELECTIVE - achievedCredits.elective
    };
};

ScheduleFactory.prototype.generateAverage = function () {
    var sum = 0;

    var length = this.gradesAfterReplacement.length;
    this.gradesAfterReplacement.forEach(function(grade) {
        sum += grade.score;
    });

    return {
        baseline: Baseline.AVERAGE,
        currentCourseAverage: (sum / length).toFixed(1)
    };
};