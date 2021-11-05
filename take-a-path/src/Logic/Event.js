export class Event {
    constructor(eventAttribute){
        this.Name = eventAttribute.Name;
		this.Occurence = eventAttribute.Occurence;
		this.Question = eventAttribute.Question;
		this.PossibleAnswerList = eventAttribute.PossibleAnswerList;
		this.AnswersForNextEventList = eventAttribute.AnswersForNextEventList;
        if (eventAttribute.Lazy_Mode === true){
            this.Lazy_Mode = eventAttribute.Lazy_Mode;
            this.Ending = {};
            for (const possibleAnswer of eventAttribute.PossibleAnswerList){
                this.Ending[possibleAnswer.id] = [
                    {
                        type: "defaultEnding",
                        storyBit : eventAttribute.Occurence+ " " + possibleAnswer.answer
                    }
                ]
            }
        } else {
            for (const choice in eventAttribute.Ending) {
                for (const endingBit of eventAttribute.Ending[choice]){
                    if (endingBit.paragraph === undefined) {
                        endingBit.paragraph = "none";
                    }
                }
            }
            this.Ending = eventAttribute.Ending;
        }

        //Attribute below is deprecated
        if (eventAttribute.End_Game_Event){
            this.End_Game_Event = eventAttribute.End_Game_Event
        }

    };

    visibleChoiceGenerator(pathTaken){
        let choiceShown = [];
        for (const possibleAnswer of this.PossibleAnswerList) {
            if (possibleAnswer.conditionList === undefined){
                choiceShown.push(possibleAnswer);
            } else {
                for (const condition of possibleAnswer.conditionList){
                    if (this.conditionTypeConversionChoice[condition.type](pathTaken, condition)){
                        choiceShown.push(possibleAnswer);
                        break;
                    }
                }
            }
        }
        return choiceShown;
    };

    specificEventCheckerChoice (previouslyExaminedPathList, condition) {
        for (const previousPath of previouslyExaminedPathList) {
            if (previousPath.nthEvent === condition.specification.nthEvent || condition.specification.nthEvent === undefined ) {
                if (previousPath.nameOfEvent === condition.specification.eventName || condition.specification.eventName === undefined ) {
                    if (previousPath.choiceMade === condition.specification.choice || condition.specification.choice === undefined ) {
                        return true;
                    }
                }    
            }
        }
        return false;
    };

    conditionTypeConversionChoice = {
        "specificEventChecker" : this.specificEventCheckerChoice
    };

    endStoryBitGenerator (previouslyExaminedPathList, currentlyExaminedPath, paragraphTypeLedger, ignoreParagraph=false, periodicity=false, period=undefined){
        // console.log(this.Ending);
        // console.log(currentlyExaminedPath);
        // console.log(currentlyExaminedPath.choiceMade);
        const conditionList = this.Ending[currentlyExaminedPath.choiceMade];
        let endGameStoryBit;
        let indexOfCompatibleCondition = 0;
        for (const condition of conditionList){
            // console.log(this.conditionTypeConversionEnding[condition.type]);
            endGameStoryBit = this.conditionTypeConversionEnding[condition.type](previouslyExaminedPathList, currentlyExaminedPath, condition);
            if (endGameStoryBit !== null){
                break;
            } 
            indexOfCompatibleCondition += 1;
        }

        if (ignoreParagraph){
            return {storyBit : endGameStoryBit};
        } else {
            let paragraphType;
            if (periodicity){
                console.log(parseInt(currentlyExaminedPath.nthEvent));
                if ((parseInt(currentlyExaminedPath.nthEvent)+1)% period === 0 )
                    paragraphType = "last sentence";
            } else{
                paragraphType = conditionList[indexOfCompatibleCondition].paragraph;
            }
            return {storyBit : this.paragraphDeterminer(endGameStoryBit, paragraphType, paragraphTypeLedger), paragraphType : paragraphType};
        }
    
    };

    specificEventChecker (previouslyExaminedPathList, currentlyExaminedPath, condition) {
        for (const previousPath of previouslyExaminedPathList) {
    
            if (previousPath.nthEvent === condition.specification.nthEvent || condition.specification.nthEvent === undefined ) {
                if (previousPath.nameOfEvent === condition.specification.eventName || condition.specification.eventName === undefined ) {
                    if (previousPath.choiceMade === condition.specification.choice || condition.specification.choice === undefined ) {
                        return condition.storyBit;
                    }
                }    
            }
        }
        return null;
    };
    
    nthEventChecker (previouslyExaminedPathList, currentlyExaminedPath, condition){
        if (condition.specification.nth_this_event === currentlyExaminedPath.nthEvent || condition.specification.nth_this_event === undefined) {
            if (condition.specification.eventBefore === undefined) {
                return condition.storyBit;
            } else {
                for (const previousPath of previouslyExaminedPathList) {
                    if (previousPath.nameOfEvent === condition.specification.eventBefore) {
                        return condition.storyBit;
                    }
                }
                return null;
            }
        }
    
        else {
            return null;
        }
    };

    defaultEnding (previouslyExaminedPathList, currentlyExaminedPath, condition){
        return condition.storyBit;
    };

    conditionTypeConversionEnding = {
        "nthEventChecker" : this.nthEventChecker,
        "specificEventChecker" : this.specificEventChecker,
        "defaultEnding" : this.defaultEnding
    };

    paragraphDeterminer (endGameStoryBit, paragraphType, paragraphTypeLedger){
        let result;
        let breakBefore = true;
        if (paragraphTypeLedger[paragraphTypeLedger.length-1] === "last sentence"){
            breakBefore = false;
        }
    
        if (paragraphType === "none" || paragraphType === "new paragraph"){
            result = endGameStoryBit;
        } else if (paragraphType === "last sentence" || paragraphType === "standalone paragraph"){
            result = endGameStoryBit+"<br><br>";
        }
    
        if (paragraphType === "standalone paragraph" || paragraphType === "new paragraph"){
            if (breakBefore){
                result = "<br><br>"+result;
            }
        }
    
        return result;
    };
};