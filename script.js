const textarea = document.querySelector('.chatbox-message-input');
const chatboxForm = document.querySelector('.chatbox-message-form');

textarea.addEventListener('input', function () {
    let line = textarea.value.split('\n').length;

    if (textarea.rows < 6 || line < 6) {
        textarea.rows = line;
    }

    if (textarea.rows > 1) {
        chatboxForm.style.alignItems = 'flex-end';
    } else {
        chatboxForm.style.alignItems = 'center';
    }
});

const chatboxToggle = document.querySelector('.chatbox-toggle');
const chatboxToggle0 = document.querySelector('.chatbox-toggle0');
const chatboxMessage = document.querySelector('.chatbox-message-wrapper');

chatboxToggle.addEventListener('click', function () {
    chatboxMessage.classList.toggle('show');
});
chatboxToggle0.addEventListener('click', function () {
    chatboxMessage.classList.toggle('show');
});

const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle');
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu');

dropdownToggle.addEventListener('click', function () {
    dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', function (e) {
    if (!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
        dropdownMenu.classList.remove('show');
    }
});

const chatboxMessageWrapper = document.querySelector('.chatbox-message-content');
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message');

chatboxForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const userMessage = textarea.value.trim(); // Capture the user input before clearing

    if (isValid(userMessage)) {
        writeMessage(userMessage);
        setTimeout(() => autoReply(userMessage), 1000); // Pass the user message to autoReply
    }
});

function addZero(num) {
    return num < 10 ? '0' + num : num;
}

function writeMessage(userMessage) {
    const today = new Date();
    let message = `
        <div class="chatbox-message-item sent">
            <span class="chatbox-message-item-text">
                ${userMessage.replace(/\n/g, '<br>\n')}
            </span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `;
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
    chatboxForm.style.alignItems = 'center';
    textarea.rows = 1;
    textarea.focus();
    textarea.value = ''; // Clear the textarea after sending
    chatboxNoMessage.style.display = 'none';
    scrollBottom();
}

function autoReply(userMessage) {
    const today = new Date();
    let replyMessage;

    if (userMessage === "143") {
        replyMessage = "I love you too! ";
    }
	else if (userMessage === "69") {
        replyMessage = "ohh yahhhh baby ";
    }
	else if (userMessage === "lavany is rand") {
        replyMessage = "ture as fuck";
    }
	else if (userMessage === "shree swami") {
        replyMessage = "shree swami samarth";
    }
	
	 else {
        replyMessage = "Thank you for your awesome support!";
    }

    let message = `
        <div class="chatbox-message-item received">
            <span class="chatbox-message-item-text">
                ${replyMessage}
            </span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `;
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
    scrollBottom();
}

function scrollBottom() {
    chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight);
}

function isValid(value) {
    let text = value.replace(/\n/g, '');
    text = text.replace(/\s/g, '');

    return text.length > 0;
}
