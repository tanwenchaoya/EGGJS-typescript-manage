export default {
    email:{
        type:'string',
        trim:true,
        format:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message:"邮箱格式不正确"
    },
    password:{
        type:'string',
        trim: true,
        format: /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9.]{8,20}$/,
        message: "密码不符合规范"
    },
    captcha:{
        type:'string',
        format:/^[a-zA-Z0-9]{4}$/,
        message:'验证码不符合要求'
    },
    registerType:{
        type:'enum',
        values:['normal','email','phone']
    }
}