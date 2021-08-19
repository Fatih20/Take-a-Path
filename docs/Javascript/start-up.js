// localStorage.removeItem("path_taken");

const replay_button = document.querySelector(".replay-button");
replay_button.addEventListener('click', function() {
    start_game();
});

const theme_toggle = document.querySelector(".theme-toggle");
theme_toggle.addEventListener('click', function() {
	toggle_theme();
});

function start_game (){
    const play_area = document.querySelector(".play-area");
    play_area.innerHTML = "";

    display_replay_button(false);
    display_attribution(false);

    globalThis.is_in_game = false;

    globalThis.dark_theme = JSON.parse(localStorage.getItem("dark_theme"));
    globalThis.path_taken = JSON.parse(localStorage.getItem("path_taken"));

    if (dark_theme === undefined || dark_theme === null ) {
        dark_theme = false;
    }

    if (path_taken !== undefined && path_taken !== null ) {
        set_play_area_new_game (false);
        display_attribution(true);
        is_in_game = true;
        path_taken = JSON.parse(localStorage.getItem("path_taken"));
        update_play_area (path_taken[path_taken.length-1][1]);
        change_theme ();
        
    } else {
        set_play_area_new_game(true);
        change_theme ();
        path_taken = [["0", "Start"]];
        const start_button = document.querySelector(".start-button");
        start_button.addEventListener('click', function(){
            play_area_direction_row (false);
            change_title_to_game();
            is_in_game = true;
            display_attribution(true);
            director("A");
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
        const title = document.querySelector(".title");
        title.innerHTML = "Enjoy your adventure";
        
        const play_area = document.querySelector(".play-area");
        play_area.classList.add("play-area-game");
    }
}

function change_title_to_game (){
    const title = document.querySelector(".title");
    title.innerHTML = "Enjoy your adventure";
}

function change_theme () {
	localStorage.removeItem("dark_theme");
	localStorage.setItem("dark_theme", JSON.stringify(dark_theme));

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
	
	if (is_in_game === true) {
    	const choice_list = document.querySelectorAll(".choice");
		for (choice of choice_list) {
			choice.classList.toggle("button-dark", dark_theme);
    		choice.classList.toggle("button-light", !dark_theme);
		}
	} else {
		const start_button = document.querySelector(".start-button");
		start_button.classList.toggle("button-dark", dark_theme);
    	start_button.classList.toggle("button-light", !dark_theme);
	}
}

function toggle_theme () {
    dark_theme = !dark_theme;
	change_theme();
};