var state = 'all';
$(document).ready(function() {
  Goat('freecodecamp');
  //Goat('zai');
  Goat('monstercat');
});
function myFunction(url)
{
  window.open(url);
};

function Goat(title){
  $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/'+title, function(data) {

    if (data.stream !== null){
      //console.log(data.stream.channel.url);
      //console.log(data.stream.channel.logo);
      //console.log(data.stream.channel.status);
      //console.log(data.stream.viewers);
      $('.streams').append('<div class="well well-lg row online" onclick='+"'myFunction("+'"'+data.stream.channel.url+'"'+")'"+'><div class="col-md-3"><img src="'+data.stream.channel.logo+'" class="img-rounded"></div><div class="col-md-9"><div class="status"> <h3>'+title+'</h3><h6>'+data.stream.channel.status+'</h6></div><div class="stream"> <p><i class="fa fa-eye" aria-hidden="true"></i> '+data.stream.viewers+'</p></div></div></div>');
  }
    else {
      $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/'+title, function(data){
        //console.log(data.url);
        //console.log(data.logo);
        //console.log(data.status);
        $('.streams').append('<div class="well well-lg row offline" onclick='+"'myFunction("+'"'+data.url+'"'+")'"+'><div class="col-md-3"><img src="'+data.logo+'" class="img-rounded"></div><div class="col-md-9"><div class="status"><h3>'+title+'</h3><h6>'+data.status+'</h6></div><div class="stream"><p><i class="fa fa-eye-slash" aria-hidden="true"></i> <strong>offline</strong></p></div></div></div>');
      });
    }
  });
}

function online()
{
  switch (state) {
    case 'all' :
      $('#all').removeClass('active');
      $('.offline').fadeOut();
      break;
    case 'offline' :
      $('#offline').removeClass('active');
      $('.offline').fadeOut();
      $('.online').delay("slow").fadeIn();
      break;
    case 'offline' :
      break;
               }
  state = 'online';
  $('#online').addClass('active');
  console.log('the state is :'+state);
}

function offline()
{
  switch (state) {
    case 'all' :
      $('#all').removeClass('active');
      $('.online').fadeOut();
      break;
    case 'online' :
      $('#online').removeClass('active');
      $('.online').fadeOut();
      $('.offline').delay("slow").fadeIn();
      break;
    case 'offline' :
      break;
               }
  state = 'offline';
  $('#offline').addClass('active');
  console.log('the state is :'+state);
  
}

function allii()
{
  //console.log('check');
  switch (state) {
    case 'offline' :      $('#offline').removeClass('active');
     $('.online').fadeIn();
    case 'online' :
      $('#online').removeClass('active');
      $('.offline').fadeIn();
      break;
               }
  state = 'all';
  $('#all').addClass('active');
  console.log('the state is :'+state);
  
}

function key (event) {
  if (event.key === 'Enter' && $('input').val() !== '')
    {
      Goat($('input').val());
      $('input').val('');
    }
}

function clickhehe() {
  if ($('input').val() !== '')
    {
      console.log('clicked');
      Goat($('input').val());
      $('input').val('');      
    }  
}