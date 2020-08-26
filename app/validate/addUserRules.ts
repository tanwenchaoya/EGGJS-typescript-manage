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
    username:{
        type:'string',
        trim:true,
        format:/^[a-zA-Z0-9]{6,}$/,
        message:"用户名不能少于6位"
    },
    email:{
        type:'string',
        trim:true,
        format:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message:"邮箱格式不正确"
    }
}