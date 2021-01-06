const areaService = require('../Services/Area.service');
const areaController = {};

//common function for all try and catch. I am try to maintain DRY Principal.
async function commonParams(res, callbackFunc){
    try{
        const area = await callbackFunc();
        return res.status(200).json(area)
    } catch (e) {
        console.error(e);
        return res.status(500).json({message: 'OPPS!!! there are some problem.'});
    }
};

//post data
areaController.postData = async (req, res, next) => {
    commonParams(res, () => areaService.postData(req.body));
};

//get All data
areaController.getAllData = async (req, res, next) => {
    commonParams(res, () => areaService.getAllData());
};

//getById 
areaController.getById = async (req, res, next) => {
    commonParams(res, () => areaService.getById(req.query.id));
};

//patch data by id
areaController.patchById = async (req, res, next) => {
    commonParams(res, () => areaService.patchById(req.body));
};

//put data by id
areaController.putById = async (req, res, next) => {
    commonParams(res, () => areaService.putById(req.body));
};

//post data
areaController.deleteById = async (req, res, next) => {
    commonParams(res, () => areaService.deleteById(req.body.id));
};
module.exports = areaController;