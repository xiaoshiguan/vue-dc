<template>
  <div style=" border: 1px solid #eee">
    <button @click="exportExcel()">导出</button>
    <h1
      style="text-align: center; font-size: 20px;margin-block-start: 0em;    margin-block-end: 0em;"
    >药品管理</h1>
    <el-table :data="tableData3" style="width: 100%" height="530" id="out-table">
      <el-table-column fixed prop="drug_name" label="药品名称" width="120"></el-table-column>
      <el-table-column prop="drug_id" label="药品编号" width="150"></el-table-column>
      <el-table-column prop="drug_common" label="药品通用名" width="120"></el-table-column>
      <el-table-column prop="drug_type" label="药品类别" width="120"></el-table-column>
      <el-table-column prop="drug_unit" label="药品单位" width="60"></el-table-column>
      <el-table-column prop="drug_num" label="药品数量" width="60"></el-table-column>
      <el-table-column prop="drug_wholeSale" label="药品批发价" width="70"></el-table-column>
      <el-table-column prop="drug_sale" label="药品零售价" width="70"></el-table-column>
      <el-table-column prop="drug_vipSale" label="药品会员价" width="70"></el-table-column>
      <el-table-column prop="drug_norm" label="药品规格" width="120"></el-table-column>
      <el-table-column prop="drug_validity" label="药品有效期" width="120"></el-table-column>
      <el-table-column prop="drug_approval" label="药品批准文号" width="300"></el-table-column>
      <el-table-column prop="drug_factory" label="药品生产厂家" width="200"></el-table-column>
      <el-table-column prop="drug_illegal" label="是否违禁药" width="60"></el-table-column>
      <el-table-column prop="drug_illnum" label="限购数量" width="60"></el-table-column>
      <el-table-column prop="drug_code" label="药品条形码号" width="120"></el-table-column>
      <el-table-column prop="drug_formulation" label="药品剂型" width="70"></el-table-column>
      <el-table-column prop="drug_remarks" label="备注" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script>
//npm install --save xlsx file-saver
/* eslint-disable */
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "DrugInformation",
  data() {
    return {
      tableData3: [
        {
          drug_name: "阿胶",
          drug_common: "阿胶",
          drug_id: "072223",
          drug_type: "保健药",
          drug_unit: "盒",
          drug_num: 566,
          drug_wholeSale: 30,
          drug_sale: 50,
          drug_vipSale: 40,
          drug_norm: "每盒4*12粒",
          drug_approval: "鲁东卫食准字(2002)第GQ0004号",
          drug_formulation: "口服液",
          drug_factory: "山东东阿阿胶股份有限公司",
          drug_illegal: "否",
          drug_illnum: "无",
          drug_code: "6921168594368",
          drug_validity: "2020-1-1",
          drug_remarks: "无"
        },
        {
          drug_name: "阿胶",
          drug_common: "阿胶",
          drug_id: "072223",
          drug_type: "保健药",
          drug_unit: "盒",
          drug_num: 566,
          drug_wholeSale: 30,
          drug_sale: 50,
          drug_vipSale: 40,
          drug_norm: "每盒4*12粒",
          drug_approval: "鲁东卫食准字(2002)第GQ0004号",
          drug_formulation: "口服液",
          drug_factory: "山东东阿阿胶股份有限公司",
          drug_illegal: "否",
          drug_illnum: "无",
          drug_code: "6921168594368",
          drug_validity: "2020-1-1",
          drug_remarks: "无"
        },
        {
          drug_name: "阿胶",
          drug_common: "阿胶",
          drug_id: "072223",
          drug_type: "保健药",
          drug_unit: "盒",
          drug_num: 566,
          drug_wholeSale: 30,
          drug_sale: 50,
          drug_vipSale: 40,
          drug_norm: "每盒4*12粒",
          drug_approval: "鲁东卫食准字(2002)第GQ0004号",
          drug_formulation: "口服液",
          drug_factory: "山东东阿阿胶股份有限公司",
          drug_illegal: "否",
          drug_illnum: "无",
          drug_code: "6921168594368",
          drug_validity: "2020-1-1",
          drug_remarks: "无"
        },
        {
          drug_name: "阿胶",
          drug_common: "阿胶",
          drug_id: "072223",
          drug_type: "保健药",
          drug_unit: "盒",
          drug_num: 566,
          drug_wholeSale: 30,
          drug_sale: 50,
          drug_vipSale: 40,
          drug_norm: "每盒4*12粒",
          drug_approval: "鲁东卫食准字(2002)第GQ0004号",
          drug_formulation: "口服液",
          drug_factory: "山东东阿阿胶股份有限公司",
          drug_illegal: "否",
          drug_illnum: "无",
          drug_code: "6921168594368",
          drug_validity: "2020-1-1",
          drug_remarks: "无"
        },
        {
          drug_name: "阿胶",
          drug_common: "阿胶",
          drug_id: "072223",
          drug_type: "保健药",
          drug_unit: "盒",
          drug_num: 566,
          drug_wholeSale: 30,
          drug_sale: 50,
          drug_vipSale: 40,
          drug_norm: "每盒4*12粒",
          drug_approval: "鲁东卫食准字(2002)第GQ0004号",
          drug_formulation: "口服液",
          drug_factory: "山东东阿阿胶股份有限公司",
          drug_illegal: "否",
          drug_illnum: "无",
          drug_code: "6921168594368",
          drug_validity: "2020-1-1",
          drug_remarks: "无"
        },
        {
          drug_name: "阿胶",
          drug_common: "阿胶",
          drug_id: "072223",
          drug_type: "保健药",
          drug_unit: "盒",
          drug_num: 566,
          drug_wholeSale: 30,
          drug_sale: 50,
          drug_vipSale: 40,
          drug_norm: "每盒4*12粒",
          drug_approval: "鲁东卫食准字(2002)第GQ0004号",
          drug_formulation: "口服液",
          drug_factory: "山东东阿阿胶股份有限公司",
          drug_illegal: "否",
          drug_illnum: "无",
          drug_code: "6921168594368",
          drug_validity: "2020-1-1",
          drug_remarks: "无"
        }
      ]
    };
  },
  created() {
    debugger;
    // this.$route.query;
    this.$route.params;
  },
  methods: {
    exportExcel() {
      /* out-table关联导出的dom节点 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "药品信息.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  }
};
</script>

<style scoped>
.el-table td,
.el-table th {
  padding: 2px 0;
  min-width: 0;

  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
.el-table thead {
  color: black;
}
table {
  border-spacing: 0px;
}
</style>

