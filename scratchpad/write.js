document.addEventListener('DOMContentLoaded', () => {

    
    const sheet = document.getElementById('sheet');
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
    newMultiBoxButton.addEventListener('click', createNewContentArea);


    // Create new text area
    function createNewTextArea() {
        const newTextAreaContainer = document.createElement('div');
        newTextAreaContainer.className = 'text-input-container';
        const newTextArea = document.createElement('textarea');
        newTextArea.className = 'text-input';
        newTextArea.id = 'p' + [pTagId];
        newTextAreaContainer.appendChild(newTextArea);
        sheet.appendChild(newTextAreaContainer);
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
    // Check layout selection and return pattern number
    function processContentLayout() {

        let layoutTotal = 0;
        contentLayout = {
            left: 0,
            center: 0,
            right: 0
        };
        
    

        document.querySelectorAll('.multi-box').forEach(function(box) {
            if (box.classList.contains('clicked')) {
                if (box.classList.contains('left')) {
                    contentLayout.left++;
                    layoutTotal++;
                } else if (box.classList.contains('center')) {
                    contentLayout.center++;
                    layoutTotal++;
                } else if (box.classList.contains('right')) {
                    contentLayout.right++;
                    layoutTotal++;
                }   
            }
        }); 

            // full width
        if (layoutTotal == 3) {
            return 1;  
            // All divs 30 center text
            } else if ((layoutTotal == 2 && contentLayout.center == 0) || layoutTotal == 0 || (layoutTotal == 1 && contentLayout.center == 1)) {
                return 2;
            // 60/30 left/right
            } else if (contentLayout.center == 1 && layoutTotal == 2) {
                if (contentLayout.left == 1) {
                    return 3;
                } else if (contentLayout.right == 1) {
                    return 4;
                }
            // 60/30 empty cells
            } else if (layoutTotal == 1 && contentLayout.center == 0) {
                if (contentLayout.left == 1) {
                    return 5;
                } else if (contentLayout.right == 1) {
                    return 6;
                }
        }
    }
    
    // Create image/text empty divs based on layout pattern. 
    function createNewContentArea() {
        let pattern = processContentLayout();
        const contentAreaContainer = document.createElement('div');
        contentAreaContainer.className = 'content-area-container';
        sheet.appendChild(contentAreaContainer);
        
        if (pattern == 1) {
            const newContentArea = document.createElement('div');
            newContentArea.className = 'content-area-90';
            contentAreaContainer.appendChild(newContentArea);
                console.log(newContentArea.className);
        //three div
        } else if (pattern == 2) {
        for (let i = 0; i < 3; i++) {
            const newContentArea = document.createElement('div');
            newContentArea.className = 'content-area-30';
            contentAreaContainer.appendChild(newContentArea);
            console.log(newContentArea.className);
        }
        //two div left 60 right 30
        } else if (pattern === 3 || pattern === 6) {
                const newContentArea1 = document.createElement('div');
                const newContentArea2 = document.createElement('div');
                newContentArea1.className = 'content-area-60';
                newContentArea2.className = 'content-area-30';
                contentAreaContainer.appendChild(newContentArea1);
                contentAreaContainer.appendChild(newContentArea2);
                console.log(newContentArea1.className);

        //two div left 30 right 60
        } else if (pattern === 4 || pattern === 5) {
            const newContentArea1 = document.createElement('div');
            const newContentArea2 = document.createElement('div');
            newContentArea1.className = 'content-area-30';
            newContentArea2.className = 'content-area-60';
            contentAreaContainer.appendChild(newContentArea1);
            contentAreaContainer.appendChild(newContentArea2);
            console.log(newContentArea1.className);

            }
        createNewTextArea();
        

    }


        



    // Extend text area down as you type
    function extendTextArea() {
        this.style.height = 'auto'; 
        this.style.height = this.scrollHeight + 'px';
        contentSelector.style.position = this.style.height + '5px';
    }
    
    /*Lisen for enter key and make a new textarea if pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            createNewTextArea();
        }
    });
    */
    
    createNewTextArea();
    createNewMultiBoxSet();
    enableContentSelector();
    








});


