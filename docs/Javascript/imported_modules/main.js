// localStorage.removeItem("path_taken");

import { display_replay_button } from "./tools.js";
import { display_end_screen } from "./end_game.js";
import * as event_file from "./event.js";


export function director (path_taken, signal) {
    const current_event = event_file.event_name_conversion[path_taken[path_taken.length-1].name_of_event];
    const nth_current_event = path_taken[path_taken.length-1].nth_event;
    path_taken[path_taken.length-1].choice_made = signal;
    for (let answer_for_next_event of current_event.Answers_For_Next_Event_List){
        if (signal === answer_for_next_event.trigger) {
            if (answer_for_next_event.next_event_name === "End"){
                display_end_screen(path_taken);
                break;
            } else {
                path_taken.push({nth_event : (parseInt(nth_current_event)+1).toString(), name_of_event : answer_for_next_event.next_event_name});
                localStorage.setItem("path_taken", JSON.stringify(path_taken));
                update_play_area(path_taken, event_file);
                break;
            }
        }
    }
};

export function update_play_area (path_taken, event_file) {
    const dark_theme = JSON.parse(localStorage.getItem("dark_theme"));

    const next_event_name = path_taken[path_taken.length-1].name_of_event;
    const next_event = event_file.event_name_conversion[next_event_name];

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
    for (let possible_answer of next_event.Possible_Answer_List) {
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
            director(JSON.parse(JSON.stringify(path_taken)), signal);
        });
        choice_container.appendChild(choice);
    }
    play_area.appendChild(event);
    play_area.appendChild(choice_container);
};
