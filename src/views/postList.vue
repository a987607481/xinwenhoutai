<template>
  <div class="list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="postList" style="width: 100%;margin-top:20px">
      <!-- 显示每条数据前面的索引 -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="480"></el-table-column>
      <el-table-column prop="create_date" label="日期" width="280">
           <template slot-scope="scope">{{scope.row.create_date | dateFormat('-')}}</template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">{{scope.row.type | typeFormat}}</template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="150"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button type="success " icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning " icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getPostList } from '@/apis/posts.js'
export default {
  // 过滤器
  filters: {
    typeFormat (type) {
      return type === 1 ? '文章' : '视频'
    },
    dateFormat (data, spe) {
      data = new Date(data)
      spe = spe || '/'
      let year = data.getFullYear()
      let month = data.getMonth() + 1
      let day = data.getDate()
      let hours = data.getHours()
      let min = data.getMinutes()
      let sec = data.getSeconds()
      return year + spe + month + spe + day + ' ' + hours + ':' + min + ':' + sec
    }
  },
  data () {
    return {
      postList: [],
      pageIndex: 1,
      pageSize: 2,
      total: 0
    }
  },
  methods: {
    // 初始化
    async init () {
      let res = await getPostList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      this.postList = res.data.data
      // 获取总记录数
      this.total = res.data.total
      console.log(this.postList)
    },
    // 切换每页显示记录数时触发
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    // 切换当前页码时触发
    handleCurrentChange (val) {
      this.pageIndex = val
      this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
</style>
