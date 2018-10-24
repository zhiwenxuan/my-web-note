let component = () => {
    let div = document.createElement('div');
    let helloText = 'Hello Webpack';
    div.innerHTML = helloText;
    return div;
}

document.body.appendChild(component());