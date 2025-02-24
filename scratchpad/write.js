document.addEventListener('DOMContentLoaded', () => {

    
    const scratchpad = document.getElementById('scratchpad');
    const contentSelector = document.getElementById('contentSelector');
    const newMultiBoxButton = document.getElementById('newMultiBox');
    const newTextAreaButton = document.getElementById("newTextArea");

    let pTagId = 0;
    let contentLayout = {
        left: 0,
        center: 0,
        right: 0
    };

    newTextAreaButton.addEventListener('click', createNewTextArea);    
    newMultiBoxButton.addEventListener('click', createNewMultiBoxSet);


    // Create new text area
    function createNewTextArea() {
        const newTextAreaContainer = document.createElement('div');
        newTextAreaContainer.className = 'text-input-container';
        const newTextArea = document.createElement('textarea');
        newTextArea.className = 'text-input';
        newTextArea.id = 'p' + [pTagId];
        newTextAreaContainer.appendChild(newTextArea);
        scratchpad.appendChild(newTextAreaContainer);
        newTextArea.focus();
        newTextArea.addEventListener('input', extendTextArea);
        pTagId++;
    }

    // Create new multi-box set of 3
    function createNewMultiBoxSet() {
        const newMultiBoxContainer = document.createElement('div');
        newMultiBoxContainer.className = 'multi-box-container';
        for (let i = 0; i < 3; i++) {
            const position = ['left', 'center', 'right'];
            const newMultiBox = document.createElement('div');
            newMultiBox.className = 'multi-box ' + position[i];
            newMultiBoxContainer.appendChild(newMultiBox);
        }
        contentSelector.appendChild(newMultiBoxContainer);
    }

    // Toggle clicked CSS class for clicked multi-box
    function enableContentSelector() {
        document.querySelectorAll('.multi-box').forEach(function(box) {
            box.addEventListener('click', function() {
                box.classList.toggle('clicked');

            });
        });
    }
/*
    function processContentLayout() {
        
        let leftContentSection = document.createElement('div');

        document.querySelectorAll('.multi-box').forEach(function(box) {
            if (box.classList.contains('clicked')) {
                if (box.classList.contains('left')) {
                    contentLayout.left++;
                } else if (box.classList.contains('center')) {
                    contentLayout.center++;
                } else if (box.classList.contains('right')) {
                    contentLayout.right++;
                }   
            }
        if (contentLayout.left == 0) {
            if (contentLayout.center == 0) {
                let centerContentSection = document.createElement('div');
                if (contentLayout.right == 1) {
                    let rightContentSection = document.createElement('div');
                } else {
                    newContentSection.className = 'content-section right';
                }
            }
        } 
        */



        



    // Extend text area down as you type
    function extendTextArea() {
        this.style.height = 'auto'; 
        this.style.height = this.scrollHeight + 'px'; 
    }
    
    //Lisen for enter key and make a new textarea if pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            createNewTextArea();
        }
    });
    
    createNewTextArea();
    createNewMultiBoxSet();
    enableContentSelector();
    








});


