describe('South Harmon Institute of Technology University', function () {
    var allCourses, allPractices;
    var courseWithScore;
    var grades = [];

    beforeEach(function () {
        allCourses = fixtures.loadAllCourses();
        allPractices = fixtures.loadAllSocialPractices();


        courseWithScore = new Grade('COURSE000001', 90);
    });

    it('should print correct text with only one course in list', function() {

        grades.push(courseWithScore);

        spyOn(console, 'log');

        var schedule = new Schedule(grades, allCourses, allPractices);
        schedule.print(grades, allCourses, allPractices);

        var expectText =
            '\n***<南哈蒙理工大学>学分明细***\n' +
            '----------------------\n' +
            '已修课程学分：\n' +
            '必修：4\n' +
            '选修：0\n' +
            '----------------------\n' +
            '需要参加社会实践\n' +
            '----------------------\n' +
            '已获得的总学分：4\n' +
            '离顺利毕业还差学分：\n' +
            '必修：36\n' +
            '选修：20\n' +
            '----------------------\n' +
            '顺利毕业的所有课程平均分基线：65\n' +
            '当前所有课程平均分：\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });

});
