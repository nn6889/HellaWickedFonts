var path = require('path'),
    basePath = path.dirname(require.main.filename),
    pageRoot =  basePath + "/app/resources/pages",
    controller = require(basePath+"/app/controlla/index.face.js"),
    usrModel = require(process.env.modelRoot+"user.model.js"),
    md5 = require("md5"),
    fs = require('fs'),
    tjs = require("templatesjs");

tjs.dir = basePath+"/app/resources/templates/";

var list = {
    title: "Home",
	
    //if the user is logged in, show "logged in" nav template
	nav: fs.readFileSync( basePath+"/app/resources/templates/logged_in.html"),
	//if the user is logged out, show "logged in" nav template
    //nav: fs.readFileSync( basePath+"/app/resources/templates/logged_out.html"),
	
	// the base gravatar url / md5 email / cosmetic (icon size)
    icon: process.env.icon_url + "fd675280dec9225f301bd5c90dc2bf1b" + "?s=45&d=mm&r=g"
} //attributes we want to display



function prefPage(req,res){
    list.title = "Your Preferences";
	list.username = req.session.user.username;
	list.email = req.session.user.email;
	list.first_name = req.session.first_name;
	list.last_name = req.session.last_name;
	list.gravatar_base_url = process.env.icon_url;
    list.user_id = req.session.user.user_id;
    
    var data = fs.readFileSync(pageRoot+'/preferences.html');
    renderRequestedPage(data, res); 
}

function userPage(uid,req,res){ //TODO - db search on userid
    list.title = "View User";
    var client = usrModel.get(uid);
    client(function(err,vals){
        if(err){
            //todo
            console.log(err);
            return;
        }
        if(vals.rows[0]){
            aUser = vals.rows[0];
            list.username = aUser.username;
            list.user_icon = makeGravLink(aUser.email);
            list.user_id = aUser.user_id;
        }
        var data = fs.readFileSync(pageRoot+'/user.html');
        renderRequestedPage(data, res); 
    });

}

function signup(req,res){
    list.title = "Signup";
    var data = fs.readFileSync(pageRoot+'/signup.html');
    renderRequestedPage(data, res); 
}

function homePage(req,res){
    var data = fs.readFileSync(pageRoot+'/index.html');
    renderRequestedPage(data, res);
}

function loginPage(req,res){
    list.title = "Login";
    var data = fs.readFileSync(pageRoot+'/login.html');
    renderRequestedPage(data, res); 
}

module.exports = {
    prefPage:prefPage,
    userPage:userPage,
    signup:signup,
    homePage:homePage,
    loginPage:loginPage
}




function makeGravLink(email){
    return process.env.icon_url+"avatar/"+md5((email.trim()).toLowerCase() );
}

function renderRequestedPage(data, res) {
    tjs.setSync(data);   
    var output = tjs.renderAllSync(list);  
    res.write(output);  
    res.end(); 
} //end function: renderRequestedPage