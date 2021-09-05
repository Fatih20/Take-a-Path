export class Event {
    constructor(event_attribute){
        this.Name = event_attribute.Name;
		this.Occurence = event_attribute.Occurence;
		this.Question = event_attribute.Question;
		this.Possible_Answer_List = event_attribute.Possible_Answer_List;
		this.Answers_For_Next_Event_List = event_attribute.Answers_For_Next_Event_List;
        if (event_attribute.Lazy_Mode === true){
            this.Lazy_Mode = event_attribute.Lazy_Mode;
            this.Ending = {};
            for (const possible_answer of event_attribute.Possible_Answer_List){
                this.Ending[possible_answer.id] = [
                    {
                        type: "default_ending",
                        story_bit : event_attribute.Occurence+ " " + possible_answer.answer
                    }
                ]
            }
        } else {
            for (const choice in event_attribute.Ending) {
                for (const ending_bit of event_attribute.Ending[choice]){
                    if (ending_bit.paragraph === undefined) {
                        ending_bit.paragraph = "none";
                    }
                }
            }
            this.Ending = event_attribute.Ending;
        }

        if (event_attribute.End_Game_Event){
            this.End_Game_Event = event_attribute.End_Game_Event
        }

    };

    visible_choice_generator(path_taken){
        let choice_shown = [];
        for (const possible_answer of this.Possible_Answer_List) {
            if (possible_answer.condition_list === undefined){
                choice_shown.push(possible_answer);
            } else {
                for (const condition of possible_answer.condition_list){
                    if (this.condition_type_conversion_choice[condition.type](path_taken, condition)){
                        choice_shown.push(possible_answer);
                        break;
                    }
                }
            }
        }
        return choice_shown;
    };

    specific_event_checker_choice (previously_examined_path_list, condition) {
        for (const previous_path of previously_examined_path_list) {
            if (previous_path.nth_event === condition.specification.nth_event || condition.specification.nth_event === undefined ) {
                if (previous_path.name_of_event === condition.specification.event_name || condition.specification.event_name === undefined ) {
                    if (previous_path.choice_made === condition.specification.choice || condition.specification.choice === undefined ) {
                        return true;
                    }
                }    
            }
        }
        return false;
    };

    condition_type_conversion_choice = {
        "specific_event_checker" : this.specific_event_checker_choice
    };

    end_story_bit_generator (previously_examined_path_list, currently_examined_path, paragraph_type_ledger, ignore_paragraph=false, periodicity=false, period=undefined){
        const condition_list = this.Ending[currently_examined_path.choice_made];
        let end_game_story_bit;
        let index_of_compatible_condition = 0;
        for (const condition of condition_list){
            end_game_story_bit = this.condition_type_conversion_ending[condition.type](previously_examined_path_list, currently_examined_path, condition);
            if (end_game_story_bit !== null){
                break;
            } 
            index_of_compatible_condition += 1;
        }

        if (ignore_paragraph){
            return {story_bit : end_game_story_bit};
        } else {
            let paragraph_type;
            if (periodicity){
                console.log(parseInt(currently_examined_path.nth_event));
                if ((parseInt(currently_examined_path.nth_event)+1)% period === 0 )
                    paragraph_type = "last sentence";
            } else{
                paragraph_type = condition_list[index_of_compatible_condition].paragraph;
            }
            return {story_bit : this.paragraph_determiner(end_game_story_bit, paragraph_type, paragraph_type_ledger), paragraph_type : paragraph_type};
        }
    
    };

    specific_event_checker (previously_examined_path_list, currently_examined_path, condition) {
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
    
    nth_event_checker (previously_examined_path_list, currently_examined_path, condition){
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

    default_ending (previously_examined_path_list, currently_examined_path, condition){
        return condition.story_bit;
    };

    condition_type_conversion_ending = {
        "nth_event_checker" : this.nth_event_checker,
        "specific_event_checker" : this.specific_event_checker,
        "default_ending" : this.default_ending
    };

    paragraph_determiner (end_game_story_bit, paragraph_type, paragraph_type_ledger){
        let result;
        let break_before = true;
        if (paragraph_type_ledger[paragraph_type_ledger.length-1] === "last sentence"){
            break_before = false;
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
};