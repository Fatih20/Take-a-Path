function play_area_direction_row (is_row) {
    const play_area = document.querySelector(".play-area");
    // Start is row, game is column
    play_area.classList.toggle("play-area-start", is_row);
    play_area.classList.toggle("play-area-game", !is_row);
};

function display_replay_button (visibility) {
    const replay_button = document.querySelector(".replay-button");
    // Start is hidden, end is shown
    replay_button.classList.toggle("replay-button-start", !visibility);
    replay_button.classList.toggle("replay-button-end", visibility);
};

function display_attribution (visibility) {
    const attribution = document.querySelector(".attribution");
    // Start is hidden, game-end is shown
    attribution.classList.toggle("attribution-start", !visibility);
    attribution.classList.toggle("attribution-game-end", visibility);
}

function update_play_area (next_event_name) {
    const next_event = event_name_conversion[next_event_name];

    const play_area = document.querySelector(".play-area");
    play_area.innerHTML = "";
    const event = document.createElement('div');
    event.className = "event";

    const occurence = document.createElement('p');
    occurence.className = "occurence";
    occurence.innerHTML = next_event.Occurence;

    const question = document.createElement('p');
    question.className = "question";
    question.innerHTML = next_event.Question;

    event.appendChild(occurence);
    event.appendChild(question);


    const choice_container = document.createElement('div');
    choice_container.className = "choice-container";
    for (possible_answer of next_event.Possible_Answer_List) {
        const choice = document.createElement('a');
        const signal = possible_answer.id;
        choice.setAttribute("href", "#");
        choice.className = "choice button";
        if (dark_theme === true){
            choice.classList.add("button-dark");
        } else {
            choice.classList.add("button-light");
        }
        choice.innerHTML = possible_answer.answer;
        choice.addEventListener('click', function() {
            director(signal);
        });
        choice_container.appendChild(choice);
    }
    play_area.appendChild(event);
    play_area.appendChild(choice_container);
};

function generate_end_game () {
    let path_summation = "";
    console.log(path_taken);
    for (path of path_taken) {
        path_summation += end_game_conversion[path.join(" ")];
        if (path_taken.indexOf(path) !== path_taken.length - 1){
            path_summation += " ";
        }
    }
    const title = document.querySelector(".title");
    title.innerHTML = "The path you've taken";

    const play_area = document.querySelector(".play-area");
    play_area.innerHTML = "";
    play_area.classList.remove("play-area-game");
    play_area.classList.add("play-area-end");

    const end_game = document.createElement('p');
    end_game.className = "end-game";
    end_game.innerHTML = path_summation;

    display_replay_button(true);

    play_area.appendChild(end_game);
    localStorage.removeItem("path_taken");
    is_in_game = false;

};