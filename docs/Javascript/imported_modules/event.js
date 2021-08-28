export class Event {
    constructor(event_attribute){
        this.Name = event_attribute.Name;
		this.Occurence = event_attribute.Occurence;
		this.Question = event_attribute.Question;
		this.Possible_Answer_List = event_attribute.Possible_Answer_List;
		this.Answers_For_Next_Event_List = event_attribute.Answers_For_Next_Event_List;
		this.Default_Ending_Bit = event_attribute.Default_Ending_Bit;
		this.Conditions = event_attribute.Conditions;
    }
};

export const Start = new Event({
	Name : "Start",
	Occurence : "Start of the game",
	Question : "",
	Possible_Answer_List : [],
	// Next_event_name should be the first event in the game
	Answers_For_Next_Event_List : [{trigger : "A", next_event_name: "Bored_At_Home"}],
	Default_Ending_Bit: {
		"A" : "It's your day off and you have nothing to do at home."},
});

export const Bored_At_Home = new Event({
	Name : "Bored_At_Home",
	Occurence : "You're bored and hungry at home.",
	Question : "What do you do?",
	Possible_Answer_List : [{id : "A", answer: "Go to a restaurant" }, {id : "B", answer: "Go to the cinema"}],
	Answers_For_Next_Event_List : [{trigger: "A", next_event_name : "Restaurant"}, {trigger : "B", next_event_name : "Cinema"}],
	Default_Ending_Bit: {
		"A" : "You decided to go to the restaurant to shave off some boredom, get some food, and maybe enjoy new atmosphere. It's an italian restaurant with good lighting, good music, and a good mood. The waiter come up to you and asked what you want to order.",
		"B" : "You decided to go to the cinema to watch the latest and greatest movie that people have been talking about. And also because you have nothing to do at home. In the cinema, there were barely anyone here. It is a weekday in the afternoon, so it's what you should expect. Once you go to the ticket booth, there are only 2 movies playing because not many people go to the cinema in weekday afternoon. The options are Jaws and Star Wars"},
});

export const Restaurant = new Event({
	Name : "Restaurant",
	Occurence : "You're at a restaurant.",	
	Question : "What do you order?",
	Possible_Answer_List : [{id : "A", answer: "Pasta" }, {id : "B", answer: "Spaghetti"}],
	Answers_For_Next_Event_List : [{trigger: "A", next_event_name : "End"}, {trigger : "B", next_event_name : "End"}],
	Default_Ending_Bit: {
		"A" : "You ordered a pasta. It arrived in about 15 minutes. The delicious pasta and the great mood of the restaurant make you enjoy yourself very much.",
		"B" : "You ordered a spaghetti. It arrived in about 15 minutes."},
	Conditions : {
		"B" : [
			{type: "nth_event_checker", specification : {
				event_before : "Bored_At_Home",
			}, end_game_story_bit : "Because you were bored at home, you decided to order a spaghetti."}
	]
	}
});

export const Cinema = new Event({
	Name : "Cinema",
	Occurence : "You're at a cinema.",
	Question : "What movie do you want to see?",
	Possible_Answer_List : [{id : "A", answer: "Jaws" }, {id : "B", answer: "Star Wars"}],
	Answers_For_Next_Event_List : [{trigger: "A", next_event_name : "End"}, {trigger : "B", next_event_name : "End"}],
	Default_Ending_Bit: {
		"A" : "You decided to watch Jaws. It's a pretty thrilling and scary movie. You wound up having thalassophobia.",
		"B" : "You decided to watch Star Wars. The space adventure Luke and the gang goes through keeps you at the edge of your seat. You really enjoy the movie and can't wait for the sequel."}
});

export const event_name_conversion = {
    "Start" : Start,
    "Bored_At_Home" : Bored_At_Home,
    "Restaurant" : Restaurant,
    "Cinema" : Cinema,
};