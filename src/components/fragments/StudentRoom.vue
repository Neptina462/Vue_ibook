<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>自习室列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片 -->
        <el-card class="box-card">
            <!-- 搜索栏 -->
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-input placeholder="请输入内容"  v-model="queryInfo.query" class="input-with-select"
                    clearable @clear="getRoomList">
                        <el-button slot="append" icon="el-icon-search"
                        @click="getRoomList" >
                        </el-button>
                    </el-input>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="roomList.slice((queryInfo.pagenum-1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize)" border stripe>   
                <el-table-column type="index"></el-table-column>
                <el-table-column label="教室" prop="name"></el-table-column>
                <el-table-column label="总座位" prop="sum"></el-table-column>
                <el-table-column label="空位" prop="empty"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="查看" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        </el-tooltip>                        
                    </template>
                </el-table-column>
            </el-table>

            <!-- 底部分页栏 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>


<script>
export default {
    data(){
        return {
            // 列表的设置参数
            queryInfo: {
                query: '',
                // 当前页数
                pagenum: 1,
                // 当前每页多少条数据
                pagesize: 2
            },
            // 自习室列表
            roomList:[
                {
                    name:'103',
                    sum:20,
                    empty:20
                },
                {
                    name:'203',
                    sum:70,
                    empty:30
                },
                {
                    name:'303',
                    sum:50,
                    empty:40
                },
            ],
            // 总数量
            total: 4
        }
    },
    methods: {
        //获取自习室列表
        async getRoomList(){
            this.$http.get('getroomlist')
            .then( response=>{
                console.log(response);
            })
            .catch( error => {
                console.log(error);
            });
        },

        // 表格规格变化
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize;
            this.getRoomList();
        },

        //监听页码值改变
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage;
            this.getRoomList();
        }
    },
    created() {
        //设置当前页面参数
        window.sessionStorage.setItem('page','/studentroom');

        this.getRoomList();
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

.el-table {
    margin-top: 15px;
    font-size: 12px;
}
</style>