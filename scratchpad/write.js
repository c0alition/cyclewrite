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

newTextAreaButton.addEventListener('click', createMediaTypeSelector);    
newMultiBoxButton.addEventListener('click', createNewContentArea);


    // Create new text area
function createNewTextArea() {
    const newTextAreaContainer = document.createElement('div');
    newTextAreaContainer.className = 'text-input-container';
    const newTextArea = document.createElement('textarea');
    newTextArea.className = 'text-input';
    newTextArea.id = 'p' + pTagId;
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
        //1 big div (actually 100% width)
    if (pattern == 1) {
        const newContentArea = document.createElement('div');
        newContentArea.className = 'content-area-90';
        newContentArea.id = 'contentArea' + pTagId;
        contentAreaContainer.appendChild(newContentArea);
        console.log(newContentArea.className);
        
        //three div
    } else if (pattern == 2) {
    for (let i = 0; i < 3; i++) {
        const newContentArea = document.createElement('div');
        newContentArea.className = 'content-area-30';
        newContentArea.id = 'contentArea' + pTagId + [i];
        contentAreaContainer.appendChild(newContentArea);
        console.log(newContentArea.className);
    }
        //two div left 60 right 30
    } else if (pattern === 3 || pattern === 6) {
        const newContentArea1 = document.createElement('div');
        const newContentArea2 = document.createElement('div');
        newContentArea1.className = 'content-area-60';
        newContentArea1.id = 'contentArea' + pTagId + '-0';
        newContentArea2.className = 'content-area-30';
        newContentArea2.id = 'contentArea' + pTagId + '-1';
        contentAreaContainer.appendChild(newContentArea1);
        contentAreaContainer.appendChild(newContentArea2);
        console.log(newContentArea1.className);

        //two div left 30 right 60
    } else if (pattern === 4 || pattern === 5) {
        const newContentArea1 = document.createElement('div');
        const newContentArea2 = document.createElement('div');
        newContentArea1.className = 'content-area-30';
        newContentArea1.id = 'contentArea' + pTagId + '-0';
        newContentArea2.className = 'content-area-60';
        newContentArea2.id = 'contentArea' + pTagId + '-1';
        contentAreaContainer.appendChild(newContentArea1);
        contentAreaContainer.appendChild(newContentArea2);
        console.log(newContentArea1.className);

    }
    contentAreaContainer.querySelectorAll('div').forEach((area) => {
        area.appendChild(createMediaTypeSelector(area));
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

// Creates the media type selector for generated content area.
function createMediaTypeSelector(contentArea) {
    const mediaTypeSelector = document.createElement('div');
    mediaTypeSelector.className = 'media-type-selector';
  
        // Create a hidden file input for selecting an image.
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';
    imageInput.className = 'image-input';

        // Create a button with listener to trigger image input on click.
    const imageButton = document.createElement('h3'); 
    imageButton.className = 'image-button';
    imageButton.textContent = '+ Image';
    imageButton.addEventListener('click', () => {
      imageInput.click();
    });
  
        // Create a button with listener for adding text area.
    const textButton = document.createElement('h3');
    textButton.className = 'text-button';
    textButton.textContent = '+ Text';
    textButton.addEventListener('click', () => {
      updatePreviewTextArea(contentArea, mediaTypeSelector);
    });
  
        // Attach the change listener for the image input.
    imageInput.addEventListener('change', (event) => {
      const selectedImage = event.target.files[0];
      if (selectedImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          updatePreviewImage(contentArea, e.target.result, mediaTypeSelector);
        };
        reader.readAsDataURL(selectedImage);
      }
    });
  
    mediaTypeSelector.appendChild(imageButton);
    mediaTypeSelector.appendChild(imageInput);
    mediaTypeSelector.appendChild(textButton);
  
    return mediaTypeSelector;
  }
  
  // Update this content area with an image preview.
  function updatePreviewImage(contentArea, dataURL, mediaTypeSelector) {
    const previewImg = document.createElement('img');
    previewImg.src = dataURL;
    previewImg.style.display = 'block';
    previewImg.style.position = 'relative';
    // probably hacky but whatever. add extra to width and height to cover newcontentarea placeholder div (dotted rounded borders) 
    previewImg.style.width = 'calc(100% + 10px)';   
    previewImg.style.height = 'calc(100% + 10px)';  
    previewImg.style.margin = '-5px';              
    previewImg.style.objectFit = 'cover';          
    previewImg.style.objectPosition = 'center';
    contentArea.appendChild(previewImg);
  
    // hide +image +text
    if (mediaTypeSelector.parentNode) {
        mediaTypeSelector.style.display = 'none';
      }
  }
  
  // Update this content area with new text area to fit div size. if there is a picture already check it's dimensions and use that for textarea dimensions
  function updatePreviewTextArea(contentArea, mediaTypeSelector) {
    let contentWidth = contentArea.clientWidth || 200;
    let contentHeight = contentArea.clientHeight || 200;
    const textArea = document.createElement('textarea');
    textArea.className = 'text-input';
    // probably hacky but whatever. add extra to width and height to cover newcontentarea placeholder div (dotted rounded borders)
    textArea.style.width = 'calc(100% + 10px)';   
    textArea.style.height = 'calc(100% + 10px)';  
    textArea.style.margin = '-5px';   
    contentArea.appendChild(textArea);
  
    // hide +image +text
    if (mediaTypeSelector.parentNode) {
        mediaTypeSelector.style.display = 'none';
      }
  
  }
  
    
function imageUploadPreview() {

    const newImage = document.getElementById('newImg' + pTagId);
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


