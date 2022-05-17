<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../../assets/alice.png" alt="">
            </div>

            <el-form ref="loginFormRef" label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules">
                <!-- 输入栏 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" placeholder="密码" prefix-icon="el-icon-key" type="password"></el-input>
                </el-form-item>

                <!-- 按钮 -->
                <el-form-item >
                    <el-row :gutter="40" type="flex">
                        <el-col :span="4">
                            <el-button type="warning" @click="jumpRegister">注册</el-button>
                        </el-col>
                        <el-col :span="4" :offset="10">
                            <el-button type="primary" @click="login">登录</el-button>                     
                        </el-col>
                        <el-col :span="4">
                            <el-button type="info" @click="resetLoginForm">重置</el-button> 
                        </el-col>                       
                    </el-row>                
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            // 登录提交数据
            loginForm: {
                username: '',
                password: '',
            },
            //  身份数据
            userType: true,
            //登录规则检测对象
            loginFormRules: {
                username: [
                    { 
                        required:true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }
                ],
                password: [
                    { 
                        required:true,
                        message: "请输入密码",
                        trigger: "blur"
                    }
                ]
            }
        }
    },
    methods: {
        // 重置输入框
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields();
        },

        // 登录
        login() {
            // 预验证函数
            this.$refs.loginFormRef.validate(async valid => {
                console.log(valid);
                if (!valid)
                    return;
                // 验证无误，post请求
                 this.$http.post('login', this.loginForm)
                .then(response => {
                    console.log(response);
                    this.$message.success('登录成功');
                    if (this.loginType)
                        this.$router.push('/studentHome');
                    else
                        this.$router.push('/adminHome');
                })
                .catch( error => {
                    console.log(error);
                    this.$message.error('登录失败');
                    });
            });
        },

        //跳转注册页面
        jumpRegister(){
            this.$router.push('/register');
        }
    }
}

</script>

<style  scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

}

.avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
}

img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
}

.btns {
    display: flex;
    justify-content: flex-end;
}


.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

}

</style>
