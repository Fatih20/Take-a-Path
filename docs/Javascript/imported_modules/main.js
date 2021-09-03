// localStorage.removeItem("path_taken");

import { display_end_screen } from "./end_game.js";
import * as event_file from "./story.js";
import * as config from "./config.js";


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

    let possible_answer_shown = next_event.visible_choice_generator(path_taken);
    // console.log(possible_answer_shown);

    for (let possible_choice of possible_answer_shown) {
        const choice = document.createElement('a');
        const signal = possible_choice.id;
        choice.setAttribute("href", "#");
        choice.className = "choice button";
        if (dark_theme === true){
            choice.classList.add("button-dark");
        } else {
            choice.classList.add("button-light");
        }
        choice.innerHTML = possible_choice.answer;
        choice.addEventListener('click', function() {
            director(JSON.parse(JSON.stringify(path_taken)), signal);
        });
        choice_container.appendChild(choice);
    }

    if (config.animation.use_animation){
        const play_area_coming = document.createElement('div');
        play_area_coming.classList.add("play-area");
        play_area_coming.classList.add("play-area-game");
        play_area_coming.classList.add("play-area-coming");
        if (dark_theme){
            play_area_coming.classList.add("play-area-dark");
        } else {
            play_area_coming.classList.add("play-area-light");
        }
        play_area_coming.setAttribute("style", "transition: all " +(config.animation.in_duration/1000).toString()+"s "+"ease-out"+";");

        play_area_coming.appendChild(event);
        play_area_coming.appendChild(choice_container);

        const play_area_container = document.querySelector(".play-area-container");
        const play_area_current = document.querySelector(".play-area-current");
        play_area_current.setAttribute("style", "transition: all " +(config.animation.out_duration/1000).toString()+"s "+"ease-in"+";");

        play_area_current.classList.remove("play-area-current");
        play_area_current.classList.add("play-area-passing");

        setTimeout(function(){
            play_area_current.remove();
            play_area_container.appendChild(play_area_coming);
            setTimeout(function(){
                play_area_coming.classList.remove("play-area-coming");
                play_area_coming.classList.add("play-area-current");
            }, config.animation.in_duration);
        }, config.animation.out_duration);


    } else {
        const play_area_current = document.querySelector(".play-area-current");
        play_area_current.innerHTML = "";
        play_area_current.appendChild(event);
        play_area_current.appendChild(choice_container);
    }

};