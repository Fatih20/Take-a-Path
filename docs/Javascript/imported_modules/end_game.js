import * as event_file from "../for_designer/story.js";
import * as config from "../for_designer/config.js";
import { display_replay_button } from "./tools.js";
import { display_ending_option_button } from "./tools.js";
import { display_attribution } from "./tools.js";

export function display_end_screen (path_taken) {
    let story_ending = config.default_story_ending;
    const just_the_end = generate_ending(path_taken);
    const story = generate_end_story(path_taken);

    const title = document.querySelector(".title");
    title.innerHTML = config.end_game.title;

    const play_area = document.querySelector(".play-area");
    play_area.innerHTML = "";
    play_area.classList.remove("play-area-game");
    play_area.classList.add("play-area-end");

    const ending_option_button = document.querySelector(".ending-option-button");
    const end_game = document.createElement('p');
    end_game.className = "end-game";
    filling_end_game (story_ending, end_game, ending_option_button, story, just_the_end);

    display_replay_button(true);
    display_ending_option_button(config.show_ending_option_button);
    display_attribution(config.end_game.display_attribution);

    play_area.appendChild(end_game);
    localStorage.removeItem("path_taken");
    localStorage.setItem("state_of_game", 2);

    ending_option_button.addEventListener ('click', function toggle_end_game_content(){
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
};

function generate_end_story (path_taken) {
    console.log(path_taken);
    let examined_path_list = [];
    let path_summation_list = [];
    let paragraph_type_ledger = [];
    for (const path of path_taken) {
        const examined_event = event_file.event_name_conversion[path.name_of_event];
        let story_bit_and_paragraph_type;
        if (examined_path_list.length === path_taken.length-1){
            story_bit_and_paragraph_type = examined_event.end_story_bit_generator(examined_path_list, path, paragraph_type_ledger, true, config.paragraph_periodicity.periodicity, config.paragraph_periodicity.period);
        } else {
            story_bit_and_paragraph_type = examined_event.end_story_bit_generator(examined_path_list, path, paragraph_type_ledger, false, config.paragraph_periodicity.periodicity, config.paragraph_periodicity.period);
        }

        path_summation_list.push(story_bit_and_paragraph_type.story_bit);
        paragraph_type_ledger.push(story_bit_and_paragraph_type.paragraph_type);
        examined_path_list.push(path);        
    }
    return path_summation_list.join(" ");
};

function generate_ending (path_taken){
    let path = path_taken[path_taken.length-1];
    const examined_path_list = path_taken.slice(0, path_taken.length-1);
    const examined_event = event_file.event_name_conversion[path.name_of_event];
    return examined_event.end_story_bit_generator(examined_path_list, path, examined_event, [], true).story_bit;
};