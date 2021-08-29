export function play_area_direction_row (is_row) {
    const play_area = document.querySelector(".play-area");
    // Start is row, game is column
    play_area.classList.toggle("play-area-start", is_row);
    play_area.classList.toggle("play-area-game", !is_row);
};

export function display_replay_button (visibility) {
    const replay_button = document.querySelector(".replay-button");
    // Start is hidden, end is shown
    replay_button.classList.toggle("replay-button-start", !visibility);
    replay_button.classList.toggle("replay-button-end", visibility);
};

export function display_attribution (visibility) {
    const attribution = document.querySelector(".attribution");
    // Start is hidden, game-end is shown
    attribution.classList.toggle("attribution-start", !visibility);
    attribution.classList.toggle("attribution-game-end", visibility);
};

export function display_ending_option_button (visibility) {
    const ending_option_button_container = document.querySelector(".ending-option-button-container");

    ending_option_button_container.classList.toggle("ending-option-button-container-game-start", !visibility);
    ending_option_button_container.classList.toggle("ending-option-button-container-end", visibility);
    
}