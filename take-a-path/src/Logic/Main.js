import * as EventFile from "../forDesigner/Story.js";

export function Director (PathTaken, signal) {
    const EventPresent = EventFile.EventNameConversion[PathTaken[PathTaken.length-1].nameOfEvent];
    const nthCurrentEvent = PathTaken[PathTaken.length-1].nthEvent;
    PathTaken[PathTaken.length-1].choiceMade = signal;
    for (let answerForNextEvent of EventPresent.AnswersForNextEventList){
        if (signal === answerForNextEvent.trigger) {
            if (answerForNextEvent.nextEventName === "End"){
                display_end_screen(path_taken);
                break;
            } else {
                PathTaken.push({nth_event : (parseInt(nthCurrentEvent)+1).toString(), nameOfEvent : answerForNextEvent.nextEventName});
                return PathTaken;
            }
        }
    }
};