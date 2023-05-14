
    let gameSound = new Audio("../audio/battle-theme-looping-SBA-300554546-preview.mp3");
    gameSound.play();
    hidePopUp();

function hidePopUp(){
    document.querySelector("#pop").classList.add("hide");
}