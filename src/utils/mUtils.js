export const basefild = '';
export const base = 'http://10.10.137.16'; // http://beijing.cbs.bacic5i5j.com:8080/cbs-report
// http://10.10.137.16

export const baseurlz = `${base}/${basefild}`;
export const env = 'online'; // online
export const baseurlzz = process.env.NODE_ENV === 'development' ?
    '/baric' :
    '';
import { Message } from 'element-ui';
// 数组某属性变成字符串
export const arrayToString = (array, sx, fgf) => {
    let temparray = [];
    for (let t in array) {
        temparray.push(array[t][sx]);
    };
    let tempstring = temparray.join(fgf);
    return tempstring;
}

// 两级数组某属性变成字符串
export const arrayToStringTwo = (array, sx1, sx2, fgf) => {
    let temparray = [];
    for (let t in array) {
        if (!array[t].showhead) {
            temparray.push(array[t][sx1][sx2]);
        }
    };
    let tempstring = '';
    if (temparray.length > 1) {
        tempstring = temparray.join(fgf);
    } else {
        tempstring = temparray[0];
    }
    return tempstring;
}

// sxiframe by zkf export const freashpage = (query) => {   this.src = '';
// this.$nextTick(() => {     this.src = `${baseurlz}/report${query}`;   }); }
// 格式化时间by zkf
export const formatTimez = (timearray) => {
        let dates = [];
        for (let i in timearray) {
            let year = parseInt(timearray[i].rptId.slice(0, 4));
            let month = parseInt(timearray[i].rptId.substring(4, 6)) - 1;
            let date = parseInt(timearray[i].rptId.substring(6, 8));
            dates.push(new Date(year, month, date));
        }
        return dates;
    }
    // 显示图像的颜色值
export const colorecharts = [
        { itemcolor: '#1b92f7', areacolor: ['rgba(109, 113, 239, 1)', 'rgba(109, 113, 239, 0.9)'] }, // 蓝色
        { itemcolor: '#dd13f4', areacolor: ['rgba(235, 109, 239, 1)', 'rgba(235, 109, 239, 0.8)'] }, // 浅紫色
        { itemcolor: '#920783', areacolor: ['rgba(146, 7, 131, 1)', 'rgba(146, 7, 131, 0.6)'] }, // 深紫色
        { itemcolor: '#f4f66f', areacolor: ['rgba(244, 246, 111, 1), rgba(244, 246, 111, 0.45)'] }, // 黄色
        { itemcolor: '#e60012', areacolor: ['rgba(230, 0, 18, 1)', 'rgba(230, 0, 18, 0.3)'] }, // 红色
        { itemcolor: '#05e5f9', areacolor: ['rgba(5, 229, 249, 1)', 'rgba(5, 229, 249, 0.1)'] }, // 科技色
    ]
    //  搜索时的文字匹配及文字高亮 by zkf
export const searchTarget = (inpustring, textstring) => {
    let tempinpustring = inpustring.replace(/\s/gi, ''); // 先把输入框的文本去掉空格
    let reg = new RegExp(tempinpustring, 'g');
    let sCurText;
    if (!reg.test(textstring)) { // 没有找到
        alert("没有您输入的检测结果，请重新输入");
        return;
    } else { // 找到
        // 处理原来的文本为 高亮文本<span class="highlight"> +inpustring+ '</span>
        let thtext = `<span class="highlight">${inpustring}</span>`;
        let newinner = textstring.replace(reg, thtext);
        return newinner;
    }
}

//字符串正则表达式关键字转化
export const vueHighlight = (str, v_html, red) => {
    let clStr = "style='color:" + red + ";'";
    // 字符串正则表达式关键字转化
    $.regTrim = function(s) {
        var imp = /[\^\.\\\|\(\)\*\+\-\$\[\]\?]/g;
        var imp_c = {};
        imp_c["^"] = "\\^";
        imp_c["."] = "\\.";
        imp_c["\\"] = "\\\\";
        imp_c["|"] = "\\|";
        imp_c["("] = "\\(";
        imp_c[")"] = "\\)";
        imp_c["*"] = "\\*";
        imp_c["+"] = "\\+";
        imp_c["-"] = "\\-";
        imp_c["$"] = "\$";
        imp_c["["] = "\\[";
        imp_c["]"] = "\\]";
        imp_c["?"] = "\\?";
        s = s.replace(imp, function(o) {
            return imp_c[o];
        });
        return s;
    };
    // 把关键字转化成数组
    str = $.trim(str);
    if (str === "") {
        //  Message.info('关键字为空');
        return v_html;
    } else {
        // 将关键字push到数组之中
        var arr = [];
        arr = str.split(" ");
    }
    //将HTML代码支离为HTML片段和文字片段，其中文字片段用于正则替换处理，而HTML片段置之不理
    var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
    var a = v_html.match(tags),
        test = 0;
    $.each(a, function(i, c) {
        if (!/<(?:.|\s)*?>/.test(c)) {
            //非标签 开始执行替换
            $
                .each(arr, function(index, con) {
                    if (con === "") {
                        return;
                    }
                    var reg = new RegExp($.regTrim(con), "g");
                    if (reg.test(c)) {
                        //正则替换
                        c = c.replace(reg, "♂" + con + "♀");
                        test = 1;
                    }
                });
            c = c
                .replace(/♂/g, "<mark " + clStr + ">")
                .replace(/♀/g, "</mark>");
            a[i] = c;
        }
    });
    //将支离数组重新组成字符串
    var new_html = a.join("");
    // console.log(' new_html',  new_html);
    return new_html;
    // $(this).html(new_html);
    if (test === 0) {
        Message.success('没有搜索结果');
        return false;
    }
}

// 格式化时间
export const formatTime = (t, b) => {
    let d = new Date();
    d.setTime(t);
    let Y = d.getFullYear();
    let M = d.getMonth() + 1;
    let D = d.getDate();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    M = M < 10 ?
        ('0' + M) :
        M;
    D = D < 10 ?
        ('0' + D) :
        D;
    h = h < 10 ?
        ('0' + h) :
        h;
    m = m < 10 ?
        ('0' + m) :
        m;
    s = s < 10 ?
        ('0' + s) :
        s;
    if (b) {
        return Y + '-' + M + '-' + D;
    } else {
        return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
    }
}

/**
 * 删除cookie
 */
export const removeCookie = name => {
    setCookie(name, "", -1);
}

// 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子： (new
// Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
// Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
export const Format = function(date, fmt) {
        let d = new Date();
        d.setTime(date);
        let o = {
            'M+': d.getMonth() + 1, // 月份
            'd+': d.getDate(), // 日
            'h+': d.getHours(), // 小时
            'm+': d.getMinutes(), // 分
            's+': d.getSeconds(), // 秒
            'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
            'S': d.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
                    (o[k]) :
                    (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    }
    // 过滤对象
export const JSONer = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

// 获取用户id
export const getUserId = () => {
    let userId;
    try {
        userId = JSON
            .parse(sessionStorage.userInfo)
            .id;
    } catch (e) {}
    return userId;
}

// 获取用户信息
export const getUserInfo = () => {
    let userId;
    try {
        userId = JSON.parse(sessionStorage.userInfo);
    } catch (e) {}
    return userId;
}


/**
 * 遍历所有数组对象，将所有value数字类型数字转换为字符串类型
 */
export const ObjtoString = (arr) => {
    for (var p in arr) {
        if (typeof arr[p].value === 'number') {
            arr[p].value = arr[p]
                .value
                .toString();
        }
    }
    return arr;
}

/**
 * 遍历所有数组对象，将所有id数字类型数字转换为字符串类型
 */
export const ArrtoString = (arr) => {
    for (var p in arr) {
        if (typeof arr[p].id === 'number') {
            arr[p].id = arr[p]
                .id
                .toString();
        }
    }
    return arr;
}


/**
 * 将string类型的转换为number类型的
 */
export const myToNumber = (a) => {
    if (a !== null || a !== '') {
        return parseInt(a);
    } else {
        return '';
    }
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name)
        return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window
        .localStorage
        .setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name)
        return;
    return window
        .localStorage
        .getItem(name);
}

/**
 * 存储sessionStorage
 */
export const setSessionStore = (name, content) => {
    if (!name)
        return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window
        .sessionStorage
        .setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
    if (!name)
        return;
    var obj = window
        .sessionStorage
        .getItem(name);
    try {
        return JSON.parse(obj);
    } catch (e) {
        return obj
    }
}

/**
 * 删除sessionStorage
 */
export const removeSessionStore = name => {
    if (!name)
        return;
    window
        .sessionStorage
        .removeItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name)
        return;
    window
        .localStorage
        .removeItem(name);
}

export const initnode = {
    // 前端展示需要属性，不和任何交互相关
    'nodeparam': {
        'nodeId': '',
        'nodeName': '',
        nodeLeft: '',
        nodeTop: '',
        nodeWidth: '',
        nodeHeight: '',
        nodeType: '',
        status: '',
        show: '',
        exist: '',
        'in': ['', ''],
        'out': ['', ''],
        'line': ['', ''],
        children: [],
        father: [],
        'other': '',
        'temp': '',
        viewId: '',
    },
    // 后端交互需要属性，待宪刚定定，后端需要的属性会全部放在data里面，
    'data': {},
}