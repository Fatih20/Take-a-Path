class Event {
    constructor(Name, Occurence, Question, Possible_Answer_List, Answers_For_Next_Event_List = []){
        this.Name = Name;
		this.Occurence = Occurence;
		this.Question = Question;
		this.Possible_Answer_List = Possible_Answer_List;
		this.Answers_For_Next_Event_List = Answers_For_Next_Event_List;
    }
}

const Start = new Event(
	"Start",
	"Start of the game",
	"",
	[],
	// The only important part of this instance is the second index of the first index of the list below, which should be filled with the name of the first event to then be triggered by the director
	[["A", "Bored_At_Home"]]
)


const Bored_At_Home = new Event(
	"Bored_At_Home",
	"You're bored and hungry at home.",
	"What do you do?",
	[{id : "A", answer: "Go to a restaurant" }, {id : "B", answer: "Go to the cinema"}],
	[{trigger: "A", next_event_name : "Restaurant"}, {trigger : "B", next_event_name : "Cinema"}]
)

const Restaurant = new Event(
	"Restaurant",
	"You're at a restaurant.",	
	"What do you order?",
	[{id : "A", answer: "Pasta" }, {id : "B", answer: "Spaghetti"}],
)

const Cinema = new Event(
	"Cinema",
	"You're at a cinema.",
	"What movie do you want to see?",
	[{id : "A", answer: "Jaws" }, {id : "B", answer: "Star Wars"}],
)

const event_name_conversion = {
    "Bored_At_Home" : Bored_At_Home,
    "Restaurant" : Restaurant,
    "Cinema" : Cinema,
};