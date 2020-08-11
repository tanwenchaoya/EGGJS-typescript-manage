export default {
    username:{
        type:'string',
        trim:true,
        format:/^[a-zA-Z]{6,}$/,
        message:"用户名不能少于6位"
    },
    password:{
        type:'string',
        trim: true,
        format: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{8,20}$/,
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