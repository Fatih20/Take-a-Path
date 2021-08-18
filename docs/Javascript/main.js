// import * as events from 'event';

let path_taken = [];

const start_button = document.querySelector(".start-button");
start_button.addEventListener('click', function(){
    console.log("click")
    change_flex_direction_play_area("row");
    update_play_area(Bored_At_Home);
    path_taken.push(["1", "Bored_At_Home"]);
});

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

function director (signal) {
    const current_event = event_name_conversion[path_taken[path_taken.length-1][1]];
    const nth_current_event = path_taken[path_taken.length-1][0];
    for (answer_for_next_event of current_event.Answers_For_Next_Event_List){
        if (signal === answer_for_next_event.trigger) {
            const next_event = event_name_conversion[answer_for_next_event.next_event_name];
            path_taken.push([nth_current_event+1, answer_for_next_event.next_event_name]);
            update_play_area(next_event);
        }
    }

};

function update_play_area (next_event) {
    const play_area = document.querySelector(".play-area");
    play_area.innerHTML = "";
    const event = document.createElement('div');
    event.class = "event";

    const occurence = document.createElement('p');
    occurence.className = "occurence";
    occurence.innerHTML = next_event.Occurence;

    const question = document.createElement('p');
    question.className = "question";
    question.innerHTML = next_event.Question;

    event.appendChild(occurence);
    event.appendChild(question);


    const choice_container = document.createElement('div');
    choice_container.class = "choice_container";
    for (possible_answer of next_event.Possible_Answer_List) {
        const choice = document.createElement('a');
        const signal = possible_answer.id;
        choice.class = "choice";
        choice.innerHTML = possible_answer.answer;
        choice.addEventListener('click', function() {
            director(signal);
        });
        choice_container.appendChild(choice);
    }
    play_area.appendChild(event);
    play_area.appendChild(choice_container);
};

