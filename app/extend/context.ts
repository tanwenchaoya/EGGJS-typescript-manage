module.exports = {
    success(data,status = 200,msg = '成功'){
        this.status=status;
        this.body = {
            code:status,
            message:msg,
            data:data
        }
    },
    error(status = 500,msg = '错误'){
        this.status=status;
        this.body = {
            code:status,
            message:msg
        }
    }

}