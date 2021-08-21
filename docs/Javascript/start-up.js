// localStorage.removeItem("path_taken");
// localStorage.removeItem("dark_theme");

import { display_replay_button } from "./imported_modules/tools.js";
import { play_area_direction_row } from "./imported_modules/tools.js";
import { display_attribution } from "./imported_modules/tools.js";
import { director } from "./imported_modules/main.js";
import { update_play_area } from "./imported_modules/main.js";
import * as event_file from "./imported_modules/event.js";

const replay_button = document.querySelector(".replay-button");
replay_button.addEventListener('click', function() {
    start_game();
});

const theme_toggle = document.querySelector(".theme-toggle");
theme_toggle.addEventListener('click', function() {
	toggle_theme();
});

export function start_game (){
    const play_area = document.querySelector(".play-area");
    play_area.innerHTML = "";

    display_replay_button(false);
    display_attribution(false);

    const dark_theme_raw = localStorage.getItem("dark_theme");
    // console.log(localStorage.getItem("dark_theme"));

    if (dark_theme_raw === "undefined" || JSON.parse(dark_theme_raw) === null ) {
        var dark_theme = false;
    } else {
        var dark_theme = JSON.parse(dark_theme_raw);
    }

    localStorage.setItem("dark_theme", JSON.stringify(dark_theme));

    let path_taken = JSON.parse(localStorage.getItem("path_taken"));
    
    let state_of_game = 0;
    localStorage.setItem("state_of_game", state_of_game);

    if (path_taken !== undefined && path_taken !== null ) {
        set_play_area_new_game (false);
        display_attribution(true);
        path_taken = JSON.parse(localStorage.getItem("path_taken"));
        update_play_area (path_taken, event_file);
        change_theme (dark_theme);
        
    } else {
        set_play_area_new_game(true);
        change_theme (dark_theme);
        path_taken = [{nth_event : "0", name_of_event: "Start"}];
        const start_button = document.querySelector(".start-button");
        start_button.addEventListener('click', function(){
            play_area_direction_row (false);
            change_title_to_game();
            display_attribution(true);
            localStorage.setItem("state_of_game", 1);
            director(path_taken, "A");
            })
    }

};

function set_play_area_new_game (is_new) {
    if (is_new === true){
        const title = document.querySelector(".title");
        title.innerHTML = "Start your adventure";

        const play_area = document.querySelector(".play-area");
        play_area.classList.add("play-area-start");

        const start_button = document.createElement('a');
        start_button.setAttribute("href", "#");
        start_button.className = "start-button button start-button-light"
        start_button.innerHTML = "<p>Take your path</p>";

        play_area.appendChild(start_button);

    } else {
        localStorage.setItem("state_of_game", 1);
        const title = document.querySelector(".title");
        title.innerHTML = "Enjoy your adventure";
        
        const play_area = document.querySelector(".play-area");
        play_area.classList.add("play-area-game");
    }
};

function change_title_to_game (){
    const title = document.querySelector(".title");
    title.innerHTML = "Enjoy your adventure";
};

function change_theme (dark_theme) {
	localStorage.setItem("dark_theme", JSON.stringify(dark_theme));
    let state_of_game = JSON.parse(localStorage.getItem("state_of_game"));

    const body = document.querySelector("body");
    const theme_toggle = document.querySelector(".theme-toggle");
    const title = document.querySelector(".title");
    const play_area = document.querySelector(".play-area");
    const replay_button = document.querySelector(".replay-button");
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

    replay_button.classList.toggle("button-dark", dark_theme);
    replay_button.classList.toggle("button-light", !dark_theme);
	
    attribution.classList.toggle("attribution-dark", dark_theme);
    attribution.classList.toggle("attribution-light", !dark_theme);

	if (state_of_game === 1) {
    	const choice_list = document.querySelectorAll(".choice");
		for (let choice of choice_list) {
			choice.classList.toggle("button-dark", dark_theme);
    		choice.classList.toggle("button-light", !dark_theme);
		}
	} else if (state_of_game === 0) {
		const start_button = document.querySelector(".start-button");
		start_button.classList.toggle("button-dark", dark_theme);
    	start_button.classList.toggle("button-light", !dark_theme);
	}
};

function toggle_theme () {
    let dark_theme = JSON.parse(localStorage.getItem("dark_theme"));
    dark_theme = !dark_theme;
    localStorage.setItem("dark_theme", JSON.stringify(dark_theme));
	change_theme(dark_theme);
};