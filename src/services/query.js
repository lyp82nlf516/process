import request from '../utils/requestz'
import { basefild } from '@/utils/mUtils.js'
import qs from 'qs'
// const postparams = {     credentials: 'include',     method: 'post', mode:
// 'no-cors',     headers: {         'Accept':'application/json',
// 'Content-Type': 'application/json'     } }; const postparamsz = {
// credentials: 'include',     method: 'post',     mode: 'no-cors',     headers:
// {         'Accept': 'application/json, text/javascript, */*', 'Content-Type':
// 'application/x-www-form-urlencoded'     } }; const getparams = { credentials:
// 'include' } 这里写需要请求的接口
var PROXY2 = process.env.NODE_ENV === 'development' ? '/node' : ''
var PROXY = process.env.NODE_ENV === 'development' ? '/baric' : ''
var report = basefild
    // 新版接口 byzkf post 请求头
const newpostparams = {
    credentials: 'include',
    method: 'post',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
}
const newpostparamsajax = {
        credentials: 'include',
        method: 'post',
        headers: {
            Accept: 'application/json, text/javascript, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    // get 请求头
const getparams = {
        credentials: 'include'
    }
    // 左侧权限菜单http://bi.cbs.bacic5i5j.com:8080/report/system/priv/queryMemuByUserId.htm
export async function getleftmenuz(val) {
    return request(`${PROXY2}/${report}/system/priv/queryMemuByUserId.htm?treetype=${val}`, {
        ...newpostparams
    });
}
//  目录树/report/system/reprot.htm
export async function gettree() {
    return request(`${PROXY2}/${report}/system/reprot.htm`, {
        ...newpostparams
    });
}
// 收藏表system/sub/addSub.htm？rId = XXXXXXX
export async function collecttable(params) {
    return request(`${PROXY2}/${report}/system/sub/addSub.htm?rId=${params}`, {
        ...newpostparams
    });
}
// 更新收藏system/sub/updateSub.htm？rId = XXXXXXX
export async function updateSub(params) {
    return request(`${PROXY2}/${report}/system/sub/updateSub.htm?rId=${params}`, {
        ...newpostparams
    });
}
// 取消订阅system/sub/delSub.htm？rId = XXXXXXX
export async function canceltable(params) {
    return request(`${PROXY2}/${report}/system/sub/delSub.htm?rId=${params}`, {
        ...newpostparams
    });
}
// 查询已收藏的表system/sub/list.htm
export async function getcollecttable() {
    return request(`${PROXY2}/${report}/system/sub/list.htm`, {
        ...newpostparams
    });
}
// 日历的接口
export async function getDate() {
    return request(`${PROXY2}/${report}/system/sub/getDate.htm`, {
        ...newpostparams
    });
}
// 点击日历获取事件的接口
export async function getToday(val) {
    return request(`${PROXY2}/${report}/system/sub/getToday.htm?rId=${val}`, {
        ...newpostparams
    });
}
// 筛选条件report/system/report/getSerchTreeMsg.htm
export async function getComponentMsg() {
    return request(`${PROXY2}/${report}/system/querycomponent/getComponentMsg.htm`, {
        ...newpostparams
    });
}
// 配置表头report/system/report/getColumnTreeMsg.htm
export async function getColumnTreeMsg() {
    return request(`${PROXY2}/${report}/system/report/getColumnTreeMsg.htm`, {
        ...newpostparams
    });
}
// 提交报表 let saveDataSourceInfo = (data) => fetch('POST',
// `${PROXY}/report/system/report/addDefConfBody.htm`, data);
export async function saveaddDefConfEntityBody(data) {
    return request(`${PROXY2}/${report}/system/report/addDefConfEntityBody.htm`, {
        ...newpostparams,
        body: JSON.stringify(data)
    });
}
// 分页查询offset  pageSize
export async function defConfListPage(val) {
    return request(`${PROXY2}/${report}/system/report/defConfList.htm`, {
        credentials: 'include',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(val)
    });
}
// 修改是查询数据的接口
export async function findDefConfByCode(val) {
    return request(`${PROXY2}/${report}/system/report/findDefConfByCode.htm?rptCode=${val}`, {
        ...newpostparams
    });
}
// 修改后提交数据
export async function editDefConfEntityBody(val) {
    return request(`${PROXY2}/${report}/system/report/editDefConfEntityBody.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
// let findDefConfByCode = (val) => fetch('POST',
// `${PROXY}/report/system/report/findDefConfByCode.htm`, val); 删除列表数据的接口
export async function delDefConf(val) {
    return request(`${PROXY2}/${report}/system/report/delDefConf.htm?rptIds=${val}`, {
        ...newpostparams
    });
}
// 预览/report/viewUnion/rpt1505706109755/newttttttttttt/custom.htm let
// callProcedure = (val) => fetch('POST',
// `${PROXY2}/report/system/report/callProcedure.htm`, val);
export async function callProcedure(val) {
    return request(`${PROXY2}/${report}/viewUnion/${val.rptCode}/${val.rptName}/custom.htm`, {
        ...newpostparams
    });
}
// 表相关,返回值是可以选的表http://slocal.cbs.bacic5i5j.com:8080/report/system/report/callTa
// bleProcedure.htm
export async function callTableProcedure(val) {
    return request(`${PROXY2}/${report}/system/report/callTableProcedure.htm?tableCode=${val}`, {
        ...newpostparams
    });
}
// 图形的新接口http://bi.cbs.bacic5i5j.com:8081/cbs-report/view/queryEcharts.htm?displayType=line
export async function queryCitycbs() {
    return request(`${PROXY2}/${report}/view/queryEcharts.htm`, {
        ...newpostparams
    });
}
// 图形/report/system/queryCity.htm
export async function queryCity() {
    return request(`${PROXY2}/${report}/system/queryCity.htm`, {
        ...newpostparams
    });
}
// 大区图像接口/report/system/queryArea.htm newpostparamsajax
export async function queryArea(val) {
    return request(`${PROXY2}/${report}/system/queryArea.htm`, {
        ...newpostparamsajax,
        body: JSON.stringify({
            'companyName': val
        })
    });
}
// 用户信息/system/priv/logonMsg.htm
export async function logonMsg() {
    return request(`${PROXY2}/${report}/system/priv/logonMsg.htm`, {
        ...newpostparams
    });
}
// 首页位置的存储http://bi.cbs.bacic5i5j.com:8080/report/system/priv/setHomePage.htm
// http://bi.cbs.bacic5i5j.com:8080/report/system/priv/queryHomePage.htm
export async function setHomePage(val) {
    return request(`${PROXY2}/${report}/system/priv/setHomePage.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
export async function queryHomePage() {
    return request(`${PROXY2}/${report}/system/priv/queryHomePage.htm`, {
        ...newpostparams
    });
}
// 缩略图8080/report/view/callThumbnailData.htm
export async function callThumbnailData(val) {
    return request(`${PROXY2}/${report}/view/callThumbnailData.htm?rptId=${val}`, {
        ...newpostparams
    });
}
// 搜索接口http://bi.cbs.bacic5i5j.com:8080/report/system/sub/searchMain.htm?content
// =%E6%8A%A5%E8%A1%A8 export async function searchMain(val) {     return
// request(`${PROXY2}/report/system/sub/searchMain.htm?content=${val}`, {
// ...newpostparams     }); } bug xg
export async function searchMain(params) {
    let val = encodeURI(params);
    return request(`${PROXY2}/${report}/system/sub/searchMain.htm?content=${val}`, {
        ...newpostparams
    });
    //  return request(`${PROXY2}/report/system/sub/searchMain.htm?content=${val}`,
    // getparams);
};
// 常用接口http://bi.cbs.bacic5i5j.com:8080/report/system/sub/userMain.htm  返回值报表ID
// rptId  报表名称rptName  表头rptDes
export async function userMain() {
    return request(`${PROXY2}/${report}/system/sub/userMain.htm`, {
        ...newpostparams
    });
}
// 退出接口/report/system/priv/logout.htm
export async function logout() {
    return request(`${PROXY2}/${report}/system/priv/logout.htm`, {
        ...newpostparams
    });
}
// 拖拽目录树的接口
export async function saverptorder(val) {
    return request(`${PROXY2}/${report}/system/saveRptOrder.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
// 判断职位是否发生变化的函数/system/jobTransfer.htm
export async function jobTransfer(val) {
    return request(`${PROXY2}/${report}/system/jobTransfer.htm`, {
        ...newpostparams
    });
}
// 查询条件http://bi.cbs.bacic5i5j.com:8081/cbs-report/system/showGraphical/acquireQ
// ueryMsg.htm
export async function acquireQueryMsg(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/acquireQueryMsg.htm?rptId=${val}`, {
        ...newpostparams
    });
}
// 表头数http://bi.cbs.bacic5i5j.com:8081/cbs-report/system/showGraphical/acquireTi
// tleMsg.htm
export async function acquireTitleMsg(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/acquireTitleMsg.htm?rptId=${val}`, {
        ...newpostparams
    });
}
// 表格数据数http://bi.cbs.bacic5i5j.com:8081/cbs-report/system/showGraphical/acquire
// TableMsg.htm
export async function acquireTableMsg(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/acquireTableMsg.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
// 用户的基础信息acquireBasisMsg
// 表格数据数http://bi.cbs.bacic5i5j.com:8081/cbs-report/system/showGraphical/acquire
// TableMsg.htm
export async function acquireBasisMsg(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/acquireBasisMsg.htm?rptId=${val}`, {
        ...newpostparams,
    });
}
// 保存位置信息接口savePositionMsg
export async function savePositionMsg(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/savePositionMsg.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
// 查询位置信息接口 acquirePositionMsg
export async function acquirePositionMsg(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/acquirePositionMsg.htm?rptId=${val}`, {
        ...newpostparams,
    });
}
// 配置页面的接口  查询条件  参数：String primaryKey  /model/acquireQueryMsg.htm
export async function modelacquireQueryMsg(val) {
    return request(`${PROXY2}/${report}/model/acquireQueryMsg.htm?primaryKey=${val}`, {
        ...newpostparams
    });
}
// 配置页面的接口  操作按钮 参数：String primaryKey /model/acquireOperationMsg.htm
export async function modelacquireOperationMsg(val) {
    return request(`${PROXY2}/${report}/model/acquireOperationMsg.htm?primaryKey=${val}`, {
        ...newpostparams
    });
}
// 配置页面的接口  --表头和页面数据 参数：String primaryKey /model/acquirePageMsg.htm
export async function modelacquirePageMsg(val) {
    return request(`${PROXY2}/${report}/model/acquirePageMsg.htm?primaryKey=${val}`, {
        ...newpostparams
    });
}
// 配置页面的接口 --列表数据  参数：String jsonStr (json字符串 包含primaryKey) /model/list.htm
export async function modellist(val) {
    let jmparme = encodeURIComponent(encodeURIComponent(val))
    return request(`${PROXY2}/${report}/model/list.htm?jsonStr=${jmparme}`, {
        ...newpostparams,
    });
}
// 配置页面的接口 --新增数据  参数：String jsonStr (json字符串 包含primaryKey)/model/add.htm
export async function modeladd(val) {
    let jmparme = encodeURIComponent(encodeURIComponent(val));
    return request(`${PROXY2}/${report}/model/add.htm?jsonStr=${jmparme}`, {
        ...newpostparams,
    });
}
// 配置页面的接口 --修改数据  参数：String jsonStr (json字符串 包含primaryKey)/model/edit.htm
export async function modeledit(val) {
    let jmparme = encodeURIComponent(encodeURIComponent(val))
    return request(`${PROXY2}/${report}/model/edit.htm?jsonStr=${jmparme}`, {
        ...newpostparams,
    });
}

// 配置页面的接口 --删除数据  参数：String jsonStr (json字符串 包含primaryKey) /model/del.htm
export async function modeldel(val) {
    return request(`${PROXY2}/${report}/model/del.htm?jsonStr=${val}`, {
        ...newpostparams,
    });
}

// 角色列表接口(参数：以实体形式接收、参数名称同数据库字段名称) /system/showGraphical / listrole.htm
export async function listrole(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/listrole.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}

// 角色新增接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical / addrole.htm
export async function addrole(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/addrole.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}

// 角色修改接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical/editrole.htm
export async function editrole(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/editrole.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}

// 角色删除接口(参数：单参数形式接收，参数类型为数组，参数名称 ids )/system/showGraphical / delrole.htm
export async function delrole(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/delrole.htm?ids=${val}`, {
        ...newpostparams
    });
}
// 用户列表接口人员列表接口(参数：以实体形式接收、参数名称同数据库字段名称) /system/showGraphical/listuser.htm
export async function listuser(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/listuser.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}

// 人员新增接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical/adduser.htm
export async function adduser(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/adduser.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}

// 人员修改接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical/edituser.htm
export async function edituser(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/edituser.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}

// 人员删除接口(参数：单参数形式接收，参数类型为数组，参数名称ids)/system/showGraphical/deluser.htm
export async function deluser(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/deluser.htm?ids=${val}`, {
        ...newpostparams
    });
}
// 目录全给你，报表只穿编码长短为8
// 获取角色下拉/system/showGraphical/getRoles.htm
export async function getRolesz() {
    return request(`${PROXY2}/${report}/system/showGraphical/getRoles.htm`, {
        ...newpostparams
    });
}
// 报表树接口/system/roledefine/reprotInit.htm
export async function reprotInitz() {
    return request(`${PROXY2}/${report}/system/roledefine/reprotInit.htm`, {
        ...newpostparams
    });
}

// 目录树接口/system/priv/queryAllMenu.htm
export async function queryAllMenuz() {
    return request(`${PROXY2}/${report}/system/priv/queryAllMenu.htm`, {
        ...newpostparams
    });
}

// 数据源新增接口(参数：以实体形式接收)/system/showGraphical/adddb.htm
export async function adddb(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/adddb.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}

// 凭证新增接口(参数：以实体形式接收)/system/showGraphical/addvoucher.htm
export async function addvoucher(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/addvoucher.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
// --获取数据源（无参数）/system/showGraphical/getDbs.htm
export async function getDbs(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/getDbs.htm`, {
        ...newpostparams,
    });
}

// --根据数据源查询表(单参数)参数id（数据源对应的key）/system/showGraphical/getTables.htm返回值是参数名为key，value的集合
export async function getTables(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/getTables.htm?id=${val}`, {
        ...newpostparams,
    });
}

// --根据数据源和表名查询表对应字段（两个参数）参数id，tableName（数据源对应的key）/system/showGraphical/getTableColumns.htm返回值是参数名为key，value的集合
export async function getTableColumns(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/getTableColumns.htm?id=${val.id}&tableName=${val.tableName}`, {
        ...newpostparams,
    });
}

// --保存数据接口--保存数据接口 实体接收：（数据源key：dbid， 表名：tablename，拼接sql：confmsg）/system/showGraphical/saveConfInfo.htm
export async function saveConfInfo(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/saveConfInfo.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}

// -根据主键返回表字段信息 单字符串参数id /system/showGraphical/getTableColumnsByKey.htm
export async function getTableColumnsByKey(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/getTableColumnsByKey.htm?id=${val}`, {
        ...newpostparams,
    });
}

// --保存配置明细（实体集合）/system/showGraphical/saveTableColumn.htm
export async function saveTableColumn(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/saveTableColumn.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}

// --获取基础信息参数为单字符串：primaryKey  /system/showGraphical/getBaseMsg.htm--返回值tablecode:列编码 tabletitle:列名称 querylist:查询条件信息
export async function getBaseMsg(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/getBaseMsg.htm?primaryKey=${val}`, {
        ...newpostparams,
    });
}
//--列表查询接口：参数为json字符串jsonStr同单表操作  /system/showGraphical/confList.htm
export async function confList(val) {
    let jmparme = encodeURIComponent(encodeURIComponent(val))
    return request(`${PROXY2}/${report}/system/showGraphical/confList.htm?jsonStr=${jmparme}`, {
        ...newpostparams,
    });
}
// --新增接口：参数为json类型字符串jsonStr  /system/showGraphical/add.htm
export async function filderadd(val) {
    let jmparme = encodeURIComponent(encodeURIComponent(val));
    return request(`${PROXY2}/${report}/system/showGraphical/add.htm?jsonStr=${jmparme}`, {
        ...newpostparams,
    });
}
// --修改接口：参数为json类型字符串jsonStr  /system/showGraphical/edit.htm
export async function filderedit(val) {
    let jmparme = encodeURIComponent(encodeURIComponent(val))
    return request(`${PROXY2}/${report}/system/showGraphical/edit.htm?jsonStr=${jmparme}`, {
        ...newpostparams,
    });
}

// --删除数据  参数为json类型字符串jsonStr（包含primaryKey和id） /system/showGraphical/del.htm
export async function filderdel(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/del.htm?jsonStr=${val}`, {
        ...newpostparams,
    });
}
// /system/showGraphical/testparam.htm
export async function testparam(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/testparam.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
// --保存数据接口，实体实体集合接收（之前测试的参数接收方式）/system/showGraphical/dragComponent.htm
export async function dragComponent(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/dragComponent.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
// --两个参数uniflag（唯一标识），dragType（这个传值为空就行，空字符串）/system/showGraphical/getDragComponent.htm
export async function getDragComponent(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/getDragComponent.htm?uniflag=${val.uniflag}&dragType=${val.dragType}`, {
        ...newpostparams,
    });
}
// /system/showGraphical/dragImageData.htm
export async function dragImageData(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/dragImageData.htm?uniflag=${val}`, {
        ...newpostparams,
    });
}
// --列表接口实体形式（目前只有一个参数keyWord）/system/showGraphical/dragComponentList.htm
export async function dragComponentList(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/dragComponentList.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
// --删除接口(参数：单参数形式接收，参数类型为数组，参数名称ids)/system/showGraphical/delDragComponent.htm
export async function delDragComponent(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/delDragComponent.htm?ids=${val}`, {
        ...newpostparams,
    });
}
// --按照模板添加参数为uniflag单字符串
export async function createbytemplate(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/createbytemplate.htm?uniflag=${val}`, {
        ...newpostparams,
    });
}
// 但组件新增单个组件新增(参数：实体) /system/showGraphical/dragComponentSingle.htm
export async function dragComponentSingle(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/dragComponentSingle.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
// 组件删除（参数：单字符串dragid）/system/showGraphical/delDragComponentSingle.htm
export async function delDragComponentSingle(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/delDragComponentSingle.htm?dragid=${val}`, {
        ...newpostparams,
    });
}
// 所有组件修改(参数：实体集合<与新增相同>)/system/showGraphical/editAllDragComponent.htm
export async function editAllDragComponent(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/editAllDragComponent.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
// 单个组件修改(参数：实体)/system/showGraphical/editDragComponent.htm
export async function editDragComponent(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/editDragComponent.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
// --获取列表数据接口同/system/showGraphical/acquireTableMsg.htm   /system/showGraphical/dragListData.htm
export async function dragListData(val) {
    return request(`${PROXY2}/${report}/system/showGraphical/dragListData.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    });
}
// 配置报表列表接口(参数：以实体形式接收、参数名称同数据库字段名称) /system/showGraphical/confmanagerList.htm
export async function confmanagerList(val) {
    return request(
        `${PROXY2}/${report}/system/showGraphical/confmanagerList.htm`, {
            ...newpostparams,
            body: JSON.stringify(val)
        }
    )
}

// 配置报表删除接口(参数：单参数形式接收，参数类型为数组，参数名称 ids )/system/showGraphical / delConfmanager.htm
export async function delConfmanager(val) {
    return request(
        `${PROXY2}/${report}/system/showGraphical/delConfmanager.htm?ids=${val}`, {
            ...newpostparams
        }
    )
}
// get到图形列表接口(参数：以实体形式接收、参数名称同数据库字段名称) /system/showGraphical/listimg.htm
export async function listimg(val) {
    return request(
        `${PROXY2}/${report}/system/showGraphical/listimg.htm`, {
            ...newpostparams,
            body: JSON.stringify(val)
        }
    )
}
// 图形新增接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical/addimg.htm
export async function addimg(val) {
    return request(
        `${PROXY2}/${report}/system/showGraphical/addimg.htm`, {
            ...newpostparams,
            body: JSON.stringify(val)
        }
    )
}
// 图形修改接口(参数：以实体形式接收、参数名称同数据库字段名称)/system/showGraphical/editimg.htm
export async function editimg(val) {
    return request(
        `${PROXY2}/${report}/system/showGraphical/editimg.htm`, {
            ...newpostparams,
            body: JSON.stringify(val)
        }
    )
}
// 图形删除接口(参数：单参数形式接收，参数类型为数组，参数名称ids)/system/showGraphical/delimg.htm
export async function delimg(val) {
    return request(
        `${PROXY2}/${report}/system/showGraphical/delimg.htm?ids=${val}`, {
            ...newpostparams
        }
    )
}
export async function initmenudata(val) {
    return request(
        `${PROXY2}/${report}/system/priv/queryAllMenu.htm?treetype=${val}`, {
            ...newpostparams
        }
    )
}
// 目录操作接口包括新增和修改
export async function addoreditmenu(val) {
    return request(`${PROXY2}/${report}/system/priv/addoreditmenu.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    })
}
export async function delmenus(val) {
    return request(
        `${PROXY2}/${report}/system/priv/delMenus.htm?menuIds=${val}`, {
            ...newpostparams
        }
    )
}
// 报表配置 /system/reportconfigure/listConf.htm
export async function listConf(val) {
    return request(`${PROXY2}/${report}/system/reportconfigure/listConf.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    })
}
// 报表预览 system/reportconfigure/viewlist.htm
export async function viewlist(val) {
    return request(`${PROXY2}/${report}/system/reportconfigure/view/${val}.htm`, {
        ...newpostparams
    })
}

// 删除报表： /system/report/delConf.htm
export async function delConf(val) {
    return request(
        `${PROXY2}/${report}/system/reportconfigure/delConf.htm?ids=${val}`, {
            ...newpostparams
        }
    )
}
// 预览表格 :system/reportconfigure/list
export async function tableList(val) {
    return request(`${PROXY2}/${report}/system/reportconfigure/list.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    })
}
// 修改 updateConf system/reportconfigure/updateConf.htm?
export async function updateConf(val) {
    return request(
        `${PROXY2}/${report}/system/reportconfigure/updateConf.htm?rptId=${val}`, {
            ...newpostparams
        }
    )
}

// 报表配置：system/reportconfigure/openConf.htm
export async function openConf() {
    return request(`${PROXY2}/${report}/system/reportconfigure/openConf.htm`, {
        ...newpostparams
    })
}

// 新增 addConf
export async function addConf(val) {
    return request(`${PROXY2}/${report}/system/reportconfigure/addConf.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    })
}
// /system/reportconfigure/saveReportConf
export async function saveReportConf(val) {
    return request(
        `${PROXY2}/${report}/system/reportconfigure/saveReportConf.htm`, {
            ...newpostparams,
            body: JSON.stringify(val)
        }
    )
}

// 查询列表:system/assembly/queryByAssembly
export async function queryByAssembly(val) {
    return request(`${PROXY2}/${report}/system/assembly/queryByAssembly.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    })
}
// 组件类别下拉  system/assembly/queryAssemblyModel 无参
export async function queryAssemblyModel() {
    return request(`${PROXY2}/${report}/system/assembly/queryAssemblyModel.htm`, {
        ...newpostparams
    })
}
// 添加条件组件:system/assembly/addAssembly
export async function addAssembly(val) {
    return request(`${PROXY2}/${report}/system/assembly/addAssembly.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    })
}

// 修改条件组件:system/assembly/editAssembly
export async function editAssembly(val) {
    return request(`${PROXY2}/${report}/system/assembly/editAssembly.htm`, {
        ...newpostparams,
        body: JSON.stringify(val)
    })
}

// 删除:system/assembly/delAssembly
export async function delAssembly(val) {
    return request(
        `${PROXY2}/${report}/system/assembly/delAssembly.htm?ids=${val}`, {
            ...newpostparams
        }
    )
}
//http://10.10.137.41/cgi-bin/llc_t1
// export async function testdy(val) {
//     return request(
//         `${PROXY}/cgi-bin/llc_t1?seq=${val}`
//     )
// }
// 初始化，根据map决定是否有kv表的值kv cgi getkvtable?map=${val.map}&bas=${val.bas}&pos=${val.pos}&rel=${val.rel}&run=${val.run} form表单格式
export async function getkvtable(val) {
    return request(
        `${PROXY}/cgi-bin/etl_web_refresh`, {
            ...newpostparamsajax,
            body: JSON.stringify(val)
        }
    )
}
// kv 测试接口  test_cgi
export async function getkvtable1(val) {
    return request(
        `${PROXY}/cgi-bin/test_cgi`, {
            ...newpostparamsajax,
            body: JSON.stringify(val)
        }
    )
}
// 得到uuidhttp://10.10.137.16/cgi-bin/getuuid
export async function getuuid() {
    return request(
        `${PROXY}/cgi-bin/getuuid`
    )
}
// 双击?type=${val.type}&uuid=${val.uuid}
export async function dbdata(val) {
    return request(
        `${PROXY}/cgi-bin/etl_web_obj`, {
            ...newpostparamsajax,
            body: JSON.stringify(val)
        }
    )
}
// 保存 form表单提交
export async function cgisave(val) {
    return request(
        `${PROXY}/cgi-bin/etl_web_update`, {
            ...newpostparams,
            body: JSON.stringify(val)
        }
    )
}
// 详情http://10.10.137.16/cgi-bin/etl_web_detail?type=1&uuid=42aa160e7d1811e9957a1866daec9974
export async function etldetail(val) {
    return request(
        `${PROXY}/cgi-bin/etl_web_detail`, {
            ...newpostparamsajax,
            body: JSON.stringify(val)
        }
    )
}
// 删除http://10.10.137.16/cgi-bin/etl_web_rm?type=1&uuid=42aa160e7d1811e9957a1866daec9975
export async function etlrm(val) {
    return request(
        `${PROXY}/cgi-bin/etl_web_rm`, {
            ...newpostparamsajax,
            body: JSON.stringify(val)
        }
    )
}
// 得到http://10.10.137.16/cgi-bin/etl_web_recu?type=1&uuid=fc25c09a97dc11e9a4921866daec9974
export async function recu(val) {
    return request(
        `${PROXY}/cgi-bin/etl_web_recu`, {
            ...newpostparamsajax,
            body: JSON.stringify(val)
        }
    )
}
// http://10.10.137.16/cgi-bin/etl_web_search?sstr=028
export async function etlsearch(val) {
    return request(
        `${PROXY}/cgi-bin/etl_web_search?sstr=${val}`, {
            ...newpostparamsajax,
            body: JSON.stringify({ sstr: val })
        }
    )
}