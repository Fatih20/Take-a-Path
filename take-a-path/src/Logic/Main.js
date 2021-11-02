import * as EventFile from "../forDesigner/Story.js";

export function Director (pathTaken, signal) {
    const EventPresent = EventFile.EventNameConversion[pathTaken[pathTaken.length-1].nameOfEvent];
    const nthCurrentEvent = pathTaken[pathTaken.length-1].nthEvent;
    pathTaken[pathTaken.length-1].choiceMade = signal;
    console.log(EventPresent);
    for (let answerForNextEvent of EventPresent.AnswersForNextEventList){
        if (signal === answerForNextEvent.trigger) {
            console.log(answerForNextEvent.nextEventName);
            pathTaken.push({nthEvent : (parseInt(nthCurrentEvent)+1).toString(), nameOfEvent : answerForNextEvent.nextEventName});
            console.log(pathTaken);
            return pathTaken;
        }
    }
};