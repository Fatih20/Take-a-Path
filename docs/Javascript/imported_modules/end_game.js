import * as event_file from "./event.js";
import { display_replay_button } from "./tools.js";

export function display_end_screen (path_taken) {
    const end_game_story = generate_end_story(path_taken);

    const title = document.querySelector(".title");
    title.innerHTML = "The path you've taken";

    const play_area = document.querySelector(".play-area");
    play_area.innerHTML = "";
    play_area.classList.remove("play-area-game");
    play_area.classList.add("play-area-end");

    const end_game = document.createElement('p');
    end_game.className = "end-game";
    end_game.innerHTML = end_game_story;

    display_replay_button(true);

    play_area.appendChild(end_game);
    localStorage.removeItem("path_taken");
    localStorage.setItem("state_of_game", 2);

};

function generate_end_story (path_taken) {
    let examined_path_list = [];
    let path_summation_list = [];
    for (let path of path_taken) {
        const examined_event = event_file.event_name_conversion[path.name_of_event];
        let condition_apply = true;
        let end_game_story_bit;
        let index_of_compatible_condition = null;

        if (examined_event.Conditions === undefined || examined_event.Conditions[path.choice_made] === undefined){
            end_game_story_bit = examined_event.Default_Ending_Bit[path.choice_made];
            condition_apply = false;
        } else {
            const non_default = condition_generator(examined_path_list, path, examined_event.Conditions[path.choice_made]);
            if (non_default === undefined) {
                end_game_story_bit = examined_event.Default_Ending_Bit[path.choice_made];
                condition_apply = false;
            }
            else {
                end_game_story_bit = non_default.story_bit;
                index_of_compatible_condition = non_default.index_of_compatible_condition;
            }
        }

        end_game_story_bit = paragraph_breaker (condition_apply, examined_event, end_game_story_bit, path.choice_made, index_of_compatible_condition);
        path_summation_list.push(end_game_story_bit);
        examined_path_list.push(path);
    }
    return path_summation_list.join(" ");
};

function paragraph_determiner (paragraph, end_game_story_bit){
    if (paragraph === "last sentence"){
        return end_game_story_bit+"<br>";
    } else if (paragraph === "new paragraph") {
        return "<br>"+end_game_story_bit;
    }
}

function paragraph_breaker (condition_apply, examined_event, end_game_story_bit, choice_made, index_of_compatible_condition) {
    if (condition_apply && examined_event.Conditions[choice_made][index_of_compatible_condition].paragraph !== undefined){
            return paragraph_determiner (examined_event.Conditions[choice_made][index_of_compatible_condition].paragraph, end_game_story_bit);
    } else {
        if (examined_event.Default_Paragraph !== undefined && examined_event.Default_Paragraph[choice_made] !== undefined){
            return paragraph_determiner(examined_event.Default_Paragraph[choice_made], end_game_story_bit);
        } else {
            return end_game_story_bit;
        }
    }
};

function condition_generator (previously_examined_path_list, currently_examined_path, condition_list){
	console.log("Checking conditions");
	// console.log(examined_event.Name);
    let i = 0
    for (const condition of condition_list){
        const end_game_story_bit = condition_type_conversion[condition.type](previously_examined_path_list, currently_examined_path, condition);
        if (end_game_story_bit !== null){
            return {story_bit : end_game_story_bit, index_of_compatible_condition : i};
        }
        i += 1;
    }
};

function specific_event_checker (previously_examined_path_list, currently_examined_path, condition) {
    for (const previous_path of previously_examined_path_list) {

        if (previous_path.nth_event === condition.specification.nth_event || condition.specification.nth_event === undefined ) {
            if (previous_path.name_of_event === condition.specification.event_name || condition.specification.event_name === undefined ) {
                if (previous_path.choice_made === condition.specification.choice || condition.specification.choice === undefined ) {
                    return condition.end_game_story_bit;
                }
            }    
        }
    }
    return null;
};

function nth_event_checker (previously_examined_path_list, currently_examined_path, condition){
    if (condition.specification.nth_this_event === currently_examined_path.nth_event || condition.specification.nth_this_event === undefined) {
        if (condition.specification.event_before === undefined) {
			return condition.end_game_story_bit;
		} else {
			for (const previous_path of previously_examined_path_list) {
				if (previous_path.name_of_event === condition.specification.event_before) {
					return condition.end_game_story_bit;
				}
			}
			return null;
		}
    }

    else {
        return null;
    }
};

const condition_type_conversion = {
    "nth_event_checker" : nth_event_checker,
    "specific_event_checker" : specific_event_checker,
};