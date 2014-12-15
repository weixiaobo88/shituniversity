var fixtures = (function() {
    var allCourses = {
        COURSE000001: new Course('COURSE000001', '高等数学', '必修', 4, 60),
        COURSE000002: new Course('COURSE000002', '计算机基础', '必修', 2, 60),
        COURSE000003: new Course('COURSE000003', '软件工程', '必修', 4, 60),
        COURSE000004: new Course('COURSE000004', '社交礼仪', '选修', 2, 60),
        COURSE000005: new Course('COURSE000005', 'Java', '必修', 4, 60),
        COURSE000006: new Course('COURSE000006', 'IOS', '选修', 2, 60)
    };

    var allSocialPractices = {
        "PRACTICE-Java开发实践": new Practice('PRACTICE-Java开发实践', allCourses['COURSE000005'], 60),
        "PRACTICE-IOS开发实践": new Practice('PRACTICE-IOS开发实践', allCourses['COURSE000006'], 60),
        "PRACTICE-暑期三下乡实践": new Practice('PRACTICE-暑期三下乡实践', null, 60)
    };

    var loadAllCourses = function loadAllCourses() {
        return [
            allCourses['COURSE000001'],
            allCourses['COURSE000002'],
            allCourses['COURSE000003'],
            allCourses['COURSE000004'],
            allCourses['COURSE000005'],
            allCourses['COURSE000006']
        ];
    };

    var loadAllSocialPractices = function loadAllSocialPractices() {
        return [
            allSocialPractices['PRACTICE-Java开发实践'],
            allSocialPractices['PRACTICE-IOS开发实践'],
            allSocialPractices['PRACTICE-暑期三下乡实践']
        ]
    };

    return {
        loadAllCourses: loadAllCourses,
        loadAllSocialPractices: loadAllSocialPractices
    }

})();
