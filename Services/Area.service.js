const areaModel = require('../models/Area.model');
const areaService = {};

//post Data
areaService.postData = area => {
    return areaModel.create(area)
};

//get all Data
areaService.getAllData = () => {
    return areaModel.find();
};

//get data by id
areaService.getById = id => {
 return areaModel.findById({_id: id});
};

//patch by id
areaService.patchById = body => {
    const id = body.id;
    return areaModel.findByIdAndUpdate(id, body, { new: true });
};

//put by id
areaService.putById = body => {
    const id = body.id;
    return areaModel.findOneAndReplace({_id: id}, body, { new: true });
};

//delete by id
areaService.deleteById = id => {
    return areaModel.findByIdAndDelete(id)
}

module.exports = areaService;