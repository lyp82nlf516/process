<template>
  <div class="rolemanagerbox">
    <div class="querybox">
      <div class="pagetitle">
        <span class="titletext">查询条件</span>
      </div>
      <div class="inputbox">
        <el-input v-model="keyinput" placeholder="请输入关键字查询"></el-input>
        <el-button class="querybtn" @click="querydata">查询</el-button>
      </div>
    </div>
    <div class="tablebox">
      <div class="pagetitle">
        <span class="titletext">流程图列表</span>
        <div class="btngroup">
          <el-button @click="addopen">新增</el-button>
          <el-button @click="delopen"> 删除</el-button>
        </div>
      </div>
      <div class="eletable">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="rolecode" label="流程图ID" type="text" size="small" show-overflow-tooltip></el-table-column>
          <el-table-column prop="rolename" label="流程图名字" type="text" size="small" show-overflow-tooltip> </el-table-column>
          <el-table-column label="操作" width="80">
            <template scope="scope">
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginationbox">
          <el-pagination @current-change="currentpagechange" :total="total" :current-page="offset" :page-size="pageSize" layout="total, prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 新增和修改的弹窗 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="流程图名字" prop="rolecode">
          <el-input v-model="ruleForm.rolecode"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.rolemanagerbox {
  width: 100%;
  height: 100%;
  .querybox {
    background-color: #fff;
    .inputbox {
      overflow: auto;
      padding: 5px 10px;
    }
    .el-input {
      width: 200px;
      float: left;
    }
    .el-input__inner {
      border-radius: 0;
      height: 27px;
      font-size: 12px;
    }
    .querybtn {
      padding: 6px 10px;
      border-radius: 0;
      font-size: 12px;
      display: block;
      float: left;
      margin-left: 10px;
    }
  }
  .tablebox {
    background-color: #fff;
    margin-top: 10px;
    height: 100%;
    .eletable {
      padding: 5px;
    }
  }
  .el-table td,
  .el-table th {
    height: 32px;
    font-size: 12px;
  }
  .pagetitle {
    width: calc(100% - 10px);
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    height: 30px;
    .titletext {
      height: 20px;
      display: inline-block;
      position: absolute;
      left: 0px;
      padding: 4px 10px;
      border-bottom: 3px solid blue;
      letter-spacing: 2px;
    }
  }
  .btngroup {
    float: right;
    margin-right: 8px;
    .el-button {
      padding: 5px 10px;
      margin-top: 4px;
      font-size: 12px;
      border: 1px solid blue;
      border-radius: 0;
      box-shadow: 0px 0px 1px #888888 inset;
    }
  }
  .el-dialog {
    .el-form-item {
      margin-bottom: 10px;
      .el-input__inner {
        height: 28px;
      }
      .el-form-item__label {
        font-size: 12px;
      }
    }
    .dialog-footer {
      .el-button {
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 0;
        border: 1px solid blue;
      }
    }
    .el-dialog__header {
      background-color: #6d71ef;
      padding: 10px 5px;
      .el-dialog__title {
        color: #fff;
      }
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
    .el-dialog__body {
      padding: 10px 10px;
      overflow: auto;
    }
    .el-form-item__error {
      padding-top: 0;
    }
    .el-collapse-item__header {
      height: 30px;
      line-height: 30px;
    }
    .el-collapse-item__header__arrow {
      display: none;
    }
    .el-collapse-item__content {
      height: 200px;
      padding: 0px;
      overflow: auto;
    }
    .el-switch__core .el-switch__button {
      height: 12px;
      width: 12px;
    }
    .el-switch__core,
    .el-switch__label {
      height: 18px;
    }
    .el-switch,
    .el-switch__label,
    .el-switch__label * {
      font-size: 12px;
    }
    .el-switch__label * {
      top: 2px;
    }
    .el-tree {
      border: 0px;
      background: none;
      .el-tree-node__content {
        height: 26px;
        line-height: 26px;
        .el-checkbox__inner {
          border-radius: 0px;
          width: 16px;
          height: 16px;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
          background-color: #6d6fef;
        }
        .el-tree-node__label {
          font-size: 12px;
        }
      }
    }
    .el-switch.is-checked .el-switch__core {
      border-color: #6d6fef !important;
      background-color: #6d6fef !important;
    }
    .el-switch__core {
      border-color: #ccc !important;
      background-color: #ccc !important;
    }
    .el-collapse-item__header {
      padding-left: 0px;
    }
  }
}
</style>
<script>
import {
  // listrole,
  // addrole,
  // editrole,
  // delrole,
  // reprotInitz, // 报表树接口
  // queryAllMenuz
} from '@/services/query';
export default {
  data () {
    return {
      keyinput: '',
      tableData: [
        {
          rolecode: 'test1',
          rolename: 'test1',
        }
      ],
      ruleForm: {
        rolecode: '',
        rolename: '',
      },
      tempruleForm: {
        rolecode: '',
        rolename: '',
        adjust: false,
        download: false,
        reportcode: '',
        menucode: ''
      },
      dialogFormVisible: false,
      offset: 0,
      pageSize: 10,
      total: 0,
    }
  },
  mounted () {
    this.Getdata();
  },
  methods: {
    // 得到列表数据
    Getdata () {
    },
    // 删除
    delopen () {
    },
    // 点击翻页
    currentpagechange (val) {
      this.offset = val;
      this.Getdata();
    },
    // 新增数据
    Adddata () {
    },
    // 修改数据
    Editdata () {
    },
    // 打开新增窗口
    addopen () {
      this.dialogFormVisible = true;
    },
    // 打开修改窗口
    edit (row) {
      this.$router.push({
        path: '/dynamicprocess',
      })
    },
    // 点击查询
    querydata () {
      this.Getdata();
    },
    submitForm (ruleForm) {
      this.dialogFormVisible = false;
    },
    resetForm (ruleForm) {
      this.dialogFormVisible = false;
    }
  }
}

</script>