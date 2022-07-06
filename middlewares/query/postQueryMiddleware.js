const asyncErrorWrapper = require("express-async-handler");
const {populateHelper} = require("./queryMiddlewareHelpers");


const postQueryMiddleware = (model,options) => {

    return asyncErrorWrapper(async function(req,res,next){


        let query = model.find()

        query = populateHelper(query,options.population)


        const queryResults = await query;



        res.queryResults = {
            success:true,
            count:queryResults.length,
            data:queryResults,
        }   

        next();


    })
    

}

module.exports = {
    postQueryMiddleware
}