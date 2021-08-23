import * as event_file from "./event.js";
import { display_replay_button } from "./tools.js";

export const end_game_conversion = {
    "0 Start A" : "It's your day off and you have nothing to do at home.",
	"1 Bored_At_Home A" : "You decided to go to the restaurant to shave off some boredom, get some food, and maybe enjoy new atmosphere. It's an italian restaurant with good lighting, good music, and a good mood. The waiter come up to you and asked what you want to order.",
	"1 Bored_At_Home B": "You decided to go to the cinema to watch the latest and greatest movie that people have been talking about. And also because you have nothing to do at home. In the cinema, there were barely anyone here. It is a weekday in the afternoon, so it's what you should expect. Once you go to the ticket booth, there are only 2 movies playing because not many people go to the cinema in weekday afternoon. The options are Jaws and Star Wars",
	"2 Restaurant A" : "You ordered a pasta. It arrived in about 15 minutes. The delicious pasta and the great mood of the restaurant make you enjoy yourself very much.",
	"2 Restaurant B" : "You ordered a spaghetti. It arrived in about 15 minutes.",
	"2 Cinema A" : "You decided to watch Jaws. It's a pretty thrilling and scary movie. You wound up having thalassophobia.",
	"2 Cinema B" : "You decided to watch Star Wars. The space adventure Luke and the gang goes through keeps you at the edge of your seat. You really enjoy the movie and can't wait for the sequel.",
};

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

export function generate_end_story (path_taken) {
    let examined_path_list = [];
    let path_summation_list = [];
    for (let path of path_taken) {
        const examined_event = event_file.event_name_conversion[path.name_of_event];
		const non_default_end_game_story_bit = condition_generator(examined_path_list, path, examined_event);
		console.log(non_default_end_game_story_bit);
        if (examined_event.Conditions = {} && non_default_end_game_story_bit === null){
			for (const possible_end_game_story_bit of examined_event.Default_Ending_Bit) {
				if (path.choice_made === possible_end_game_story_bit.signal) {
					path_summation_list.push(possible_end_game_story_bit.end_game_story_bit);
					break;
				}
			}
        } else {
			path_summation_list.push(non_default_end_game_story_bit);

        }

        examined_path_list.push(path);
    }
    return path_summation_list.join(" ");
};

function condition_generator (previously_examined_path_list, currently_examined_path, examined_event){
	console.log("Checking conditions");
	console.log(examined_event.Name);
	console.log()
    const choice_compatible_condition_list = examined_event.Conditions[currently_examined_path.choice_made];
    if (choice_compatible_condition_list !== undefined) {
        for (const condition of choice_compatible_condition_list){
            if (condition.type === "if_nth_event_then_event_before") {
                const end_game_story_bit = nth_event_checker (previously_examined_path_list, currently_examined_path, condition);
                if (end_game_story_bit !== null) {
                    return end_game_story_bit;
                } else if (condition.type === "specific_event") {
					const end_game_story_bit = specific_event_checker (previously_examined_path_list, condition) !== null;
					if (end_game_story_bit !== null) {
						return end_game_story_bit;
					}  
				}
            } 
        }
    } else {
        return null;
    }
};

function specific_event_checker (previously_examined_path_list, specification) {
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