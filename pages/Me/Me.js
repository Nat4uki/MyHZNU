var a, e = getApp();

Page({
    data: {
        userInfo: {},
        realName: "",
        className: "",
        studentId: "",
        score: ""
    },
    onShow: function() {
        (a = this).setData({
            realName: e.globalData.realName,
            className: e.globalData.className,
            studentId: e.globalData.studentId,
            score: e.globalData.totalScore
        });
    }
});