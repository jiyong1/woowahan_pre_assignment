(function (){
    const board = document.querySelector(".board");
    const lineOne = `<line x1="15" y1="15" x2="85" y2="85" stroke="white" stroke-width="6%"></line>`;
    const lineTwo = `<line x1="85" y1="15" x2="15" y2="85" stroke="white" stroke-width="6%"></line>`;
    let xturn = true;

    function setLayout() {
        board.style.height = `${board.getBoundingClientRect().width - 1}px`;
    }
    function boardClickHandler(e) {
        let current = e.target;
        
    }

    window.addEventListener('resize', setLayout);
    setLayout();
})();