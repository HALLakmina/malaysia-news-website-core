const getSearchObj = (query = {} ) => {
    const { search } = query;
    return search ? { topic : { $regex: search, $options: 'i' } } : {};
}
 
const getPaginationObj = (query = {}) => {
    const { page = 1, limit = 10 } = query;
    return { page, limit, skip : ((page - 1) * limit) }
}

const getSortObj = (query = {}) => {
    // sortOrder ASC / DESC 
    const { sortOrder = 'ASC', sortBy = '_id' } = query;
    const obj = {}
    obj[sortBy] = sortOrder === 'DESC' ? -1 : 1
    return obj
}

module.exports = { 
    getSearchObj,
    getPaginationObj,
    getSortObj,
}