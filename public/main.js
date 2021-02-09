const select = (selector) => document.querySelector(selector);

const form = select('.form');
const message = select('.message')

const displayMessage = (text, color) => {
    message.style.visibility = 'visible';
    message.style.backgroundColor = color;
    message.innerText = text;
    setTimeout(() => {
        message.style.visibility = 'hidden';
    }, 3000);
}

const validateForm = () => {
    const title = select('#title').value.trim();
    const content = select('#content').value.trim();
    const thumbnail = select('#thumbnail').value;
    const category = select('#category').value; 

    const acceptedImageFiles = ['jpg', 'jpeg', 'png']
    
    if (!title || !content || category =='0') {
        //show some error
        return displayMessage('Field cannot be empty', 'red');
    }

    
    const extension = thumbnail.split('.').pop();
    if (!acceptedImageFiles.includes(extension)) {
        return displayMessage('Image file is not valid', 'red');
    }

    return true;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    //form validation
    const valid = validateForm();

    if (valid) {
        //submit the form
        const formData = new FormData(form);
        await postData(formData)
    }
});

const resetForm = () => {
    select('#title').value = '';
    select('#content').value = '';
    select('#thumbnail').value = null;
    select('#category').value = '0';
    select('#featured-content').checked = false;
}

const postData = async (data) => {
    const result = await fetch('/api/create', {
        method: 'POST',
        body: data,
    });

    if (result.ok) {
        const response = await result.json();
        if (response.success) {
            displayMessage(response.message, 'green');
            resetForm();
        }
        if (!response.success) {
            displayMessage(response.message, 'red');
        }
    }
}