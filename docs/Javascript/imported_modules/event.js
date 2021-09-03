export class Event {
    constructor(event_attribute){
        this.Name = event_attribute.Name;
		this.Occurence = event_attribute.Occurence;
		this.Question = event_attribute.Question;
		this.Possible_Answer_List = event_attribute.Possible_Answer_List;
		this.Answers_For_Next_Event_List = event_attribute.Answers_For_Next_Event_List;

		for (const choice in event_attribute.Ending) {
			for (const ending_bit of event_attribute.Ending[choice]){
				if (ending_bit.paragraph === undefined) {
					ending_bit.paragraph = "none";
				}
			}
		}
		this.Ending = event_attribute.Ending;

    };

    visible_choice_generator(path_taken){
        let choice_shown = [];
        for (const possible_answer of this.Possible_Answer_List) {
            if (possible_answer.conditions === undefined || this.condition_type_conversion[possible_answer.conditions.type](path_taken, possible_answer.conditions)){
                choice_shown.push(possible_answer);
            }
        }
        return choice_shown;
    };

    specific_event_checker_choice (previously_examined_path_list, conditions) {
        for (const previous_path of previously_examined_path_list) {
            if (previous_path.nth_event === conditions.specification.nth_event || conditions.specification.nth_event === undefined ) {
                if (previous_path.name_of_event === conditions.specification.event_name || conditions.specification.event_name === undefined ) {
                    if (previous_path.choice_made === conditions.specification.choice || conditions.specification.choice === undefined ) {
                        return true;
                    }
                }    
            }
        }
        return false;
    };

    condition_type_conversion = {
        "specific_event_checker" : this.specific_event_checker_choice
    };
};