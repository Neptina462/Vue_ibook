<template>
    <div class="regist_container">
        <div class="regist_box">
            <div class="avatar_box">
                <img src="../../assets/alice.png" alt="">
            </div>

            <el-form ref="registFormRef" label-width="0px" class="regist_form" :model="registForm" :rules="registFormRules">
                <!-- 输入栏 -->
                <el-form-item prop="username">
                    <el-input v-model="registForm.username" placeholder="用户名" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="registForm.password" placeholder="密码" prefix-icon="el-icon-key" type="password"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-radio-group v-model="selector" size="medium">
                        <el-radio  label="注册为学生"></el-radio>
                        <el-radio  label="注册为管理员"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <!-- 按钮 -->
                <el-form-item >
                    <el-row :gutter="40" type="flex">
                        <el-col :span="4">
                            <el-button type="warning" @click="backLogin">返回</el-button>
                        </el-col>
                        <el-col :span="4" :offset="8">
                            <el-button type="primary" @click="Regist">确定注册</el-button>                     
                        </el-col>
                        <el-col :span="4" :offset="2">
                            <el-button type="info" @click="resetRegistForm">重置</el-button> 
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
            registForm: {
                username: '',
                password: '',
                usertype: true
            },
            selector: '',   //选项
            //登录规则检测对象
            registFormRules: {
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
                ],
            }
        }
    },
    methods: {
        // 重置输入框
        resetRegistForm() {
            this.$refs.registFormRef.resetFields();
        },

        // 提交注册
        Regist() {
            // 预验证函数
            if(this.selector == '') return this.$message.error('请选择注册身份');
            if(this.selector == '注册为学生')
                this.registForm.usertype = true;
            else
                this.registForm.usertype = false;
            console.log(this.registForm.usertype);

            this.$refs.registFormRef.validate(async valid => {
                console.log(valid);
                if (!valid)
                    return;
                // 验证无误，post请求
                 this.$http.post('regist', this.registForm)
                .then(response => {
                    console.log(response);
                    this.$message.success('注册成功，返回登录页面');
                    this.$router.push('/login');
                })
                .catch( error => {
                    console.log(error);
                    this.$message.error('注册失败');
                });
            });
        },
        // 返回登录页面
        backLogin() {
            this.$router.push('/login')
        }

    }
}

</script>

<style  scoped>
.regist_container {
    background-color: #2b4b6b;
    height: 100%;
}

.regist_box {
    width: 450px;
    height: 350px;
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


.regist_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

}
</style>
