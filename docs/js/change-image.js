function changeImage() { // 背景画像を変更する（CSSの--background-imageに渡す画像ファイルパスを`01`〜`08`の間で変動させる）
    console.debug('call changeImage()');
    const element = document.getElementById('background-image-file-id');
    console.debug(element);
    const nowId = parseInt(element.innerText); // parseIntはゼロサプレスも兼ねる
    console.debug(`nowId: ${nowId}`);
    const nextId = (nowId < 8) ? nowId + 1 : 1;
    console.debug(`nextId: ${nextId}`);
    element.innerText = `${nextId}`.padStart(2, '0');
    const url = `../assets/image/textures/${element.innerText}.jpg`
    document.querySelector(':root').style.setProperty('--background-image', `url("${url}")`);
    console.debug(`--background-image: ${getComputedStyle(document.querySelector(':root')).getPropertyValue('--background-image')}`);
}

