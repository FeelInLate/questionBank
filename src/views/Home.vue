<template>
  <div>
    <div style="margin: 10px 0">
      <el-button @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
    </div>
    <el-divider></el-divider>
    <div class="hello">
      <dl v-for="(item, index) in timu" :key="item.id">
        <dt>{{ index + 1 }}、{{ item.tname }}</dt>
        <ol type="A" style="margin-left: 20px; display: inline-block">
          <li>{{ item.op1 }}</li>
          <li>{{ item.op2 }}</li>
          <li>{{ item.op3 }}</li>
          <li>{{ item.op4 }}</li>
        </ol>
        <div style="margin-top: 10px; ">
          <el-button type="success" @click="handleEdit(item)">修改<i class="el-icon-edit"></i></el-button>
          <el-popconfirm class="ml-5" confirm-button-text="确定" cancel-button-text="取消" icon="el-icon-info"
            icon-color="red" title="您确定删除吗？" @confirm="del(item.id)">
            <el-button type="danger" slot="reference">删除<i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </div>
        <el-divider></el-divider>
      </dl>
    </div>
    <el-dialog title="题目信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px">
        <el-link style="margin-left: 10px; margin-bottom: 10px" type="primary" href="https://simpletex.cn/ai/latex_ocr"
          target="_blank">SimpleTex在线识别</el-link>
        <el-form-item label="题目名称">
          <el-input v-model="form.tname" autocomplete="off" clearable type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="题目类型">
          <el-input v-model="form.ttype" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="选项A">
          <el-input v-model="form.op1" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="选项B">
          <el-input v-model="form.op2" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="选项C">
          <el-input v-model="form.op3" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="选项D">
          <el-input v-model="form.op4" autocomplete="off" clearable></el-input>
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
import MathJax from "../utils/MathJax";
export default {
  name: "Home",
  data() {
    return {
      timu: [],
      getData: "",
      dialogFormVisible: false,
      form: {},
    };
  },
  created() {
    this.getData = this.$route.query.qtype;
  },
  mounted() {
    this.getAll();
    this.load(this.getData);
    this.formatMath();
  },
  methods: {
    del(id) {
      this.request.delete("/timu/" + id).then((res) => {
        if (res) {
          this.$message.success("删除成功");
          this.getAll();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    handleEdit(row) {
      this.form = row;
      this.dialogFormVisible = true;
    },
    getAll() {
      this.request.get("/timu/getAll").then((res) => {
        this.timu = res;
      });
    },
    save() {
      this.request.post("/timu/post", this.form).then((res) => {
        if (res) {
          this.$message.success("上载成功");
          this.dialogFormVisible = false;
        } else {
          this.$message.error("上载失败");
        }
      });
    },
    load(getType) {
      this.request
        .get("/timu", {
          params: {
            ttype: getType,
          },
        })
        .then((res) => {
          this.timu = res;
        });
    },
    formatMath() {
      let that = this;
      setTimeout(function () {
        that.$nextTick(function () {
          if (!MathJax.isMathjaxConfig) {
            //判断是否初始配置，若无则配置。
            MathJax.initMathjaxConfig();
          }
          MathJax.MathQueue("hello"); //传入组件id，让组件被MathJax渲染
        });
      }, 500);
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.form = {};
    },
  },
};
</script>
