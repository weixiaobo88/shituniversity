function ScheduleFactory(grades, allCourses, allPractices) {
    this.grades = grades;
    this.allCourses = allCourses;
    this.allPractices =  allPractices;
}

ScheduleFactory.prototype.create = function() {
    var courseCredits = this.generateCourseCredits(this.grades, this.allCourses);
    var practiceCredits = this.generatePracticeCredits(this.grades, this.allPractices, this.allCourses);
    var leftCredits = {
        compulsory: 26,
        elective: 20
    };
    var averageScore = 80;

    var schedule = new Schedule(courseCredits, practiceCredits, leftCredits, averageScore);

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
    var gradesReplacedWithDetail = this.replace(replaceablePracticeDetail, gradesOfCourseCode, allCourses).gradesReplacedWithDetail;
    var gradesIncreasedWithDetail = this.replace(replaceablePracticeDetail, gradesOfCourseCode, allCourses).gradesIncreasedWithDetail;

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
    console.log(replaceablePracticeDetail)
    console.log(gradesOfCourseCode)

    replaceablePracticeDetail.forEach(function(practice, practiceIndex) {
        gradesOfCourseCode.forEach(function(grade, gradeIndex) {
            if(practice.replaceableCourses === grade.course) {
                console.log(practice.replaceableCourses)
                var practiceScore = practice.score;
                var courseScore = grade.score;
                //    highScorePriority
                if(practiceScore > 60 && practiceScore > courseScore) {
                    highScore = practiceScore;
                    gradesReplaced.push(grade);
                    gradesAfterReplacement[gradeIndex].score = highScore;
                    console.log(gradeIndex);
                    gradesCantReplace.splice(practiceIndex, 1);
                }
            }
        });
    });

    console.log(gradesAfterReplacement)
    console.log(gradesReplaced)
    console.log(gradesCantReplace)

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

