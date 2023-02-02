<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入考卷名称" suffix-icon="el-icon-search" v-model="qname"></el-input>
      <el-input style="width: 200px" placeholder="请输入考卷类型" suffix-icon="el-icon-document" class="ml-5"
        v-model="qtype"></el-input>
      <el-input style="width: 200px" placeholder="请输入考卷日期" suffix-icon="el-icon-date" class="ml-5"
        v-model="qdate"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="info" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      <el-popconfirm class="ml-5" confirm-button-text='确定' cancel-button-text='我再想想' icon="el-icon-info"
        icon-color="red" title="您确定批量删除吗？" @confirm="delBatch">
        <el-button slot="reference">批量删除<i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
      <el-upload action="http://localhost:9090/quesbank/import" style="display: inline-block"
        :on-success="handleExcelImportSuccess" :show-file-list="false" accept="xlsx">
        <el-button class="ml-5">导入<i class="el-icon-bottom"></i></el-button>
      </el-upload>
      <el-button @click="exp" class="ml-5">导出<i class="el-icon-top"></i></el-button>
    </div>

    <el-table :data="tableData" @selection-change="handleSelectionChange" @row-dblclick="goContent">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="卷号" width="80"></el-table-column>
      <el-table-column prop="qdate" label="考卷日期" width="140"></el-table-column>
      <el-table-column prop="qtype" label="考卷类型" width="200"></el-table-column>
      <el-table-column prop="qname" label="考卷名称" width="450"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
          <el-popconfirm class="ml-5" confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info"
            icon-color="red" title="您确定删除吗？" @confirm="del(scope.row.id)">
            <el-button type="danger" icon="el-icon-delete" circle slot="reference"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
        :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog title="考卷信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="考卷名称">
          <el-input v-model="form.qname" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="考卷类型">
          <el-input v-model="form.qtype" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "QuesBank",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      qname: "",
      qtype: "",
      qdate: "",
      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
      qtype1: ""
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/quesbank/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          qname: this.qname,
          qtype: this.qtype,
          qdate: this.qdate
        }
      }).then(res => {
        this.tableData = res.records
        this.total = res.total
      })
    },
    save() {
      this.request.post("/quesbank/post", this.form).then(res => {
        if (res) {
          this.$message.success("上载成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("上载失败")
        }
      })
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit(row) {
      this.form = row
      this.dialogFormVisible = true
    },
    del(id) {
      this.request.delete("/quesbank/" + id).then(res => {
        if (res) {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delBatch() {
      let ids = this.multipleSelection.map(v => v.id) //[{},{},{]] => [1,2,3]
      this.request.post("/quesbank/del/batch", ids).then(res => {
        if (res) {
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    },
    reset() {
      this.qname = ""
      this.qtype = ""
      this.qdate = ""
      this.load()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    exp() {
      window.open("http://localhost:9090/quesbank/export")
    },
    handleExcelImportSuccess() {
      this.$message.success("导入成功")
      this.load()
    },
    goContent(row) {
      this.qtype1 = row.qtype
      this.$router.push({
        path: '/home',
        query: {
          qtype: this.qtype1
        }
      })
    }

  }
}
</script>

<style scoped>

</style>