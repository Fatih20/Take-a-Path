// localStorage.removeItem("path_taken");

function director (path_taken, signal) {
    const current_event = event_name_conversion[path_taken[path_taken.length-1][1]];
    const nth_current_event = path_taken[path_taken.length-1][0];
    path_taken[path_taken.length-1].push(signal);
    if (current_event.Answers_For_Next_Event_List.length === 0) {
        generate_end_game();
    } else {
        for (answer_for_next_event of current_event.Answers_For_Next_Event_List){
            if (signal === answer_for_next_event.trigger) {
                path_taken.push([(parseInt(nth_current_event)+1).toString(), answer_for_next_event.next_event_name]);
                localStorage.setItem("path_taken", JSON.stringify(path_taken));
                update_play_area(path_taken);
                break;
            }
        }
    }

};
