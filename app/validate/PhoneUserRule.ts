export default {
    phone:{
        type:'string',
        trim:true,
        format:/^1[345678]\d{9}$/,
        message:"手机号格式不正确"
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