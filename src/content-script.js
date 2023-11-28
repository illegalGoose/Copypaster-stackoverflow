const preEls = document.querySelectorAll('pre');

[...preEls].forEach((preEl) => {

    const root = document.createElement('div'); //Помещаем кнопку в div, чтобы на нее распротранялись только бразуерные стили
    const shadowRoot = root.attachShadow({mode: 'open'});
    root.style.position = "relative";

    const cssUrl = chrome.runtime.getURL('content-script.css'); //Стили. Для хрома неймспэйс "chrome.", для остальных бразуеров "browser."
    console.log(cssUrl);
    shadowRoot.innerHTML = `<link rel="stylesheet" href="${cssUrl}"></link>`;

    const button = document.createElement('button');
    button.innerText = 'Copy';
    button.type = 'button';

    shadowRoot.prepend(button);

    preEl.prepend(root);

    const codeEl = preEl.querySelector('code');

    button.addEventListener('click', () => {
        navigator.clipboard.writeText(codeEl.innerText);
        notify();
    });
});

function notify() {
    const scriptEl = document.createElement('script');
    scriptEl.src = chrome.runtime.getURL("notification.js");

    document.body.appendChild(scriptEl);
    
    scriptEl.onload = () => {
        scriptEl.remove();
    }
}
