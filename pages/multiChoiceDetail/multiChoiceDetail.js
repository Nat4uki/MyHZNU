var e;

Page({
    data: {
        questionList: [],
        nowQuestion: {},
        nowQuestionNumber: 0,
        multiChoiceNumber: 0,
        userChose: {},
        loading: !0,
        answered: 0,
        hint: ""
    },
    onLoad: function() {
        (e = this).setData({
            multiChoiceNumber: getApp().globalData.multiChoiceNumber
        }), e.getQuestions();
    },
    onShow: function() {},
    getQuestions: function() {
        wx.cloud.callFunction({
            name: "getQuestions",
            data: {
                num: e.data.multiChoiceNumber,
                singleChoice: 0
            },
            success: function(t) {
                var a = t.result;
                e.setData({
                    questionList: a,
                    loading: !1
                }), e.showNextQuestion();
            },
            fail: function(e) {
                console.error("[云函数] [getQuestions] 调用失败", e);
            }
        });
    },
    showNextQuestion: function() {
        if (e.data.nowQuestionNumber != e.data.multiChoiceNumber) {
            var t = e.data.questionList[e.data.nowQuestionNumber];
            t.options = [], t.options[0] = {
                name: "A",
                detail: t.A
            }, t.options[1] = {
                name: "B",
                detail: t.B
            }, t.options[2] = {
                name: "C",
                detail: t.C
            }, t.options[3] = {
                name: "D",
                detail: t.D
            }, e.setData({
                hint: "",
                userChose: {},
                answered: !1,
                nowQuestion: t,
                nowQuestionNumber: e.data.nowQuestionNumber + 1
            });
        } else e.submit();
    },
    chose: function(t) {
        if (!e.data.answered) {
            var a = t.currentTarget.dataset.option, n = e.data.userChose;
            n[a] = 1, e.setData({
                userChose: n
            });
        }
    },
    unChose: function(t) {
        if (!e.data.answered) {
            var a = t.currentTarget.dataset.option, n = e.data.userChose;
            n[a] = "", e.setData({
                userChose: n
            });
        }
    },
    answer: function() {
        if (e.data.answered) 1 == e.data.answered && e.showNextQuestion(); else {
            for (var t = e.data.nowQuestion.answer, a = e.data.userChose, n = !0, o = 0; o < t.length; ++o) a[t[o]] || (n = !1);
            var s = 0;
            for (var i in a) a[i] && ++s;
            s < 2 ? e.setData({
                hint: "请至少选择两个选项"
            }) : (e.setData({
                answered: 1
            }), s != t.length && (n = !1), n ? (getApp().globalData.score += 2, getApp().globalData.rightCnt++, 
            setTimeout(e.showNextQuestion, 300), e.setData({
                hint: "回答正确",
                answered: 2
            })) : e.setData({
                hint: "正确答案：" + e.data.nowQuestion.answer + "\r\n" + e.data.nowQuestion.analyze
            }));
        }
    },
    submit: function() {
        wx.redirectTo({
            url: "../singleChoiceExplain/singleChoiceExplain"
        });
    }
});