/************************************************************
* @desc		Handles a Search of any kind (font/user)
*			To use, initialize this class, and create a div:
*			<div id="search_container"></div>
*			
*			It will then build out the input field and
*			items needed to make the search results appear
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* @constructor
*/
function Search(search_fonts, search_users, default_search_placeholder) {
	'use strict';
	this.search_fonts = search_fonts;
	this.search_users = search_users;
	this.input_placeholder = default_search_placeholder;
	this.empty_message = "<p>No results</p>";
	this.init();
}//end function Home

/** ----------------------------------------------------------- **/
/** --------------------- INHERIT CLASSES --------------------- **/
/** ----------------------------------------------------------- **/
Search.prototype = Object.create(HellaWickedFonts.prototype);
Search.prototype.constructor = Search;

//the main place where it is needed
Search.prototype.SEARCH_CONTAINER = document.getElementById('search_container');

/**
* Initialize the app
*/
Search.prototype.init = function () {
	'use strict';
	this.buildSearchControls();
	this.buildSearchResults();
	this.hello = "hey there";
}; //end function: Search --> init


/**
* Builds out the Search controls including the search string input
* and additionally checkboxes (user/font) if they are allowed
* to search for both a user/fonts
*/
Search.prototype.buildSearchControls = function () {
	'use strict';
	var app = this;
	this.search_input = document.createElement('input');
	
	this.search_input.type = 'text';
	this.search_input.className = "max_input larger_font center";
	this.search_input.setAttribute("placeholder", this.input_placeholder || "find fonts");
	
	this.search_input.addEventListener("keyup", function () {
		app.getSearchResults(this.value); //go get the search criteria
	}); //end addEventListener --> onKeyUp (search input)
	
	//append the search input to the page
	this.SEARCH_CONTAINER.appendChild(this.search_input);
	
	if (this.search_fonts && this.search_users) {
		var search_obj = document.createElement('div');
		this.font_search_chk = document.createElement("input");
		this.font_search_lbl = document.createElement("label");
		this.user_search_chk = document.createElement("input");
		this.user_search_lbl = document.createElement("label");
		
		this.font_search_chk.type = "checkbox";
		this.font_search_lbl.innerHTML = "fonts";
		this.user_search_chk.type = "checkbox";
		this.user_search_lbl.innerHTML = "users";
		
		//append the search controls to the page
		search_obj.appendChild(this.font_search_chk);
		search_obj.appendChild(this.font_search_lbl);
		search_obj.appendChild(this.user_search_chk);
		search_obj.appendChild(this.user_search_lbl);
		this.SEARCH_CONTAINER.appendChild(search_obj);
	}//end if: are they allowed to search for both fonts/users here?
	
}; //end function: Search --> buildSearchControls



/**
* Builds the area for the search results. Additionally
* It will add an empty search (which returns pretty much everything)
*/
Search.prototype.buildSearchResults = function () {
	'use strict';
	this.search_results = document.createElement("div");
	this.SEARCH_CONTAINER.appendChild(this.search_results);
	
	//obtain just anything 
	this.getSearchResults("");
	
}; //end function: Search --> buildSearchResults


/**
* Obtain the search results based on the string in the text input
* @param search_string {string} the string to go off of
*/
Search.prototype.getSearchResults = function (search_string) {
	'use strict';
	//clear out the old search results
	this.search_results.innerHTML = "";
	
	//TESTING ONLY - REMOVE LATER
/*	var user_list = [
		{
			'username' : "memrie",
			'use_id' : 1,
			'icon_url' : 'https://www.gravatar.com/avatar/fd675280dec9225f301bd5c90dc2bf1b?s=60&d=mm&r=g'
		},
		{
			'username' : "someone",
			'use_id' : 2,
			'icon_url' : 'https://www.gravatar.com/avatar/fd675280dec9225f301bd5c90dc2bf1b?s=60&d=mm&r=g'
		}
	];
*/
	//make an ajax call
	//which can then filter into the below functions (matching fonts/users)
	
	//load any matching fonts - check for if there are any returned
	if (this.search_fonts) {
		//make an ajax call -- URL, method (get/post), Params, callback function name
		this.ajaxCall("/api/search/fonts", "GET", {search_text: search_string}, "loadMatchingFonts");
		//this.loadMatchingFonts();
	} //end if: can they search for fonts?
	
	//load any matching users - check for if there are any returned
	if (this.search_users) {
		
		//make an ajax call -- URL, method (get/post), Params, callback function name
		this.ajaxCall("/api/search/users", "GET", {search_text: search_string}, "loadMatchingUsers");
		//this.loadMatchingUsers(user_list);
	} //end if: can they search for fonts?
	
	
	//nothing returned for either one?
	//this.noResultsMessage();
	
}; //end function: Search --> getSearchResults


Search.prototype.noResultsMessage = function () {
	this.search_results.innerHTML = this.empty_message;
}; //end function: Search --> noResultsMessage


/**
* Loads any matching fonts into the search results
*/
Search.prototype.loadMatchingFonts = function (font_list, err) {
	'use strict';
	
	this.search_results.appendChild(this.getFontBox(6, true));
	this.search_results.appendChild(this.getFontBox(7, false));
	this.search_results.appendChild(this.getFontBox(4, false));
	this.search_results.appendChild(this.getFontBox(8, true));
	
}; //end function: Search --> loadMatchingFonts




/**
* Loads any matching users into the search results
*/
Search.prototype.loadMatchingUsers = function (user_list, err) {
	'use strict';
	var i,
		user_amt = user_list.length;
	
	for (i = 0; i < user_amt; i++) {
		this.addUser(user_list[i]);
	} //end for: go through all the users in the list
}; //end function: Search --> loadMatchingUsers



Search.prototype.addUser = function (user) {
	'use strict';
	var user_box = this.getUserBox(user);
	this.search_results.appendChild(user_box);
}; //end function: Search --> addUser



Search.prototype.getUserBox = function (user) {
	'use strict';
	var box = document.createElement("div"),
		username = document.createElement('a'),
		user_icon = document.createElement('img');
	
	box.classList.add('box');
	
	username.innerHTML = user.username;
	username.classList.add("font_name");
	username.setAttribute("href", "/user.php"); //user profile?
	
	user_icon.setAttribute("src", user.icon_url);
	user_icon.className = "user_avatar";
	
	box.appendChild(username);
	box.appendChild(user_icon);
	return box;
}; //end function: Search --> 


