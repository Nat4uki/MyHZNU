App({
    onLaunch: function() {
        wx.cloud ? wx.cloud.init({
            traceUser: !0
        }) : (console.error("请使用 2.2.3 或以上的基础库以使用云能力"), wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        }));
        var e = wx.getUpdateManager();
        e.onCheckForUpdate(function(e) {}), e.onUpdateReady(function() {
            wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function(t) {
                    t.confirm && e.applyUpdate();
                }
            });
        }), e.onUpdateFailed(function() {
            wx.showModal({
                title: "已经有新版本了哟",
                content: "新版本已经上线啦，请您删除当前小程序，重新搜索打开"
            });
        });
    },
    globalData: {
        userInfo: null,
        singleChoiceNumber: 50,
        multiChoiceNumber: 0,
        trueOrFalseNumber: 0,
        score: 0,
        rightCnt: 0,
        openid: null,
        realName: "",
        className: "",
        studentId: "",
        totalScore: 0,
        isDoneCount: 0,
        startTime: null,
        useTime: 0
    }
});