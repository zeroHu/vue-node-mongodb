// 定义查询的方法
const QueryDataBase = async (query, DataBase) => {
    let queryData = await DataBase.find(query, function(err, data) {
        if (err) {
            console.error('-------query function is error --------');
            return false;
        } else {
            return data || [];
        }
    });
    return queryData;
}

exports = module.exports = {
    QueryDataBase: QueryDataBase
}