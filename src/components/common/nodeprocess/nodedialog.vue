<template>
  <div class="nodedialog">
    <el-dialog :show-close="false" :title="title" :visible="Visible" :class="`${Dark}dialog`">
      <i class="el-icon-edit editdialog" v-if="disedit" :class="active?'active': 'noactive'" @click="changedit"></i>
      <i class="el-icon-plus adddialog" v-if="disadd" :class="true?'active': 'noactive'" @click="changeadd"></i>
      <i class="el-icon-close closedialog" @click="closeModal"></i>
      <slot name='nodeform'></slot>
      <div class="dialog-footer">
        <el-button v-if="dispdelect" class="databtn  delectbtn" @click="delect">删除</el-button>
        <el-button v-if="dispdcancel" class="databtn" @click="cancel">取消</el-button>
        <el-button v-if="dispconfirm" class="databtn" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: ['Visible', 'title', 'Dark', 'dispdelect', 'dispdcancel', 'dispconfirm', 'disedit', 'disadd', 'active'],
  computed: {
  },
  watch: {
    // Visible (newV, oldV) {
    //   // do something
    //   console.log(newV, oldV)
    // }
  },
  methods: {
    changeadd () {
      this.$emit('click-changeadd');
    },
    changedit () {
      this.$emit('click-changedit');
    },
    closeModal () {
      this.$emit('click-close');
    },
    cancel () {
      this.$emit('click-cancel');
    },
    confirm () {
      this.$emit('click-ok');
    },
    delect () {
      this.$emit('click-delect');
    }
  },
  mounted () {
    console.log('Visible', this.Visible);
  },
  beforeUpdate () {
  },
  updated () {
  },
}
</script>
<style lang="scss">
.nodedialog {
  .el-dialog__wrapper {
    .el-dialog__header {
      height: 30px;
      line-height: 30px;
      padding: 0px 10px;
      .el-dialog__title {
        font-size: 14px;
      }
    }
    .editdialog {
      position: absolute;
      left: 100px;
      top: 10px;
      z-index: 9;
    }
    .adddialog {
      position: absolute;
      left: 130px;
      top: 10px;
      z-index: 9;
    }
    .closedialog {
      position: absolute;
      right: 5px;
      top: 5px;
      z-index: 9;
    }
    .closedialog:hover {
      cursor: pointer;
    }
    .el-dialog__body {
      padding: 0px 0px;
      .nodeform {
      }
      .el-form-item__label {
        width: 110px;
      }
      .el-form-item {
        margin: 8px 0 15px 0;
      }
      .nodeform {
        .el-form-item__content {
          margin-left: 110px !important;
        }
      }
      .el-form-item__content {
        .el-input__inner {
          height: 34px !important;
          border-radius: 0px;
        }
        .el-textarea__inner {
          white-space: nowrap;
        }
      }
      .el-collapse {
        border: 0px;
        .el-collapse-item__header {
          height: 20px;
          line-height: 20px;
          padding: 0;
          background-color: rgba(0, 0, 0, 0);
          border-bottom: 0px;
        }
        .el-collapse-item__wrap {
          padding: 0;
          background-color: rgba(0, 0, 0, 0);
          border-bottom: 0px;
        }
      }
      .dialog-footer {
        padding: 5px 14px 5px;
        overflow: hidden;
        .el-button {
          padding: 5px 15px;
          border-radius: 0px;
          float: right;
          margin: 0 5px;
          border: 1px solid blue;
        }
        .delectbtn {
          float: left;
        }
      }
      .deftable {
        border: 1px solid #7dfbfb;
        .el-col {
          padding: 0 2px;
        }
        .delectbtn {
          line-height: 40px;
          font-size: 16px;
          text-indent: 6px;
          color: red;
          margin-bottom: 15px;
        }
        .documentbtn {
          line-height: 40px;
          font-size: 16px;
          text-indent: 6px;
          color: #7dfbfb;
          margin-bottom: 15px;
        }
      }
      .tablehead {
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #034766;
        background-color: #7dfbfb;
        i {
          line-height: 30px;
          font-style: normal;
          color: red;
        }
        span {
          color: #0f0912;
        }
      }
      .defineth {
        // border-left: 1px solid #ccc;
      }
    }
    .is-disabled {
      .el-input__inner,
      .el-textarea__inner {
        border-radius: 0px;
      }
      .el-input__icon {
        display: none;
      }
    }
    .el-table .cell,
    .el-table th > div {
      padding-left: 5px;
      padding-right: 5px;
      text-align: center;
    }
  }
  .lightdialog {
    .el-dialog {
      box-shadow: -5px 0 5px -1px #666, 0 -5px 5px -1px #666,
        0 5px 5px -1px #666, 5px 0 5px -1px #666; //右边阴影-2px 0 0 #56fdfd inset, //左边阴影
    }
    .el-dialog__header {
      background-color: blue;
      .el-dialog__title {
        color: #fff;
      }
    }
    .active {
      color: #fff;
    }
    .noactive {
      color: #d6d8e0;
    }
    .is-disabled {
      .el-input__inner,
      .el-textarea__inner {
        border: 1px solid #ccc !important;
        background-color: rgba(255, 255, 255, 0);
      }
    }
    .el-input__inner,
    .el-textarea__inner {
      border: 1px solid #666 !important;
      background-color: rgba(255, 255, 255, 0);
      border-radius: 0px;
    }

    .el-tabs--border-card {
      box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.12), 0 0 0px 0 rgba(0, 0, 0, 0.04);
    }
    .el-dialog__body {
      .dialog-footer {
        .el-button {
          border: 1px solid blue;
        }
      }
    }
  }
  .darkdialog {
    .el-dialog {
      box-shadow: -5px 0 5px -1px #0d3e3e, 0 -5px 5px -1px #0d3e3e,
        0 5px 3px -1px #0d3e3e, 5px 0 5px -1px #0d3e3e;
    }
    .el-dialog__header {
      background-color: #122638;
      .el-dialog__title {
        color: #56fdfd;
      }
    }
    .active {
      color: #56fdfd;
    }
    .noactive {
      color: #14b1a0;
    }
    .el-dialog__body {
      background-color: #0f0912;
      label {
        color: #56fdfd;
      }
      span {
        color: #56fdfd;
      }
      .el-form-item__label {
        color: #56fdfd;
      }
      .el-input__inner,
      .el-textarea__inner {
        border: 1px solid #20678c;
        background-color: rgba(255, 255, 255, 0);
        color: #56fdfd;
      }
      .is-disabled {
        .el-input__inner,
        .el-textarea__inner {
          border: 1px solid #0c2531 !important;
          background-color: rgba(255, 255, 255, 0);
        }
      }
      .dialog-footer {
        .el-button {
          border: 1px solid #20678c;
          color: #56fdfd;
          background-color: rgba(255, 255, 255, 0);
          box-shadow: -2px 0 0 #56fdfd inset, 0 -2px 0 #56fdfd inset,
            0 2px 0 #56fdfd inset, 3px 0 3px -1px #56fdfd inset; //右边阴影
        }
        .delectbtn {
          box-shadow: 0px 0 0 red inset, 0 0px 0 red inset, 0 0px 0 red inset,
            30x 0 0px 0px red inset;
        }
      }
    }
    .el-table {
      th {
        background-color: #7dfbfb;
      }
    }
    .el-table__footer-wrapper thead div,
    .el-table__header-wrapper thead div {
      background-color: rgba(0, 0, 0, 0);
    }
    .el-table .cell,
    .el-table th > div {
      padding-left: 5px;
      padding-right: 5px;
    }
    .el-table tr {
      background-color: #08050a;
    }
  }
}
.darkdown {
  background-color: #122638;
  .el-select-dropdown__item {
    color: #56fdfd;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #10070e;
  }
}
</style>
