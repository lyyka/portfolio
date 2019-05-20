(function(){
    document.getElementById('scroll-top').addEventListener('click', scrollTop);
})();

function scrollTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
