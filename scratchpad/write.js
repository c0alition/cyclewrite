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

newTextAreaButton.addEventListener('click', createNewMediaTypeSelector);    
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
    newTextArea.scrollIntoView();
    /*if (newTextArea.id != "p0") {
        newTextArea.focus();
    }*/
    newTextArea.addEventListener('input', extendTextArea);
    pTagId++;
}

    // Create multi-box set of 3
function createNewMultiBoxSet() {
    const newMultiBoxContainer = document.createElement('div');
    newMultiBoxContainer.className = 'multi-box-container';
    for (let i = 0; i < 3; i++) {
        const position = ['left', 'center', 'right'];
        const newMultiBox = document.createElement('div');
        newMultiBox.className = 'multi-box ' + position[i];
        newMultiBox.addEventListener('click', function() {
            newMultiBox.classList.toggle('clicked');
        });
        newMultiBoxContainer.appendChild(newMultiBox);
    }
    contentSelector.appendChild(newMultiBoxContainer);
}

    /* Toggle clicked CSS class for clicked multi-box
function enableContentSelector() {
    document.querySelectorAll('.multi-box').forEach(function(box) {
        box.addEventListener('click', function() {
            box.classList.toggle('clicked');
        });
    });
}*/
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
        newContentArea.id = 'contentArea' + [pTagId];
        contentAreaContainer.appendChild(newContentArea);
        console.log(newContentArea.className);
        
        //three div
    } else if (pattern == 2) {
    for (let i = 0; i < 3; i++) {
        const newContentArea = document.createElement('div');
        newContentArea.className = 'content-area-30';
        newContentArea.id = 'contentArea' + [pTagId] + [i];
        contentAreaContainer.appendChild(newContentArea);
        console.log(newContentArea.className);
    }
        //two div left 60 right 30
    } else if (pattern === 3 || pattern === 6) {
        const newContentArea1 = document.createElement('div');
        const newContentArea2 = document.createElement('div');
        newContentArea1.className = 'content-area-60';
        newContentArea1.id = 'contentArea' + [pTagId] + '-0';
        newContentArea2.className = 'content-area-30';
        newContentArea2.id = 'contentArea' + [pTagId] + '-1';
        contentAreaContainer.appendChild(newContentArea1);
        contentAreaContainer.appendChild(newContentArea2);
        console.log(newContentArea1.className);

        //two div left 30 right 60
    } else if (pattern === 4 || pattern === 5) {
        const newContentArea1 = document.createElement('div');
        const newContentArea2 = document.createElement('div');
        newContentArea1.className = 'content-area-30';
        newContentArea1.id = 'contentArea' + [pTagId] + '-0';
        newContentArea2.className = 'content-area-60';
        newContentArea2.id = 'contentArea' + [pTagId] + '-1';
        contentAreaContainer.appendChild(newContentArea1);
        contentAreaContainer.appendChild(newContentArea2);
        console.log(newContentArea1.className);

    }
    contentAreaContainer.querySelectorAll('div').forEach((area) => {
        area.appendChild(createNewMediaTypeSelector());
    });
    createNewTextArea();
}


    // Extend text area down as you type
function extendTextArea() {
    this.style.height = 'auto'; 
    this.style.height = this.scrollHeight + 'px';
    contentSelector.style.position = this.style.height + '5px';
}
    
    //Lisen for ctrl+shift+enter and make a new textarea if pressed
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey === true && event.shiftKey === true && event.key === 'Enter') {
        createNewTextArea();
    }
});

//create image/text selector
function createNewMediaTypeSelector() {
    const mediaTypeSelector = document.createElement('div');
    mediaTypeSelector.className = 'media-type-selector';
    //image input, hidden
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';
    imageInput.className = 'image-input';
    //image button/text to trigger input
    const imageButton = document.createElement('h3');
    imageButton.className = 'image-button';
    imageButton.textContent = '+ Image';
    imageButton.id = 'newImg' + [pTagId];
    imageButton.addEventListener('click', () => {
        imageInput.click();
      });      
    //text button/text
    const textButton = document.createElement('h3');
    textButton.className = 'text-button';
    textButton.textContent = '+ Text';
    textButton.id = 'newP' + [pTagId];
    textButton.addEventListener('click', createNewTextArea);
    //add the buttons to the selector areas
    mediaTypeSelector.appendChild(imageButton);
    mediaTypeSelector.appendChild(textButton);
    console.log(mediaTypeSelector);
    return mediaTypeSelector;
}

function imageUploadPreview() {

    const newImage = document.getElementById('newImg' + [pTagId]);
    const previewImage0 = document.getElementById('previewImage0');
    newImage.addEventListener('change', (event) => {
        const currentImage = event.target.files[0];
        if (currentImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage0.src = e.target.result;
                previewImage0.style.display = 'block';
            };
            reader.readAsDataURL(currentImage);
        }
    });
}


      
createNewTextArea();
createNewMultiBoxSet();
//                                                                                                                  enableContentSelector();

});


