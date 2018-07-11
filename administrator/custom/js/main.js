var sys_prefix = 'apdu_sess_'

var ws_url = 'http://localhost/public_html/apdu/controller/'
var root_url = 'http://localhost/public_html/apdu/'


// var ws_url = 'http://apdu.medicine.psu.ac.th/2018/controller/'
// var root_url = 'http://apdu.medicine.psu.ac.th/2018/'

var current_user = localStorage.getItem(sys_prefix + 'current_user')

var enmonth = new Array ("", "January","February","March",
"April","May","June", "July","August","September",
"October","November","December");

var enmonth_sh = new Array ("", "Jan","Feb","Mar",
"Apr","May","Jun", "Jul","Aug","Sep",
"Oct","Nov","Dec");

var main = {
  signout: function(){
    localStorage.removeItem(sys_prefix + 'current_user')
    localStorage.removeItem(sys_prefix + 'current_user_fullname')
    localStorage.removeItem(sys_prefix + 'current_user_email')
    window.location = 'login.html'
  },
  convertEndate: function(input){
    let a = input.split(' ');
    let cdate = a[0].split('-');
    return parseInt(cdate[2]) + ' ' + enmonth[parseInt(cdate[1])] + ', ' + (parseInt(cdate[0]));
  }
}
