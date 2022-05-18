<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>主页</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-input placeholder="请输入内容"  class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            
        </el-card>
    </div>
</template>

<script>
export default {
    created() {
        this.menuSelect = window.sessionStorage.setItem('page', '/studentmain');
    }
}
</script>

<style scoped>

.el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
}

.el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
</style>