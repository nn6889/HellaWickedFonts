const conn = require("./db.js");

const getOneQuery = "select * from public.user where user_id = $1;",
	getAllQuery = "select * from public.user",
	updateQuery = "",
	deleteQuery = "delete from public.user where user_id = $1",
	getCredsQuery = "Select * from public.user where username = $1";
	insertUserQuery = "Insert into public.user (username,first_name,last_name, password, salt) values($1,$2,$3,$4,$5)",
	searchQuery = "Select username,first_name,last_name,email,user_id from public.user where username like concat('%',$1,'%') OR email like concat('%',$1,'%')";

function getUser(id,res){
	return conn.execute(getOneQuery,[id]) ;		
}

function getCredentials(uName){
	return conn.execute(getCredsQuery,[uName]);
}

function addNewUser(uName,pWord,fname,lname,salt){
	return conn.execute(insertUserQuery,[uName,fname,lname,pWord,salt]);
}

function search(txt){
	return conn.execute(searchQuery,[txt]);
}
module.exports = {
	get: getUser,
	addNewUser:addNewUser,
	getCredentials:getCredentials,
	search:search
}