<template>
    <div>
        <el-button type="info" @click="logout">退出</el-button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            user:{
                username:'',
                usertype:'',
                usernum:''
            }
        }
    },
    methods :{
        //退出按钮
        logout(){
            //释放所有session
            window.sessionStorage.clear();
            this.$router.push('/login');
        }
    }

}
</script>
