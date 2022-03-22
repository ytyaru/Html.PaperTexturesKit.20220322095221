window.addEventListener('load', (event) => {
    console.log('Loaded !!');
});
window.addEventListener('click', (event) => {
    changeImage();
});
window.addEventListener('touchstart', (event) => {
    changeImage();
});
window.addEventListener("keydown", event => {
    if (event.repeat) { return; } // 押しっぱなしによる連続入力の禁止
    changeImage();
}, {passive: false});



