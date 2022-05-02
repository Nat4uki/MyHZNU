getApp();

Page({
    data: {
        currentUserId: null
    },
    registerSuccess: function(a) {
        this.data.currentUserId;
        var e = a.detail.value.realName, t = a.detail.value.className, s = a.detail.value.studentId;
        e && t && s && wx.cloud.database().collection("users").add({
            data: {
                realName: e,
                className: t,
                studentId: s,
                isDoneCount: 0
            },
            success: function(a) {}
        }), e ? t ? s ? wx.switchTab({
            url: "../choiceMain/choiceMain"
        }) : wx.showToast({
            title: "请填写您的学号",
            image: "../../images/warn.png",
            duration: 2e3
        }) : wx.showToast({
            title: "请填写您的班级",
            image: "../../images/warn.png",
            duration: 2e3
        }) : wx.showToast({
            title: "请填写您的姓名",
            image: "../../images/warn.png",
            duration: 2e3
        });
    }
});