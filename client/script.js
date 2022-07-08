'use strict';

class Message {
  constructor (content, authorId, timestamp) {
    this.content = content;
    this.authorId = authorId;
    this.timestamp = timestamp;
  }
}

function genRandomMs () {
  // Returns a random number between 0 and 10 seconds, in milliseconds
  return Math.floor(Math.random() * 1e4);
}

function prettifyDate (timestamp) {
  // Returns the date in hh:mm am/pm format
  timestamp = parseInt(timestamp);
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(timestamp).toLocaleTimeString('en-US', options);
}

function getMessages () {
  $.get('/messages', data => {
    data.forEach(msg => showMessage(msg));
  });
}

function postMessage (msg) {
  $.ajax({
    url: '/messages',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(msg)
  });
}


function showMessage (msg) {
  const { content, authorId, timestamp } = msg;
  const $HtmlMsg = $(`
    <div class="message ${authorId ? 'right' : 'left'}">
      <div class="message-text">${content}</div>
      <div class="message-time">${prettifyDate(timestamp)}</div>
    </div>
  `);
  $('.messages-container').append($HtmlMsg);
}

function simulateIncomingMessages () {
  setTimeout(() => {
    $.get('https://cw-quotes.herokuapp.com/api/quotes/random', data => {
      const msg = new Message(data.result.text, false, Date.now());
      postMessage(msg);
      showMessage(msg);
      scrollToBottom ();
    });
  }, genRandomMs());
}

function scrollToBottom () {
  const $messages = $('.messages-container');
  $messages.animate({
    scrollTop: $messages[0].scrollHeight
  });
}

$(document).ready(() => {
  $('.chat-btn').click(() => {
    $('.chat-box').slideToggle('slow');
  })
});

$(() => {
  getMessages();
  scrollToBottom();
  $('#msg-form').on('submit',(e) => {
    e.preventDefault();
    const content = $('#text').val();
    if (content) {
      $('#text').val('');
      const msg = new Message(content, true, Date.now());
      postMessage(msg);
      showMessage(msg);
      scrollToBottom ();
      simulateIncomingMessages();
    }
  });
});
