


const searchHelper = (searchKey, query, req) => {


    if (req.query.search) {

        const searchObject = {};

        const regexp = new RegExp(req.query.search, "i");

        searchObject[searchKey] = regexp;

        return query = query.where(searchObject)

    }

    return query;



}


const paginationHelper = async (totalDocument, query, req) => {

    const total = totalDocument;


    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit;

    const endIndex = page * limit;

    const pagination = {};

    if (startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit: limit,
            total: total
        }
    }
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit,
            total:total
        }
    }

    return {
        query: query === undefined ? undefined : query.skip(startIndex).limit(limit),
        pagination: pagination,
        startIndex,
        limit
    }



}



module.exports = {
    searchHelper,
    paginationHelper
}