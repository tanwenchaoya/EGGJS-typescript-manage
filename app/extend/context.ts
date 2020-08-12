module.exports = {
    success(data,status = 200,msg = '成功'){
        this.body = {
            code:status,
            msg:msg,
            data:data
        }
    },
    error(status = 500,msg = '错误'){
        this.body = {
            code:status,
            msg:msg
        }
    }

}