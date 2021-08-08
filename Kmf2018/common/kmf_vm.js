var startTimeOptions = { hour12: false, month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
var endTimeOptions = { hour12: false, hour: 'numeric', minute: 'numeric' };
var channelState = { PRE: "upcoming", LIVE: "live-on", END: "live-off", VOD: "vod" };

var viewButtonTitle = {
    upcoming: {
        ko: "홍보 영상보기",
        en: "View video"
    },
    "live-on": {
        ko: "라이브 방송보기",
        en: "Live streaming"
    },
    "live-off": {
        ko: "방송 종료",
        en: "Ended"
    },
    vod: {
        ko: "VOD 영상보기",
        en: "Play vod"
    }
}

var view_modal = new Vue({
    el: "#viewModal",
    data: {
        title_local: "[ko]",
        content_url: ""
    }
});

var vm_popup = new Vue({
    el: "#popupLayer",
    data: {
        language: "ko",
        show: !(readCookie("avoidPopup") || false)
    },
    methods: {
        close: function () {
            if ($("#popupLayer  input:checkbox:checked").length > 0) {
                createCookie("avoidPopup", true, $("#popupLayer input:checkbox:checked").val());
            }

            $("#popupLayer").hide();
        }
    }
});

var vm_top_title = new Vue({
    el: "#MainMap",
    data: {
        language: "ko"
    }
});

var vm_program_header = new Vue({
    el: "#ProgramHeader",
    data: {
        language: "ko",
        header: {
            ko: "8월의 여름날, 각각의 스테이지에서 당신이 좋아하는 아티스트를 KMF파크에서 만나보세요!",
            en: "You can meet all your favorite artists on each stage at the KMF park in August!"
        },
        header_local: "8월의 여름날, 각각의 스테이지에서 당신이 좋아하는 아티스트를 KMF파크에서 만나보세요!"
    },
    watch: {
        language: function (val) {
           this.header_local = this.header[val]; 
        }
    }
})

var vm_program_01 = new Vue({
    el: "#ProgramInfo01",
    data: {
        language: "ko",
        viewState: channelState.PRE,
        title: {
            ko: "야외이벤트 : 명랑 팬미팅",
            en: "Outdoor Events : Fun fan meeting"
        },
        content_url: "https://www.bbangyatv.com/view/video/embed/4726",
        schedule_day1: {
            start: new Date(Date.UTC(2018, 7, 1, 2, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 1, 4, 0, 0))
        },
        schedule_day2: {
            start: new Date(Date.UTC(2018, 7, 2, 2, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 2, 4, 0, 0))
        },
        description: {
            ko: "",
            en: ""
        },
        channel_title: {
            ko: "홍보 영상보기",
            en: "View video"
        },
        title_local: "야외이벤트 : 명랑 팬미팅",
        description_local: "",
        channel_title_local: "홍보 영상보기",
        classByState: {
            "btn-state_upcoming": true,
            "btn-state_live-on": false
        },
        classForEnded: {
            "state_live-off": false
        }
    },
    watch: {
        language: function (val) {
            this.title_local = this.title[val];
            this.description_local = this.description[val];
            this.channel_title_local = this.channel_title[val];
        },
        viewState: function (val) {
            this.channel_title = viewButtonTitle[val];
            this.channel_title_local = this.channel_title[this.language];

            this.classByState["btn-state_" + channelState.PRE] = (val == channelState.PRE);
            this.classByState["btn-state_" + channelState.LIVE] = (val == channelState.LIVE || val == channelState.END);
            this.classForEnded["state_" + channelState.END] = (val == channelState.END);
        }
    },
    computed: {
        schedule_local_day1: function () {
            return this.schedule_day1.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day1.end.toLocaleTimeString('ko-KR', endTimeOptions);
        },
        schedule_local_day2: function () {
            return this.schedule_day2.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day2.end.toLocaleTimeString('ko-KR', endTimeOptions);
        }
    }, 
    methods: {
        checkState: function () {
            var now = new Date();
            var intervalSeconds = 60;

            if (now - this.schedule_day1.start < 0) { // day1 시작 전
                this.viewState = channelState.PRE;

                if (now - this.schedule_day1.start > -(intervalSeconds * 1000)) {
                    intervalSeconds = 5;
                }
            } else { // day1 시작 후
                if (now - this.schedule_day1.end < 0) { // day1 종료 전
                    this.viewState = channelState.LIVE;
                    
                    if (now - this.schedule_day1.end > -(intervalSeconds * 1000)) {
                        intervalSeconds = 5;
                    }
                } else { // day1 종료 후
                    if (now - this.schedule_day2.start < 0) { // day2 시작 전
                        if (now.getDate() == this.schedule_day2.start.getDate()) { // day2 시작일이면
                            this.viewState = channelState.PRE;
                        } else { // day2 이전일이면
                            this.viewState = channelState.END;
                        }

                        if (now - this.schedule_day2.start > -(intervalSeconds * 1000)) {
                            intervalSeconds = 5;
                        }
                    } else {
                        if (now - this.schedule_day2.end < 0) { // day2 종료 전이면
                            this.viewState = channelState.LIVE;

                            if (now - this.schedule_day2.end > -(intervalSeconds * 1000)) {
                                intervalSeconds = 5;
                            }
                        } else { // day2 종료 후라면
                            this.viewState = channelState.END;
                            intervalSeconds = -1;
                        }
                    }
                }
            }

            console.log("now : " + now.toUTCString() + " => state : " + this.viewState + " / interval : " + intervalSeconds);
            if (intervalSeconds > 0) {
                //window.setTimeout(this.checkState, (intervalSeconds * 1000));
            }
        },
        viewChannel: function (event) { 
            console.log("view channel!"); 
            if (this.viewState != channelState.END) {
                view_modal.title_local = this.title_local;
                view_modal.content_url = this.content_url;

                $("#viewModal").modal("show");
            }
        }
    }
});

var vm_program_02 = new Vue({
    el: "#ProgramInfo02",
    data: {
        language: "ko",
        viewState: channelState.PRE,
        title: {
            ko: "내가수를 소개합니다.",
            en: "Let me introduce my favorite singer"
        },
        content_url: "https://www.bbangyatv.com/view/video/embed/4727",
        schedule_day1: {
            start: new Date(Date.UTC(2018, 7, 1, 6, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 1, 7, 0, 0))
        },
        description: {
            ko: "",
            en: ""
        },
        channel_title: {
            ko: "홍보 영상보기",
            en: "View video"
        },
        title_local: "내가수를 소개합니다.",
        description_local: "",
        channel_title_local: "홍보 영상보기",
        classByState: {
            "btn-state_upcoming": true,
            "btn-state_live-on": false
        },
        classForEnded: {
            "state_live-off": false
        }
    },
    watch: {
        language: function (val) {
            this.title_local = this.title[val];
            this.description_local = this.description[val];
            this.channel_title_local = this.channel_title[val];
        },
        viewState: function (val) {
            this.channel_title = viewButtonTitle[val];
            this.channel_title_local = this.channel_title[this.language];

            this.classByState["btn-state_" + channelState.PRE] = (val == channelState.PRE);
            this.classByState["btn-state_" + channelState.LIVE] = (val == channelState.LIVE || val == channelState.END);
            this.classForEnded["state_" + channelState.END] = (val == channelState.END);
        }
    },
    computed: {
        schedule_local_day1: function () {
            return this.schedule_day1.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day1.end.toLocaleTimeString('ko-KR', endTimeOptions);
        }
    }, 
    methods: {
        checkState: function () {
            var now = new Date();
            var intervalSeconds = 60;

            if (now - this.schedule_day1.start < 0) { // day1 시작 전
                this.viewState = channelState.PRE;

                if (now - this.schedule_day1.start > -(intervalSeconds * 1000)) {
                    intervalSeconds = 5;
                }
            } else { // day1 시작 후
                if (now - this.schedule_day1.end < 0) { // day1 종료 전
                    this.viewState = channelState.LIVE;
                    
                    if (now - this.schedule_day1.end > -(intervalSeconds * 1000)) {
                        intervalSeconds = 5;
                    }
                } else { // day1 종료 후
                    this.viewState = channelState.END;
                    intervalSeconds = -1;
                }
            }

            console.log("now : " + now.toUTCString() + " => state : " + this.viewState + " / interval : " + intervalSeconds);
            if (intervalSeconds > 0) {
                //window.setTimeout(this.checkState, (intervalSeconds * 1000));
            }
        },
        viewChannel: function (event) { 
            console.log("view channel!"); 
            if (this.viewState != channelState.END) {
                view_modal.title_local = this.title_local;
                view_modal.content_url = this.content_url;

                $("#viewModal").modal("show");
            }
        }
    }
});

var vm_program_03 = new Vue({
    el: "#ProgramInfo03",
    data: {
        language: "ko",
        viewState: channelState.PRE,
        title: {
            ko: "한여름의 DANCE DANCE",
            en: "Mid-summer dance party"
        },
        content_url: "https://www.bbangyatv.com/view/video/embed/4726",
        schedule_day1: {
            start: new Date(Date.UTC(2018, 7, 1, 7, 30, 0)),
            end: new Date(Date.UTC(2018, 7, 1, 8, 30, 0))
        },
        description: {
            ko: "",
            en: ""
        },
        channel_title: {
            ko: "홍보 영상보기",
            en: "View video"
        },
        title_local: "한여름의 DANCE DANCE",
        description_local: "",
        channel_title_local: "홍보 영상보기",
        classByState: {
            "btn-state_upcoming": true,
            "btn-state_live-on": false
        },
        classForEnded: {
            "state_live-off": false
        }
    },
    watch: {
        language: function (val) {
            this.title_local = this.title[val];
            this.description_local = this.description[val];
            this.channel_title_local = this.channel_title[val];
        },
        viewState: function (val) {
            this.channel_title = viewButtonTitle[val];
            this.channel_title_local = this.channel_title[this.language];

            this.classByState["btn-state_" + channelState.PRE] = (val == channelState.PRE);
            this.classByState["btn-state_" + channelState.LIVE] = (val == channelState.LIVE || val == channelState.END);
            this.classForEnded["state_" + channelState.END] = (val == channelState.END);
        }
    },
    computed: {
        schedule_local_day1: function () {
            return this.schedule_day1.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day1.end.toLocaleTimeString('ko-KR', endTimeOptions);
        }
    }, 
    methods: {
        checkState: function () {
            var now = new Date();
            var intervalSeconds = 60;

            if (now - this.schedule_day1.start < 0) { // day1 시작 전
                this.viewState = channelState.PRE;

                if (now - this.schedule_day1.start > -(intervalSeconds * 1000)) {
                    intervalSeconds = 5;
                }
            } else { // day1 시작 후
                if (now - this.schedule_day1.end < 0) { // day1 종료 전
                    this.viewState = channelState.LIVE;
                    
                    if (now - this.schedule_day1.end > -(intervalSeconds * 1000)) {
                        intervalSeconds = 5;
                    }
                } else { // day1 종료 후
                    this.viewState = channelState.END;
                    intervalSeconds = -1;
                }
            }

            console.log("now : " + now.toUTCString() + " => state : " + this.viewState + " / interval : " + intervalSeconds);
            if (intervalSeconds > 0) {
                //window.setTimeout(this.checkState, (intervalSeconds * 1000));
            }
        },
        viewChannel: function (event) { 
            console.log("view channel!"); 
            if (this.viewState != channelState.END) {
                view_modal.title_local = this.title_local;
                view_modal.content_url = this.content_url;

                $("#viewModal").modal("show");
            }
        }
    }
});

var vm_program_04 = new Vue({
    el: "#ProgramInfo04",
    data: {
        language: "ko",
        viewState: channelState.PRE,
        title: {
            ko: "레드카펫 : 꽃길만 걸어요",
            en: "Red Carpet - wish you all the best (walking on the flowery road)"
        },
        content_url: "https://www.bbangyatv.com/view/video/embed/4727",
        schedule_day1: {
            start: new Date(Date.UTC(2018, 7, 1, 9, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 1, 10, 0, 0))
        },
        schedule_day2: {
            start: new Date(Date.UTC(2018, 7, 2, 9, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 2, 10, 0, 0))
        },
        description: {
            ko: "",
            en: ""
        },
        channel_title: {
            ko: "홍보 영상보기",
            en: "View video"
        },
        title_local: "레드카펫 : 꽃길만 걸어요",
        description_local: "",
        channel_title_local: "홍보 영상보기",
        classByState: {
            "btn-state_upcoming": true,
            "btn-state_live-on": false
        },
        classForEnded: {
            "state_live-off": false
        }
    },
    watch: {
        language: function (val) {
            this.title_local = this.title[val];
            this.description_local = this.description[val];
            this.channel_title_local = this.channel_title[val];
        },
        viewState: function (val) {
            this.channel_title = viewButtonTitle[val];
            this.channel_title_local = this.channel_title[this.language];

            this.classByState["btn-state_" + channelState.PRE] = (val == channelState.PRE);
            this.classByState["btn-state_" + channelState.LIVE] = (val == channelState.LIVE || val == channelState.END);
            this.classForEnded["state_" + channelState.END] = (val == channelState.END);
        }
    },
    computed: {
        schedule_local_day1: function () {
            return this.schedule_day1.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day1.end.toLocaleTimeString('ko-KR', endTimeOptions);
        },
        schedule_local_day2: function () {
            return this.schedule_day2.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day2.end.toLocaleTimeString('ko-KR', endTimeOptions);
        }
    }, 
    methods: {
        checkState: function () {
            var now = new Date();
            var intervalSeconds = 60;

            if (now - this.schedule_day1.start < 0) { // day1 시작 전
                this.viewState = channelState.PRE;

                if (now - this.schedule_day1.start > -(intervalSeconds * 1000)) {
                    intervalSeconds = 5;
                }
            } else { // day1 시작 후
                if (now - this.schedule_day1.end < 0) { // day1 종료 전
                    this.viewState = channelState.LIVE;
                    
                    if (now - this.schedule_day1.end > -(intervalSeconds * 1000)) {
                        intervalSeconds = 5;
                    }
                } else { // day1 종료 후
                    if (now - this.schedule_day2.start < 0) { // day2 시작 전
                        if (now.getDate() == this.schedule_day2.start.getDate()) { // day2 시작일이면
                            this.viewState = channelState.PRE;
                        } else { // day2 이전일이면
                            this.viewState = channelState.END;
                        }

                        if (now - this.schedule_day2.start > -(intervalSeconds * 1000)) {
                            intervalSeconds = 5;
                        }
                    } else {
                        if (now - this.schedule_day2.end < 0) { // day2 종료 전이면
                            this.viewState = channelState.LIVE;

                            if (now - this.schedule_day2.end > -(intervalSeconds * 1000)) {
                                intervalSeconds = 5;
                            }
                        } else { // day2 종료 후라면
                            this.viewState = channelState.END;
                            intervalSeconds = -1;
                        }
                    }
                }
            }

            console.log("now : " + now.toUTCString() + " => state : " + this.viewState + " / interval : " + intervalSeconds);
            if (intervalSeconds > 0) {
                //window.setTimeout(this.checkState, (intervalSeconds * 1000));
            }
        },
        viewChannel: function (event) { 
            console.log("view channel!"); 
            if (this.viewState != channelState.END) {
                view_modal.title_local = this.title_local;
                view_modal.content_url = this.content_url;

                $("#viewModal").modal("show");
            }
        }
    }
});

var vm_program_05 = new Vue({
    el: "#ProgramInfo05",
    data: {
        language: "ko",
        viewState: channelState.PRE,
        title: {
            ko: "KMF본공연 : 여름밤의 SOME & 띵",
            en: "KMF Main Concert : mid-summer night something"
        },
        content_url: "https://www.bbangyatv.com/view/video/embed/4724",
        schedule_day1: {
            start: new Date(Date.UTC(2018, 7, 1, 10, 30, 0)),
            end: new Date(Date.UTC(2018, 7, 1, 12, 30, 0))
        },
        schedule_day2: {
            start: new Date(Date.UTC(2018, 7, 2, 10, 30, 0)),
            end: new Date(Date.UTC(2018, 7, 2, 12, 30, 0))
        },
        description: {
            ko: "",
            en: ""
        },
        channel_title: {
            ko: "홍보 영상보기",
            en: "View video"
        },
        title_local: "KMF본공연 : 여름밤의 SOME & 띵",
        description_local: "",
        channel_title_local: "홍보 영상보기",
        classByState: {
            "btn-state_upcoming": true,
            "btn-state_live-on": false
        },
        classForEnded: {
            "state_live-off": false
        }
    },
    watch: {
        language: function (val) {
            this.title_local = this.title[val];
            this.description_local = this.description[val];
            this.channel_title_local = this.channel_title[val];
        },
        viewState: function (val) {
            this.channel_title = viewButtonTitle[val];
            this.channel_title_local = this.channel_title[this.language];

            this.classByState["btn-state_" + channelState.PRE] = (val == channelState.PRE);
            this.classByState["btn-state_" + channelState.LIVE] = (val == channelState.LIVE || val == channelState.END);
            this.classForEnded["state_" + channelState.END] = (val == channelState.END);
        }
    },
    computed: {
        schedule_local_day1: function () {
            return this.schedule_day1.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day1.end.toLocaleTimeString('ko-KR', endTimeOptions);
        },
        schedule_local_day2: function () {
            return this.schedule_day2.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day2.end.toLocaleTimeString('ko-KR', endTimeOptions);
        }
    }, 
    methods: {
        checkState: function () {
            var now = new Date();
            var intervalSeconds = 60;

            if (now - this.schedule_day1.start < 0) { // day1 시작 전
                this.viewState = channelState.PRE;

                if (now - this.schedule_day1.start > -(intervalSeconds * 1000)) {
                    intervalSeconds = 5;
                }
            } else { // day1 시작 후
                if (now - this.schedule_day1.end < 0) { // day1 종료 전
                    this.viewState = channelState.LIVE;
                    
                    if (now - this.schedule_day1.end > -(intervalSeconds * 1000)) {
                        intervalSeconds = 5;
                    }
                } else { // day1 종료 후
                    if (now - this.schedule_day2.start < 0) { // day2 시작 전
                        if (now.getDate() == this.schedule_day2.start.getDate()) { // day2 시작일이면
                            this.viewState = channelState.PRE;
                        } else { // day2 이전일이면
                            this.viewState = channelState.END;
                        }

                        if (now - this.schedule_day2.start > -(intervalSeconds * 1000)) {
                            intervalSeconds = 5;
                        }
                    } else {
                        if (now - this.schedule_day2.end < 0) { // day2 종료 전이면
                            this.viewState = channelState.LIVE;

                            if (now - this.schedule_day2.end > -(intervalSeconds * 1000)) {
                                intervalSeconds = 5;
                            }
                        } else { // day2 종료 후라면
                            this.viewState = channelState.END;
                            intervalSeconds = -1;
                        }
                    }
                }
            }

            console.log("now : " + now.toUTCString() + " => state : " + this.viewState + " / interval : " + intervalSeconds);
            if (intervalSeconds > 0) {
                //window.setTimeout(this.checkState, (intervalSeconds * 1000));
            }
        },
        viewChannel: function (event) { 
            console.log("view channel!"); 
            if (this.viewState != channelState.END) {
                view_modal.title_local = this.title_local;
                view_modal.content_url = this.content_url;

                $("#viewModal").modal("show");
            }
        }
    }
});

var vm_program_06 = new Vue({
    el: "#ProgramInfo06",
    data: {
        language: "ko",
        viewState: channelState.PRE,
        title: {
            ko: "백스테이지",
            en: "Backstage (behind the scene)"
        },
        content_url: "https://www.bbangyatv.com/view/video/embed/4724",
        schedule_day1: {
            start: new Date(Date.UTC(2018, 7, 1, 6, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 1, 12, 30, 0))
        },
        schedule_day2: {
            start: new Date(Date.UTC(2018, 7, 2, 6, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 2, 12, 30, 0))
        },
        description: {
            ko: "",
            en: ""
        },
        channel_title: {
            ko: "홍보 영상보기",
            en: "View video"
        },
        title_local: "백스테이지",
        description_local: "",
        channel_title_local: "홍보 영상보기",
        classByState: {
            "btn-state_upcoming": true,
            "btn-state_live-on": false
        },
        classForEnded: {
            "state_live-off": false
        }
    },
    watch: {
        language: function (val) {
            this.title_local = this.title[val];
            this.description_local = this.description[val];
            this.channel_title_local = this.channel_title[val];
        },
        viewState: function (val) {
            this.channel_title = viewButtonTitle[val];
            this.channel_title_local = this.channel_title[this.language];

            this.classByState["btn-state_" + channelState.PRE] = (val == channelState.PRE);
            this.classByState["btn-state_" + channelState.LIVE] = (val == channelState.LIVE || val == channelState.END);
            this.classForEnded["state_" + channelState.END] = (val == channelState.END);
        }
    },
    computed: {
        schedule_local_day1: function () {
            return this.schedule_day1.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day1.end.toLocaleTimeString('ko-KR', endTimeOptions);
        },
        schedule_local_day2: function () {
            return this.schedule_day2.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day2.end.toLocaleTimeString('ko-KR', endTimeOptions);
        }
    }, 
    methods: {
        checkState: function () {
            var now = new Date();
            var intervalSeconds = 60;

            if (now - this.schedule_day1.start < 0) { // day1 시작 전
                this.viewState = channelState.PRE;

                if (now - this.schedule_day1.start > -(intervalSeconds * 1000)) {
                    intervalSeconds = 5;
                }
            } else { // day1 시작 후
                if (now - this.schedule_day1.end < 0) { // day1 종료 전
                    this.viewState = channelState.LIVE;
                    
                    if (now - this.schedule_day1.end > -(intervalSeconds * 1000)) {
                        intervalSeconds = 5;
                    }
                } else { // day1 종료 후
                    if (now - this.schedule_day2.start < 0) { // day2 시작 전
                        if (now.getDate() == this.schedule_day2.start.getDate()) { // day2 시작일이면
                            this.viewState = channelState.PRE;
                        } else { // day2 이전일이면
                            this.viewState = channelState.END;
                        }

                        if (now - this.schedule_day2.start > -(intervalSeconds * 1000)) {
                            intervalSeconds = 5;
                        }
                    } else {
                        if (now - this.schedule_day2.end < 0) { // day2 종료 전이면
                            this.viewState = channelState.LIVE;

                            if (now - this.schedule_day2.end > -(intervalSeconds * 1000)) {
                                intervalSeconds = 5;
                            }
                        } else { // day2 종료 후라면
                            this.viewState = channelState.END;
                            intervalSeconds = -1;
                        }
                    }
                }
            }

            console.log("now : " + now.toUTCString() + " => state : " + this.viewState + " / interval : " + intervalSeconds);
            if (intervalSeconds > 0) {
                //window.setTimeout(this.checkState, (intervalSeconds * 1000));
            }
        },
        viewChannel: function (event) { 
            console.log("view channel!"); 
            if (this.viewState != channelState.END) {
                view_modal.title_local = this.title_local;
                view_modal.content_url = this.content_url;

                $("#viewModal").modal("show");
            }
        }
    }
});

var vm_program_07 = new Vue({
    el: "#ProgramInfo07",
    data: {
        language: "ko",
        viewState: channelState.PRE,
        title: {
            ko: "inSTAR zone",
            en: "inSTAR zone"
        },
        content_url: "https://www.bbangyatv.com/view/video/embed/4724",
        schedule_day1: {
            start: new Date(Date.UTC(2018, 7, 1, 6, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 1, 12, 30, 0))
        },
        schedule_day2: {
            start: new Date(Date.UTC(2018, 7, 2, 6, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 2, 12, 30, 0))
        },
        description: {
            ko: "",
            en: ""
        },
        channel_title: {
            ko: "홍보 영상보기",
            en: "View video"
        },
        title_local: "inSTAR zone",
        description_local: "",
        channel_title_local: "홍보 영상보기",
        classByState: {
            "btn-state_upcoming": true,
            "btn-state_live-on": false
        },
        classForEnded: {
            "state_live-off": false
        }
    },
    watch: {
        language: function (val) {
            this.title_local = this.title[val];
            this.description_local = this.description[val];
            this.channel_title_local = this.channel_title[val];
        },
        viewState: function (val) {
            this.channel_title = viewButtonTitle[val];
            this.channel_title_local = this.channel_title[this.language];

            this.classByState["btn-state_" + channelState.PRE] = (val == channelState.PRE);
            this.classByState["btn-state_" + channelState.LIVE] = (val == channelState.LIVE || val == channelState.END);
            this.classForEnded["state_" + channelState.END] = (val == channelState.END);
        }
    },
    computed: {
        schedule_local_day1: function () {
            return this.schedule_day1.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day1.end.toLocaleTimeString('ko-KR', endTimeOptions);
        },
        schedule_local_day2: function () {
            return this.schedule_day2.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day2.end.toLocaleTimeString('ko-KR', endTimeOptions);
        }
    }, 
    methods: {
        checkState: function () {
            var now = new Date();
            var intervalSeconds = 60;

            if (now - this.schedule_day1.start < 0) { // day1 시작 전
                this.viewState = channelState.PRE;

                if (now - this.schedule_day1.start > -(intervalSeconds * 1000)) {
                    intervalSeconds = 5;
                }
            } else { // day1 시작 후
                if (now - this.schedule_day1.end < 0) { // day1 종료 전
                    this.viewState = channelState.LIVE;
                    
                    if (now - this.schedule_day1.end > -(intervalSeconds * 1000)) {
                        intervalSeconds = 5;
                    }
                } else { // day1 종료 후
                    if (now - this.schedule_day2.start < 0) { // day2 시작 전
                        if (now.getDate() == this.schedule_day2.start.getDate()) { // day2 시작일이면
                            this.viewState = channelState.PRE;
                        } else { // day2 이전일이면
                            this.viewState = channelState.END;
                        }

                        if (now - this.schedule_day2.start > -(intervalSeconds * 1000)) {
                            intervalSeconds = 5;
                        }
                    } else {
                        if (now - this.schedule_day2.end < 0) { // day2 종료 전이면
                            this.viewState = channelState.LIVE;

                            if (now - this.schedule_day2.end > -(intervalSeconds * 1000)) {
                                intervalSeconds = 5;
                            }
                        } else { // day2 종료 후라면
                            this.viewState = channelState.END;
                            intervalSeconds = -1;
                        }
                    }
                }
            }

            console.log("now : " + now.toUTCString() + " => state : " + this.viewState + " / interval : " + intervalSeconds);
            if (intervalSeconds > 0) {
                //window.setTimeout(this.checkState, (intervalSeconds * 1000));
            }
        },
        viewChannel: function (event) { 
            console.log("view channel!"); 
            if (this.viewState != channelState.END) {
                view_modal.title_local = this.title_local;
                view_modal.content_url = this.content_url;

                $("#viewModal").modal("show");
            }
        }
    }
});

var vm_program_08 = new Vue({
    el: "#ProgramInfo08",
    data: {
        language: "ko",
        viewState: channelState.PRE,
        title: {
            ko: "내 노래를 소개합니다.",
            en: "Let me introduce my favorite song"
        },
        content_url: "https://www.bbangyatv.com/view/video/embed/4726",
        schedule_day1: {
            start: new Date(Date.UTC(2018, 7, 2, 6, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 2, 7, 0, 0))
        },
        description: {
            ko: "",
            en: ""
        },
        channel_title: {
            ko: "홍보 영상보기",
            en: "View video"
        },
        title_local: "내 노래를 소개합니다.",
        description_local: "",
        channel_title_local: "홍보 영상보기",
        classByState: {
            "btn-state_upcoming": true,
            "btn-state_live-on": false
        },
        classForEnded: {
            "state_live-off": false
        }
    },
    watch: {
        language: function (val) {
            this.title_local = this.title[val];
            this.description_local = this.description[val];
            this.channel_title_local = this.channel_title[val];
        },
        viewState: function (val) {
            this.channel_title = viewButtonTitle[val];
            this.channel_title_local = this.channel_title[this.language];

            this.classByState["btn-state_" + channelState.PRE] = (val == channelState.PRE);
            this.classByState["btn-state_" + channelState.LIVE] = (val == channelState.LIVE || val == channelState.END);
            this.classForEnded["state_" + channelState.END] = (val == channelState.END);
        }
    },
    computed: {
        schedule_local_day1: function () {
            return this.schedule_day1.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day1.end.toLocaleTimeString('ko-KR', endTimeOptions);
        }
    }, 
    methods: {
        checkState: function () {
            var now = new Date();
            var intervalSeconds = 60;

            if (now - this.schedule_day1.start < 0) { // day1 시작 전
                this.viewState = channelState.PRE;

                if (now - this.schedule_day1.start > -(intervalSeconds * 1000)) {
                    intervalSeconds = 5;
                }
            } else { // day1 시작 후
                if (now - this.schedule_day1.end < 0) { // day1 종료 전
                    this.viewState = channelState.LIVE;
                    
                    if (now - this.schedule_day1.end > -(intervalSeconds * 1000)) {
                        intervalSeconds = 5;
                    }
                } else { // day1 종료 후
                    this.viewState = channelState.END;
                    intervalSeconds = -1;
                }
            }

            console.log("now : " + now.toUTCString() + " => state : " + this.viewState + " / interval : " + intervalSeconds);
            if (intervalSeconds > 0) {
                //window.setTimeout(this.checkState, (intervalSeconds * 1000));
            }
        },
        viewChannel: function (event) { 
            console.log("view channel!"); 
            if (this.viewState != channelState.END) {
                view_modal.title_local = this.title_local;
                view_modal.content_url = this.content_url;

                $("#viewModal").modal("show");
            }
        }
    }
});

var vm_program_09 = new Vue({
    el: "#ProgramInfo09",
    data: {
        language: "ko",
        viewState: channelState.PRE,
        title: {
            ko: "한여름의 흥 파티",
            en: "Mid-summer party"
        },
        content_url: "https://www.bbangyatv.com/view/video/embed/4727",
        schedule_day1: {
            start: new Date(Date.UTC(2018, 7, 1, 7, 30, 0)),
            end: new Date(Date.UTC(2018, 7, 1, 8, 30, 0))
        },
        schedule_day2: {
            start: new Date(Date.UTC(2018, 7, 2, 7, 30, 0)),
            end: new Date(Date.UTC(2018, 7, 2, 8, 30, 0))
        },
        description: {
            ko: "",
            en: ""
        },
        channel_title: {
            ko: "홍보 영상보기",
            en: "View video"
        },
        title_local: "한여름의 흥 파티",
        description_local: "",
        channel_title_local: "홍보 영상보기",
        classByState: {
            "btn-state_upcoming": true,
            "btn-state_live-on": false
        },
        classForEnded: {
            "state_live-off": false
        }
    },
    watch: {
        language: function (val) {
            this.title_local = this.title[val];
            this.description_local = this.description[val];
            this.channel_title_local = this.channel_title[val];
        },
        viewState: function (val) {
            this.channel_title = viewButtonTitle[val];
            this.channel_title_local = this.channel_title[this.language];

            this.classByState["btn-state_" + channelState.PRE] = (val == channelState.PRE);
            this.classByState["btn-state_" + channelState.LIVE] = (val == channelState.LIVE || val == channelState.END);
            this.classForEnded["state_" + channelState.END] = (val == channelState.END);
        }
    },
    computed: {
        schedule_local_day1: function () {
            return this.schedule_day1.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day1.end.toLocaleTimeString('ko-KR', endTimeOptions);
        },
        schedule_local_day2: function () {
            return this.schedule_day2.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day2.end.toLocaleTimeString('ko-KR', endTimeOptions);
        }
    }, 
    methods: {
        checkState: function () {
            var now = new Date();
            var intervalSeconds = 60;

            if (now - this.schedule_day1.start < 0) { // day1 시작 전
                this.viewState = channelState.PRE;

                if (now - this.schedule_day1.start > -(intervalSeconds * 1000)) {
                    intervalSeconds = 5;
                }
            } else { // day1 시작 후
                if (now - this.schedule_day1.end < 0) { // day1 종료 전
                    this.viewState = channelState.LIVE;
                    
                    if (now - this.schedule_day1.end > -(intervalSeconds * 1000)) {
                        intervalSeconds = 5;
                    }
                } else { // day1 종료 후
                    if (now - this.schedule_day2.start < 0) { // day2 시작 전
                        if (now.getDate() == this.schedule_day2.start.getDate()) { // day2 시작일이면
                            this.viewState = channelState.PRE;
                        } else { // day2 이전일이면
                            this.viewState = channelState.END;
                        }

                        if (now - this.schedule_day2.start > -(intervalSeconds * 1000)) {
                            intervalSeconds = 5;
                        }
                    } else {
                        if (now - this.schedule_day2.end < 0) { // day2 종료 전이면
                            this.viewState = channelState.LIVE;

                            if (now - this.schedule_day2.end > -(intervalSeconds * 1000)) {
                                intervalSeconds = 5;
                            }
                        } else { // day2 종료 후라면
                            this.viewState = channelState.END;
                            intervalSeconds = -1;
                        }
                    }
                }
            }

            console.log("now : " + now.toUTCString() + " => state : " + this.viewState + " / interval : " + intervalSeconds);
            if (intervalSeconds > 0) {
                //window.setTimeout(this.checkState, (intervalSeconds * 1000));
            }
        },
        viewChannel: function (event) { 
            console.log("view channel!"); 
            if (this.viewState != channelState.END) {
                view_modal.title_local = this.title_local;
                view_modal.content_url = this.content_url;

                $("#viewModal").modal("show");
            }
        }
    }
});

var vm_program_10 = new Vue({
    el: "#ProgramInfo10",
    data: {
        language: "ko",
        viewState: channelState.PRE,
        title: {
            ko: "KMF 풀샷캠",
            en: "KMF Close-up camera view"
        },
        content_url: "https://www.bbangyatv.com/view/video/embed/4724",
        schedule_day1: {
            start: new Date(Date.UTC(2018, 7, 1, 6, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 1, 12, 30, 0))
        },
        schedule_day2: {
            start: new Date(Date.UTC(2018, 7, 2, 6, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 2, 12, 30, 0))
        },
        description: {
            ko: "",
            en: ""
        },
        channel_title: {
            ko: "홍보 영상보기",
            en: "View video"
        },
        title_local: "KMF 풀샷캠",
        description_local: "",
        channel_title_local: "홍보 영상보기",
        classByState: {
            "btn-state_upcoming": true,
            "btn-state_live-on": false
        },
        classForEnded: {
            "state_live-off": false
        }
    },
    watch: {
        language: function (val) {
            this.title_local = this.title[val];
            this.description_local = this.description[val];
            this.channel_title_local = this.channel_title[val];
        },
        viewState: function (val) {
            this.channel_title = viewButtonTitle[val];
            this.channel_title_local = this.channel_title[this.language];

            this.classByState["btn-state_" + channelState.PRE] = (val == channelState.PRE);
            this.classByState["btn-state_" + channelState.LIVE] = (val == channelState.LIVE || val == channelState.END);
            this.classForEnded["state_" + channelState.END] = (val == channelState.END);
        }
    },
    computed: {
        schedule_local_day1: function () {
            return this.schedule_day1.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day1.end.toLocaleTimeString('ko-KR', endTimeOptions);
        },
        schedule_local_day2: function () {
            return this.schedule_day2.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day2.end.toLocaleTimeString('ko-KR', endTimeOptions);
        }
    }, 
    methods: {
        checkState: function () {
            var now = new Date();
            var intervalSeconds = 60;

            if (now - this.schedule_day1.start < 0) { // day1 시작 전
                this.viewState = channelState.PRE;

                if (now - this.schedule_day1.start > -(intervalSeconds * 1000)) {
                    intervalSeconds = 5;
                }
            } else { // day1 시작 후
                if (now - this.schedule_day1.end < 0) { // day1 종료 전
                    this.viewState = channelState.LIVE;
                    
                    if (now - this.schedule_day1.end > -(intervalSeconds * 1000)) {
                        intervalSeconds = 5;
                    }
                } else { // day1 종료 후
                    if (now - this.schedule_day2.start < 0) { // day2 시작 전
                        if (now.getDate() == this.schedule_day2.start.getDate()) { // day2 시작일이면
                            this.viewState = channelState.PRE;
                        } else { // day2 이전일이면
                            this.viewState = channelState.END;
                        }

                        if (now - this.schedule_day2.start > -(intervalSeconds * 1000)) {
                            intervalSeconds = 5;
                        }
                    } else {
                        if (now - this.schedule_day2.end < 0) { // day2 종료 전이면
                            this.viewState = channelState.LIVE;

                            if (now - this.schedule_day2.end > -(intervalSeconds * 1000)) {
                                intervalSeconds = 5;
                            }
                        } else { // day2 종료 후라면
                            this.viewState = channelState.END;
                            intervalSeconds = -1;
                        }
                    }
                }
            }

            console.log("now : " + now.toUTCString() + " => state : " + this.viewState + " / interval : " + intervalSeconds);
            if (intervalSeconds > 0) {
                //window.setTimeout(this.checkState, (intervalSeconds * 1000));
            }
        },
        viewChannel: function (event) { 
            console.log("view channel!"); 
            if (this.viewState != channelState.END) {
                view_modal.title_local = this.title_local;
                view_modal.content_url = this.content_url;

                $("#viewModal").modal("show");
            }
        }
    }
});

var vm_program_11 = new Vue({
    el: "#ProgramInfo11",
    data: {
        language: "ko",
        viewState: channelState.PRE,
        title: {
            ko: "KMF VR",
            en: "KMF-VR(Virtual Reality)"
        },
        content_url: "https://www.bbangyatv.com/view/video/embed/4724",
        schedule_day1: {
            start: new Date(Date.UTC(2018, 7, 1, 6, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 1, 12, 30, 0))
        },
        schedule_day2: {
            start: new Date(Date.UTC(2018, 7, 2, 6, 0, 0)),
            end: new Date(Date.UTC(2018, 7, 2, 12, 30, 0))
        },
        description: {
            ko: "",
            en: ""
        },
        channel_title: {
            ko: "홍보 영상보기",
            en: "View video"
        },
        title_local: "KMF VR",
        description_local: "",
        channel_title_local: "홍보 영상보기",
        classByState: {
            "btn-state_upcoming": true,
            "btn-state_live-on": false
        },
        classForEnded: {
            "state_live-off": false
        }
    },
    watch: {
        language: function (val) {
            this.title_local = this.title[val];
            this.description_local = this.description[val];
            this.channel_title_local = this.channel_title[val];
        },
        viewState: function (val) {
            this.channel_title = viewButtonTitle[val];
            this.channel_title_local = this.channel_title[this.language];

            this.classByState["btn-state_" + channelState.PRE] = (val == channelState.PRE);
            this.classByState["btn-state_" + channelState.LIVE] = (val == channelState.LIVE || val == channelState.END);
            this.classForEnded["state_" + channelState.END] = (val == channelState.END);
        }
    },
    computed: {
        schedule_local_day1: function () {
            return this.schedule_day1.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day1.end.toLocaleTimeString('ko-KR', endTimeOptions);
        },
        schedule_local_day2: function () {
            return this.schedule_day2.start.toLocaleString('ko-KR', startTimeOptions) + " ~ " + this.schedule_day2.end.toLocaleTimeString('ko-KR', endTimeOptions);
        }
    }, 
    methods: {
        checkState: function () {
            var now = new Date();
            var intervalSeconds = 60;

            if (now - this.schedule_day1.start < 0) { // day1 시작 전
                this.viewState = channelState.PRE;

                if (now - this.schedule_day1.start > -(intervalSeconds * 1000)) {
                    intervalSeconds = 5;
                }
            } else { // day1 시작 후
                if (now - this.schedule_day1.end < 0) { // day1 종료 전
                    this.viewState = channelState.LIVE;
                    
                    if (now - this.schedule_day1.end > -(intervalSeconds * 1000)) {
                        intervalSeconds = 5;
                    }
                } else { // day1 종료 후
                    if (now - this.schedule_day2.start < 0) { // day2 시작 전
                        if (now.getDate() == this.schedule_day2.start.getDate()) { // day2 시작일이면
                            this.viewState = channelState.PRE;
                        } else { // day2 이전일이면
                            this.viewState = channelState.END;
                        }

                        if (now - this.schedule_day2.start > -(intervalSeconds * 1000)) {
                            intervalSeconds = 5;
                        }
                    } else {
                        if (now - this.schedule_day2.end < 0) { // day2 종료 전이면
                            this.viewState = channelState.LIVE;

                            if (now - this.schedule_day2.end > -(intervalSeconds * 1000)) {
                                intervalSeconds = 5;
                            }
                        } else { // day2 종료 후라면
                            this.viewState = channelState.END;
                            intervalSeconds = -1;
                        }
                    }
                }
            }

            console.log("now : " + now.toUTCString() + " => state : " + this.viewState + " / interval : " + intervalSeconds);
            if (intervalSeconds > 0) {
                //window.setTimeout(this.checkState, (intervalSeconds * 1000));
            }
        },
        viewChannel: function (event) { 
            console.log("view channel!"); 
            if (this.viewState != channelState.END) {
                view_modal.title_local = this.title_local;
                view_modal.content_url = this.content_url;

                $("#viewModal").modal("show");
            }
        }
    }
});

var vm_lineup = new Vue({
    el: "#lineup",
    data: {
        language: "ko"
    }
});

var vm_schedule = new Vue({
    el: "#schedule",
    data: {
        language: "ko"
    }
});

var vm_ticket = new Vue({
    el: "#ticket",
    data: {
        language: "ko"
    },
    methods: {
        buyTicket: function (id) {
        }
    }
});

var vm_event = new Vue({
    el: "#event",
    data: {
        language: "ko"
    },
    methods: {
        joinUs: function () {
        }
    }
});

var vm_notice = new Vue({
    el: "#notice",
    data: {
        language: "ko"
    },
    methods: {
        viewNotice: function (no) {
        }
    }
});

var vueObjects = {
    programWatcher: [
        view_modal, 
        vm_popup, 
        vm_top_title, 
        vm_program_header, 
        vm_program_01,
        vm_program_02,
        vm_program_03,
        vm_program_04,
        vm_program_05,
        vm_program_06,
        vm_program_07,
        vm_program_08,
        vm_program_09,
        vm_program_10,
        vm_program_11,
        vm_lineup,
        vm_schedule,
        vm_ticket,
        vm_event,
        vm_notice
    ],
    changeLanguage: function (val) {
        for(var i=0; i<this.programWatcher.length; i++) {
            this.programWatcher[i].language = val;
        }
    },
    checkState: function () {
        for (var i=0; i<this.programWatcher.length; i++) {
            if (typeof(this.programWatcher[i].checkState) != "undefined") {
                this.programWatcher[i].checkState();
            }
        }
    }
};

vueObjects.checkState();