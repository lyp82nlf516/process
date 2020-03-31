<template>
    <div class="process" id="process" :class="`process-${dark}`" @click="clearcontext" @mousemove="bodymove($event)" @mouseup="bodyup($event)">
        <header>
            <div class="headerbg">
                <p class="bgleft"></p>
                <p class="bgcenterleft"></p>
                <p class="bgcenterright"></p>
                <p class="bgright"></p>
                <p class="center">流程图</p>
            </div>
            <div class="option" id="option">
                <div class="nodeoption">
                    <el-tooltip class="item" :effect="dark" content="c_etl_map" placement="top-start">
                        <span class="optionitem" data-test="process" @mousedown.stop="optiondown($event)">
                            <img src="../../assets/img/precess/icons/etl-01.png" alt="数据同步" srcset="" width="22" v-if="dark === 'light'" data-test="process">
                            <img src="../../assets/img/precess/icons2/etl-01.png" alt="数据同步" srcset="" width="22" v-if="dark === 'dark'" data-test="process">
                        </span>
                    </el-tooltip>
                    <el-tooltip class="item" :effect="dark" content="c_etl_proc" placement="top-start">
                        <span class="optionitem" data-test="base" @mousedown.stop="optiondown($event)">
                            <img src="../../assets/img/precess/icons/etl-02.png" alt="proc" srcset="" width="16" v-if="dark === 'light'" data-test="base">
                            <img src="../../assets/img/precess/icons2/etl-02.png" alt="proc" srcset="" width="16" v-if="dark === 'dark'" data-test="base">
                        </span>
                    </el-tooltip>
                    <el-tooltip class="item" :effect="dark" content="c_etl_sql" placement="top-start">
                        <span class="optionitem" data-test="rectbig" @mousedown.stop="optiondown($event)">
                            <img src="../../assets/img/precess/icons/etl-04.png" alt="开始" srcset="" width="18" v-if="dark === 'light'" data-test="rectbig">
                            <img src="../../assets/img/precess/icons2/etl-04.png" alt="开始" srcset="" width="18" v-if="dark === 'dark'" data-test="rectbig">
                        </span>
                    </el-tooltip>
                    <!-- <span class="optionitem" data-test="base">
                        <img src="../../assets/img/precess/ifnodelight.png" alt="数据处理" srcset="" width="18" v-if="dark === 'light'" data-test="base">
                        <img src="../../assets/img/precess/ifnodedark.png" alt="数据处理" srcset="" width="18" v-if="dark === 'dark'" data-test="base">
                    </span>
                    <span class="optionitem" data-test="deal">
                        <img src="../../assets/img/precess/deallight.png" alt="数据并行" srcset="" width="18" v-if="dark === 'light'" data-test="deal">
                        <img src="../../assets/img/precess/dealdark.png" alt="数据并行" srcset="" width="18" v-if="dark === 'dark'" data-test="deal">
                    </span> -->
                </div>
                <el-tooltip class="item" :effect="dark" content="连线" placement="top-start">
                    <span class="optionitem" @click="addline" :class="pagestates === 'createline' ? 'addline': ''">
                        <img src="../../assets/img/precess/icons/etl-06.png" alt="连线" srcset="" width="16" v-if="dark === 'light'">
                        <img src="../../assets/img/precess/icons2/etl-06.png" alt="连线" srcset="" width="16" v-if="dark === 'dark'">
                    </span>
                </el-tooltip>

                <div class="activeoption">
                    <!-- <div class="pagesmsg">
                        <span v-if="pagestates==='static'">无状态...</span>
                        <span v-if="pagestates==='edit'">编辑中...</span>
                        <span v-if="pagestates==='createnode'">创建节点中...</span>
                        <span v-if="pagestates==='createline'">连线中...</span>
                        <span v-if="pagestates==='dragnode'">移动节点...</span>
                        <span v-if="pagestates==='rightclick'">右键中...</span>
                        <span v-if="pagestates==='dbclick'">双击中...</span>
                        <span v-if="pagestates==='dragallnode'||pagestates==='dragall'||pagestates==='dragallwait'">批量中...</span>
                    </div> -->
                    <el-tooltip placement="top" :effect="dark">
                        <div slot="content">
                            <el-popover ref="popover4" placement="bottom" width="400" trigger="click">
                                <div :class="'zkf-popover-'+ dark">
                                    <p v-for="item in looksavehistorymsg" :key="item.key" :class="item.flag === 'success'? 'success': 'failure'">{{item.key}}更新日志: {{item.message}}</p>
                                </div>
                            </el-popover>
                            <!-- <span>日志 &ensp;</span>
                            <span class="optionitem" v-popover:popover4>
                                <img src="../../assets/img/precess/icons/lookmsg.png" alt="详情" srcset="" width="17" v-if="dark === 'light'">
                                <img src="../../assets/img/precess/icons2/lookmsg.png" alt="" srcset="" width="17" v-if="dark === 'dark'">
                            </span><br> -->
                            <span>主题&ensp; </span>
                            <el-switch v-model="dark" on-text="浅" off-text="深" on-value="light" off-value="dark" on-color="blue" off-color="#06a092" @change="changedark">
                            </el-switch><br>
                            <span>有效&ensp; </span>
                            <el-switch v-model="nodestate" @change="changeswitch" on-text="全部" off-text="有效" on-value="all" off-value="only" on-color="#06a092" off-color="#ccc">
                            </el-switch><br>
                            <span>移动&ensp; </span>
                            <el-switch v-model="posstate" on-text="移动" off-text="静止" on-color="#06a092" off-color="#ccc">
                            </el-switch>

                        </div>
                        <span class="optionitem">
                            <img src="../../assets/img/precess/icons/seting.png" alt="设置" srcset="" width="18" v-if="dark === 'light'">
                            <img src="../../assets/img/precess/icons2/seting.png" alt="" srcset="" width="18" v-if="dark === 'dark'">
                        </span>
                    </el-tooltip>
                    <span @click="save('static')" class="optionitem" :class="activeflag < havechange? 'havesave': 'nosave'">
                        <img src="../../assets/img/precess/icons/r01-save.png" alt="保存" srcset="" width="16" v-if="dark === 'light'">
                        <img src="../../assets/img/precess/icons2/r01-save.png" alt="" srcset="" width="16" v-if="dark === 'dark'">
                    </span>
                    <span class="optionitem" @click.stop="forward" :class="activeflag > 0? 'havesave': 'nosave'">
                        <img src="../../assets/img/precess/icons/r-03-next.png" alt="前进" srcset="" width="" v-if="dark === 'light'">
                        <img src="../../assets/img/precess/icons2/r-03-next.png" alt="" srcset="" width="" v-if="dark === 'dark'">
                    </span>
                    <span class="optionitem" @click.stop="back" :class="activeflag < havechange? 'havesave': 'nosave'">
                        <img src="../../assets/img/precess/icons/r-02-back.png" alt="后退" srcset="" width="" v-if="dark === 'light'">
                        <img src="../../assets/img/precess/icons2/r-02-back.png" alt="" srcset="" width="" v-if="dark === 'dark'">
                    </span>
                    <el-popover trigger="manual" placement="bottom" width="600" v-model="testtooltip">
                        <div :class="'zkf-popover-'+ dark">
                            <el-table :data="sourchdata.dat" style="width: 100%" height="360" :class="'zkf-table-'+ dark" :tooltip-effect="dark" @row-click="rowsourch" :row-class-name="rowname">
                                <el-table-column prop="" label="" width="50" align="center">
                                    <template scope="scope">
                                        <span>
                                            <img src="../../assets/img/precess/icons/etl-01.png" alt="数据同步" width="22" v-if="dark === 'light'&& scope.row.type_obj === '1'" data-test="process">
                                            <img src="../../assets/img/precess/icons2/etl-01.png" alt="数据同步" width="22" v-if="dark === 'dark'&& scope.row.type_obj === '1'" data-test="process">
                                            <img src="../../assets/img/precess/icons/etl-04.png" alt="开始" width="18" v-if="dark === 'light'&& scope.row.type_obj === '4'" data-test="rectbig">
                                            <img src="../../assets/img/precess/icons2/etl-04.png" alt="开始" width="18" v-if="dark === 'dark'&& scope.row.type_obj === '4'" data-test="rectbig">
                                            <img src="../../assets/img/precess/icons/etl-02.png" alt="proc" width="16" v-if="dark === 'light'&& scope.row.type_obj === '2'" data-test="base">
                                            <img src="../../assets/img/precess/icons2/etl-02.png" alt="proc" width="16" v-if="dark === 'dark'&& scope.row.type_obj === '2'" data-test="base">
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column v-for="(item, index) in sourchdata.bas" :key="index" v-if="item.flag!=='h'" :label="index" :prop="index" :show-overflow-tooltip="true">
                                </el-table-column>
                            </el-table>
                        </div>
                        <el-input v-if="dark === 'light'" slot="reference" icon="search" class="sourchnode" v-model="sourchmsg" :on-icon-click="sourchnode" @keyup.enter.native="sourchnode('enter')">
                        </el-input>
                        <el-input v-if="dark === 'dark'" slot="reference" icon="search" class="darksourchnode" v-model="sourchmsg" :on-icon-click="sourchnode" @keyup.enter.native="sourchnode('enter')">
                        </el-input>
                        <!-- <el-button slot="reference" @click="testtooltip = !testtooltip">手动激活</el-button> -->
                        <!-- <div class="searchbox" >
                            <el-input v-if="dark === 'light'" v-model="sourchmsg" @keyup.enter.native="sourchnode" class="sourchnode"></el-input>
                            <el-input v-if="dark === 'dark'" v-model="sourchmsg" @keyup.enter.native="sourchnode" class="darksourchnode"></el-input>
                            <i slot="reference" class="el-icon-search searchicon" :class="dark+'searchicon'" @click="sourchnode"></i>
                        </div> -->
                    </el-popover>
                </div>
            </div>
        </header>
        <div class="center" @click="clearcenter">
            <div class="centerbox" id="centerbox" @scroll="paperscroll($event)">
                <div class="papersvg" id="paper">
                    <svg id="test" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <marker id="arrow" markerUnits="strokeWidth" markerWidth="12" markerHeight="12" viewBox="0 0 12 12" refX="6" refY="6" orient="auto">
                                <path d="M2,2 L10,6 L2,10 L6,6 T2,2" style="fill: #ccc" />
                            </marker>
                            <marker id="arrowh" markerUnits="strokeWidth" markerWidth="12" markerHeight="12" viewBox="0 0 12 12" refX="6" refY="6" orient="auto">
                                <path d="M2,2 L10,6 L2,10 L6,6 T2,2" style="fill: #f7e549" />
                            </marker>
                        </defs>
                        <path v-if="drawline.show" :d="drawline.path" :style="drawline.style" :stroke="dark ==='light' ? '#666' : '#fff'" />
                        <path class="path" v-for="item in line" :id="item.id" :d="item.path" v-show="item.show" :stroke="item.rels === '0' ? '#e4cf1a' : '#ccc'" :marker-end="item.rels === '0'? 'url(#arrowh)':'url(#arrow)'" stroke-width="2" @dblclick="editline(item)" />
                        <text font-size="12" v-for="item in line" :id="item.id" v-show="item.rels!=='1'&&item.rels!=='0'" :stroke="dark ==='light' ? '#666' : '#fff'">
                            <textPath :xlink:href="'#' + item.id" startOffset="50%"> {{item.rels}}</textPath>
                        </text>
                    </svg>
                    <process-node v-for="(item, index) in node" :id="item.nodeparam.nodeId" :key="item.nodeparam.nodeId" @MousedownNode="mousedownnode($event, index, item)" @SelctedNode="SelctedNode($event, index, item)" @MouseupNode="mouseupnode($event, index, item)" @EditNode="editnode($event, index, item)" @ContextNode="contextnode($event, index, item)" :itemdata="item" :status="item.nodeparam.status" :title="item.nodeparam.nodeName==='None'? '': item.nodeparam.nodeName" :Dark="dark" :nodeType="item.nodeparam.nodeType" :nodeLeft="item.nodeparam.nodeLeft" :nodeTop="item.nodeparam.nodeTop" :high="item.nodeparam.show ? 'base':'high'" :pageflag="pagestates === 'dragall'||pagestates === 'dragallnode'||pagestates ==='dragallwait'?'all':'one'" :dragselect="item.nodeparam.drag" :ref="item.nodeparam.nodeId">
                    </process-node>
                    <div class="menu" v-show="menu.showmenu" :style="[ {'left': menu.left ? menu.left: ''},  {'top':  menu.top ?  menu.top: ''} ]">
                        <p @click="noderun('run')" :class="!(activeflag < havechange)? 'havesave': 'nosave'">
                            <i>►</i>
                            <span>单点重启</span>
                        </p>
                        <p @click="noderun('recursive')" :class="!(activeflag < havechange)? 'havesave': 'nosave'">
                            <i>►</i>
                            <span>递归重启</span>
                        </p>
                        <p @click="noderun('back')" :class="!(activeflag < havechange)? 'havesave': 'nosave'">
                            <i>►</i>
                            <span>回溯重启</span>
                        </p>
                        <p @click="noderun('stop')" :class="!(activeflag < havechange)? 'havesave': 'nosave'">
                            <i>►</i>
                            <span>停止</span>
                        </p>
                        <p @click="looknodemsg">
                            <i>►</i>
                            <span>查看详情</span>
                        </p>
                        <p @click.stop="startcascade">
                            <i>►</i>
                            <span>批量移动</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
        <!-- 通用版 -->
        <node-dialog :Dark="dark" title="修改数据" :dispdelect="true" :dispconfirm="true" :dispdcancel="true" :disedit="true" :Visible="dialogFormVisible" @click-delect="delectnode" @click-close="handleClose('dialogFormVisible')" @click-cancel="cancel('dialogFormVisible')" @click-ok="update" @click-changedit="changedit" :active="diaglogeditflag">
            <div slot="nodeform" class="formdiv nodeform">
                <el-form v-for="(item,index) in dbdata" :model="item.valdata" :rules="item.ruleForm" ref="refformnode" label-position="left" :key="index">
                    <el-form-item v-for="items in item.formdata" :key="items.name" :label="items.name+' :'" v-show="items.show" :prop="items.name">
                        <el-input v-if="items.type === 'input'" v-model="item.valdata[items.name]" :disabled="!(diaglogeditflag && items.edit)" @change="dbinputchange(index, items.name, 'node')"></el-input>
                        <el-select v-if="items.type === 'select'" v-model="item.valdata[items.name]" placeholder="请选择" :disabled="!(diaglogeditflag && items.edit)" @change="dbinputchange(index, items.name, 'node')">
                            <el-option v-for="i in items.option" :label="i.label" :value="i.value" :key="i.label">
                            </el-option>
                        </el-select>
                        <el-input v-if="items.type === 'textarea'" :rows="1" type="textarea" :autosize="{maxRows: 12}" wrap="wrap" v-model="item.valdata[items.name]" :disabled="!(diaglogeditflag && items.edit)" @change="dbinputchange(index, items.name, 'node')"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </node-dialog>
        <node-dialog :Dark="dark" title="修改关系数据" :dispdelect="true" :dispconfirm="true" :dispdcancel="true" :disedit="true" :disadd="true" :Visible="dialogFormVisibleline" @click-delect="delectline" @click-close="handleClose('dialogFormVisibleline')" @click-cancel="cancel('dialogFormVisibleline')" @click-ok="updateline" @click-changedit="changedit" :active="diaglogeditflag" @click-changeadd="changelineadd">
            <div slot="nodeform" class="formdiv">
                <div class="deftable">
                    <el-row class="tablehead" v-if="dbdata.length !==0 || adddbdata.length !==0">
                        <el-col :span="7" v-for="items in dbdata[0].formdata" :key="items.uuid" v-show="items.show && items.edit">
                            <span v-if="items.flag==='n'">
                                <i>✱</i>
                                <span>{{items.name}}</span>
                            </span>
                            <span v-else>{{items.name}}</span>
                        </el-col>
                        <el-col :span="3">
                            <span>操作</span>
                        </el-col>
                    </el-row>
                    <el-row v-for="(item,index) in dbdata" :key="index">
                        <el-form :model="item.valdata" :rules="item.ruleForm" ref="lineruleForm" label-position="left">
                            <el-col :span="7" v-for="items in item.formdata" :key="items.name" v-show="items.show && items.edit" class="defineth">
                                <el-form-item :prop="items.name">
                                    <el-input v-if="items.type === 'input'" v-model="item.valdata[items.name]" :disabled="!(diaglogeditflag && items.edit)" @change="dbinputchange(index, items.name, 'line')"></el-input>
                                    <el-select v-if="items.type === 'select'" v-model="item.valdata[items.name]" placeholder="请选择" :disabled="!(diaglogeditflag && items.edit)" @change="dbinputchange(index, items.name, 'line')">
                                        <el-option v-for="i in items.option" :label="i.label" :value="i.value" :key="i.label">
                                        </el-option>
                                    </el-select>
                                    <el-input v-if="items.type === 'textarea'" style="display: block;" :rows="1" type="textarea" v-model="item.valdata[items.name]" :disabled="!(diaglogeditflag && items.edit)" @change="dbinputchange(index, items.name, 'line')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <i class="el-icon-document documentbtn"></i>
                            </el-col>
                        </el-form>
                    </el-row>
                    <el-row v-for="(item,index) in adddbdata" :key="index">
                        <el-form :model="item.valdata" :rules="item.ruleForm" ref="lineruleForm" label-position="left">
                            <el-col :span="7" v-for="items in item.formdata" :key="items.name" v-show="items.show && items.edit" class="defineth">
                                <el-form-item :prop="items.name">
                                    <el-input v-if="items.type === 'input'" v-model="item.valdata[items.name]" :disabled="!(diaglogeditflag && items.edit)" @change="dbinputchange(index, items.name, 'line', 'add')"></el-input>
                                    <el-select v-if="items.type === 'select'" v-model="item.valdata[items.name]" placeholder="请选择" :disabled="!(diaglogeditflag && items.edit)" @change="dbinputchange(index, items.name, 'line', 'add')">
                                        <el-option v-for="i in items.option" :label="i.label" :value="i.value" :key="i.label">
                                        </el-option>
                                    </el-select>
                                    <el-input v-if="items.type === 'textarea'" style="display: block;" :rows="1" type="textarea" autosize v-model="item.valdata[items.name]" :disabled="!(diaglogeditflag && items.edit)" @change="dbinputchange(index, items.name, 'line', 'add')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <i class="el-icon-document documentbtn"></i>
                                <i class="el-icon-delete delectbtn" @click="delectnewlinerule(index, `${item.valdata.uuid}${item.valdata.uuid_id}`)"></i>
                            </el-col>
                        </el-form>
                    </el-row>
                </div>
            </div>
        </node-dialog>
        <!-- 查看详情 -->
        <node-dialog :Dark="dark" title="数据详情" :dispdelect="false" :dispconfirm="false" :dispdcancel="false" :disedit="false" :Visible="dialogFormVisiblelook" @click-close="handleClose('dialogFormVisiblelook')">
            <div slot="nodeform" class="nodeform">
                <el-table :data="lookmsg" style="width: 100%">
                    <el-table-column label="status_run" width="100">
                        <template scope="scope">
                            <span>
                                <i class="el-icon-warning warning" v-if="scope.row.status_run === '35'"></i>
                                <i class="el-icon-circle-check  success" v-if="scope.row.status_run === '31'"></i>
                                <i class="el-icon-circle-cross  fail" v-if="scope.row.status_run === '32'"></i>
                                <i class="el-icon-loading  doing" v-if="scope.row.status_run === '20'"></i>
                                <i class="el-icon-more wiat" v-if="scope.row.status_run === '10'"></i>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="secs" label="secs" width="70">
                    </el-table-column>
                    <el-table-column prop="rows" label="rows">
                    </el-table-column>
                    <el-table-column prop="cs" label="cs" width="50">
                    </el-table-column>
                    <el-table-column prop="ut" label="ut">
                    </el-table-column>
                </el-table>
            </div>
        </node-dialog>
    </div>
</template>
<style lang="scss">
.process {
  width: 100%;
  height: 100%;
  background-color: #fff !important;
  header {
    position: relative;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    .headerbg {
      width: 100%;
      height: 100%;
      .bgleft {
        width: calc(50% - 165px);
        height: 20px;
        float: left;
        border-bottom: 1px solid #ccc;
        margin-top: 2px;
        background-color: #fbfdff;
        margin-right: 6px;
      }
      .bgcenterleft {
        width: 300px;
        height: 26px;
        float: left;
        border-left: 1px solid #ccc;
        border-left: 1px solid #ccc;
        -webkit-transform: skew(30deg);
        -moz-transform: skew(30deg);
        transform: skew(30deg);
        margin-top: 24px;
        background-color: #fbfdff;
      }
      .bgcenterright {
        width: 300px;
        height: 26px;
        float: left;
        margin-top: 24px;
        margin-left: -285px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        -webkit-transform: skew(-30deg);
        -moz-transform: skew(-30deg);
        transform: skew(-30deg);
        background-color: #fbfdff;
      }
      .center {
        width: 330px;
        height: 23px;
        float: left;
        // border: 1px solid #cc;
        margin: 1px calc(-50% - 160px) 0 calc(-50% - 164px);
        background-color: #fbfdff;
        text-align: center;
        color: #888;
        line-height: 60px;
      }
      .bgright {
        width: calc(50% - 166px);
        height: 20px;
        float: left;
        margin-left: 7px;
        border-bottom: 1px solid #ccc;
        margin-top: 2px;
        background-color: #fbfdff;
      }
    }
    .el-icon-setting {
      color: blue;
    }
    .option {
      width: 100%;
      line-height: 40px;
      height: 40px;
      margin-top: -40px;
      float: left;
      .nodeoption {
        width: 90px;
        height: 100%;
        float: left;
        margin-left: 15px;
        span:hover {
          cursor: move;
        }
      }
      .optionitem {
        width: 24px;
        height: 24px;
        line-height: 30px;
        margin-top: 4px;
        color: #fff;
      }
      .activeoption {
        width: 350px;
        height: 100%;
        float: right;
        margin-right: 15px;
        .pagesmsg {
          float: left;
          color: #ccc;
          line-height: 36px;
          margin-right: 40px;
        }
        i {
          height: 20px;
          font-size: 15px;
          margin-top: 10px;
          overflow: hidden;
        }
        span {
          float: right;
        }
        .el-switch {
          float: left;
          margin-top: 8px;
          .el-switch__core {
            height: 18px;
          }
          .el-switch__label {
            height: 18px;
            width: 30px;
          }
          .el-switch__button {
            width: 12px;
            height: 12px;
          }
        }
        .nosave {
          opacity: 0.1;
          cursor: not-allowed;
        }
        .sourchnode {
          width: 170px;
          height: 24px;
          top: -3px;
          float: left;
          .el-input__inner {
            background-color: rgba(255, 255, 255, 0);
            border: 1px solid #c9c6c9;
            border-radius: 0px;
            height: 24px;
            line-height: 24px;
            color: #2b2a2b;
          }
        }
        .darksourchnode {
          width: 170px;
          height: 24px;
          top: -3px;
          float: left;
          .el-input__inner {
            background-color: rgba(255, 255, 255, 0);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 0px;
            height: 24px;
            line-height: 24px;
            color: #f3f2f3;
          }
        }
        .sourchnode:hover {
          .el-input__icon {
            color: #376fb6;
          }
          .el-input__inner {
            border: 1px solid #376fb6;
          }
        }
        .darksourchnode:hover {
          .el-input__icon {
            color: #f3f2f3;
          }
          .el-input__inner {
            border: 1px solid #f3f2f3;
          }
        }
      }
      span {
        float: left;
        margin-left: 5px;
      }
      .addline {
        border: 1px solid #1dbfbd;
      }
    }
    overflow: hidden;
  }
  .center {
    position: relative;
    width: 100%;
    height: calc(100% - 60px);
    .centerbox {
      height: 100%;
      width: 100%;
      overflow: auto;
      position: relative;
      .papersvg {
        width: 200000px;
        height: 200000px;
        // height: 100%;
        // width: 100%;
        padding: 10px;
        box-sizing: border-box;
      }
      .path:hover {
        cursor: pointer;
      }
      .menu {
        width: 100px;
        height: 200px;
        background-color: #fbfdff;
        position: absolute;
        left: 10px;
        top: 0px;
        z-index: 9;
        border: 1px solid #ccc;
        color: #888;
        .nosave {
          opacity: 0.1;
          cursor: not-allowed;
        }
      }
      .menu:hover {
        cursor: pointer;
      }
    }
  }
  .formdiv {
    height: 300px;
    overflow: auto;
    padding: 3px 10px;
  }
  .warning {
    color: #f96e09;
  }
  .success {
    color: #109609;
  }
  .fail {
    color: #ad1808;
  }
  .doing {
    color: #0a9e76;
  }
  .wiat {
  }
}

.process-dark {
  background-color: #050306 !important;
  header {
    border-bottom: 1px solid #20678c;
    .headerbg {
      .bgleft {
        border-bottom: 1px solid #20678c;
        background-color: #122638;
      }
      .bgcenterleft {
        border-left: 1px solid blue;
        border-left: 1px solid #20678c;
        background-color: #122638;
      }
      .bgcenterright {
        border-right: 1px solid #20678c;
        border-bottom: 1px solid #20678c;
        background-color: #122638;
      }
      .center {
        // border: 1px solid #152e3b;
        background-color: #122638;
        color: #fff;
      }
      .bgright {
        border-bottom: 1px solid #20678c;
        background-color: #122638;
      }
    }
    .el-icon-setting {
      color: #42f3f3;
    }
  }
  .center {
    .centerbox {
      .menu {
        background-color: rgba(18, 38, 56, 0.7);
        border: 1px solid #0a6b59;
        color: #20ceb7;
      }
    }
  }
}
.el-popover {
  padding: 0;
  border: 0px;
  div {
    width: 100%;
    p {
      height: 16px;
      line-height: 16px;
      margin: 2px;
      border: 0px;
    }
    .success {
      color: #ccc;
    }
    .failure {
      color: #de2d0f;
    }
  }
  .zkf-popover-dark {
    background-color: #122638;
    border: 1px solid #20678c;
    .popper__arrow::after {
      border-bottom-color: rgba(0, 0, 0, 0);
    }
  }
}
.el-message-box {
}
.dark-mssagebox {
  background-color: #5f6263f2;
  .el-message-box__content {
    color: #000;
  }
}
.zkf-table-dark {
  color: #20ceb7 !important;
  th {
    background-color: #0e0912;
    color: rgb(32, 207, 184);
  }
  .el-table__footer-wrapper thead div,
  .el-table__header-wrapper thead div {
    background-color: #0e0912;
    color: #20ceb7;
  }
  .el-table .cell,
  .el-table th > div {
    padding-left: 5px;
    padding-right: 5px;
  }
  tr {
    background-color: #122738;
  }
  .novalid {
    color: rgba(32, 207, 184, 0.5) !important;
  }
}
.el-table__body-wrapper {
  overflow-x: hidden;
  .novalid {
    color: rgba(31, 45, 61, 0.5);
  }
}
.el-table td,
.el-table th {
  height: 32px;
}
.el-switch {
  margin-bottom: 5px;
}
</style>
<script>
import processNode from '../common/nodeprocess/processnode.vue';
import nodeDialog from '../common/nodeprocess/nodedialog.vue';
import {
    getkvtable,
    getuuid,
    dbdata,
    cgisave,
    etldetail,
    etlrm,
    recu,
    etlsearch
} from '@/services/query';
export default {
    data () {
        return {
            offleft: 0,
            offtop: 0,
            topheight: 70, // 统一设置便宜量
            leftwidth: 5, // 统一设置便宜量
            scrollTop: 0,
            scrollLeft: 0,
            menu: {
                showmenu: false,
                left: '',
                top: '',
            },
            menudata: {
                event: null,
                index: null,
                item: { nodeparam: {} }
            },
            activedata: {
                node: [],
                line: {},
                waitdata: {},
            },
            waitdata: {
                c_etl_rel: {},
                c_etl_map: {},
                c_etl_pos: {},
                c_etl_proc: {},
                c_etl_para: {},
                c_etl_sql: {},
            },
            havechange: 0,
            activeflag: 0,
            dataflagi: -2,
            dialogFormVisible: false,
            dialogFormVisibleline: false,
            dialogFormVisiblelook: false,
            diaglogeditflag: false,
            buttontype: 0,
            // 设置一个全局变量，根据变量值来判断页面状态，而不是设置多个变量
            pagestates: 'static', // edit  createnode createline dragnode static  rightclick dbclick
            // 为每种状态设置一个变量存储过程值，之后销毁
            createnode: {
                dragobj: {},
            }, // 创建节点要用的临时变量
            directorynode: {},
            drawline: {
                path: 'M250,150 T350,350',
                style: {
                    strokewidth: '2',
                    'stroke-dasharray': '2'
                },
                show: false,
                startnodeid: '',
            }, // 连线要用的临时变量
            dragnode: {}, // 移动节点要用的临时变量
            dragallnode: [],
            pathi: 0,
            line: {},
            node: [],
            dark: 'light', // light dark
            nodestate: 'only', // 是否显示无效数据
            posstate: false, // 是否可以拖动位置
            templinedata: {
                event: null,
                index: null,
                item: null
            }, // 连线临时数据
            formdata: [],
            ruleForm: {},
            c_kv: {},
            lookmsg: [],
            seq: {
                bas: 0,
                pos: 0,
                rel: 0,
                run: 0
            },
            looksavehistorymsg: [],
            dbdata: [{
                formdata: [{
                    name: 'uuid',
                    type: 'input',
                    option: [],
                    val: '',
                    show: true,
                    edit: false
                }],
                ruleForm: {
                    uuid: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
                },
                valdata: {
                    uuid: '',
                },
            }],
            adddbdata: [],
            changedbdata: {},
            changedblinedata: {},
            timer: null,
            timerout: null,
            selectednode: [],
            dragpos: {},
            sourchmsg: '',
            testtooltip: false,
            sourchdata: { bas: {}, dat: [] },
            tempsourch: '',
        }
    },
    computed: {},
    created () { },
    mounted () {
        this.$emit('Changeheadshow', false);
        sessionStorage.setItem('newnodeline', JSON.stringify([]));
        this.Getkv({ map: 112358, bas: 0, pos: 0, rel: 0, run: 0 });
        let that = this;
        this.timer = setInterval(function () {
            if ((!(that.activeflag < that.havechange)) && that.dataflagi === -2) {
                that.Getkv({ bas: that.seq.bas, pos: that.seq.pos, rel: that.seq.rel, run: that.seq.run });
            } else {
                return false;
            }
        }, 15000);
    },
    destroyed () {
        clearInterval(this.timer);
    },
    components: {
        processNode,
        nodeDialog,
    },
    methods: {
        // 搜索
        sourchnode (type) {
            etlsearch(this.sourchmsg).then((res) => {
                console.log('res', res);
                if (type === 'enter') {
                    this.testtooltip = true;
                } else {
                    this.testtooltip = !this.testtooltip;
                }
                this.sourchdata = {
                    bas: res.data.bas.obj,
                    dat: res.data.dat.obj
                };
            })
        },
        // 定位函数
        rowsourch (row, e, col) {
            if (this.tempsourch !== '') {
                $(`#${this.tempsourch}`).removeClass(`zkf-status--${this.dark}--sourch`);
            }
            $(`#${row.uuid}`).addClass(`zkf-status--${this.dark}--sourch`);
            document.getElementById('centerbox').scrollTo(Math.max(0, row.x - 600), Math.max(0, row.y - 300));
            this.tempsourch = row.uuid;
        },
        changedark () {
            console.log('classname');
            let that = this;
            this.$nextTick(() => {
                if (that.tempsourch !== '') {
                    $(`#${that.tempsourch}`).addClass(`zkf-status--${this.dark}--sourch`);
                }
            })
        },
        rowname (row, index) {
            if (row.valid === '0') {
                return 'novalid'
            }
        },
        // 初始化数据
        dealupdatedata (res) {
            let allnode = JSON.parse(JSON.stringify(this.directorynode));
            let alline = JSON.parse(JSON.stringify(this.line));
            let nodeinit = {
                nodeparam: {
                    'uuid': '', // 默认传给你‘’
                    'nodeId': '',
                    'nodeName': '',
                    'nodeLeft': `10px`,
                    'nodeTop': `30px`,
                    'nodeWidth': 100,
                    'nodeHeight': 36,
                    'nodeType': 'base',
                    'status': 'gray',
                    'show': true,
                    'exist': '',
                    'in': [],
                    'out': [],
                    'line': [],
                    'drag': 'one',
                    'children': {},
                },
                data: {
                    s_etl_web_bas: {}, // 节点页面属性(缓存)
                    s_etl_web_run: {}, // 执行状态、日志信息等简单汇总（缓存）
                    s_etl_web_pos: {}, // 节点位置（缓存）
                },
            };
            res.s_etl_web_pos.forEach((item, i) => {
                if (parseInt(item.seq) > this.seq.pos) {
                    this.seq.pos = parseInt(item.seq);
                }
                if (!allnode.hasOwnProperty(item.uuid)) {
                    allnode[item.uuid] = JSON.parse(JSON.stringify(nodeinit));
                    allnode[item.uuid].nodeparam.uuid = item.uuid;
                    allnode[item.uuid].nodeparam.nodeId = item.uuid;
                }
                allnode[item.uuid].nodeparam.nodeLeft = `${parseInt(item.x)}px`;
                allnode[item.uuid].nodeparam.nodeTop = `${parseInt(item.y)}px`;
                allnode[item.uuid].nodeparam.nodeWidth = 100;
                allnode[item.uuid].nodeparam.nodeHeight = 36;
                Object.assign(allnode[item.uuid].data.s_etl_web_pos, item);
            });
            res.s_etl_web_run.forEach((item, i) => {
                if (parseInt(item.seq) > this.seq.run) {
                    this.seq.run = parseInt(item.seq);
                }
                let status = 'gray';
                // 之后要改成根据kv表动态生成的
                switch (item.status_run) {
                    case '10':
                        status = 'base'
                        break;
                    case '20':
                        status = 'primary'
                        break;
                    case '31':
                        status = 'success'
                        break;
                    case '32':
                        status = 'danger'
                        break;
                    case '35':
                        status = 'warning'
                        break;
                    default:
                        status = 'gray'
                };
                if (!allnode.hasOwnProperty(item.uuid)) {
                    allnode[item.uuid] = JSON.parse(JSON.stringify(nodeinit));
                    allnode[item.uuid].nodeparam.uuid = item.uuid;
                    allnode[item.uuid].nodeparam.nodeId = item.uuid;
                }
                allnode[item.uuid].nodeparam.status = status;
                Object.assign(allnode[item.uuid].data.s_etl_web_run, item);
            });
            res.s_etl_web_bas.forEach((item, i) => {
                if (parseInt(item.seq) > this.seq.bas) {
                    this.seq.bas = parseInt(item.seq);
                };
                let nodeType = 'base';
                nodeType = this.switchtype(item.type_obj, 'nts');
                if (!allnode.hasOwnProperty(item.uuid)) {
                    // 如果没有改节点
                    allnode[item.uuid] = JSON.parse(JSON.stringify(nodeinit));
                    allnode[item.uuid].nodeparam.uuid = item.uuid;
                    allnode[item.uuid].nodeparam.nodeId = item.uuid;
                    allnode[item.uuid].nodeparam.nodeName = item.etl_name;
                    allnode[item.uuid].nodeparam.etl_id = item.etl_id;
                    allnode[item.uuid].nodeparam.nodeType = nodeType;
                    allnode[item.uuid].nodeparam.show = item.valid !== '0';
                    Object.assign(allnode[item.uuid].data.s_etl_web_bas, item);
                } else {
                    // 如果有改节点
                    if (item.valid === '2') {
                        // 如果操作时删除
                        delete allnode[item.uuid];
                    } else {
                        allnode[item.uuid].nodeparam.nodeName = item.etl_name;
                        allnode[item.uuid].nodeparam.etl_id = item.etl_id;
                        allnode[item.uuid].nodeparam.nodeType = nodeType;
                        allnode[item.uuid].nodeparam.show = item.valid !== '0';
                        Object.assign(allnode[item.uuid].data.s_etl_web_bas, item);
                    }
                }
            });
            // 遍历线
            res.s_etl_web_rel.forEach((item, i) => {
                if (parseInt(item.seq) > this.seq.rel) {
                    this.seq.rel = parseInt(item.seq);
                }
                if (!alline.hasOwnProperty(item.uuid)) {
                    if (item.rels !== '99') {
                        let line = {
                            ...item,
                            id: item.uuid,
                            startnode: item.uuid_s,
                            endnode: item.uuid_t,
                            show: (item.rels !== '0' || this.nodestate === 'all'), // 有效无效
                            path: ''
                        };
                        alline[item.uuid] = line;
                    }
                } else {
                    if (item.rels === '99') {
                        // 节点的输入输出进项改变
                        // 先判断节点是否存在，然后删除属性
                        if (allnode.hasOwnProperty(item.uuid_s)) {
                            console.log('allnode[item.uuid_s]', allnode[item.uuid_s]);
                            let m = allnode[item.uuid_s].nodeparam.out.indexOf(item.uuid);
                            let n = allnode[item.uuid_s].nodeparam.line.indexOf(item.uuid);
                            if (m > -1) {
                                allnode[item.uuid_s].nodeparam.out.splice(m, 1);
                            }
                            if (n > -1) {
                                allnode[item.uuid_s].nodeparam.line.splice(n, 1)
                            }
                        }
                        if (allnode.hasOwnProperty(item.uuid_t)) {
                            console.log('allnode[item.uuid_t]', allnode[item.uuid_t]);
                            let m = allnode[item.uuid_t].nodeparam.in.indexOf(item.uuid);
                            let n = allnode[item.uuid_t].nodeparam.line.indexOf(item.uuid);
                            if (m > -1) {
                                allnode[item.uuid_t].nodeparam.in.splice(m, 1);
                            }
                            if (n > -1) {
                                allnode[item.uuid_t].nodeparam.line.splice(n, 1)
                            }
                        }
                        delete alline[item.uuid];
                        console.log('删除', alline[item.uuid]);
                    } else {
                        Object.assign(alline[item.uuid], item, {
                            // show: item.valid !== '0',
                            show: (item.rels !== '0' || this.nodestate === 'all'),
                        });
                    }
                }
                // bug难复现，靠经验修的bug，不过觉得应该没问题，嘻嘻嘻，自己真聪明，聪明的芳芳啊
                if (alline.hasOwnProperty(item.uuid)) {
                    if (allnode.hasOwnProperty(item.uuid_s)) {
                        if (allnode[item.uuid_s].nodeparam.out.indexOf(item.uuid) > -1) { } else {
                            allnode[item.uuid_s].nodeparam.out.push(item.uuid);
                        }
                        if (allnode[item.uuid_s].nodeparam.line.indexOf(item.uuid) > -1) { } else {
                            allnode[item.uuid_s].nodeparam.line.push(item.uuid);
                        }
                    }
                    if (allnode.hasOwnProperty(item.uuid_t)) {
                        if (allnode[item.uuid_t].nodeparam.in.indexOf(item.uuid) > -1) { } else {
                            allnode[item.uuid_t].nodeparam.in.push(item.uuid);
                        }
                        if (allnode[item.uuid_t].nodeparam.line.indexOf(item.uuid) > -1) { } else {
                            allnode[item.uuid_t].nodeparam.line.push(item.uuid);
                        }
                    }
                }
            });
            for (let j in allnode) {
                if (allnode[j].nodeparam.nodeType === 'rectbig' || allnode[j].nodeparam.nodeType === 'circle') {
                    if (allnode[j].nodeparam.in.length > 0 && allnode[j].nodeparam.out.length > 0) {
                        // 都存在
                        allnode[j].nodeparam.nodeType = 'circle';
                        allnode[j].nodeparam.nodeWidth = 50;
                        allnode[j].nodeparam.nodeHeight = 50;
                    } else {
                        allnode[j].nodeparam.nodeType = 'rectbig';
                        allnode[j].nodeparam.nodeWidth = 100;
                        allnode[j].nodeparam.nodeHeight = 36;
                    }
                }
            }
            for (let item in alline) {
                // 遍历设置path，因为节点位置的变化会影响到path
                let startparam = {
                    width: parseInt(allnode[alline[item].uuid_s].nodeparam.nodeWidth),
                    height: parseInt(allnode[alline[item].uuid_s].nodeparam.nodeHeight),
                    left: parseInt(allnode[alline[item].uuid_s].nodeparam.nodeLeft),
                    top: parseInt(allnode[alline[item].uuid_s].nodeparam.nodeTop),
                }
                let endparam = {
                    width: parseInt(allnode[alline[item].uuid_t].nodeparam.nodeWidth),
                    height: parseInt(allnode[alline[item].uuid_t].nodeparam.nodeHeight),
                    left: parseInt(allnode[alline[item].uuid_t].nodeparam.nodeLeft),
                    top: parseInt(allnode[alline[item].uuid_t].nodeparam.nodeTop),
                }
                let lineposition = this.count(startparam, endparam);
                alline[item].path = `M${lineposition.startX},${lineposition.startY} T${lineposition.endX},${lineposition.endY}`;
            }
            this.directorynode = allnode;
            this.node = this.getnodelist();
            // 绘线数据
            this.line = alline;
            this.setinitsession();
        },
        // 处理双击数据
        dealdbdata (res, kv, type) {
            let formdata = [];
            for (let item of res) {
                let formdataitem = {
                    formdata: [],
                    ruleForm: {},
                    valdata: {}
                };
                for (let i in item) {
                    let onehead = {
                        name: i,
                        type: 'input',
                        value: item[i] === 'None' ? '' : item[i],
                        length: parseInt(kv[i].size),
                        option: [],
                        show: true,
                        edit: true,
                        id: item.uuid_id ? `${item.uuid}${item.uuid_id}` : item.uuid,
                        flag: kv[i].flag
                    };
                    if (kv[i].size !== '0') {
                        formdataitem.ruleForm[i] = [{ min: 0, max: onehead.length, message: `长度超出${onehead.length}个字符`, trigger: 'blur' }]
                    } else {
                        formdataitem.ruleForm[i] = [];
                    }
                    formdataitem.valdata[i] = onehead.value;
                    switch (kv[i].flag) {
                        case 'r':
                            onehead.show = true;
                            onehead.edit = false;
                            break;
                        case 'n':
                            onehead.show = true;
                            onehead.edit = true;
                            formdataitem.ruleForm[i].push({ required: true, message: '请补全信息', trigger: 'blur' });
                            break;
                        case 'w':
                            onehead.show = true;
                            onehead.edit = true;
                            break;
                        case 'h':
                            onehead.show = false;
                            onehead.edit = false;
                            break;
                        default:
                            onehead.show = true;
                            onehead.edit = true;
                    };
                    if (this.c_kv.map.hasOwnProperty(i)) {
                        onehead.type = 'select';
                        onehead.option = [];
                        for (let m in this.c_kv.map[i]) {
                            onehead.option.push({
                                value: m,
                                label: this.c_kv.map[i][m]
                            })
                        }
                    } else {
                        if (onehead.length > 64 || kv[i].size === '0') {
                            onehead.type = 'textarea';
                        }
                    }
                    formdataitem.formdata.push(onehead);
                }
                formdata.push(formdataitem);
                console.log('formdata', formdata);
            }
            this.dbdata = formdata;
            console.log('this.dbdata ', this.dbdata);
        },
        // 得到node
        getnodelist () {
            let nodelist = [];
            for (let item in this.directorynode) {
                if (this.nodestate === 'all') {
                    nodelist.push(JSON.parse(JSON.stringify(this.directorynode[item])));
                } else if (this.nodestate === 'only') {
                    if (this.directorynode[item].nodeparam.show) {
                        nodelist.push(JSON.parse(JSON.stringify(this.directorynode[item])));
                    }
                }
            }
            return nodelist;
        },
        // 改变连线的显示和隐藏
        changeliestate () {
            let alllinelist = JSON.parse(JSON.stringify(this.line));
            for (let i in alllinelist) {
                if (this.nodestate === 'all') {
                    alllinelist[i].show = true;
                } else {
                    if (alllinelist[i].rels !== '0') {
                        alllinelist[i].show = true;
                    } else {
                        alllinelist[i].show = false;
                    }
                }
            }
            return alllinelist;
        },
        // bodymove
        bodymove (e) {
            if (this.buttontype === 0) {
                if (this.pagestates === 'createnode') {
                    $(this.createnode.dragobj).css({
                        'top': `${e.pageY + 2}px`,
                        'left': `${e.pageX + 2}px`,
                    });
                } else if (this.pagestates === 'createline') {
                    this.drawline.path = `${this.drawline.path.split('T')[0]} T${e.pageX + this.scrollLeft - 5},${e.pageY + this.scrollTop - 70}`;
                } else if (this.pagestates === 'dragnode') {
                    this.directorynode[this.dragnode.dragnodeid].nodeparam.nodeLeft = `${e.pageX + this.scrollLeft - this.offleft}px`;
                    this.directorynode[this.dragnode.dragnodeid].nodeparam.nodeTop = `${e.pageY + this.scrollTop - this.topheight - this.offtop + 10}px`;
                    this.node = this.getnodelist();
                    this.changenodeline(this.dragnode.dragnodeid, 'line');
                } else if (this.pagestates === 'dragallnode') {
                    let moveflag = true;
                    let gapleft = parseInt(e.pageX + this.scrollLeft - this.offleft) - parseInt(this.dragallnode[this.dragallnode.dragnodeid].startx);
                    let gaptop = parseInt(e.pageY + this.scrollTop - this.topheight - this.offtop + 10) - parseInt(this.dragallnode[this.dragallnode.dragnodeid].starty);

                    if ((e.pageX + this.scrollLeft - this.offleft) < 0) {
                        moveflag = false;
                    }
                    if ((e.pageY + this.scrollTop - this.topheight - this.offtop + 10) < 0) {
                        moveflag = false;
                    }
                    if ((parseInt(this.dragpos.minx) + parseInt(gapleft)) < 0) {
                        moveflag = false;
                    }
                    if ((parseInt(this.dragpos.miny) + parseInt(gaptop)) < 0) {
                        moveflag = false;
                    }
                    if (moveflag) {
                        this.directorynode[this.dragallnode.dragnodeid].nodeparam.nodeLeft = `${e.pageX + this.scrollLeft - this.offleft}px`;
                        this.directorynode[this.dragallnode.dragnodeid].nodeparam.nodeTop = `${e.pageY + this.scrollTop - this.topheight - this.offtop + 10}px`;
                        let cleft = parseInt(this.directorynode[this.dragallnode.dragnodeid].nodeparam.nodeLeft) - parseInt(this.dragallnode[this.dragallnode.dragnodeid].startx);
                        let ctop = parseInt(this.directorynode[this.dragallnode.dragnodeid].nodeparam.nodeTop) - parseInt(this.dragallnode[this.dragallnode.dragnodeid].starty);
                        for (let i of this.selectednode) {
                            if (i !== this.dragallnode.dragnodeid) {
                                this.directorynode[i].nodeparam.nodeLeft = `${parseInt(parseInt(this.dragallnode[i].startx) + parseInt(cleft))}px`;
                                this.directorynode[i].nodeparam.nodeTop = `${parseInt(parseInt(this.dragallnode[i].starty) + parseInt(ctop))}px`;
                            }
                        }
                        this.node = this.getnodelist();
                        for (let i of this.selectednode) {
                            this.changenodeline(i, 'line');
                        }
                    } else {
                        console.log('达到边界值');
                        console.log('gapleft', gapleft);
                        console.log('gaptop', gaptop);
                        console.log('dragpos', this.dragpos);
                    }
                }
            }
        },
        bodyup (e) {
            if (this.buttontype === 0) {
                if (this.pagestates === 'createnode') {
                    // 不执行鼠标抬起事件导致重影，为什么会不执行鼠标抬起事件呢
                    $(this.createnode.dragobj).remove();
                    // 调接口得到uuid
                    getuuid().then((res) => {
                        if (res.code === 0) {
                            let newnode = {
                                nodeparam: {
                                    'uuid': res.data,
                                    'nodeId': res.data,
                                    'nodeName': '',
                                    'nodeLeft': `${e.pageX + this.scrollLeft}px`,
                                    'nodeTop': `${40 + e.pageY + this.scrollTop - this.topheight}px`,
                                    'nodeWidth': 100,
                                    'nodeHeight': 36,
                                    'nodeType': this.createnode.dragobj[0].dataset.test,
                                    'status': 'gray',
                                    'show': true,
                                    'exist': '',
                                    'in': [],
                                    'out': [],
                                    'line': [],
                                    'drag': 'one',
                                    'children': {},
                                },
                                data: {
                                    s_etl_web_bas: {}, // 节点页面属性(缓存)
                                    s_etl_web_run: {}, // 执行状态、日志信息等简单汇总（缓存）
                                    s_etl_web_pos: {},
                                }
                            }
                            this.directorynode[newnode.nodeparam.nodeId] = newnode;
                            this.node = this.getnodelist();
                            // 销毁临时变量
                            this.pagestates = 'edit';
                            // 存储变化
                            this.waitdata.c_etl_pos[newnode.nodeparam.nodeId] = {
                                key: newnode.nodeparam.nodeId,
                                size: '0',
                                x: `${parseInt(newnode.nodeparam.nodeLeft)}px`,
                                y: `${parseInt(newnode.nodeparam.nodeTop)}px`,
                            };
                            // 存储变化
                            this.waitdata[this.switchtype(this.createnode.dragobj[0].dataset.test, 'stt')][newnode.nodeparam.nodeId] = {
                                key: newnode.nodeparam.nodeId,
                                valid: '1'
                            };
                            this.havechange++;
                            //  this.setsessionstoragenode();
                            let sessparam = {
                                type: 'newnode',
                                node: { uuid: newnode.nodeparam.nodeId, nodeType: this.switchtype(this.createnode.dragobj[0].dataset.test, 'stt') }
                            }
                            let newparam = {
                                type: 'newnode',
                                node: JSON.parse(JSON.stringify(newnode))
                            }
                            this.savesession(sessparam, newparam);
                        }
                    })
                } else if (this.pagestates === 'createline') {
                    this.drawline.show = false;
                    this.drawline.path = 'M0,0 T0,0';
                } else if (this.pagestates === 'dragnode') {
                    if (Math.abs(e.pageX - this.dragnode.startx) > 1 || Math.abs(e.pageY - this.dragnode.starty) > 1) {
                        // 存储变化
                        console.log('this.dragnode', this.dragnode);
                        let sessparam = {
                            type: 'dragnode',
                            node: {
                                uuid: this.dragnode.dragnodeid,
                                x: parseInt(this.dragnode.nodeLeft),
                                y: parseInt(this.dragnode.nodeTop),
                                msg: ''
                            }
                        }
                        let newparam = {
                            type: 'dragnode',
                            node: {
                                uuid: this.dragnode.dragnodeid,
                                x: parseInt(this.directorynode[this.dragnode.dragnodeid].nodeparam.nodeLeft),
                                y: parseInt(this.directorynode[this.dragnode.dragnodeid].nodeparam.nodeTop),
                                msg: ''
                            }
                        };
                        if (this.waitdata.c_etl_pos.hasOwnProperty(this.dragnode.dragnodeid)) {
                            Object.assign(this.waitdata.c_etl_pos[this.dragnode.dragnodeid], {
                                x: `${parseInt(this.directorynode[this.dragnode.dragnodeid].nodeparam.nodeLeft)}px`,
                                y: `${parseInt(this.directorynode[this.dragnode.dragnodeid].nodeparam.nodeTop)}px`
                            })
                            sessparam.node.msg = 'up';
                            newparam.node.msg = 'up'
                        } else {
                            this.waitdata.c_etl_pos[this.dragnode.dragnodeid] = {
                                key: this.dragnode.dragnodeid,
                                x: `${parseInt(this.directorynode[this.dragnode.dragnodeid].nodeparam.nodeLeft)}px`,
                                y: `${parseInt(this.directorynode[this.dragnode.dragnodeid].nodeparam.nodeTop)}px`
                            }
                            sessparam.node.msg = 'de';
                            newparam.node.msg = 'de'
                        }
                        this.havechange++;
                        //  this.setsessionstoragenode();
                        this.savesession(sessparam, newparam);
                    }
                    this.pagestates = 'edit';
                } else if (this.pagestates === 'dragallnode') {
                    // 存储变化
                    let sessparam = {
                        type: 'dragallnode',
                        node: []
                    };
                    let newparam = {
                        type: 'dragallnode',
                        node: []
                    };
                    let paranone = {};
                    let newparamone = {};
                    for (let i of this.selectednode) {
                        paranone = {
                            uuid: i,
                            x: this.dragallnode[i].startx,
                            y: this.dragallnode[i].starty,
                            msg: ''
                        };
                        newparamone = {
                            uuid: i,
                            x: `${parseInt(this.directorynode[i].nodeparam.nodeLeft)}px`,
                            y: `${parseInt(this.directorynode[i].nodeparam.nodeTop)}px`,
                            msg: ''
                        }
                        if (this.waitdata.c_etl_pos.hasOwnProperty(i)) {
                            Object.assign(this.waitdata.c_etl_pos[i], {
                                x: `${parseInt(this.directorynode[i].nodeparam.nodeLeft)}px`,
                                y: `${parseInt(this.directorynode[i].nodeparam.nodeTop)}px`
                            })
                            paranone.msg = 'up';
                            newparamone.msg = 'up';
                        } else {
                            this.waitdata.c_etl_pos[i] = {
                                key: i,
                                x: `${parseInt(this.directorynode[i].nodeparam.nodeLeft)}px`,
                                y: `${parseInt(this.directorynode[i].nodeparam.nodeTop)}px`
                            }
                            paranone.msg = 'de';
                            newparamone.msg = 'de';
                        }
                        sessparam.node.push(paranone);
                        newparam.node.push(newparamone);
                    }
                    this.pagestates = 'dragallwait';
                    let that = this;
                    this.timerout = setTimeout(function () {
                        if (that.pagestates !== 'dragallnode' && that.pagestates !== 'dragallwait') {
                            clearTimeout(that.timerout);
                            that.timerout = null;
                        }
                    }, 10000);
                    this.havechange++;
                    //  this.setsessionstoragenode();
                    this.savesession(sessparam, newparam);
                }
            }
        },
        paperscroll (e) {
            this.scrollTop = e.target.scrollTop;
            this.scrollLeft = e.target.scrollLeft;
        },
        // 拖拽产生节点
        optiondown (e) {
            e.preventDefault();
            this.pagestates = 'createnode';
            this.createnode.dragobj = $(e.target).clone();
            // this.create.nodeType = e.target.dataset.test;
            $(this.createnode.dragobj).css({
                'position': 'absolute',
                'top': `${e.pageY + 2}px`,
                'left': `${e.pageX + 2}px`,
                'z-index': '3'
            })
            $(this.createnode.dragobj).appendTo('#process');
        },
        addline () {
            if (this.pagestates === 'createline') {
                this.pagestates = 'edit';
            } else {
                this.pagestates = 'createline';
            }
        },
        // 组件属性区
        mousedownnode (e, index, item) {
            this.buttontype = e.button;
            if (this.buttontype === 0) {
                if (this.pagestates === 'createline') {
                    // 处于连线状态开始连线
                    this.drawline.show = true;
                    this.drawline.path = `M${e.pageX + this.scrollLeft - 5},${e.pageY + this.scrollTop - 70} T${e.pageX + this.scrollLeft - 5},${e.pageY + this.scrollTop - 70}`;
                    this.drawline.startnodeid = item.nodeparam.nodeId;
                } else if ((this.pagestates === 'dragall' || this.pagestates === 'dragallwait') && (this.selectednode.indexOf(item.nodeparam.nodeId) > -1)) {
                    this.pagestates = 'dragallnode';
                    for (let i of this.selectednode) {
                        this.dragallnode.dragnodeid = item.nodeparam.nodeId;
                        this.dragallnode[i] = {
                            dragnodeid: this.directorynode[i].nodeparam.nodeId,
                            startx: this.directorynode[i].nodeparam.nodeLeft,
                            starty: this.directorynode[i].nodeparam.nodeTop,
                        }
                    };
                    this.offleft = e.offsetX;
                    this.offtop = e.offsetY;
                } else {
                    if (this.posstate) {
                        this.pagestates = 'dragnode';
                        this.dragnode = {
                            dragnodeid: item.nodeparam.nodeId,
                            startx: e.pageX + this.scrollLeft,
                            starty: e.pageY + this.scrollTop,
                            nodeLeft: item.nodeparam.nodeLeft,
                            nodeTop: item.nodeparam.nodeTop
                        };
                        this.offleft = e.offsetX;
                        this.offtop = e.offsetY;
                    } else {
                        if (this.pagestates === 'dragnode') {
                            this.pagestates === 'edit';
                        }
                    }
                }
            }
        },
        mouseupnode (e, index, item) {
            this.buttontype = e.button;
            if (this.buttontype === 0) {
                if (this.pagestates === 'createline' && this.drawline.show) {
                    if (this.drawline.startnodeid !== item.nodeparam.nodeId) {
                        let startparam = {
                            width: parseInt(this.directorynode[this.drawline.startnodeid].nodeparam.nodeWidth),
                            height: parseInt(this.directorynode[this.drawline.startnodeid].nodeparam.nodeHeight),
                            left: parseInt(this.directorynode[this.drawline.startnodeid].nodeparam.nodeLeft),
                            top: parseInt(this.directorynode[this.drawline.startnodeid].nodeparam.nodeTop),
                        }
                        let endparam = {
                            width: parseInt(item.nodeparam.nodeWidth),
                            height: parseInt(item.nodeparam.nodeHeight),
                            left: parseInt(item.nodeparam.nodeLeft),
                            top: parseInt(item.nodeparam.nodeTop),
                        }
                        let lineposition = this.count(startparam, endparam);
                        // 判断之前是否有线，处于隐藏状态则改变连线规则
                        // 避免重复连线
                        let flag = true;
                        let lineuui = '';
                        if (item.nodeparam.in.length > 0) {
                            for (let m in item.nodeparam.in) {
                                if (this.line[item.nodeparam.in[m]].startnode === this.drawline.startnodeid) {
                                    flag = false;
                                    lineuui = item.nodeparam.in[m];
                                }
                            };
                        };
                        if (flag) {
                            // 可以新建，无已存在关系
                            // 调接口得到uuid
                            // 加一个默认存在的关系（保存的时候遍历线，如果有关系规则为空，就加上这一条）
                            getuuid().then((res) => {
                                if (res.code === 0) {
                                    this.line[res.data] = {
                                        id: res.data,
                                        startnode: this.drawline.startnodeid,
                                        endnode: item.nodeparam.nodeId,
                                        show: true,
                                        path: `M${lineposition.startX},${lineposition.startY} T${lineposition.endX},${lineposition.endY}`
                                    };
                                    this.directorynode[this.drawline.startnodeid].nodeparam.out.push(res.data);
                                    this.directorynode[this.drawline.startnodeid].nodeparam.line.push(res.data);
                                    this.directorynode[item.nodeparam.nodeId].nodeparam.in.push(res.data);
                                    this.directorynode[item.nodeparam.nodeId].nodeparam.line.push(res.data);
                                    // 存储变化
                                    this.waitdata.c_etl_rel[res.data] = {
                                        key: res.data,
                                        uuid_s: this.drawline.startnodeid,
                                        uuid_t: item.nodeparam.nodeId,
                                        relation: '%status_run% = 31',
                                        valid: '1',
                                        uuid_id: '1',
                                    };

                                    if (this.directorynode[this.drawline.startnodeid].nodeparam.nodeType === 'rectbig') {
                                        if (this.directorynode[this.drawline.startnodeid].nodeparam.in.length > 0 && this.directorynode[this.drawline.startnodeid].nodeparam.out.length > 0) {
                                            this.directorynode[this.drawline.startnodeid].nodeparam.nodeType = 'circle';
                                            this.directorynode[this.drawline.startnodeid].nodeparam.nodeWidth = 50;
                                            this.directorynode[this.drawline.startnodeid].nodeparam.nodeHeight = 50;
                                        }
                                        this.changenodeline(this.drawline.startnodeid, 'line');
                                    };
                                    if (this.directorynode[item.nodeparam.nodeId].nodeparam.nodeType === 'rectbig') {
                                        if (this.directorynode[item.nodeparam.nodeId].nodeparam.in.length > 0 && this.directorynode[item.nodeparam.nodeId].nodeparam.out.length > 0) {
                                            this.directorynode[item.nodeparam.nodeId].nodeparam.nodeType = 'circle';
                                            this.directorynode[item.nodeparam.nodeId].nodeparam.nodeWidth = 50;
                                            this.directorynode[item.nodeparam.nodeId].nodeparam.nodeHeight = 50;
                                        }
                                        this.changenodeline(item.nodeparam.nodeId, 'line');
                                    };
                                    // this.havechange++;
                                    // this.setsessionstoragenode();
                                    this.save('createline');
                                    // this.node = this.getnodelist();
                                    // this.$forceUpdate();
                                }
                            })
                        } else {
                            // 已存在，改变隐藏联系关系
                            if (lineuui !== '') {
                                if (this.line[lineuui].rels !== '0') {
                                    // 连线处于存在状态，重复连线，不做处理
                                } else {
                                    // 连线处于隐藏状态，设置连线可见，rels>0,第一个属性设置为可用状态
                                    this.line[lineuui].rels = '1';
                                    this.line[lineuui].show = true;
                                    // 获得第一个属性，通过调用双击事件的接口，然后存储变化
                                    dbdata({
                                        type: '9',
                                        uuid: lineuui
                                    }).then((res) => {
                                        if (res.code === 0) {
                                            // 存储变化
                                            let changeitem = {
                                                key: `${res.data.obj_info[0].uuid}${res.data.obj_info[0].uuid_id}`,
                                                valid: '1'
                                            };
                                            if (this.waitdata.c_etl_rel.hasOwnProperty(changeitem.key)) {
                                                Object.assign(this.waitdata.c_etl_rel[changeitem.key], changeitem)
                                            } else {
                                                this.waitdata.c_etl_rel[changeitem.key] = changeitem;
                                            };
                                            // this.havechange++;
                                            // this.setsessionstoragenode();
                                            this.save('createline');
                                        }
                                    })
                                }
                            } else {
                                console.log('代码又bug，注意排查');
                            }
                        }
                    }
                } else if (this.pagestates === 'dragnode') {
                    // this.pagestates = 'edit'
                }
            }
        },
        // 右键
        contextnode (e, index, item) {
            this.buttontype = e.button;
            // 右键功能有待优化
            if (this.pagestates !== 'static') {
                this.menu.showmenu = false;
                this.$message('页面处于编辑状态，无法执行右键功能');
            } else {
                this.pagestates === 'rightclick';
                this.menu = {
                    showmenu: true,
                    left: `${e.pageX + this.scrollLeft}px`,
                    top: `${e.pageY + this.scrollTop - this.topheight}px`,
                };
                this.menudata = {
                    event: e,
                    index: index,
                    item: item
                }
            }
        },
        editnode (e, index, param) {
            this.cancelcascade();
            clearTimeout(this.timerout);
            this.timerout = null;
            this.Getsavedata().then(() => {
                this.diaglogeditflag = false;
                this.menudata = {
                    event: e,
                    index: index,
                    item: param
                }
                // 待决定
                this.pagestates = 'dbclick';
                this.dialogFormVisible = true;
                let kv = this.switchtype(this.menudata.item.nodeparam.nodeType, 'stt')
                this.Getdbdata({
                    type: this.switchtype(this.menudata.item.nodeparam.nodeType, 'stn'),
                    uuid: this.menudata.item.nodeparam.nodeId
                }, this.c_kv.tab[kv], 'node');
            });
        },
        // 批量移动选中节点
        SelctedNode (e, index, param) {
            if (this.pagestates === 'dragallwait') {
                this.pagestates = 'dragall';
            }
            if (param.nodeparam.drag === 'all') {
                for (let i in this.selectednode) {
                    if (this.selectednode[i] === param.nodeparam.uuid) {
                        this.selectednode.splice(i, 1);
                    }
                }
                this.directorynode[param.nodeparam.uuid].nodeparam.drag = 'one';
            } else {
                let flag = true;
                for (let j in this.selectednode) {
                    if (this.selectednode[j] === param.nodeparam.uuid) {
                        flag = false;
                    }
                }
                if (flag) {
                    this.selectednode.push(param.nodeparam.uuid);
                }
            }
            this.updatedragpos();
            this.setselected();
            this.node = this.getnodelist();
            this.$forceUpdate();
        },
        // 更新边界数据
        updatedragpos () {
            let pos = {
                minx: 2000000,
                maxx: 0,
                miny: 2000000,
                maxy: 0
            }
            for (let i of this.selectednode) {
                if (parseInt(this.directorynode[i].nodeparam.nodeLeft) < pos.minx) {
                    pos.minx = parseInt(this.directorynode[i].nodeparam.nodeLeft);
                }
                if (parseInt(this.directorynode[i].nodeparam.nodeLeft) > pos.maxx) {
                    pos.maxx = parseInt(this.directorynode[i].nodeparam.nodeLeft)
                }
                if (parseInt(this.directorynode[i].nodeparam.nodeTop) < pos.miny) {
                    pos.miny = parseInt(this.directorynode[i].nodeparam.nodeTop);
                }
                if (parseInt(this.directorynode[i].nodeparam.nodeTop) > pos.miny) {
                    pos.maxy = parseInt(this.directorynode[i].nodeparam.nodeTop)
                }
            }
            this.dragpos = pos;
        },
        // 删除节点
        //
        delectnode () {
            // 先保存修改信息
            // 保存刷新
            this.Getsavedata();
            this.$confirm('此操作将永久删除该文件, 是否继续?', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                customClass: `${this.dark}-mssagebox`
            }).then(() => {
                etlrm({ type: this.switchtype(this.menudata.item.nodeparam.nodeType, 'stn'), uuid: this.menudata.item.nodeparam.uuid }).then((res) => {
                    this.Getkv({ bas: this.seq.bas, pos: this.seq.pos, rel: this.seq.rel, run: this.seq.run });
                    this.dialogFormVisible = false;
                    this.clearstate();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        editline (item) {
            this.diaglogeditflag = false;
            this.menudata.item = item;
            // // 待决定
            this.pagestates = 'dbclick';
            this.dialogFormVisibleline = true;
            this.Getdbdata({
                type: '7',
                uuid: this.menudata.item.id
            }, this.c_kv.tab.c_etl_rel, 'line');
        },
        // 删除连线
        delectline () {
            this.Getsavedata();
            this.$confirm('此操作将永久删除该文件, 是否继续?', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                customClass: `${this.dark}-mssagebox`
            }).then(() => {
                etlrm({ type: this.switchtype('line', 'stn'), uuid: this.menudata.item.uuid }).then((res) => {
                    // if (res.code === 0) {
                    //     if (this.line.hasOwnProperty(this.menudata.item.uuid)) {
                    //         delete this.line[this.menudata.item.uuid]
                    //     }
                    // }
                    // 删除后进行刷新
                    this.Getkv({ bas: this.seq.bas, pos: this.seq.pos, rel: this.seq.rel, run: this.seq.run });
                    this.dialogFormVisibleline = false;
                    this.clearstate();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 清除一些状态
        clearcontext () {
            this.buttontype = 0;
            this.menu.showmenu = false;
            this.cancelcascade();
            console.log('clearcontextthis.pagestates', this.pagestates);
            if (this.pagestates === 'dragallwait' || this.pagestates === 'dragall') {
                clearTimeout(this.timerout);
                this.cancelcascade();
                this.save('static');
            }
            if (this.testtooltip) {
                this.testtooltip = false;
            }
            if (this.tempsourch !== '') {
                $(`#${this.tempsourch}`).removeClass(`zkf-status--${this.dark}--sourch`);
                this.tempsourch = '';
            }
        },
        clearcenter () {
            if (this.pagestates === 'createline') {
                this.pagestates = 'static';
            }
        },
        clearstate (param = 'static') {
            this.pagestates = param;
            this.waitdata = {
                c_etl_rel: {},
                c_etl_map: {},
                c_etl_pos: {},
                c_etl_proc: {},
                c_etl_para: {},
                c_etl_sql: {},
            };
            this.changedbdata = {};
            this.changedblinedata = {};
            this.adddbdata = [];
            this.dragpos = {};
            this.selectednode = [];
            this.timerout = null;
        },
        // 右键重启
        noderun (type) {
            // 调用后端接口，成功后刷新页面解锁，传参uuid type
            // 第一个参数是uuid， 第二个参数是重启类型type，值为recursive递归重启，值为back回溯重启，值为run当前节点，值为stop停止
        },
        // 查看详情
        looknodemsg () {
            this.dialogFormVisiblelook = true;
            // 调用后端接口,获得数据，不需要接触面板锁定
            etldetail({ type: this.switchtype(this.menudata.item.nodeparam.nodeType, 'stn'), uuid: this.menudata.item.nodeparam.uuid }).then((res) => {
                if (res.code === 0) {
                    this.lookmsg = res.data.run_detail;
                }
            });
        },
        // delectnode() {},
        count (start, end) {
            // 计算最后的位置坐标函数
            let finallycount = {
                startX: start.left + start.width / 2,
                startY: start.top + start.height / 2 - 5,
                endX: end.left + end.width / 2,
                endY: end.top + end.height / 2 - 5
            }
            // 右连接点计算
            if ((end.left - start.left - start.width) > 20) {
                finallycount.startX = start.left + start.width - 5;
                finallycount.endX = end.left - 10;
            } else if ((start.left - end.left - end.width) > 20) {
                // 左连接点
                finallycount.startX = start.left - 10;
                finallycount.endX = end.left + end.width;
            } else {
                // 使用上下节点判断
                if (end.top > start.top) {
                    finallycount.startY = start.top + start.height - 10;
                    finallycount.endY = end.top - 15;
                } else {
                    finallycount.startY = start.top - 10;
                    finallycount.endY = end.top + end.height;
                }
            }
            return (finallycount);
        },
        changedit () {
            this.diaglogeditflag = !this.diaglogeditflag;
        },
        // 删除新增的连线规则
        delectnewlinerule (index, key) {
            // 从显示数据中去掉
            this.adddbdata.splice(index, 1)
            // 从修改数据中去掉
            for (let j in this.changedblinedata) {
                if (j === key) {
                    delete this.changedblinedata[j];
                }
            }
        },
        changelineadd () {
            let option = [];
            for (let m in this.c_kv.map.valid) {
                option.push({
                    value: m,
                    label: this.c_kv.map.valid[m]
                })
            }
            // 生产uuid_id的规则
            let oldarr = this.dbdata.map(item => {
                console.log('item.valdata.uuid_id', item.valdata.uuid_id);
                return parseInt(item.valdata.uuid_id);
            })
            let newarr = this.adddbdata.map(item => {
                return parseInt(item.valdata.uuid_id)
            })
            console.log('oldarr', oldarr);
            console.log('newarr', newarr);
            let uuidid = (Math.max.apply(null, oldarr) + 1).toString();
            if (this.adddbdata.length > 0) {
                uuidid = (Math.max.apply(null, newarr) + 1).toString();
            }
            let addlinerule = {
                formdata: [
                    {
                        name: 'uuid',
                        type: 'input',
                        option: [],
                        value: this.menudata.item.uuid,
                        show: false,
                        edit: false
                    }, {
                        name: 'uuid_id',
                        type: 'input',
                        option: [],
                        value: uuidid,
                        show: true,
                        edit: false
                    }, {
                        name: 'uuid_s',
                        type: 'input',
                        option: [],
                        value: this.menudata.item.startnode,
                        show: false,
                        edit: false
                    }, {
                        name: 'uuid_t',
                        type: 'input',
                        option: [],
                        value: this.menudata.item.endnode,
                        show: false,
                        edit: false
                    }, {
                        name: 'relation',
                        type: 'textarea',
                        option: [],
                        value: '',
                        show: true,
                        edit: true
                    }, {
                        name: 'valid',
                        type: 'select',
                        option: option,
                        value: '1',
                        show: true,
                        edit: true
                    }, {
                        name: 'memo',
                        type: 'textarea',
                        option: [],
                        value: '',
                        show: true,
                        edit: true
                    }],
                ruleForm: {
                    memo: '',
                    relation: [{ required: true, message: '请补全信息', trigger: 'blur' }],
                    uuid: [{ required: true, message: '请补全信息', trigger: 'blur' }],
                    uuid_id: [{ required: true, message: '请补全信息', trigger: 'blur' }],
                    uuid_s: [{ required: true, message: '请补全信息', trigger: 'blur' }],
                    uuid_t: [{ required: true, message: '请补全信息', trigger: 'blur' }],
                    valid: [{ required: true, message: '请补全信息', trigger: 'blur' }]
                },
                valdata: {
                    memo: '',
                    relation: '',
                    uuid: this.menudata.item.uuid,
                    uuid_id: uuidid,
                    uuid_s: this.menudata.item.startnode,
                    uuid_t: this.menudata.item.endnode,
                    valid: '1'
                },
            }
            this.adddbdata.push(addlinerule);
            this.changedblinedata[`${addlinerule.valdata.uuid}${addlinerule.valdata.uuid_id}`] = {
                key: `${addlinerule.valdata.uuid}${addlinerule.valdata.uuid_id}`,
                valid: addlinerule.valdata.valid
            };
            console.log('this.adddbdata', this.adddbdata);
            console.log('this.changedblinedata', this.changedblinedata);
        },
        // 值改变
        dbinputchange (index, i, type, add = 'old') {
            let item = {};
            if (add === 'add') {
                item.key = `${this.adddbdata[index].valdata.uuid}${this.adddbdata[index].valdata.uuid_id}`;
                item[i] = this.adddbdata[index].valdata[i];
            } else {
                item.key = this.dbdata[index].valdata.uuid_id ? `${this.dbdata[index].valdata.uuid}${this.dbdata[index].valdata.uuid_id}` : `${this.dbdata[index].valdata.uuid}`;
                item[i] = this.dbdata[index].valdata[i];
            }
            if (type === 'line') {
                if (this.changedblinedata.hasOwnProperty(item.key)) {
                    Object.assign(this.changedblinedata[item.key], item)
                } else {
                    this.changedblinedata[item.key] = item;
                }
                console.log('his.changedblinedata', this.changedblinedata);
            } else if (type === 'node') {
                Object.assign(this.changedbdata, item);
            }
        },
        update () {
            if (this.dbdata.length > 0) {
                this.$refs.refformnode[0].validate((valid) => {
                    if (valid) {
                        // 存储变化
                        if (this.waitdata[this.switchtype(this.menudata.item.nodeparam.nodeType, 'stt')].hasOwnProperty(this.menudata.item.nodeparam.nodeId)) {
                            Object.assign(this.waitdata[this.switchtype(this.menudata.item.nodeparam.nodeType, 'stt')][this.menudata.item.nodeparam.nodeId], this.changedbdata)
                        } else {
                            if (JSON.stringify(this.changedbdata) !== '{}') {
                                this.waitdata[this.switchtype(this.menudata.item.nodeparam.nodeType, 'stt')][this.menudata.item.nodeparam.nodeId] = {
                                    key: this.menudata.item.nodeparam.nodeId,
                                    ...this.changedbdata
                                };
                            }
                        }
                        // 保存刷新
                        this.Getsavedata().then(() => {
                            this.Getkv({ bas: this.seq.bas, pos: this.seq.pos, rel: this.seq.rel, run: this.seq.run });
                            this.dialogFormVisible = false;
                            // 保存成功后，修改页面状态
                            this.clearstate();
                        })
                    } else {
                        return false;
                    }
                })
            } else {
                this.dialogFormVisible = false;
            }
        },
        updateline () {
            let flag = true;
            for (let i in this.$refs.lineruleForm) {
                this.$refs.lineruleForm[i].validate((res) => {
                    if (!res) {
                        flag = false;
                    }
                })
            }
            if (flag) {
                for (let i in this.changedblinedata) {
                    if (this.waitdata.c_etl_rel.hasOwnProperty(i)) {
                        Object.assign(this.waitdata.c_etl_rel[i], this.changedblinedata[i])
                    } else {
                        this.waitdata.c_etl_rel[i] = {
                            key: i,
                            ...this.changedblinedata[i]
                        };
                    }
                }
                // // 判断特殊情况
                // if (this.waitdata.c_etl_rel[`${this.dbdata[0].valdata.uuid}${this.dbdata[0].valdata.uuid_id}`].valid === '1' && this.dbdata[0].valdata.valid !== '1') {
                //     this.waitdata.c_etl_rel[`${this.dbdata[0].valdata.uuid}${this.dbdata[0].valdata.uuid_id}`].valid = '0';
                // }
                // 保存刷新
                this.Getsavedata().then(() => {
                    this.Getkv({ bas: this.seq.bas, pos: this.seq.pos, rel: this.seq.rel, run: this.seq.run });
                    this.dialogFormVisibleline = false;
                    // 保存成功后，修改页面状态
                    this.clearstate();
                })
            } else {
                return false;
            }
        },
        cancel (param) {
            this[param] = false;
            this.clearstate();
        },
        handleClose (param) {
            this[param] = false;
            this.changedbdata = {};
            this.changedblinedata = {};
            this.adddbdata = [];
            this.pagestates = 'static';
        },
        // 流程图保存
        save (param) {
            // 判断是否需要保存数据
            console.log('save--this.pagestates', this.waitdata);
            if (this.havechange > 0 || Object.keys(this.waitdata.c_etl_rel).length > 0) {
                for (let i in this.changedblinedata) {
                    if (this.waitdata.c_etl_rel.hasOwnProperty(i)) {
                        Object.assign(this.waitdata.c_etl_rel[i], this.changedblinedata[i])
                    } else {
                        this.waitdata.c_etl_rel[i] = {
                            key: i,
                            ...this.changedblinedata[i]
                        };
                    }
                }
                // 保存刷新
                this.Getsavedata().then(() => {
                    this.Getkv({ bas: this.seq.bas, pos: this.seq.pos, rel: this.seq.rel, run: this.seq.run });
                    // 保存成功后，修改页面状态
                    this.clearstate(param);
                })
            } else {
                this.pagestates = 'static';
            }
        },
        looksavehistory () { },
        // 手动刷新
        updateall () {
            // 调用保存接口
            // 保存成功后，修改页面状态
            this.clearstate();
        },
        // 设置定时刷新暂时去掉
        //  time () { },
        // 记录初始状态的
        setinitsession () {
            console.log('调用初始状态');
            this.havechange = 0;
            this.activeflag = 0;
            this.dataflagi = -2;
            // let getnodeline = [{
            //     node: JSON.parse(JSON.stringify(this.directorynode)),
            //     line: JSON.parse(JSON.stringify(this.line)),
            //     waitdata: JSON.parse(JSON.stringify(this.waitdata))
            // }];
            // sessionStorage.setItem('nodeline', JSON.stringify(getnodeline));
            sessionStorage.setItem('newnodeline', JSON.stringify([]));
        },
        // 进行数据存储sessionstoragezzz
        setsessionstoragenode () {
            // 保存基础数据
            let getnodeline = JSON.parse(sessionStorage.getItem('nodeline'));
            this.activedata = {
                node: JSON.parse(JSON.stringify(this.directorynode)),
                line: JSON.parse(JSON.stringify(this.line)),
                waitdata: JSON.parse(JSON.stringify(this.waitdata))
            };
            getnodeline.push(this.activedata);
            try {
                sessionStorage.setItem('nodeline', JSON.stringify(getnodeline));
            } catch (err) {
                this.save();
            }
        },
        // 保存变化
        savesession (val, newval) {
            // 利用你操作思维，增删改查（増就删，改就改），如何设计数据结构
            // []{node: {
            //    del: [],
            //    update: []
            // },line: {}, waitdata:{}]
            let initsave = JSON.parse(sessionStorage.getItem('newnodeline'));
            //    initsave.push({ old: val, new: newval });
            if (this.dataflagi !== -2) {
                this.dataflagi++;
                initsave.splice(this.dataflagi, 0, { old: val, new: newval });
            } else {
                initsave.push({ old: val, new: newval });
            }
            try {
                sessionStorage.setItem('newnodeline', JSON.stringify(initsave));
            } catch (err) {
                this.save();
            }
        },
        // 解析变化
        backdata (obj, back) {
            if (back === 'back') {
                if (obj.type === 'newnode') {
                    // 恢复节点数据
                    delete this.directorynode[obj.node.uuid];
                    // 修改变化
                    delete this.waitdata.c_etl_pos[obj.node.uuid];
                    delete this.waitdata[obj.node.nodeType][obj.node.uuid];
                    this.node = this.getnodelist();
                } else if (obj.type === 'dragnode') {
                    // 恢复节点
                    this.directorynode[obj.node.uuid].nodeparam.nodeLeft = `${obj.node.x}px`;
                    this.directorynode[obj.node.uuid].nodeparam.nodeTop = `${obj.node.y}px`;
                    this.node = this.getnodelist();
                    // 恢复连线
                    this.changenodeline(obj.node.uuid, 'line');
                    if (obj.node.msg === 'up') {
                        this.waitdata.c_etl_pos[obj.node.uuid].x = `${obj.node.x}px`;
                        this.waitdata.c_etl_pos[obj.node.uuid].y = `${obj.node.y}px`;
                    } else {
                        delete this.waitdata.c_etl_pos[obj.node.uuid];
                    }
                } else if (obj.type === 'dragallnode') {
                    for (let i in obj.node) {
                        // 恢复节点
                        this.directorynode[obj.node[i].uuid].nodeparam.nodeLeft = obj.node[i].x;
                        this.directorynode[obj.node[i].uuid].nodeparam.nodeTop = obj.node[i].y;
                        // 恢复连线
                        this.changenodeline(obj.node[i].uuid, 'line');
                        // 恢复缓存
                        if (obj.node[i].msg === 'up') {
                            this.waitdata.c_etl_pos[obj.node[i].uuid].x = obj.node[i].x;
                            this.waitdata.c_etl_pos[obj.node[i].uuid].y = obj.node[i].y;
                        } else {
                            delete this.waitdata.c_etl_pos[obj.node[i].uuid];
                        }
                    }
                    // 更改节点数据
                    this.node = this.getnodelist();
                }
            } else {
                if (obj.type === 'newnode') {
                    console.log('obj', obj);
                    // 恢复节点数据
                    this.directorynode[obj.node.nodeparam.uuid] = JSON.parse(JSON.stringify(obj.node));
                    // 存储变化
                    console.log('this.waitdata.c_etl_pos', this.waitdata.c_etl_pos);
                    this.waitdata.c_etl_pos[obj.node.nodeparam.uuid] = {
                        key: obj.node.nodeparam.uuid,
                        size: '0',
                        x: `${parseInt(obj.node.nodeparam.nodeLeft)}px`,
                        y: `${parseInt(obj.node.nodeparam.nodeTop)}px`,
                    };
                    // 存储变化
                    this.waitdata[this.switchtype(obj.node.nodeparam.nodeType, 'stt')][obj.node.nodeparam.uuid] = {
                        key: obj.node.nodeparam.uuid,
                        valid: '1'
                    };
                    this.node = this.getnodelist();
                } else if (obj.type === 'dragnode') {
                    // 恢复节点
                    this.directorynode[obj.node.uuid].nodeparam.nodeLeft = `${obj.node.x}px`;
                    this.directorynode[obj.node.uuid].nodeparam.nodeTop = `${obj.node.y}px`;
                    this.node = this.getnodelist();
                    // 恢复连线
                    this.changenodeline(obj.node.uuid, 'line');
                    if (obj.node.msg === 'up') {
                        this.waitdata.c_etl_pos[obj.node.uuid].x = `${obj.node.x}px`;
                        this.waitdata.c_etl_pos[obj.node.uuid].y = `${obj.node.y}px`;
                    } else {
                        this.waitdata.c_etl_pos[obj.node.uuid] = {
                            key: obj.node.uuid,
                            x: `${obj.node.x}px`,
                            y: `${obj.node.y}px`
                        };
                    }
                } else if (obj.type === 'dragallnode') {
                    for (let i in obj.node) {
                        // 恢复节点
                        this.directorynode[obj.node[i].uuid].nodeparam.nodeLeft = obj.node[i].x;
                        this.directorynode[obj.node[i].uuid].nodeparam.nodeTop = obj.node[i].y;
                        // 恢复连线
                        this.changenodeline(obj.node[i].uuid, 'line');
                        // 恢复缓存
                        console.log('obj', obj);
                        if (obj.node[i].msg === 'up') {
                            this.waitdata.c_etl_pos[obj.node[i].uuid].x = obj.node[i].x;
                            this.waitdata.c_etl_pos[obj.node[i].uuid].y = obj.node[i].y;
                        } else {
                            this.waitdata.c_etl_pos[obj.node[i].uuid] = {
                                key: obj.node[i].uuid,
                                x: obj.node[i].x,
                                y: obj.node[i].y
                            };
                        }
                    }
                    // 更改节点数据
                    this.node = this.getnodelist();
                }
            }
        },
        back () {
            // 撤销操作,记录撤销的次数
            console.log('this.havechange', this.havechange);
            console.log('this.activeflag', this.activeflag);
            console.log('this.dataflagi', this.dataflagi);
            if (this.activeflag < this.havechange && this.dataflagi !== -1) {
                console.log('jr');
                let getnodeline = JSON.parse(sessionStorage.getItem('newnodeline'));
                if (this.dataflagi === -2) {
                    this.dataflagi = this.havechange - this.activeflag - 1;
                }
                this.backdata(getnodeline[this.dataflagi].old, 'back');
                this.activeflag++;
                if (this.dataflagi > -1) {
                    this.dataflagi--;
                }
                // let getnodeline = JSON.parse(sessionStorage.getItem('nodeline'));
                // this.directorynode = getnodeline[this.havechange - this.activeflag].node;
                // this.line = getnodeline[this.havechange - this.activeflag].line;
                // this.waitdata = getnodeline[this.havechange - this.activeflag].waitdata;
                // this.node = this.getnodelist();
            }
        },
        forward () {
            // 恢复操作，撤销次数大于0，这可以指向取消撤销的操作
            console.log('this.havechange', this.havechange);
            console.log('this.activeflag', this.activeflag);
            console.log('this.dataflagi', this.dataflagi);
            if (this.dataflagi < this.havechange - 1) {
                this.dataflagi++;
            }
            if (this.activeflag > 0) {
                let getnodeline = JSON.parse(sessionStorage.getItem('newnodeline'));
                if (this.dataflagi === -2) {
                    this.dataflagi = this.havechange - this.activeflag;
                }
                this.backdata(getnodeline[this.dataflagi].new, 'forward');
                this.activeflag--;
                // let getnodeline = JSON.parse(sessionStorage.getItem('nodeline'));
                // this.directorynode = getnodeline[this.havechange - this.activeflag + 1].node;
                // this.line = getnodeline[this.havechange - this.activeflag + 1].line;
                // this.waitdata = getnodeline[this.havechange - this.activeflag + 1].waitdata;
                // this.node = this.getnodelist();
                // this.activeflag--;
            }
        },
        // 修改显示
        changeswitch () {
            this.node = this.getnodelist();
            this.line = this.changeliestate();
        },
        // dwm40sdsh,wmhygzmznrdshbxf
        // realtimeupdata () {
        //     this.timer = setInterval(() => {
        //         if (this.pagestate.editflag) {
        //             // 处于编辑状态不进行刷新
        //         } else {
        //             // 费编辑状态进行刷新
        //         }
        //     }, 10000);
        // },
        // 得到kv表
        Getkv (val) {
            getkvtable(val).then((res) => {
                if (res.code === 0) {
                    if (res.data.map !== undefined) {
                        this.c_kv.map = res.data.map
                    }
                    if (res.data.tab !== undefined) {
                        this.c_kv.tab = res.data.tab;
                    }
                    this.dealupdatedata({
                        s_etl_web_bas: res.data.dat.bas,
                        s_etl_web_run: res.data.dat.run,
                        s_etl_web_pos: res.data.dat.pos,
                        s_etl_web_rel: res.data.dat.rel
                    });
                }
            });
        },
        // 双击
        Getdbdata (val, kv, type) {
            this.changedbdata = {};
            this.changedblinedata = {};
            this.adddbdata = [];
            this.dbdata = [];
            dbdata(val).then((res) => {
                if (res.code === 0) {
                    for (let i in res.data) {
                        this.dealdbdata(res.data[i], kv, type);
                    }
                }
            })
        },
        async Getsavedata () {
            this.looksavehistorymsg = [];
            console.log('保存时数据', this.waitdata);
            let param = {
                header: 'etl_web_update',
                message: 'update etl data from web',
                data: {
                    c_etl_rel: [],
                    c_etl_map: [],
                    c_etl_pos: [],
                    c_etl_proc: [],
                    c_etl_para: [],
                    c_etl_sql: [],
                }
            };
            for (let i in this.waitdata) {
                if (Object.keys(this.waitdata[i]).length > 0) {
                    for (let j in this.waitdata[i]) {
                        param.data[i].push(this.waitdata[i][j]);
                    }
                }
            }
            let flag = false;
            for (let i in param.data) {
                if (param.data[i].length > 0) {
                    flag = true;
                } else {
                    // 如要传的数据为空，这在最后的数据中去掉
                    // 采用该方法删除没用的属性后会调用原型上的对应属性
                    // 如果把该属性设为null，这该属性还能访问到，且不占用内存，因为把变量为null，
                    // 不会给他分配内存，释放内存
                    delete param.data[i];
                }
            }
            if (flag) {
                let res = await cgisave(param);
                // 设置变量值
                this.setinitsession();
                let returnlist = [];
                for (let i in res.data) {
                    if (res.data[i].length !== 0) {
                        for (let j in res.data[i]) {
                            if (res.data[i][j].rows === 1) {
                                let item = {
                                    tablename: i,
                                    key: res.data[i][j].key,
                                    message: res.data[i][j].message,
                                };
                                if (res.data[i][j].message.indexOf('Success') !== -1) {
                                    item.flag = 'success';
                                } else {
                                    item.flag = 'failure';
                                }
                                returnlist.push(item);
                            }
                        }
                    }
                }
                this.looksavehistorymsg = returnlist;
            }
        },
        switchtype (val, transform) {
            let type;
            if (transform === 'nts') {
                // 数值转图形
                switch (val) {
                    case '6':
                        type = 'pos';
                        break;
                    case '1':
                        type = 'process';
                        break;
                    case '2':
                        type = 'base';
                        break;
                    case '3':
                        type = 'deal';
                        break;
                    case '4':
                        type = 'rectbig';
                        break;
                    case '7':
                        type = 'line';
                        break;
                    default:
                        type = 'base';
                };
            } else if (transform === 'stn') {
                // 图像转数值
                switch (val) {
                    case 'pos':
                        type = '0';
                        break;
                    case 'process':
                        type = '1';
                        break;
                    case 'base':
                        type = '2';
                        break;
                    case 'deal':
                        type = '3';
                        break;
                    case 'circle':
                        type = '4';
                        break;
                    case 'rectbig':
                        type = '4';
                        break;
                    case 'line':
                        type = '7';
                        break;
                    default:
                        type = '0';
                };
            } else if (transform === 'stt') {
                // 图像转表名
                switch (val) {
                    case 'rectbig':
                        type = 'c_etl_sql';
                        break;
                    case 'process':
                        type = 'c_etl_map';
                        break;
                    case 'base':
                        type = 'c_etl_proc';
                        break;
                    case 'deal':
                        type = 'c_etl_para';
                        break;
                    case 'circle':
                        type = 'c_etl_sql';
                        break;
                    case 'line':
                        type = 'c_etl_rel';
                        break;
                    default:
                        type = '0';
                };
            };
            return type;
        },
        // 修改某节点相关的连线的path函数
        changenodeline (id, type) {
            for (let i in this.directorynode[id].nodeparam[type]) {
                // 得到相关连线的uuid
                let lineuuid = this.directorynode[id].nodeparam[type][i];
                // 得到这条线的开始节点和结束节点的uuid
                let startuuid = this.line[lineuuid].startnode;
                let enduuid = this.line[lineuuid].endnode;
                // 得到计算位置的数据
                let start = {
                    width: parseInt(this.directorynode[startuuid].nodeparam.nodeWidth),
                    height: parseInt(this.directorynode[startuuid].nodeparam.nodeHeight),
                    left: parseInt(this.directorynode[startuuid].nodeparam.nodeLeft),
                    top: parseInt(this.directorynode[startuuid].nodeparam.nodeTop),
                };
                let end = {
                    width: parseInt(this.directorynode[enduuid].nodeparam.nodeWidth),
                    height: parseInt(this.directorynode[enduuid].nodeparam.nodeHeight),
                    left: parseInt(this.directorynode[enduuid].nodeparam.nodeLeft),
                    top: parseInt(this.directorynode[enduuid].nodeparam.nodeTop),
                };
                let newpath = this.count(start, end);
                this.line[lineuuid].path = `M${newpath.startX},${newpath.startY} T${newpath.endX},${newpath.endY}`;
            }
        },
        // 设置全局样式
        setselected () {
            for (let i of this.selectednode) {
                this.directorynode[i].nodeparam.drag = 'all';
            }
        },
        // 启动级联
        startcascade () {
            this.buttontype = 0;
            this.menu.showmenu = false;
            if (this.menudata.item.nodeparam.drag === 'all') {
                // 清楚节点选中状态
                // 设置全局状态
                // 设置全局选中数据
                this.directorynode[this.menudata.item.nodeparam.uuid].nodeparam.drag = 'one';
            } else {
                // this.menudata.item.nodeparam.drag === 'all';
                this.pagestates = 'dragall';
                recu({ type: this.switchtype(this.menudata.item.nodeparam.nodeType, 'stn'), uuid: this.menudata.item.nodeparam.uuid }).then((res) => {
                    // 设置节点选中状态
                    this.selectednode = res.data.uuid_list;
                    this.dragpos = {
                        minx: res.data.uuid_pos[0],
                        maxx: res.data.uuid_pos[2],
                        miny: res.data.uuid_pos[1],
                        maxy: res.data.uuid_pos[3]
                    }
                    // 设置全局状态
                    // 设置全局选中数据
                    this.setselected();
                    this.node = this.getnodelist();
                    this.$forceUpdate();
                })
            }
        },
        // 关闭级联是数据的状态的恢复
        cancelcascade () {
            console.log('this.selectednode', this.selectednode);
            this.dragpos = {};
            for (let i of this.selectednode) {
                this.directorynode[i].nodeparam.drag = 'one';
            }
            this.node = this.getnodelist();
            this.selectednode = [];
            this.timerout = null;
        }
    },
}
</script>

