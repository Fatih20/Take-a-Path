import * as EventFile from "../forDesigner/Story.js";
import * as config from "../forDesigner/Config.js";

export function generateEndStory (pathTaken) {
    // console.log(pathTaken);
    let examinedPathList = [];
    let pathSummationList = [];
    let paragraphTypeLedger = [];
    for (const path of pathTaken) {
        const examinedEvent = EventFile.EventNameConversion[path.nameOfEvent];
        // console.log(path);
        // console.log(pathTaken);
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