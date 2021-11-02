import * as EventFile from "../forDesigner/Story.js";
import * as config from "../forDesigner/Config.js";

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

export function generateEndStory (pathTaken) {
    console.log(pathTaken);
    let examinedPathList = [];
    let pathSummationList = [];
    let paragraphTypeLedger = [];
    for (const path of pathTaken) {
        const examinedEvent = EventFile.EventNameConversion[path.nameOfEvent];
        let storyBitAndParagraphType;
        if (examinedPathList.length === pathTaken.length-1){
            storyBitAndParagraphType = examinedEvent.endStoryBitGenerator(examinedPathList, path, paragraphTypeLedger, true, config.paragraphPeriodicity.periodicity, config.paragraphPeriodicity.period);
        } else {
            storyBitAndParagraphType = examinedEvent.endStoryBitGenerator(examinedPathList, path, paragraphTypeLedger, false, config.paragraphPeriodicity.periodicity, config.paragraphPeriodicity.period);
        }

        pathSummationList.push(storyBitAndParagraphType.storyBit);
        paragraphTypeLedger.push(storyBitAndParagraphType.paragraph_type);
        examinedPathList.push(path);
    }
    return pathSummationList.join(" ");
};

export function generateEnding (pathTaken){
    let path = pathTaken[pathTaken.length-1];
    const examinedPathList = pathTaken.slice(0, pathTaken.length-1);
    const examinedEvent = EventFile.EventNameConversion[path.nameOfEvent];
    return examinedEvent.endStoryBitGenerator(examinedPathList, path, examinedEvent, [], true).storyBit;
};