function play_area_direction_row (is_row: boolean) {
    const play_area = document.querySelector(".play-area");
    // Start is row, game is column
    play_area.classList.toggle("play-area-start", is_row);
    play_area.classList.toggle("play-area-game", !is_row);
};

function display_replay_button (visibility: boolean) {
    const replay_button = document.querySelector(".replay-button");
    // Start is hidden, end is shown
    replay_button.classList.toggle("replay-button-start", !visibility);
    replay_button.classList.toggle("replay-button-end", visibility);
};

function display_attribution (visibility: boolean) {
    const attribution = document.querySelector(".attribution");
    // Start is hidden, game-end is shown
    attribution.classList.toggle("attribution-start", !visibility);
    attribution.classList.toggle("attribution-game-end", visibility);
};

export { play_area_direction_row };
export { display_replay_button };
export { display_attribution };