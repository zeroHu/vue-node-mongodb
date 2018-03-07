exports = module.exports = {
    error: msg => {
        return {
            status: -1,
            msg: msg || '接口数据返回异常'
        }
    },
    right: (data, msg) => {
        return {
            status: 0,
            msg: msg || '接口数据返回正常',
            data: data || []
        }
    }
}