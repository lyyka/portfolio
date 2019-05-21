// dom el is undefined
let menu_dom = undefined;

//  on page load
(function(){
    // declare menu_dom
    menu_dom = document.getElementById('menu-wrap');
    // add event listeners to links
    const links = document.getElementsByClassName('menu-item');
    for(let i = 0; i < links.length; i++){
        links[i].addEventListener("click", close);
    }
    // add event listener to menu open button and close
    document.getElementById('menu-open').addEventListener("click", open);
    document.getElementById('menu-close').addEventListener("click", close);
})();


function open(){
    menu_dom.style.display = "block";
    menu_dom.classList.remove("animated");
    menu_dom.classList.remove("fadeOutRightBig");
    menu_dom.classList.add("animated");
    menu_dom.classList.add("fadeInLeftBig");
}

function close(){
    menu_dom.classList.remove("animated");
    menu_dom.classList.remove("fadeInLeftBig");
    menu_dom.classList.add("animated");
    menu_dom.classList.add("fadeOutRightBig");
    window.setTimeout(function(){
        menu_dom.style.display = "none";
    }, 1500);
}
