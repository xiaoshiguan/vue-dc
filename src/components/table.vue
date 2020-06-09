<template>
  <div style="padding:100px">
    <el-upload
      class="upload-demo"
      action
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :file-list="fileListUpload"
      :limit="limitUpload"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      :auto-upload="false"
    >
      <el-button size="small" type="primary" @click="importfxx">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div>
    </el-upload>
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
    <input
      type="file"
      @change="importf(this)"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
  </div>
</template>	
<script>
/* eslint-disable */
export default {
  name: "table",
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
      },
      limitUpload: 1
    };
  },
  created() {
    // this.getList();
    debugger;
    this.$route.params.id;
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
    },
    importf(obj) {
      let _this = this;

      let inputDOM = this.$refs.inputer; // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;

      var reader = new FileReader(); //if (!FileReader.prototype.readAsBinaryString) {

      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";

        var rABS = false; //是否将文件读取为二进制字符串

        var pt = this;

        var wb; //读取完成的数据

        var outdata;

        var reader = new FileReader();

        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);

          var length = bytes.byteLength;

          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }

          var XLSX = require("xlsx");

          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化

              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          } // outdata就是你想要的东西 excel导入的数据

          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); // excel 数据再处理
          let arr = [];

          outdata.map(v => {
            let obj = {};

            obj.account = v.登录账号;

            obj.name = v.姓名;

            obj.department = v.部门;

            obj.secondDepartment = v.二级部门;

            obj.status = v.状态;

            obj.id = v.id;

            arr.push(obj);
          });

          _this.accountList = [...arr];

          console.log(_this.accountList);

          _this.reload();
        };

        reader.readAsArrayBuffer(f);
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    //事件
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
    },

    handleRemove(file, fileList) {
      this.fileTemp = null;
    },
    importfxx(obj) {
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          this.da = [...outdata];
          let arr = [];
          this.da.map(v => {
            let obj = {};
            obj.code = v["设备ID"];
            obj.type = v["设备型号"];
            arr.push(obj);
          });
          return arr;
        };
        reader.readAsArrayBuffer(f);
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    }
  }
};
</script>