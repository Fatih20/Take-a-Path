let path_taken;
if (localStorage.getItem("path_taken") !== undefined && localStorage.getItem("path_taken") !== null ) {
    continue_game ();
    path_taken_string = localStorage.getItem("path_taken");
    path_taken_raw = path_taken_string.split(",");
    let i = 0;
    let event_array = [];
    let path_taken = [];
    for (element of path_taken_raw) {
        event_array.push(element); 
        if ((i+1) % 3 === 0 || i === path_taken_raw.length-1) {
            path_taken.push(event_array);
            event_array = [];
        }
        i += 1;
    };
    console.log(path_taken);
    update_play_area (path_taken[path_taken.length-1][1]);
    
} else {
    new_game();
    path_taken = [["0", "Start"]];
    const start_button = document.querySelector(".start-button");
    start_button.addEventListener('click', function(){
        console.log("click");
        change_flex_direction_play_area("row");
        change_title_to_game();
        director("A");
        })
}

function new_game () {
    const title = document.querySelector(".title");
    title.innerHTML = "Start your adventure";

    const play_area = document.querySelector(".play-area");
    play_area.classList.add("play-area-start");

    const start_button = document.createElement('a');
    start_button.setAttribute("href", "#");
    start_button.className = "start-button button"
    start_button.innerHTML = "<p>Take your path</p>";

    play_area.appendChild(start_button);
}

function continue_game () {
    const title = document.querySelector(".title");
    title.innerHTML = "Enjoy your adventure";
    
    const play_area = document.querySelector(".play-area");
    play_area.classList.add("play-area-game");
}

