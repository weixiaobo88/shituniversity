function Schedule(grades, allCourses, allPractices) {
    this.grades = grades;
    this.allCourses = allCourses;
    this.allPractices = allPractices;
}

Schedule.prototype.print = function(grades, allCourses, allPractices) {
    var title = '\n***<南哈蒙理工大学>学分明细***\n';
    var separator = '----------------------\n';
    var ending = '**********************';

    var selectedCourses = FEATURE.gradesWithCourseDetail(grades, allCourses);
    var selectedPractices = FEATURE.gradesWithPracticeDetail(grades, allPractices);

    var achievedCredits = this.generateAchievedCreditsDetail(selectedCourses);
    var socialPracticeCredits = this.generateSocialPracticeDetail(selectedCourses, selectedPractices);

    var leftCredits =   '已获得的总学分：4\n' +
                        '离顺利毕业还差学分：\n' +
                        '必修：36\n' +
                        '选修：20\n';

    var average =   '顺利毕业的所有课程平均分基线：65\n' +
                    '当前所有课程平均分：\n';

    var result =    title +
                    separator +
                    achievedCredits +
                    separator +
                    socialPracticeCredits +
                    separator +
                    leftCredits +
                    separator +
                    average +
                    ending;

    console.log(result);
};

Schedule.prototype.generateAchievedCreditsDetail = function(selectedCourses) {
    var achievedCredits = this.calculateAchievedCredits(selectedCourses);
    return  '已修课程学分：\n' +
        '必修：' + achievedCredits.achievedCompulsoryCredits + '\n' +
        '选修：' + achievedCredits.achievedElectiveCredits + '\n';

};

Schedule.prototype.generateSocialPracticeDetail = function(selectedCourses, selectedPractices) {
    if(selectedPractices.length === 0) {
        return '需要参加社会实践\n';
    }

    var socialPracticeCredits = this.calculateSocialPracticeCredits(selectedCourses, selectedPractices);

    return  '社会实践：\n' +
        '可折算成必修课的学分：' + socialPracticeCredits.compulsoryCreditsConvention + '\n' +
        '可折算成选修课的学分：' + socialPracticeCredits.electiveCreditsConvention + '\n';
};

Schedule.prototype.generateLeftCredits = function (selectedCourses, selectedPractices) {
    var achievedCredits = this.calculateAchievedCredits(selectedCourses);
    var socialPracticeCredits = this.calculateSocialPracticeCredits(selectedCourses, selectedPractices);

    return  '已获得的总学分：\n' +
        '离顺利毕业还差学分：\n' +
        '必修：' + this.calculateLeftCredits(achievedCredits, socialPracticeCredits).leftCompulsory + '\n' +
        '选修：' + this.calculateLeftCredits(achievedCredits, socialPracticeCredits).leftElective + '\n';
}


Schedule.prototype.calculateAchievedCredits = function (selectedCourses) {
    var achievedCompulsoryCredits = 0;
    var achievedElectiveCredits = 0;

    selectedCourses.forEach(function(selectedCourse) {
        achievedCompulsoryCredits += selectedCourse.type == '必修'? selectedCourse.credit : 0;
        achievedElectiveCredits += selectedCourse.type == '选修'? selectedCourse.credit : 0;
    });

    return {
        achievedCompulsoryCredits: achievedCompulsoryCredits,
        achievedElectiveCredits: achievedElectiveCredits
    }
};

Schedule.prototype.calculateSocialPracticeCredits = function (selectedCourses, selectedPractices) {
    var compulsoryCreditsConvention = 0;
    var electiveCreditsConvention = 0;

    selectedPractices.forEach(function(selectedPractice) {
        var courseCode = selectedPractice.courseConversion;

        compulsoryCreditsConvention += convertedCredit(courseCode).compulsoryCredits;
        electiveCreditsConvention += convertedCredit(courseCode).electiveCredits;
    });

    return {
        compulsoryCreditsConvention: compulsoryCreditsConvention,
        electiveCreditsConvention: electiveCreditsConvention
    }
};
