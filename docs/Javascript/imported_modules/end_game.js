import * as event_file from "./event.js";
import { display_replay_button } from "./tools.js";
import { display_ending_option_button } from "./tools.js";

export function display_end_screen (path_taken) {
    let story_ending = JSON.parse(localStorage.getItem("story_ending"));
    const just_the_end = generate_ending(path_taken);
    const story = generate_end_story(path_taken);

    const title = document.querySelector(".title");
    title.innerHTML = "The path you've taken";

    const play_area = document.querySelector(".play-area");
    play_area.innerHTML = "";
    play_area.classList.remove("play-area-game");
    play_area.classList.add("play-area-end");

    const ending_option_button = document.querySelector(".ending-option-button");
    const end_game = document.createElement('p');
    end_game.className = "end-game";
    filling_end_game (story_ending, end_game, ending_option_button, story, just_the_end);

    display_ending_option_button(true);
    display_replay_button(true);

    play_area.appendChild(end_game);
    localStorage.removeItem("path_taken");
    localStorage.setItem("state_of_game", 2);

    ending_option_button.addEventListener ('click', function(){
        let story_ending = !JSON.parse(localStorage.getItem("story_ending"));
        const end_game = document.querySelector(".end-game");
        filling_end_game (story_ending, end_game, ending_option_button, story, just_the_end);
        localStorage.setItem("story_ending", JSON.stringify(story_ending));
    })

};

function filling_end_game (story_ending, end_game, ending_option_button, story, just_the_end){
    if (story_ending){
        ending_option_button.innerHTML = "Show me just the ending";
        end_game.innerHTML = story;
    } else {
        ending_option_button.innerHTML = "Show me the story recap";
        end_game.innerHTML = just_the_end;
    }
}

function generate_ending (path_taken){
    let path = path_taken[path_taken.length-1];
    const examined_path_list = path_taken.slice(0, path_taken.length-1);
    const examined_event = event_file.event_name_conversion[path.name_of_event];
    return end_story_bit_generator(examined_path_list, path, examined_event, []).story_bit;
}

function generate_end_story (path_taken) {
    let examined_path_list = [];
    let path_summation_list = [];
    let paragraph_type_ledger = [];
    for (let path of path_taken) {
        const examined_event = event_file.event_name_conversion[path.name_of_event];
        const story_bit_and_paragraph_type = end_story_bit_generator(examined_path_list, path, examined_event, paragraph_type_ledger);

        path_summation_list.push(story_bit_and_paragraph_type.story_bit);
        paragraph_type_ledger.push(story_bit_and_paragraph_type.paragraph_type);
        examined_path_list.push(path);        
    }
    return path_summation_list.join(" ");
};

function paragraph_determiner (end_game_story_bit, paragraph_type, paragraph_type_ledger){
    let result;
    let break_before = true;
    if (paragraph_type_ledger[paragraph_type_ledger.length-1] === "last sentence"){
        no_break_before = false;
    }

    if (paragraph_type === "none" || paragraph_type === "new paragraph"){
        result = end_game_story_bit;
    } else if (paragraph_type === "last sentence" || paragraph_type === "standalone paragraph"){
        result = end_game_story_bit+"<br><br>";
    }

    if (paragraph_type === "standalone paragraph" || paragraph_type === "new paragraph"){
        if (break_before){
            result = "<br><br>"+result;
        }
    }

    return result;
};

function end_story_bit_generator (previously_examined_path_list, currently_examined_path, examined_event, paragraph_type_ledger){
    const condition_list = examined_event.Ending[currently_examined_path.choice_made];
    let end_game_story_bit;
    let index_of_compatible_condition = 0
    for (const condition of condition_list){
        end_game_story_bit = condition_type_conversion[condition.type](previously_examined_path_list, currently_examined_path, condition);
        if (end_game_story_bit !== null){
            break;
        } 
        index_of_compatible_condition += 1;
    }

    const paragraph_type = condition_list[index_of_compatible_condition].paragraph;
    return {story_bit : paragraph_determiner(end_game_story_bit, paragraph_type, paragraph_type_ledger), paragraph_type : paragraph_type};

};

function specific_event_checker (previously_examined_path_list, currently_examined_path, condition) {
    for (const previous_path of previously_examined_path_list) {

        if (previous_path.nth_event === condition.specification.nth_event || condition.specification.nth_event === undefined ) {
            if (previous_path.name_of_event === condition.specification.event_name || condition.specification.event_name === undefined ) {
                if (previous_path.choice_made === condition.specification.choice || condition.specification.choice === undefined ) {
                    return condition.story_bit;
                }
            }    
        }
    }
    return null;
};

function nth_event_checker (previously_examined_path_list, currently_examined_path, condition){
    if (condition.specification.nth_this_event === currently_examined_path.nth_event || condition.specification.nth_this_event === undefined) {
        if (condition.specification.event_before === undefined) {
			return condition.story_bit;
		} else {
			for (const previous_path of previously_examined_path_list) {
				if (previous_path.name_of_event === condition.specification.event_before) {
					return condition.story_bit;
				}
			}
			return null;
		}
    }

    else {
        return null;
    }
};

function default_ending (previously_examined_path_list, currently_examined_path, condition){
    return condition.story_bit;
};

const condition_type_conversion = {
    "nth_event_checker" : nth_event_checker,
    "specific_event_checker" : specific_event_checker,
    "default_ending" : default_ending
};