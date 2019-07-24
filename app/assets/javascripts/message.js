$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message" data-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message" data-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src= "" >
        </div>`
      return html;
    };
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = ""
      html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast'); 
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });

 
 
 
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data('id')
    group_id = $(".left-header__title").data('id')
    reload_url = $(location).attr('href');
    
  if(reload_url.match(/\/groups\/.\/messages/)){

    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: `/groups/${group_id}/messages`,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
    
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる   
        messages.forEach( function(message){
         
            
            message.image? var img = <img src=${message.image} ></img> : var img =<img src= "" ></img>

            var html =
             `<div class="message" data-id=${message.id}>
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.date}
                  </div>
                </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                </div>
                img
              </div>`
          
          insertHTML += html
        })
          
        //メッセージが入ったHTMLを取得
        //メッセージを追加
        $('.messages').append(insertHTML)
        if(insertHTML != ''){
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        }
    })
    .fail(function() {
      alert('error');
    });
  }
  };
  setInterval(reloadMessages, 5000);
}); 
