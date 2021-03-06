const conn = require("./db.js");

const getFromNameQuery = "select family,source_json,popularity,kind,username,comment_text,comment_id,public.user.user_id, AVG(rating.rating) "+
        "from public.comment join public.font using(font_id) join public.user using(user_id) left join rating ON comment.comment_id = rating.comment_id  where public.user.username = $1 group by comment.comment_id;",

    getFromFontIdQuery ="select username,comment_text,comment_id,public.user.user_id AVG(rating.rating) "+
        "from public.comment join public.font using(font_id) join public.user using(user_id) left join rating ON comment.comment_id = rating.comment_id where public.font.font_id = $1 group by comment.comment_id;",
    
        insertQuery="insert into public.comment (user_id,font_id,comment_text) values ($1,$2,$3)";


function getFromUserName(uName){
    return conn.execute(getFromNameQuery,[uName]);
}

function getFromFontId(fid){
    return conn.execute(getFromFontIdQuery,[fid]);
}

function insertComment(uid,fid,text){
    return conn.execute(insertQuery,[uid,fid,text]);
}

module.exports = {
    getFromUserName:getFromUserName,
    getFromFontId:getFromFontId,
    insertComment:insertComment
}