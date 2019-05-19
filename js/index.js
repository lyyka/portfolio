(function(){
    document.getElementById('share-button').addEventListener("click", copyShareLink);
})();

function copyShareLink(){
    str = 'https://lyyka.github.io/portfolio';
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    notify.success('Sharing link copied to clipboard!', '<i class="em em-smile ml-2"></i');
}
