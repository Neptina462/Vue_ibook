<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div class="headline">
                <img src="../../assets/alice.png" class="logo-pic">
                <span class="headtitle">自习室预定系统</span>
            </div>
            
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '70px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">
                    |||
                </div>
                <!-- 侧边栏菜单 -->
                <el-menu background-color="#373d41" text-color="#fff"
                active-text-color="#ffd04b" :unique-opened="true" :collapse="isCollapse" 
                :collapse-transition="false" :router="true" :default-active="menuSelect">
                    <el-menu-item :index="menuJump.studentMain" @click="() => { menuSelect = menuJump.studentMain }">
                        <i class="el-icon-menu"></i>
                        <span slot="title">主页</span>
                    </el-menu-item>
                    <el-menu-item :index="menuJump.studentRoom" @click="() => { menuSelect = menuJump.studentRoom }">
                        <i class="el-icon-menu"></i>
                        <span slot="title">自习室</span>
                    </el-menu-item>
                    <el-submenu >
                        <template slot="title">
                            <i class="el-icon-menu"></i> 
                            <span>预定管理</span>
                        </template>
                        <el-menu-item-group title="我的预定">
                            <el-menu-item :index="menuJump.studentOrder" @click="() => { menuSelect = menuJump.studentOrder }">预定中</el-menu-item>
                            <el-menu-item :index="menuJump.studentHistory" @click="() => { menuSelect = menuJump.studentHistory }">预定历史</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 中间主区域 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

export default {
    data() {
        return {
            user:{
                username:'',
                usertype:'',
                usernum:''
            },

            //侧边栏折叠
            isCollapse: false,
            //菜单高亮变量
            menuSelect: '/studentmain',
            menuJump: {
                studentMain: '/studentmain',
                studentRoom: '/studentroom',
                studentOrder: '/studentorder',
                studentHistory: '/studenthistory'
            }
        }
    },
    methods :{
        //退出按钮
        logout(){
            //释放所有session
            window.sessionStorage.clear();
            this.$router.push('/login');
        },
        //侧边栏折叠按钮
        toggleCollapse(){
            this.isCollapse = !this.isCollapse;
        }
    },
    created() {
        this.menuSelect = window.sessionStorage.getItem('page');
    }

}
</script>

<style scoped>

.home-container {
    height: 100%;
}

.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
}
.el-aside {
    background-color: #373d41;
}
.el-main {
    background-color: #eaedf1;
}

.logo-pic {
    width:70px;
    height: 100%;
}

.headline {
    display: flex;
    align-items: center;
}

.headtitle {
    margin-left: 10px;
}

.el-icon-menu {
    margin-right: 10px;
}

.el-menu {
    border-right: none;
}

.toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}

</style>
