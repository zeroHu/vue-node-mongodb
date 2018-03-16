// 定义查询的方法
const QueryDataBase = async (query, DataBase) => {
    let queryData = await DataBase.find(query, function(err, data) {
        if (err) {
            return false;
        } else {
            return data || [];
        }
    });
    return queryData;
}

// 定义更新数据库的方法
const UpdataDataBase = async (queryId, updataJson, DataBase) => {
    let updataData = await DataBase.findByIdAndUpdate(queryId, updataJson);
    return updataData;
}

// 定义删除数据库的方法
const DeletDataBase = async (queryId, DataBase) => {
    let deleteData = await DataBase.findByIdAndRemove(queryId);
    return deleteData
}

exports = module.exports = {
    QueryDataBase: QueryDataBase,
    UpdataDataBase: UpdataDataBase,
    DeletDataBase: DeletDataBase
}