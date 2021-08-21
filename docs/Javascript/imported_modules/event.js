export class Event {
    constructor(Name, Occurence, Question, Possible_Answer_List, Answers_For_Next_Event_List, Default_Ending_Bit, Conditions = {}){
        this.Name = Name;
		this.Occurence = Occurence;
		this.Question = Question;
		this.Possible_Answer_List = Possible_Answer_List;
		this.Answers_For_Next_Event_List = Answers_For_Next_Event_List;
		this.Default_Ending_Bit = Default_Ending_Bit;
		this.Conditions = Conditions
    }
}

export const Start = new Event(
	"Start",
	"Start of the game",
	"",
	[],
	// Next_event_name should be the first event in the game
	[{trigger : "A", next_event_name: "Bored_At_Home"}],
	[
		{signal: "A", end_game_story_bit : "It's your day off and you have nothing to do at home."},
	],
)

export const Bored_At_Home = new Event(
	"Bored_At_Home",
	"You're bored and hungry at home.",
	"What do you do?",
	[{id : "A", answer: "Go to a restaurant" }, {id : "B", answer: "Go to the cinema"}],
	[{trigger: "A", next_event_name : "Restaurant"}, {trigger : "B", next_event_name : "Cinema"}],
	[
		{signal: "A", end_game_story_bit : "You decided to go to the restaurant to shave off some boredom, get some food, and maybe enjoy new atmosphere. It's an italian restaurant with good lighting, good music, and a good mood. The waiter come up to you and asked what you want to order."},
		{signal: "B", end_game_story_bit : "You decided to go to the cinema to watch the latest and greatest movie that people have been talking about. And also because you have nothing to do at home. In the cinema, there were barely anyone here. It is a weekday in the afternoon, so it's what you should expect. Once you go to the ticket booth, there are only 2 movies playing because not many people go to the cinema in weekday afternoon. The options are Jaws and Star Wars"}
	]
)

export const Restaurant = new Event(
	"Restaurant",
	"You're at a restaurant.",	
	"What do you order?",
	[{id : "A", answer: "Pasta" }, {id : "B", answer: "Spaghetti"}],
	[{trigger: "A", next_event_name : "End"}, {trigger : "B", next_event_name : "End"}],
	[
		{signal: "A", end_game_story_bit : "You ordered a pasta. It arrived in about 15 minutes. The delicious pasta and the great mood of the restaurant make you enjoy yourself very much."},
		{signal: "B", end_game_story_bit : "You ordered a spaghetti. It arrived in about 15 minutes."}
	]
)

export const Cinema = new Event(
	"Cinema",
	"You're at a cinema.",
	"What movie do you want to see?",
	[{id : "A", answer: "Jaws" }, {id : "B", answer: "Star Wars"}],
	[{trigger: "A", next_event_name : "End"}, {trigger : "B", next_event_name : "End"}],
	[
		{signal: "A", end_game_story_bit : "You decided to watch Jaws. It's a pretty thrilling and scary movie. You wound up having thalassophobia."},
		{signal: "B", end_game_story_bit : "You decided to watch Star Wars. The space adventure Luke and the gang goes through keeps you at the edge of your seat. You really enjoy the movie and can't wait for the sequel."}
	]
)

export const event_name_conversion = {
    "Start" : Start,
    "Bored_At_Home" : Bored_At_Home,
    "Restaurant" : Restaurant,
    "Cinema" : Cinema,
};