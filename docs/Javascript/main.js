// localStorage.removeItem("path_taken");

var path_taken;
if (localStorage.getItem("path_taken") !== undefined && localStorage.getItem("path_taken") !== null ) {
    continue_game ();
    console.log(localStorage.getItem("path_taken"));
    path_taken = JSON.parse(localStorage.getItem("path_taken"));
    console.log(path_taken);
    update_play_area (path_taken[path_taken.length-1][1]);
    
} else {
    new_game();
    var path_taken = [["0", "Start"]];
    const start_button = document.querySelector(".start-button");
    start_button.addEventListener('click', function(){
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

function change_title_to_game (){
    const title = document.querySelector(".title");
    title.innerHTML = "Enjoy your adventure";
}


function change_flex_direction_play_area (direction) {
    const play_area = document.querySelector(".play-area");
    if (direction === "row"){
        play_area.classList.toggle("play-area-start", false);
        play_area.classList.toggle("play-area-game", true);
    } else if (direction === "column") {
        play_area.classList.toggle("play-area-start", true);
        play_area.classList.toggle("play-area-game", false);
    }
};

function display_attribution (visibility) {
    const play_area = document.querySelector(".attribution");
    if (visibility === true){
        play_area.classList.toggle("attribution-start", false);
        play_area.classList.toggle("attribution-game-end", true);
    } else if (visibility === false) {
        play_area.classList.toggle("attribution-start", true);
        play_area.classList.toggle("attribution-game-end", false);
    }
};

function director (signal) {
    const current_event = event_name_conversion[path_taken[path_taken.length-1][1]];
    const nth_current_event = path_taken[path_taken.length-1][0];
    path_taken[path_taken.length-1].push(signal);
    if (current_event.Answers_For_Next_Event_List.length === 0) {
        generate_end_game();
    } else {
        for (answer_for_next_event of current_event.Answers_For_Next_Event_List){
            if (signal === answer_for_next_event.trigger) {
                path_taken.push([(parseInt(nth_current_event)+1).toString(), answer_for_next_event.next_event_name]);
                localStorage.setItem("path_taken", JSON.stringify(path_taken));
                update_play_area(answer_for_next_event.next_event_name);
                break;
            }
        }
    }

};

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
        choice.className = "choice";
        choice.innerHTML = possible_answer.answer;
        choice.addEventListener('click', function() {
            director(signal);
        });
        choice_container.appendChild(choice);
    }
    play_area.appendChild(event);
    play_area.appendChild(choice_container);
};

function generate_end_game (){
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

    play_area.appendChild(end_game);
    localStorage.removeItem("path_taken");

};
