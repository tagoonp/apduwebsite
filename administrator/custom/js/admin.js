var admin = {
  contentupdate: function(next_stage){
    $check = 0
    $('.form-group').removeClass('has-error')
    if($('#txtTitle').val() == ''){
      $check++
      $('#txtTitle').parent().addClass('has-error')
    }

    if($('#txtType').val() == ''){
      $check++
      $('#txtType').parent().addClass('has-error')
    }

    if($('#txtCategory').val() == ''){
      $check++
      $('#txtCategory').parent().addClass('has-error')
    }

    if($check != 0){
      return ;
    }

    $data = contentData.getData()

    var param = {
      title: $('#txtTitle').val(),
      category: $('#txtCategory').val(),
      alt: $('#txtAlt').val(),
      type: $('#txtType').val(),
      figure: $('#txtFigure').val(),
      content: $data,
      user_add: current_user,
      id: content_id
    }

    loading.showload()

    var jxr = $.post(ws_url + 'management/updatecontent.php', param, function(){})
               .always(function(resp){
                 // console.log();
                 if(resp == 'Y'){
                   alert('Add content success')
                   if(next_stage == 'new'){
                     localStorage.removeItem(sys_prefix + 'current_content_id')
                     window.location = 'content_add.html'
                   }else{
                     localStorage.removeItem(sys_prefix + 'current_content_id')
                     window.location = 'content-list.html'
                   }
                 }else{
                   loading.hideload()
                   alert('Can not add menu')
                 }
               })
  },
  contentadd: function(next_stage){
    $check = 0
    $('.form-group').removeClass('has-error')
    if($('#txtTitle').val() == ''){
      $check++
      $('#txtTitle').parent().addClass('has-error')
    }

    if($('#txtType').val() == ''){
      $check++
      $('#txtType').parent().addClass('has-error')
    }

    if($('#txtCategory').val() == ''){
      $check++
      $('#txtCategory').parent().addClass('has-error')
    }

    if($check != 0){
      return ;
    }

    $data = contentData.getData()

    var param = {
      title: $('#txtTitle').val(),
      category: $('#txtCategory').val(),
      alt: $('#txtAlt').val(),
      type: $('#txtType').val(),
      figure: $('#txtFigure').val(),
      content: $data,
      user_add: current_user
    }

    loading.showload()

    var jxr = $.post(ws_url + 'management/addcontent.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   alert('Add content success')
                   if(next_stage == 'new'){
                     window.location.reload()
                   }else{
                     window.location = 'content-list.html'
                   }
                 }else{
                   loading.hideload()
                   alert('Can not add menu')
                 }
               })

  },
  menuitemadd: function(next_stage){
    $check = 0
    $('.form-group').removeClass('has-error')
    if($('#txtTitle').val() == ''){
      $check++
      $('#txtTitle').parent().addClass('has-error')
    }

    if($('#txtPosition').val() == ''){
      $check++
      $('#txtPosition').parent().addClass('has-error')
    }

    if($('#txtType').val() == ''){
      $check++
      $('#txtType').parent().addClass('has-error')
    }

    if($('#txtUrl').val() == ''){
      $check++
      $('#txtUrl').parent().addClass('has-error')
    }

    if($check != 0){
      return ;
    }

    var param = {
      title: $('#txtTitle').val(),
      position_id: $('#txtPosition').val(),
      alt: $('#txtAlt').val(),
      type: $('#txtType').val(),
      url: $('#txtUrl').val(),
      parent: $('#txtParent').val(),
      target: $('#txtTarget').val(),
      user_add: current_user
    }

    loading.showload()

    var jxr = $.post(ws_url + 'management/addmenu.php', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   alert('Add menu success')
                   if(next_stage == 'new'){
                     window.location.reload()
                   }else{
                     window.location = 'menu-list.html'
                   }
                 }else{
                   alert('Can not add menu')
                 }
               })
  },
  articleload: function(){
    loading.showload()
    var jxr = $.post(ws_url + 'management/loadarticle.php', function(){}, 'json')
               .always(function(snap){
                 if(json_response(snap)){
                   console.log(snap);
                   $('#response_tbl').empty()
                   $no = 1;
                   snap.forEach(function(i){

                     $pre = ''
                     for(var j = 0; j < i.menu_level - 1; j++){
                       $pre += '-'
                     }

                     $pr = ''
                     if(i.parent_title != null){
                       $pr = ' <span style="font-size: 0.8em;">(' + i.parent_title + ')</span>'
                     }

                     $pub = '<button class="btn btn-sm btn-success pr-10 pl-10"><i class="zmdi zmdi-eye"></i></button>'
                     if(i.menu_publish != '1'){
                       $pub = '<button class="btn btn-sm btn-default pr-10 pl-10"><i class="zmdi zmdi-eye-off"></i></button>'
                     }

                     $data = '<tr>' +
                                '<td>' + $no + '</td>' +
                                '<td>' +
                                  '<a href="' + i.content_url + '" target="_blank">' + i.content_title + '<a>' +
                                  '<div style="font-size: 0.8em;">' +
                                    '<a href="javascript:editContent(\'' + i.content_id + '\')" class="text-muted mr-5">Edit</a>|' +
                                    '<a href="#" class="text-muted ml-5">Trash</a>' +
                                  '</div>' +
                                '</td>' +
                                '<td>' + i.cat_name + '</td>' +
                                '<td>' + main.convertEndate(i.content_adddatetine) + '</td>' +
                                '<td>' + i.content_read + '</td>' +
                                '<td class="text-center">' + $pub + '</td>' +
                              '</tr>'
                     $('#response_tbl').append($data)



                     $data = '<option value="' + i.menu_id + '">' + $pre + ' ' + i.title + '</option>'
                     $('#txtParent').append($data)

                     $no++
                   })

                   $('#dt').dataTable()
                   setTimeout(function(){
                     loading.hideload()
                   }, 1000)
                 }
               })
  },
  menuitemload: function(){
    loading.showload()
    var jxr = $.post(ws_url + 'management/loadmenuitem.php', function(){}, 'json')
               .always(function(snap){
                 if(json_response(snap)){
                   $('#response_tbl').empty()
                   $no = 1;
                   snap.forEach(function(i){

                     $pre = ''
                     for(var j = 0; j < i.menu_level - 1; j++){
                       $pre += '-'
                     }

                     $pr = ''
                     if(i.parent_title != null){
                       $pr = ' <span style="font-size: 0.8em;">(' + i.parent_title + ')</span>'
                     }

                     $pub = '<button class="btn btn-sm btn-success pr-10 pl-10"><i class="zmdi zmdi-eye"></i></button>'
                     if(i.menu_publish != '1'){
                       $pub = '<button class="btn btn-sm btn-default pr-10 pl-10"><i class="zmdi zmdi-eye-off"></i></button>'
                     }

                     $data = '<tr>' +
                                '<td>' + $no + '</td>' +
                                '<td>' +
                                  '<a href="#">' + $pre + ' ' +  i.title + '<a>' +
                                  '<div style="font-size: 0.8em;">' +
                                    '<a href="#" class="text-muted mr-5">Edit</a>|' +
                                    '<a href="#" class="text-muted ml-5">Trash</a>' +
                                  '</div>' +
                                '</td>' +
                                '<td>' + i.menu_level + $pr + '</td>' +
                                '<td>' + i.position_name + '</td>' +
                                '<td class="text-center">' + $pub + '</td>' +
                              '</tr>'
                     $('#response_tbl').append($data)



                     $data = '<option value="' + i.menu_id + '">' + $pre + ' ' + i.title + '</option>'
                     $('#txtParent').append($data)

                     $no++
                   })

                   $('#dt').dataTable()
                   setTimeout(function(){
                     loading.hideload()
                   }, 1000)
                 }
               })
  },
  menupositionload: function(){
    var jxr = $.post(ws_url + 'management/loadmenuposition.php', function(){}, 'json')
               .always(function(snap){
                 if(json_response(snap)){
                   $('#response_tbl').empty()
                   $('#txtPosition').empty()
                   $('#txtPosition').append('<option value="">-- Choose position --</option>')
                   $no = 1;
                   snap.forEach(function(i){
                     $data = '<tr>' +
                                '<td>' + $no + '</td>' +
                                '<td>' +
                                  '<a href="#">' + i.position_name + '<a>' +
                                  '<div style="font-size: 0.8em;">' +
                                    '<a href="#" class="text-muted mr-5">View</a>|' +
                                    '<a href="#" class="text-muted ml-5">Trash</a>' +
                                  '</div>' +
                                '</td>' +
                              '</tr>'
                     $('#response_tbl').append($data)

                     $data = '<option value="' + i.mp_id + '">' + i.position_name + '</option>'
                     $('#txtPosition').append($data)
                     $no++
                   })
                   setTimeout(function(){
                     loading.hideload()
                   }, 1000)
                 }
               })
  },
  categoryload: function(){
    loading.showload()
    var jxr = $.post(ws_url + 'management/loadcategory.php', function(){}, 'json')
               .always(function(snap){
                 if(json_response(snap)){
                   $('#response_tbl').empty()
                   $('#txtPosition').empty()
                   $('#txtPosition').append('<option value="">-- Choose position --</option>')
                   $no = 1;
                   snap.forEach(function(i){
                     $data = '<tr>' +
                                '<td>' + $no + '</td>' +
                                '<td>' +
                                  '<a href="#">' + i.cat_name + '<a>' +
                                  '<div style="font-size: 0.8em;">' +
                                    '<a href="#" class="text-muted mr-5">View</a>|' +
                                    '<a href="#" class="text-muted ml-5">Trash</a>' +
                                  '</div>' +
                                '</td>' +
                              '</tr>'
                     $('#response_tbl').append($data)

                     $data = '<option value="' + i.cat_id + '">' + i.cat_name + '</option>'
                     $('#txtPosition').append($data)
                     $no++
                   })
                   setTimeout(function(){
                     loading.hideload()
                   }, 1000)
                 }
               })
  }
}

function editContent(id){
  localStorage.setItem(sys_prefix + 'current_content_id', id)
  // content-add.html
  window.location = 'content-edit.html'
}

function json_response(json){
  if((json != '') && (json.length > 0)){
    return true;
  }else{
    return false;
  }
}
