// var ws_url = 'http://localhost/public_html/apdu/controller/'
// var root_url = 'http://localhost/public_html/apdu/'

var ws_url = 'http://apdu.medicine.psu.ac.th/2018/controller/'
var root_url = 'http://apdu.medicine.psu.ac.th/2018/'



var enmonth = new Array ("", "January","February","March",
"April","May","June", "July","August","September",
"October","November","December");

var enmonth_sh = new Array ("", "Jan","Feb","Mar",
"Apr","May","Jun", "Jul","Aug","Sep",
"Oct","Nov","Dec");
var main = {
  convertEndate: function(input){
    let a = input.split(' ');
    let cdate = a[0].split('-');
    return parseInt(cdate[2]) + ' ' + enmonth[parseInt(cdate[1])] + ', ' + (parseInt(cdate[0]));
  },
  init: function(){
    this.loadMenu()
    $w = $(document).width()

    console.log($w);
    if($w < 480){
      $('.menu-logo').hide()
      $('#main-menu').css('padding-left', '10px')
      $('a.navbar-brand').css('font-size', '40px !important;')
      setTimeout(function(){
        $('#slider-contaner').removeClass('mt-100')
        $('#slider-bg').addClass('pt-0')
        $('#slider-bg').addClass('pb-30')
        // $('#slider-contaner').addClass('mt-50')
      }, 100)
    }else{
      setTimeout(function(){
        $('#a2').css('padding-top', '100px !important;')
        console.log('as');
      }, 1000)

      // style="margin-top:100px;"
      console.log('a');
    }

    $('.owl-dots').hide()
  },
  loadMenu: function(){
    // for (var i = 1; i <= 1; i++) {
    this.loadMenuLevel(1)
    this.loadIntranet()
    this.loadExternal()
    this.loadAnnoucement(1)
    this.loadAnnoucement(2)
    this.loadAnnoucement(3)
    this.loadAnnoucement(4)
    this.loadSlider()
    // }
  },
  countSliderClick: function(id){
    var param = {
      slider_id: id
    }

    var jxr = $.post(ws_url + 'management/set-slider-count.php', param, function(){})

  },
  loadSlider: function(){
    var jxr = $.post(ws_url + 'management/loadslider-web.php', function(){}, 'json')
               .always(function(snap){
                  if(json_response(snap)){
                    $('.owl-carousel-1').empty()
                    snap.forEach(function(i){
                      $link = i.slider_fig_link

                      if(i.slider_fig_link == ''){
                        $link = '#'
                      }

                      var item = '<div class="item" style="cursor:pointer;">' +
                        '<a href="' + $link + '" target="' + i.slider_fig_target + '"><img src="' + i.slider_fig_url + '" alt="' + i.slider_alt + '" title="' + i.slider_alt + '" class="img-responsive" onclick="main.countSliderClick(\'' + i.slider_id + '\');"></a>' +
                      '</div>'
                      $('.owl-carousel-1').append(item)
                    })

                    $('.owl-carousel-1').owlCarousel({
                      animateOut: 'slideOutLeft',
                      animateIn: 'fadeIn',
                      items:1,
                      margin:20,
                      stagePadding:0,
                      smartSpeed:950,
                      autoplay:true,
                      autoplayTimeout:5000,
                      autoplayHoverPause:true,
                      loop:true,
                      nav:false,
                      autowidth: true
                    })
                  }
                })
  },
  loadAnnoucement: function(id){
    if(id == 1){
      var param = {
        cat_id: 1
      }
      var jxr = $.post(ws_url + 'management/loadmenuitem-web-post.php', param, function(){}, 'json')
                 .always(function(snap){
                   if(json_response(snap)){
                     $c = 1;
                     snap.forEach(function(i){

                       $data = '<div class="pin-content" style="padding: 3px 10px;">' +
                                 '<div class="card-item" onclick="window.location=\'' + i.content_url + '\'">' +
                                   '<div class="pc-title">' +
                                     // '<div class="pc-title-feature">' +
                                     //   '<img src="' + i.content_figure + '" alt="" class="img-responsive" style="width: 100%;">' +
                                     // '</div>' +
                                     '<div class="pc-title-header mt-0" style="line-height: 22px !important;">' +
                                       '<a class="text-primary_"><i class="fas fa-chevron-right" aria-hidden="true" style="font-size: 0.6em; color: rgb(7, 163, 107);"></i> ' + i.content_title + '</a> <span style="font-size: 0.8em; color: rgb(10, 172, 104);">[โพสเมื่อ <span>' + main.convertEndate(i.content_adddatetine) + '</span>]</span>' +
                                     '</div>' +
                                   '</div>' +
                                 '</div>' +
                               '</div>'
                        $('.content_p1_1').append($data)

                       $c++;
                       // $data = '<div class="ext-link"><a class="" href="' + i.ext_link + '" target="' + i.target + '" alt="' + i.menu_alt + '"><i class="fas fa-chevron-right"></i> ' + i.title + '</a></div>'
                       // $('#external_menu').append($data)
                     })
                   }
                 })
    }else if(id==2){
      var param = {
        cat_id: 2
      }
      var jxr = $.post(ws_url + 'management/loadmenuitem-web-post.php', param, function(){}, 'json')
                 .always(function(snap){
                   console.log(snap);
                   if(json_response(snap)){
                     $c = 1;
                     snap.forEach(function(i){
                       if($c == 1){
                         $data = '<div class="pin-content">' +
                                   '<div class="card-item" onclick="window.location=\'' + i.content_url + '\'">' +
                                     '<div class="pc-title">' +
                                       '<div class="pc-title-feature">' +
                                         '<img src="' + i.content_figure + '" alt="" class="img-responsive" style="width: 100%;">' +
                                       '</div>' +
                                       '<div class="pc-title-header mt-10" style="line-height: 22px;">' +
                                         i.content_title +
                                       '</div>' +
                                       '<div class="pc-title-ext fs08">' +
                                         'Post <span>' + main.convertEndate(i.content_adddatetine) + '</span> / Read : <span>' + i.content_read + '</span> times' +
                                       '</div>' +
                                     '</div>' +
                                   '</div>' +
                                 '</div>'
                          $('.content_p3_1').append($data)
                       }else{
                         $data = '<div class="pin-content">' +
                                   '<div class="card-item" onclick="window.location=\'' + i.content_url + '\'">' +
                                     '<div class="row">' +
                                       '<div class="col-sm-3" style="padding-right: 0px;">' +
                                         '<div class="pc-title-feature">' +
                                           '<img src="' + i.content_figure + '" alt="" class="img-responsive" style="width: 100%;">' +
                                         '</div>' +
                                       '</div>' +
                                       '<div class="col-sm-9">' +
                                         '<div class="pc-title-header mt-0" style="line-height: 22px;">' +
                                           i.content_title +
                                         '</div>' +
                                         '<div class="pc-title-ext fs08">' +
                                           'Post <span>' + main.convertEndate(i.content_adddatetine) + '</span> / Read : <span>' + i.content_read + '</span> times' +
                                         '</div>' +
                                       '</div>' +
                                     '</div>' +
                                   '</div>' +
                                 '</div>'
                          $('.content_p3_2').append($data)
                       }
                       // $data = '<div class="ext-link"><a class="" href="' + i.ext_link + '" target="' + i.target + '" alt="' + i.menu_alt + '"><i class="fas fa-chevron-right"></i> ' + i.title + '</a></div>'

                       $c++;
                     })
                   }
                 })
    }else if(id == 3){ //ข่าวประกาศ
      var param = {
        cat_id: 6
      }
      var jxr = $.post(ws_url + 'management/loadmenuitem-web-post.php', param, function(){}, 'json')
                 .always(function(snap){
                   if(json_response(snap)){
                     $c = 1;
                     snap.forEach(function(i){

                       $data = '<div class="pin-content" style="padding: 3px 10px;">' +
                                 '<div class="card-item" onclick="window.location=\'' + i.content_url + '\'">' +
                                   '<div class="pc-title">' +
                                     // '<div class="pc-title-feature">' +
                                     //   '<img src="' + i.content_figure + '" alt="" class="img-responsive" style="width: 100%;">' +
                                     // '</div>' +
                                     '<div class="pc-title-header mt-0" style="line-height: 22px !important;">' +
                                       '<a class="text-primary_"><i class="fas fa-chevron-right" aria-hidden="true" style="font-size: 0.6em; color: rgb(7, 163, 107);"></i> ' + i.content_title + '</a> <span style="font-size: 0.8em; color: rgb(10, 172, 104);">[โพสเมื่อ <span>' + main.convertEndate(i.content_adddatetine) + '</span>]</span>' +
                                     '</div>' +
                                   '</div>' +
                                 '</div>' +
                               '</div>'
                        $('.content_p2_1').append($data)

                       $c++;
                       // $data = '<div class="ext-link"><a class="" href="' + i.ext_link + '" target="' + i.target + '" alt="' + i.menu_alt + '"><i class="fas fa-chevron-right"></i> ' + i.title + '</a></div>'
                       // $('#external_menu').append($data)
                     })
                   }
                 })
    }else if(id == 4){ //นักวิจัยดีเด่น
      var param = {
        cat_id: 5
      }
      var jxr = $.post(ws_url + 'management/loadmenuitem-web-post.php', param, function(){}, 'json')
                 .always(function(snap){
                   console.log(snap);
                   if(json_response(snap)){
                     $c = 1;
                     snap.forEach(function(i){
                       if($c == 1){
                         $data = '<div class="pin-content">' +
                                   '<div class="card-item" onclick="window.location=\'' + i.content_url + '\'">' +
                                     '<div class="row">' +
                                       '<div class="col-sm-4" style="padding-right: 0px;">' +
                                         '<div class="pc-title-feature">' +
                                           '<img src="' + i.content_figure + '" alt="" class="img-responsive" style="width: 100%;">' +
                                         '</div>' +
                                       '</div>' +
                                       '<div class="col-sm-8">' +
                                         '<div class="pc-title-header mt-0" style="line-height: 22px;">' +
                                           i.content_title +
                                         '</div>' +
                                         '<div class="pc-title-ext fs08">' +
                                           'Post <span>' + main.convertEndate(i.content_adddatetine) + '</span> / Read : <span>' + i.content_read + '</span> times' +
                                         '</div>' +
                                       '</div>' +
                                     '</div>' +
                                   '</div>' +
                                 '</div>'
                          $('.content_p4_2').append($data)
                       }else{

                         $data = '<div class="pin-content">' +
                                   '<div class="card-item" onclick="window.location=\'' + i.content_url + '\'">' +
                                     '<div class="row">' +
                                       '<div class="col-sm-4" style="padding-right: 0px;">' +
                                         '<div class="pc-title-feature">' +
                                           '<img src="' + i.content_figure + '" alt="" class="img-responsive" style="width: 100%;">' +
                                         '</div>' +
                                       '</div>' +
                                       '<div class="col-sm-8">' +
                                         '<div class="pc-title-header mt-0" style="line-height: 22px;">' +
                                           i.content_title +
                                         '</div>' +
                                         '<div class="pc-title-ext fs08">' +
                                           'Post <span>' + main.convertEndate(i.content_adddatetine) + '</span> / Read : <span>' + i.content_read + '</span> times' +
                                         '</div>' +
                                       '</div>' +
                                     '</div>' +
                                   '</div>' +
                                 '</div>'

                          console.log($data);
                          $('.content_p4_2').append($data)
                       }
                       // $data = '<div class="ext-link"><a class="" href="' + i.ext_link + '" target="' + i.target + '" alt="' + i.menu_alt + '"><i class="fas fa-chevron-right"></i> ' + i.title + '</a></div>'

                       $c++;
                     })
                   }
                 })
    }

  },
  loadExternal: function(){
    var jxr = $.post(ws_url + 'management/loadmenuitem-web-external.php', function(){}, 'json')
               .always(function(snap){
                 if(json_response(snap)){
                   snap.forEach(function(i){
                     $data = '<div class="ext-link"><a class="" href="' + i.ext_link + '" target="' + i.target + '" alt="' + i.menu_alt + '"><i class="fas fa-chevron-right"></i> ' + i.title + '</a></div>'
                     $('#external_menu').append($data)
                   })
                 }
               })
  },
  loadIntranet: function(){
    var jxr = $.post(ws_url + 'management/loadmenuitem-web-intranet.php', function(){}, 'json')
               .always(function(snap){
                 if(json_response(snap)){
                   snap.forEach(function(i){
                     $data = '<div class="ext-link"><a class="" href="' + i.ext_link + '" target="' + i.target + '" alt="' + i.menu_alt + '"><i class="fas fa-chevron-right"></i> ' + i.title + '</a></div>'
                     $('#intranet_menu').append($data)
                   })
                 }
               })
  },
  loadMenuLevel: function(level){
    var param = {
      menu_level: level,
      level: 1
    }

    var jxr = $.post(ws_url + 'management/loadmenuitem-web.php', param, function(){}, 'json')
               .always(function(snap){
                 if(json_response(snap)){
                   snap.forEach(function(i){
                     $data = '<li class="nav-item" id="nav-item-' + i.menu_id + '">' +
                                '<a class="nav-link" href="' + i.ext_link + '" target="' + i.target + '">' + i.title + '</a>' +
                             '</li>'
                     $('#main-menu').append($data)
                     main.loadMenuSubLevel(i.menu_id, $data, i.title)
                   })
                 }
               })
  },
  loadMenuSubLevel: function(parent, parent_data, title){
    var param = {
      parent_id: parent,
      level: 2
    }

    var jxr = $.post(ws_url + 'management/loadmenuitem-web.php', param, function(){}, 'json')
               .always(function(snap){
                 if(json_response(snap)){
                   $('#nav-item-' + parent).addClass('dropdown')

                   $data = '<a class="nav-link dropdown-toggle" href="#" id="dropdown0' + parent + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + title + '</a>' +
                           '<div class="dropdown-menu" aria-labelledby="dropdown0' + parent + '" id="dropmenu-item-' + parent + '">' +
                           '</div></li>'

                   $('#nav-item-' + parent).html($data)
                   snap.forEach(function(i){
                     $data = '<a class="dropdown-item" href="' + i.ext_link + '" target="' + i.target + '">' + i.title + '</a>'
                     $('#dropmenu-item-' + parent).append($data)
                   })
                 }
               })
  }
}

main.init()

function json_response(json){
  if((json != '') && (json.length > 0)){
    return true;
  }else{
    return false;
  }
}
