// 定义查询总数量
const AllCount = async (query, DataBase) => {
    let allCounter = await DataBase.find(query).count();
    return allCounter;
}

// 定义普通全部查询的方法
const QueryDataBase = async (query, DataBase) => {
    let queryData =
    await DataBase.find(query).
        exec((err, data) => {
            if (err) {
                return false;
            } else {
                return data || [];
            }
        });
    return queryData;
}

// 定义分页查询
const EachQueryDataBase = async (query, limit, skip, DataBase) => {
    // 查询分页数据
    let eachQuqeryData = async () => {
        return await DataBase.find(query).limit(limit).skip(skip).
            exec((err, data) => {
                if (err) {
                    return false;
                } else {
                    return data || [];
                }
            });
    }
    let [allCount, equeryData] = await Promise.all([
        AllCount(query, DataBase),
        eachQuqeryData()
    ]);
    return {
        count: allCount,
        eachData: equeryData
    };
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
    DeletDataBase: DeletDataBase,
    EachQueryDataBase: EachQueryDataBase
}