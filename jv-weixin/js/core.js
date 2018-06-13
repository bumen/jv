"use strict"

// 系统配置
var config = {
    // 是否是正式环境
    isPublic: false,
    // 消息发送地址
    //baseUrl: "http://guoan.itimi.cn/MatchDay/",
    //baseUrl: "http://zhonghe.itimi.cn/",
    //baseUrl:"http://cms.itimi.cn",
    baseUrl: "http://189m63k096.iask.in:9000/fans/",

    //图片上传地址
    //uploadUrl: 'http://upload.itimi.cn/fileup/upload',
    uploadUrl: 'http://127.0.0.1:8080/file/upload',
    //项目名称
    projectName: "/fans",

    //一、前端本地使用
    //cookiePath: "/wechatOfficialAccount",
    //二、83服使用
    cookiePath: "/",
    //三、线上使用
    //cookiePath: "/",
};

// ----------------------核心框架----------------------
// 工具方法
function format(str, args) {
    var result = str;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};

/**
 * 字符串是否以某个字符开头
 *
 * @param str
 * @returns {boolean}
 */
String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
};

/**
 * 字符串是否以某个字符结尾
 *
 * @param str
 * @returns {boolean}
 */
String.prototype.endWith = function (str) {
    var reg = new RegExp(str + "$");
    return reg.test(this);
};

// 获取URL中的参数
function getParameter(name) {
    var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
    var m = location.href.match(r);
    return (!m ? null : m[2]);
}

/**
 *设置cookies
 *
 * @param key 主键
 * @param value 缓存值
 * @param expire 过期时间(毫秒)，不设置为浏览器关闭过期
 */
function setCookie(name, value, expire) {
    var exp = new Date();
    if (expire) {
        exp.setTime(exp.getTime() + expire);
    }

    var cookieInfo = name + "=" + escape(value) + "; expires=" + exp.toGMTString() + ";path=" + config.cookiePath;
    document.cookie = cookieInfo;
}

// 读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

// 删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=" + config.cookiePath;
    }
}

function getTimeStrToSecondDate(date) {
    var d = date;
    var month;
    var day;
    var hours;
    var minutes;
    var seconds;

    if ((d.getMonth() + 1) < 10) {
        month = "0" + (d.getMonth() + 1);
    } else {
        month = ((d.getMonth() + 1)).toString();
    }

    if (d.getDate() < 10) {
        day = "0" + d.getDate();
    } else {
        day = (d.getDate()).toString();
    }

    if (d.getHours() < 10) {
        hours = "0" + d.getHours();
    } else {
        hours = (d.getHours()).toString();
    }

    if (d.getMinutes() < 10) {
        minutes = "0" + d.getMinutes();
    } else {
        minutes = (d.getMinutes()).toString();
    }

    if (d.getSeconds() < 10) {
        seconds = "0" + d.getSeconds();
    } else {
        seconds = (d.getSeconds()).toString();
    }

    var str = format("{1}-{2}-{3} {4}:{5}:{6}", d.getFullYear(), month, day, hours, minutes, seconds);
    return str;
};

//简易SHA1函数


function encodeUTF8(s) {
    var i, r = [], c, x;
    for (i = 0; i < s.length; i++)
        if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
        else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
        else {
            if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
                c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
                    r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
            else r.push(0xE0 + (c >> 12 & 0xF));
            r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
        }
    return r;
};

// 字符串加密成 hex 字符串
function sha1(s) {
    var data = new Uint8Array(encodeUTF8(s));
    var i, j, t;
    var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
    s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
    for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
    s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
    s[l - 1] = data.length << 3;
    var w = [], f = [
            function () {
                return m[1] & m[2] | ~m[1] & m[3];
            },
            function () {
                return m[1] ^ m[2] ^ m[3];
            },
            function () {
                return m[1] & m[2] | m[1] & m[3] | m[2] & m[3];
            },
            function () {
                return m[1] ^ m[2] ^ m[3];
            }
        ], rol = function (n, c) {
            return n << c | n >>> (32 - c);
        },
        k = [1518500249, 1859775393, -1894007588, -899497514],
        m = [1732584193, -271733879, null, null, -1009589776];
    m[2] = ~m[0], m[3] = ~m[1];
    for (i = 0; i < s.length; i += 16) {
        var o = m.slice(0);
        for (j = 0; j < 80; j++)
            w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
                t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
                m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
        for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0;
    }

    t = new DataView(new Uint32Array(m).buffer);
    for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

    var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
        return (e < 16 ? "0" : "") + e.toString(16);
    }).join("");

    return hex;
};

// 检查一个URL是否存在
function checkURL(url) {
    $.ajax({
        url: url,
        type: 'GET',
        complete: function (response) {
            if (response.status == 200) {
                return true;
            }
        }
    });

    return false;
}

// 统一日志管理
var log = {
    error: function (errorInfo) {
        var date = getTimeStrToSecondDate(new Date());
        var tmp = format("[Error][{1}]:[{2}]", date, errorInfo);

        if (!config.isPublic) {
            ////alert(tmp);
        }

        console.error(tmp);
    },
    info: function (info) {
        if (!config.isPublic) {
            var date = getTimeStrToSecondDate(new Date());
            var tmp = format("[Info][{1}]:[{2}]", date, info);

            console.log(tmp);
        }
    },
};

var Caches = {
    _ServerIpKey: "WeiXin_ServerIp",
    _SessionKey: "WeiXin_SessionId",
    _TicketKey: "WeiXin_Ticket",

    get: function (key) {
        return getCookie(key);
    },

    /**
     * 设置缓存
     *
     * @param key 主键
     * @param value 缓存值
     * @param expire 过期时间(毫秒)，不设置为浏览器关闭过期
     */
    set: function (key, value, expire) {
        setCookie(key, value);
    },

    remove: function (key) {
        delCookie(key);
    },

    /**
     * 设置分配的服务器ip
     *
     * @param serverIp
     */
    setServerIp: function (serverIp) {
        delCookie(this._ServerIpKey);
        // cookie一天过期
        setCookie(this._ServerIpKey, serverIp, 24 * 60 * 60 * 1000);
    },

    /**
     * 获取分配的服务器ip
     */
    getServerIp: function () {
        return getCookie(this._ServerIpKey);
    },

    /**
     * 设置用户的SessionId
     *
     * @param sessionId
     */
    setSessionId: function (sessionId) {
        delCookie(this._SessionKey);
        // cookie一天过期
        setCookie(this._SessionKey, sessionId, 24 * 60 * 60 * 1000);
    },

    /**
     * 获取用户SessionId
     */
    getSessionId: function () {
        return getCookie(this._SessionKey);
    },

    /**
     * 设置用户的Ticket
     *
     * @param ticket 票号
     * @param expire 过期时间(秒)
     */
    setTicket: function (ticket, expire) {
        delCookie(this._TicketKey);
        // cookie一天过期
        setCookie(this._TicketKey, ticket, expire * 1000);
    },

    /**
     * 获取用户Ticket
     */
    getTicket: function () {
        return getCookie(this._TicketKey);
    },
};

// 网络模块
var network = {
    canSend: true,  //能否发送消息（1秒之内不可连续发送）
    send: function (url, data) {
        var self = this;
        if (self.canSend) {
            log.info(format("URL  msg [url = {1}]", url));
            log.info(format("Send msg [data = {1}]", data));
            $.ajax({
                type: 'POST',
                url: url,
                // headers: {'Cookie': document.cookie},
                contentType: "text/plain; charset=utf-8",
                data: data,
                cache: false,
                crossDomain: true,
                success: function (backData, status) {
                    log.info(format("Back msg [status = {1}, backData = {2}]", status, backData));

                    // 消息分发
                    msgContainer.doHandlerMsg(backData);
                },
                error: function () {
                    //网络错误
                    $(".mask").html("网络异常!");
                    promptPop.funA();

                    //隐藏蒙版
                    $(".bround").hide();
                },
                dataType: "text"
            });
            self.canSend = false;
            setTimeout(function () {
                self.canSend = true;
            }, 200);
        }
    }
};

function LoginMsg(channel) {
    // 渠道
    this.channel = channel;

    /**
     * 发送消息给Server
     */
    this.send = function (account, passwd, code, method) {
        if (!this.channel) {
            channel = "Test";
        }

        // 消息URL
        var url = config.baseUrl + "/login?c=" + channel + "&account=" + account + "&passwd=" + passwd + "&code=" + code + "&method=" + method;

        // 发送消息
        network.send(url);
    }
};

// 消息对象
function Msg(msgName) {
    this._params = {};
    this._name = msgName;

    this.getMsgName = function () {
        return this._name;
    };

    /**
     * 设置参数
     */
    this.setParam = function (key, value) {
        this._params[key] = value;
    };

    this.getData = function () {
        var msgData = JSON.stringify(this._params);
        msgData = this._name + ":" + msgData;
        msgData = msgData.length + ":" + msgData;

        return msgData;
    };

    this.getUrl = function () {
        var url = "http://" + Caches.getServerIp() + config.projectName + "/msg";
        //var url = "http://192.168.0.124:8080/itimi/msg";

        // 带上sessionId
        var sessionId = Caches.getSessionId();
        if (sessionId) {
            url = url + "?s=" + sessionId;
        }
        return url;
    };

    /**
     * 发送消息给Server
     */
    this.send = function () {
        // 消息数据
        var data = this.getData();
        // 消息URL
        var url = this.getUrl();
        // 发送消息
        network.send(url, data);
    };

    /**
     * 给baseURL发送消息给Server
     */
    this.sendByBaseUrl = function () {
        // 消息数据
        var data = this.getData();
        // 消息URL
        var url = config.baseUrl + "/msg";
        // 带上sessionId
        var sessionId = Caches.getSessionId();
        if (sessionId) {
            url = url + "?s=" + sessionId;
        }
        // 发送消息
        network.send(url, data);
    };
    
    this.sendLoginUrl = function () {
        // 消息数据
        var data = this.getData();
        // 消息URL
        var url = config.baseUrl + "/login";
        // 发送消息
        network.send(url, data);
    };
};

// 消息容器
var msgContainer = {
    _msgList: {},

    /**
     * 一次性添加消息，执行完一次之后自动移除
     *
     * @param name
     *            消息名
     * @param callbackFunc
     *            回调方法
     * @param target
     *            回调对象
     * @param data
     *            预设值参数，回调时传回
     */
    addMsgListenerOnce: function (name, callbackFunc, target, data) {

        if (name == null || name == "" || callbackFunc == null) {
            return;
        }

        this._msgList[name] = {};
        this._msgList[name].target = target;
        this._msgList[name].callbackFunc = callbackFunc;
        this._msgList[name].data = data;
        this._msgList[name].once = true;
    },

    /**
     * 永久添加消息，执行之后不移除
     *
     * @param name
     *            消息名
     * @param callbackFunc
     *            回调方法
     * @param target
     *            回调对象
     * @param data
     *            预设值参数，回调时传回
     */
    addMsgListenerForever: function (name, callbackFunc, target, data) {

        if (name == null || name == "" || callbackFunc == null)
            return;

        this._msgList[name] = {};
        this._msgList[name].target = target;
        this._msgList[name].callbackFunc = callbackFunc;
        this._msgList[name].data = data;
        this._msgList[name].once = false;
    },

    // 解析全部消息
    doHandlerMsg: function (dataStr) {
        var end = dataStr.indexOf(']');
        if (end == -1) {
            log.error("Illegal msg:" + dataStr);
            return;
        }

        var length = parseInt(dataStr.substr(1, end));

        dataStr = dataStr.substr(end + 1);

        var oneMsgData = null;
        var oneMsgLength = 0;

        for (var i = 0; i < length; i++) {
            end = dataStr.indexOf(":");
            if (end == -1) {
                log.error("Illegal msg:" + dataStr);
                return;
            }

            // 获取该消息的长度
            oneMsgLength = parseInt(dataStr.substr(0, end));
            dataStr = dataStr.substr(end + 1);

            // 获取该消息体
            oneMsgData = dataStr.substr(0, oneMsgLength);

            // 跳过此消息的消息体
            dataStr = dataStr.substr(oneMsgLength);

            // 执行消息
            this._handlerMsg(oneMsgData);
        }
    },

    // 解析一个消息
    _handlerMsg: function (data) {

        var start = data.indexOf(':');

        if (start == -1) {
            log.error("Illegal msg:" + data);
            return;
        }

        // 取消息名
        var name = data.substring(0, start);
        // 取到最终数据
        data = data.substring(start + 1);

        // 获取数据
        var msg = JSON.parse(data);

        var func = this._msgList[name];
        if (name == null || func == null) {
            log.error(format("Cannot find msg function for msg[{1}]", name));
            return;
        }
        var target = func.target;
        var callbackFunc = func.callbackFunc;
        var data = func.data;
        try {
            if (target) {
                callbackFunc.call(target, msg, data);
            } else {
                callbackFunc.call(null, msg, data);
            }

            if (this._msgList[name].once) { // 执行完移除
                this.removeMsgListener(name);
            }
        } catch (err) {
            log.error(format("Deal msg name[{1}], {2}", name, err.stack));
        }
    },

    removeMsgListener: function (name) {

        if (name == null || name == "" || this._msgList == null) {
            return;
        }

        var func = this._msgList[name];
        if (func != null) {
            delete this._msgList[name];
        }
    },

    removeAllMsgListener: function () {

        if (null == this._msgList)
            return;

        for (var i in this._msgList) {
            delete this._msgList[i];
        }
        this._msgList = {};
    }
};

// 心跳模块
var heartbeat = {
    start: function () {
        // 启动定时心跳
        setInterval(this._doHeartbeat, parseInt(config.heartbeatInterval));
    },

    _doHeartbeat: function () {
        if (ad.code) {
            // 消息URL
            var url = "http://" + Caches.getServerIp() + "/hb?c=" + ad.code;
            // 执行心跳
            $.ajax({
                type: 'GET',
                url: url,
                cache: false,
                contentType: "text/plain; charset=utf-8",
                success: function (backData, status) {
                    // log.info(format("Send msg [status = {1}, url = {2}]",
                    // status, url));
                    // 消息分发
                    msgContainer.doHandlerMsg(backData);
                },
                dataType: "text"
            });
        }
    },
};

// ----------------------CNZZ数据记录----------------------
var cnzz = {
    init: function () {
        $.getScript("https://s22.cnzz.com/z_stat.php?id=1264371713&web_id=1264371713", this.callback);
    },

    callback: function () {
        if (window._czc) {
            var _czc = _czc || [];
            _czc.push(["_setAccount", "1264371713"]);
        } else {
            log.error("cnzz loading failed!");
        }
    },

    /**
     * 播放广告日志
     *
     * @param code
     *            比赛编号
     * @param adType
     *            广告类型:1=角标广告时间，2=轮询广告时间，3=必播广告时间
     * @param fileName
     *            物料名字
     */
    sendAdLog: function (code, adType, fileName) {
        var category = "未知类型";
        if (adType == 1) {
            category = "角标广告";
        } else if (adType == 2) {
            category = "轮询广告";
        } else if (adType == 3) {
            category = "必播广告";
        }
        if (window._czc) {
            _czc.push(["_trackEvent", category, code, fileName]);
        } else {
            log.error("cnzz is not exsit!");
        }
    },

    /**
     * 播放集锦日志
     *
     * @param code
     *            集锦编号
     * @param fileName
     *            物料名字
     */
    sendHighlightsLog: function (code, fileName) {
        if (window._czc) {
            _czc.push(["_trackEvent", "集锦", code, fileName]);
        } else {
            log.error("cnzz is not exsit!");
        }
    },
};

// ----------------------全局对象----------------------
/**
 * 全局对象
 *
 * @type {{registMsg: global.registMsg, doPop: global.doPop, doPrompt: global.doPrompt, doResponse: global.doResponse, doSessionMiss: global.doSessionMiss}}
 */
var global = {
    init: function () {
        this.registMsg();
    },

    registMsg: function () {
        // 注册全局永久消息
        msgContainer.addMsgListenerForever("GC_PopMsg", this.doPop, this);
        msgContainer.addMsgListenerForever("GC_PromptMsg", this.doPrompt, this);
        msgContainer.addMsgListenerForever("GC_ResponseMsg", this.doResponse, this);
        msgContainer.addMsgListenerForever("GC_SessionMissMsg", this.doSessionMiss, this);
        msgContainer.addMsgListenerForever("GC_NeedAuthorization", this.doubleLogin, this);
    },
    doubleLogin: function () {
        //localStore.removeItem("acount");
        //localStore.removeItem("token");

        //delCookie("acount");
        //delCookie("token");

        window.location.href = "error.html";
    },

    /**
     * 弹出框提示
     *
     * @param msg
     * @param data
     */
    doPop: function (msg, data) {
        //alert(msg.message);
    },

    /**
     * 冒泡框提示
     *
     * @param msg
     * @param data
     */
    doPrompt: function (msg, data) {
        if (type == 1) { //类型：1=错误，2=提示
            log.error(msg.message);
        } else {
            log.log(msg.message);
        }
    },

    /**
     * 消息处理时，统一返回编码
     */
    doResponse: function (msg, data) {
        //alert(msg.responseCode);
    },

    /**
     * 登录态丢失，调用登录模块
     *
     * @param msg
     * @param data
     */
    doSessionMiss: function (msg, data) {
        //alert(msg.reasonCode + "：登录态丢失，调用登录模块");
    }
};
global.init();

//本地存储
var storage = {
    setItem: function (key, value) {
        var str = JSON.stringify(value);
        sessionStorage.setItem(key, str);
    },

    getItem: function (key) {
        var str = sessionStorage.getItem(key);
        return JSON.parse(str);
    },
    removeItem: function (key) {
        sessionStorage.removeItem(key);
    },
    clear: function () {
        sessionStorage.clear();
    },
}

//永久存储
var localStore = {
    setItem: function (key, value) {
        var str = JSON.stringify(value);
        localStorage.setItem(key, str);
    },

    getItem: function (key) {
        var str = localStorage.getItem(key);
        return JSON.parse(str);
    },
    removeItem: function (key) {
        localStorage.removeItem(key);
    },
    clear: function () {
        localStorage.clear();
    },
}

//图片上传
var imageUpLoad = {
    //展示图片
    selectImage: function (image, file) {
        // var files=document.getElementsById('files');
        if (!file.files || !file.files[0]) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (evt) {
            image.src = evt.target.result;
            //image = evt.target.result;
        };
        reader.readAsDataURL(file.files[0]);
    },

    //上传图片
    uploadImage: function (file, func) {
        var datra = new FormData();
        datra.append("file", file.files[0]);

        $.ajax({
            type: 'POST',
            url: config.uploadUrl,
            //data: {image: imageData},
            crossDomain: true,
            data: datra,
            dataType: 'json',
            processData: false, // 不会将 data 参数序列化字符串
            contentType: false,
            success: function (data) {
                if (data.flag) {
                    func(data.filePath);
                } else {
                    promptPop.funA();
                    $(".mask").html("上传失败");

                    $(".uploadImageDelay").hide();
                    $(".uploadImageDelayText").hide();
                }
            },
            error: function (err) {
                promptPop.funA();
                $(".mask").html("网络故障");

                $(".uploadImageDelay").hide();
                $(".uploadImageDelayText").hide();
            }
        });
    }
}


//弹出提示框
var promptPop = {
    //状态码
    statusCode: {
        "10001": "未知错误"
    },

    // 浮层定时关闭
    funA: function () {
        $(".textTwo").show();
        $(".backgeound").show();
        setTimeout(function () {
            $(".textTwo").hide();
            $(".backgeound").hide()
        }, 1500);
    },

    //弹窗提示
    popUp: function (code) {
        $(".mask").html(this.statusCode[code]);
        this.funA();
    }
};



