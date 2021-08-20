class In_Game_Event {
    Name:string;
    Occurence:string;
    Question:string;
    Possible_Answer_List:object[];
    Answers_For_Next_Event_List:object[];

    constructor(Name:string, Occurence:string, Question:string, Possible_Answer_List:object[], Answers_For_Next_Event_List:object[] = []){
        this.Name = Name;
		this.Occurence = Occurence;
		this.Question = Question;
		this.Possible_Answer_List = Possible_Answer_List;
		this.Answers_For_Next_Event_List = Answers_For_Next_Event_List;
    }
};

const Start = new In_Game_Event(
	"Start",
	"Start of the game",
	"",
	[],
	// Next_event_name should be the first event in the game
	[{trigger : "A", next_event_name: "Bored_At_Home"}]
);


const Bored_At_Home = new In_Game_Event(
	"Bored_At_Home",
	"You're bored and hungry at home.",
	"What do you do?",
	[{id : "A", answer: "Go to a restaurant" }, {id : "B", answer: "Go to the cinema"}],
	[{trigger: "A", next_event_name : "Restaurant"}, {trigger : "B", next_event_name : "Cinema"}]
);

const Restaurant = new In_Game_Event(
	"Restaurant",
	"You're at a restaurant.",	
	"What do you order?",
	[{id : "A", answer: "Pasta" }, {id : "B", answer: "Spaghetti"}],
);

const Cinema = new In_Game_Event(
	"Cinema",
	"You're at a cinema.",
	"What movie do you want to see?",
	[{id : "A", answer: "Jaws" }, {id : "B", answer: "Star Wars"}],
);

const event_name_conversion = {
    "Start" : Start,
    "Bored_At_Home" : Bored_At_Home,
    "Restaurant" : Restaurant,
    "Cinema" : Cinema,
};

export {event_name_conversion};