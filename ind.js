let search = document.getElementById("getweather");
let glocation = document.getElementById("location");
let rightdetails=document.querySelectorAll("rightweatherdetails");
let city=document.getElementById("curcity");
let temperature=document.getElementById("temperature");
let datetime=document.getElementById("datetime");
let history=['New York','California','Mexico','Manchester']
search.addEventListener('click', () =>{
    $(".fa").css("background-color","#28a74585");
    if(glocation.value==='') return;
    let cityname=glocation.value;
    getweatherdetails(cityname);
    history.pop();
    history.unshift(cityname);

})


function updatepage(data) {
    $("#temperature").html(Math.ceil(data.temp)+"<i>&#176</i>");
    $("#curcity").html(data.name);
    $("#desc").html(data.desc[0].description);
    let iconurl=" http://openweathermap.org/img/wn/"+data.desc[0].icon+".png";
    $(".icon-left").html("<img src="+iconurl+">");
    $("#Humidity").html(Math.ceil(data.Humidity)+"%");
    $("#Cloudy").html(Math.ceil(data.Cloudy)+"%");
    $("#Wind").html(Math.ceil(data.Wind*3.6)+"Km/h");
    var rains=$("#showrain");
    var snows=$("#showsnow");
    if(data.Rain!==undefined){
        rains.show();
        $("#Rain").html(Math.ceil(data.Rain['1h'])+"mm");
    }
    else{
        rains.hide();
    }
    if(data.snow!==undefined){
        snows.show();
        $("#Snow").html(Math.ceil(data.snow['1h'])+"mm");
    }
    else{
        snows.hide();
    }
    $(".fa").css("background-color","seagreen");

    for(let i in history){
        $("#"+i+"h").html(history[i]);
    }
}
function getweatherdetails(city_name){
    let url="https://api.openweathermap.org/data/2.5/weather?appid=e5c90b8a78edab01d44d4eb5171d4809&units=metric";
    $.ajax({
        url:url,
        data:{
            q:city_name
        },
        success: function(result){
            console.log(result)
            let dataobj={};
            dataobj['name']=result.name;
            dataobj['temp']=result.main.temp;
            dataobj['desc']=result.weather;
            dataobj['Humidity']=result.main.humidity;
            dataobj['Cloudy']=result.clouds.all;
            dataobj['Wind']=result.wind.speed;
            dataobj['Rain']=result.rain;
            dataobj['snow']=result.snow;

            //console.log(dataobj);
            updatepage(dataobj);
        }
    });
}


