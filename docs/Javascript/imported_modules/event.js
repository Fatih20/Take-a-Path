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

    }
};