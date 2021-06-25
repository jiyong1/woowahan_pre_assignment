(function() {
    const toggleBarElem = document.querySelector('.toggle-container');
    const mainContainer = document.querySelector('.main-container');
    let debounce = false;
    const toggleCallback = (e) => {
        if (!debounce) {
            debounce = true;
            return;
        }
        if (mainContainer.classList.contains('toggle-on')) {
            let current = e.target;
            while (current !== document) {
                if (current === mainContainer) {
                    return;
                }
                current = current.parentNode;
            }
            debounce = false;
            document.body.classList.remove('toggle-on');
            mainContainer.classList.remove('toggle-on');
            document.removeEventListener('click', toggleCallback);
        }
    }
    toggleBarElem.addEventListener('click', () => {
        if (!mainContainer.classList.contains('toggle-on')) {
            mainContainer.classList.add('toggle-on');
            document.body.classList.add('toggle-on');
            document.addEventListener('click', toggleCallback);
        }
    })
})();