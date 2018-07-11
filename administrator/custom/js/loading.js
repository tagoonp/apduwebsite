// var root_domain = 'http://localhost/public_html/alcoholeconomy/public/'
var load_element = '<div class="loadelement dn">' +
                      '<div class="loadelement_1">' +
                        '&nbsp;' +
                      '</div>' +
                      '<div class="loadelement_2">' +
                        '<img src="./img/reload.svg" alt="" style="width: 100%;">' +
                      '</div>' +
                    '</div>'
var loading = {
  init: function(){
    document.write(load_element)
  },
  showload: function(){
    $('.loadelement').fadeIn()
  },
  hideload: function(){
    $('.loadelement').fadeOut()
  }
}

loading.init()
