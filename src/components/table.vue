<template>
  <div style="padding:100px">
    <el-form label-position="right" status-icon :rules="rules" :model="ruleForm" ref="ruleForm">
      <el-table :data="ruleForm.evidenceTemplateList" border fit highlight-current-row>
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column label="证据名称" align="center" style="margin-left: 0px !important;">
          <template slot-scope="scope">
            <el-form-item
              :prop="'evidenceTemplateList.' + scope.$index + '.name'"
              :rules="rules.name"
            >
              <el-input
                v-if="scope.$index < ruleForm.evidenceTemplateList.length-1"
                v-model="scope.row.name"
                :maxlength="50"
              ></el-input>
              <el-input
                v-if="scope.$index == ruleForm.evidenceTemplateList.length-1"
                v-model="scope.row.name"
                :maxlength="50"
                @change="evidChangeLast(scope.row.name)"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.$index < ruleForm.evidenceTemplateList.length"
              type="danger"
              size="mini"
              @click="delEvid(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="saveData()">保存</el-button>
      <el-button size="mini" @click="closeDialog()">取消</el-button>
    </div>
  </div>
</template>	
<script>
/* eslint-disable */
export default {
  components: {},
  data() {
    return {
      ruleForm: {
        evidenceTemplateList: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎1",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎2",
            address: "上海市普陀区金沙江路 1519 弄"
          }
        ]
      },
      evidenceTemp: {
        id: "",
        name: "",
        remarks: ""
      },
      evidenceTemplateDeleteList: "",
      rules: {
        name: [
          { required: true, message: "证据模板名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    saveData() {
      //删除最后一行
      // let index = this.ruleForm.evidenceTemplateList.length - 1;
      // this.ruleForm.evidenceTemplateList.splice(index, 1);
      this.$nextTick(() => {
        this.$refs["ruleForm"].validate(valid => {
          debugger;
          if (valid) {
            this.loading = true;
            //根据状态dialogStatus判断是新增还是更新
            if (this.dialogStatus == "create") {
              this.createTemp();
            } else {
              this.updateTemp();
            }
          } else {
            this.ruleForm.evidenceTemplateList.push(
              JSON.parse(JSON.stringify(this.evidenceTemp))
            );
            return false;
          }
        });
      });
    },
    delEvid(data, i) {
      debugger;
      this.ruleForm.evidenceTemplateList.splice(i, 1);
    }
  }
};
</script>