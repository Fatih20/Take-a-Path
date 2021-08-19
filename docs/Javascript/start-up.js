// localStorage.removeItem("dark_theme");

var is_in_game = false;
var path_taken;

if (localStorage.getItem("path_taken") !== undefined && localStorage.getItem("path_taken") !== null ) {
    continue_game ();
	is_in_game = true;
    console.log(localStorage.getItem("path_taken"));
    path_taken = JSON.parse(localStorage.getItem("path_taken"));
    console.log(path_taken);
    update_play_area (path_taken[path_taken.length-1][1]);
    display_attribution(true);
    
} else {
    new_game();
    var path_taken = [["0", "Start"]];
    const start_button = document.querySelector(".start-button");
    start_button.addEventListener('click', function(){
        is_in_game = true;
		console.log("click");
        change_flex_direction_play_area("row");
        change_title_to_game();
        director("A");
        display_attribution(true);
        })
}

function new_game () {
    const title = document.querySelector(".title");
    title.innerHTML = "Start your adventure";

    const play_area = document.querySelector(".play-area");
    play_area.classList.add("play-area-start");

    const start_button = document.createElement('a');
    start_button.setAttribute("href", "#");
    start_button.className = "start-button button start-button-light"
    start_button.innerHTML = "<p>Take your path</p>";

    play_area.appendChild(start_button);
}

function continue_game () {
    const title = document.querySelector(".title");
    title.innerHTML = "Enjoy your adventure";
    
    const play_area = document.querySelector(".play-area");
    play_area.classList.add("play-area-game");
}

function change_title_to_game (){
    const title = document.querySelector(".title");
    title.innerHTML = "Enjoy your adventure";
}

function change_theme () {
	console.log(dark_theme);
	localStorage.removeItem("dark_theme");
	localStorage.setItem("dark_theme", JSON.stringify(dark_theme));
	console.log(localStorage.getItem("dark_theme"));

    const body = document.querySelector("body");
    const theme_toggle = document.querySelector(".theme-toggle");
    const title = document.querySelector(".title");
    const play_area = document.querySelector(".play-area");
    const attribution = document.querySelector(".attribution");
    
    body.classList.toggle("body-dark", dark_theme);
    body.classList.toggle("body-light", !dark_theme);

    theme_toggle.classList.toggle("theme-toggle-dark", dark_theme);
    theme_toggle.classList.toggle("theme-toggle-light", !dark_theme);
    theme_toggle.classList.toggle("fa-moon", dark_theme);
    theme_toggle.classList.toggle("fa-sun", !dark_theme);

    title.classList.toggle("title-dark", dark_theme);
    title.classList.toggle("title-light", !dark_theme);

    play_area.classList.toggle("play-area-dark", dark_theme);
    play_area.classList.toggle("play-area-light", !dark_theme);
	
    attribution.classList.toggle("attribution-dark", dark_theme);
    attribution.classList.toggle("attribution-light", !dark_theme);
	
	if (is_in_game === true) {
    	const choice_list = document.querySelectorAll(".choice");
		for (choice of choice_list) {
			choice.classList.toggle("choice-dark", dark_theme);
    		choice.classList.toggle("choice-light", !dark_theme);
		}
	} else {
		const start_button = document.querySelector(".start-button");
		start_button.classList.toggle("start-button-dark", dark_theme);
    	start_button.classList.toggle("start-button-light", !dark_theme);
	}
}

function toggle_theme () {
    console.log('theme switched');
	console.log(dark_theme);
    dark_theme = !dark_theme;
	console.log(dark_theme);
	change_theme()
}

if (localStorage.getItem("dark_theme") !== undefined && localStorage.getItem("dark_theme") !== null ) {
	var dark_theme = JSON.parse(localStorage.getItem("dark_theme"));
	// console.log(dark_theme);
} else {
	var dark_theme = false;
}
change_theme ();

// console.log(dark_theme);

const theme_toggle = document.querySelector(".theme-toggle");
theme_toggle.addEventListener('click', function() {
	toggle_theme();
});

/*
function toggle_theme () {
    console.log('theme switched');
    dark_theme = !dark_theme;
    const body = document.querySelector("body");
    const theme_toggle = document.querySelector(".theme-toggle");
    const title = document.querySelector(".title");
    const play_area = document.querySelector(".play-area");
    const start_button = document.querySelector(".start-button");
    const choice = document.querySelector(".choice");
    const attribution = document.querySelector(".attribution");
    
    body.classList.toggle("body-dark", dark_theme);
    body.classList.toggle("body-light", !dark_theme);

    theme_toggle.classList.toggle("theme-toggle-dark", dark_theme);
    theme_toggle.classList.toggle("theme-toggle-light", !dark_theme);

    title.classList.toggle("title-dark", dark_theme);
    title.classList.toggle("title-light", !dark_theme);

    play_area.classList.toggle("play-area-dark", dark_theme);
    play_area.classList.toggle("play-area-light", !dark_theme);

    attribution.classList.toggle("attribution-dark", dark_theme);
    attribution.classList.toggle("attribution-light", !dark_theme);

    choice.classList.toggle("choice-dark", dark_theme);
    choice.classList.toggle("choice-light", !dark_theme);

    start_button.classList.toggle("start-button-dark", dark_theme);
    start_button.classList.toggle("start-button-light", !dark_theme);
}
*/