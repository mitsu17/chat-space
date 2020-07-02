$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
          `<div class="chat-main__message-list__message">
            <div class="chat-main__message-list__message__upper-box">
              <p class="chat-main__message-list__message__upper-box__message-poster">
                ${message.user_name}
              </p>
              <p class="chat-main__message-list__message__upper-box__post-date">
                ${message.created_at}
              </p>
            </div>
            <p class="chat-main__message-list__message__lower-box__message-text">
            </p>
            <p class="lower-message__content">
              ${message.content}
            </p>
            <img class="lower-message__image" src=${message.image}>
          </div>`
      return html;
    } else {
      var html =
          `<div class="chat-main__message-list__message">
            <div class="chat-main__message-list__message__upper-box">
              <p class="chat-main__message-list__message__upper-box__message-poster">
                ${message.user_name}
              </p>
              <p class="chat-main__message-list__message__upper-box__post-date">
                ${message.created_at}
              </p>
            </div>
            <p class="chat-main__message-list__message__lower-box__message-text">
            </p>
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').attr('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
     return false;
  });
});
