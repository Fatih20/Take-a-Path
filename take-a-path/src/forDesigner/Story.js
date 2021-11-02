import { Event } from "../Logic/Event.js";

export const Start = new Event({
	Name : "Start",
	Occurence : "Start of the game",
	Question : "",
	PossibleAnswerList : [],
	// NextEventName should be the first event in the game
	AnswersForNextEventList : [{trigger : "A", nextEventName: "Bored_At_Home"}],
	Ending : {
		"A" : [
			{
			type : "default_ending",
			storyBit : "It's your day off and you have nothing to do at home." 
			},
		]
	}
});

export const Bored_At_Home = new Event({
	Name : "Bored_At_Home",
	Occurence : "You're bored and hungry at home.",
	Question : "What do you do?",
	PossibleAnswerList : [
		{
			id : "A",
			answer: "Go to a restaurant"
		},
		{
			id : "B", 
			answer: "Go to the cinema"
		},
		{
			id : "C",
			answer: "Stay at home"
		},
	],
	AnswersForNextEventList : [
		{trigger: "A", nextEventName : "Restaurant"},
		{trigger : "B", nextEventName : "Cinema"},
		{trigger : "C", nextEventName : "Bored_At_Home"},
	],
	Ending : {
		"A": [
			{
			type: "default_ending",
			storyBit : "You decided to go to the restaurant to shave off some boredom, get some food, and maybe enjoy new atmosphere. It's an italian restaurant with good lighting, good music, and a good mood. The waiter come up to you and asked what you want to order.",
			}
		],
		"B" : [
			{
			type: "default_ending",
			storyBit : "You decided to go to the cinema to watch the latest and greatest movie that people have been talking about. And also because you have nothing to do at home. In the cinema, there were barely anyone here. It is a weekday in the afternoon, so it's what you should expect. Once you go to the ticket booth, there are only 2 movies playing because not many people go to the cinema in weekday afternoon. The options are Jaws and Star Wars."
			}
		],
		"C" : [
			{
			type: "specific_event_checker",
			specification : {
				eventBefore : "Bored_At_Home"}, 
			storyBit : ""
			},
			{
			type: "default_ending",
			storyBit : "You decided to stay at home."
			}
		]
	}
});

export const Restaurant = new Event({
	Name : "Restaurant",
	Occurence : "You're at a restaurant.",	
	Question : "What do you order?",
	PossibleAnswerList : [
		{
			id : "A",
			answer: "Pasta",
			conditionList : [
				{
				type: "specific_event_checker", 
				specification : {
					eventName : "B"}
				}
			] 
		}, 
		{
			id : "B", 
			answer: "Spaghetti"
		}
	],
	AnswersForNextEventList : [{trigger: "A", nextEventName : "End"}, {trigger : "B", nextEventName : "End"}],
	Ending : {
		"A" : [
			{
			type: "default_ending", 
			storyBit : "You ordered a pasta. It arrived in about 15 minutes. The delicious pasta and the great mood of the restaurant make you enjoy yourself very much.",
			paragraph : "last sentence"}
		],
		"B" : [
			{
			type: "nth_event_checker", 
			specification : {
			B : "Bored_At_Home"}, 
			storyBit : "Because you were bored at home, you decided to order a spaghetti.",
			paragraph : "last sentence"},

			{type: "default_ending", 
			storyBit : "You ordered a spaghetti. It arrived in about 15 minutes.",
			paragraph : "new paragraph"}
		],
	}
});

export const Cinema = new Event({
	Name : "Cinema",
	Occurence : "You're at a cinema.",
	Question : "What movie do you want to see?",
	PossibleAnswerList : [
		{
			id : "A", 
			answer: "Jaws" 
		}, 
		{
			id : "B", 
			answer: "Star Wars"
		}
	],
	AnswersForNextEventList : [{trigger: "A", nextEventName : "End"}, {trigger : "B", nextEventName : "End"}],
	Ending : {
		"A": [
			{type: "default_ending",
			storyBit : "You decided to watch Jaws. It's a pretty thrilling and scary movie. You wound up having thalassophobia.",
			paragraph : "last sentence"}
		],
		"B" : [
			{type: "default_ending",
			storyBit : "You decided to watch Star Wars. The space adventure Luke and the gang goes through keeps you at the edge of your seat. You really enjoy the movie and can't wait for the sequel.",
			paragraph : "new paragraph"}
		]
	}
});

export const EventNameConversion = {
    "Start" : Start,
    "Bored_At_Home" : Bored_At_Home,
    "Restaurant" : Restaurant,
    "Cinema" : Cinema,
};