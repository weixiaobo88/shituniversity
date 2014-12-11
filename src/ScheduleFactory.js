function ScheduleFactory(grades, allCourses, allPractices) {
    this.grades = this.dataTransform(grades);
    this.allCourses = allCourses;
    this.allPractices =  allPractices;
}

ScheduleFactory.prototype.dataTransform = function(grades) {
    var gradesObj = [];
    
    grades.forEach(function(grade) {
        var course = grade.split(':')[0];
        var score = parseInt(grade.split(':')[1]);
        gradesObj.push(new Grade(course, score))
    });

    return gradesObj;
};

ScheduleFactory.prototype.create = function() {
    var courseCredits = this.generateCourseCredits(this.grades, this.allCourses);
    var practiceCredits = this.generatePracticeCredits(this.grades, this.allPractices, this.allCourses);
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

ScheduleFactory.prototype.generatePracticeCredits = function (grades, allPractices, allCourses) {
    var gradesWithPracticeDetail = Feature.gradesOfPractice(grades, allPractices).gradesOfPracticeDetail;
    var gradesOfCourseCode = Feature.gradesOfCourse(grades, allCourses).gradesOfCourseCode;

    var replaceablePracticeDetail = Feature.removeUnreplaceablePractice(gradesWithPracticeDetail);

//    有实践也修了相关课程的，分数高者有效
//    有实践没有修相关课程的，替换为相应课程
    var infoAfterReplace = this.replace(replaceablePracticeDetail, gradesOfCourseCode, allCourses);

    var gradesReplacedWithDetail = infoAfterReplace.gradesReplacedWithDetail;
    var gradesIncreasedWithDetail = infoAfterReplace.gradesIncreasedWithDetail;

//该如何修改，这里使用this来存储变量
    this.gradesAfterReplacementDetail = infoAfterReplace.gradesAfterReplacementDetail;

    var replacedCompulsoryCredits = 0;
    var electiveCredits = 0;
    gradesReplacedWithDetail.forEach(function(course) {
        replacedCompulsoryCredits += (course.type === CourseType.COMPULSORY ? course.credit : 0);
        electiveCredits += (course.type === CourseType.ELECTIVE ? course.credit : 0);
    });

    gradesIncreasedWithDetail.forEach(function(course) {
        replacedCompulsoryCredits += (course.type === CourseType.COMPULSORY ? course.credit : 0);
        electiveCredits += (course.type === CourseType.ELECTIVE ? course.credit : 0);
    });

    return  {
        compulsory: replacedCompulsoryCredits,
        elective: electiveCredits
    }
};

ScheduleFactory.prototype.replace = function (replaceablePracticeDetail, gradesOfCourseCode, allCourses) {
    var highScore = 0;
    var gradesAfterReplacement = gradesOfCourseCode;
    var gradesReplaced = [];
    var gradesCantReplace = replaceablePracticeDetail;

    replaceablePracticeDetail.forEach(function(practice, practiceIndex) {
        gradesOfCourseCode.forEach(function(grade, gradeIndex) {
            if(practice.replaceableCourses === grade.course) {

                var practiceScore = practice.score;
                var courseScore = grade.score;
                //    highScorePriority
                if(practiceScore > 60 && practiceScore > courseScore) {
                    highScore = practiceScore;
                    gradesReplaced.push(grade);
                    gradesAfterReplacement[gradeIndex].score = highScore;

                    gradesCantReplace.splice(practiceIndex, 1);
                }
            }
        });
    });

    var gradesReplacedWithDetail = [];
    gradesReplaced.forEach(function(grade) {
        allCourses.forEach(function(course) {
            if(grade.course === course.code) {
                var courseDetail = course;
                courseDetail.score = grade.score;
                gradesReplacedWithDetail.push(courseDetail);
            }
        })
    });

    var gradesIncreased = [];
    gradesCantReplace.forEach(function(grade) {
        var newGrade = new Grade(grade.replaceableCourses, grade.score);
        gradesIncreased.push(newGrade);
        gradesAfterReplacement.push(newGrade);
    });

    var gradesAfterReplacementDetail = Feature.gradesOfCourse(gradesAfterReplacement, allCourses).gradesOfCourseDetail;
    var gradesIncreasedWithDetail = Feature.gradesOfCourse(gradesIncreased, allCourses).gradesOfCourseDetail;


    return {
        gradesAfterReplacement: gradesAfterReplacement,
        gradesIncreasedWithDetail: gradesIncreasedWithDetail,
        gradesAfterReplacementDetail: gradesAfterReplacementDetail,
        gradesReplacedWithDetail: gradesReplacedWithDetail
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
    var length = this.gradesAfterReplacementDetail.length;
    this.gradesAfterReplacementDetail.forEach(function(grade) {
        sum += grade.score;
    });

    return {
        baseline: Baseline.AVERAGE,
        currentCourseAverage: (sum / length).toFixed(1)
    };
};