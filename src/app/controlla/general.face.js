var path = require('path'),
    basePath = path.dirname(require.main.filename),
    consts = require("../lib/constants.js"),
    comModel = require(process.env.modelRoot+"comment.model.js"),
    fontModel = require(process.env.modelRoot+"font.model.js"),
    ratingModel = require(process.env.modelRoot+"rating.model.js"); 

function userComments(uName){//all comments from user uName
    return comModel.getFromUserName(uName);
}
function fontComments(fontId){//all comments for font
    return comModel.getFromFontId(fontId);
}
function newComment(uid,fid,text){//return bool
    return comModel.insertComment(uid,fid,text);
}
function newRating(uid,type,id,rating){//add rating to type (constant)
    //if rate on font
    if(type == consts.FONT ){
        return ratingModel.addFont(uid,id,rating);
    } else if (type == consts.COMMENT){
        return ratingModel.addComment(uid,id,rating);
    }
    return false;
}
function getFontById(fid){//returns 1 font
    return fontModel.get(fid);
}
function getFontByName(fName){//returns x fonts with exact name
    return fontModel.getByName(fName);
}
function getAllFonts(){//like. all
    return fontModel.getAll();
}
function getFontHistory(fid){//pop history of font id
    return fontModel.getHistory(fid);
}
function getMostPopular(){//most popular x fonts
    return fontModel.getPopular();
}

module.exports = {
    userComments:userComments,
    fontComments:fontComments,
    newComment:newComment,
    newRating:newRating,
    getFontByName:getFontByName,
    getFontById:getFontById,
    getAllFonts:getAllFonts,
    getFontHistory:getFontHistory,
    getMostPopular:getMostPopular
}