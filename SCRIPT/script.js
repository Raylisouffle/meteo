$(document).ready(function(){
    let joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    let jourCourant = new Date($.now()).getDay();
    
    // Clic du boutton rechercher
    $("#buttonSearch").click(function(){
        // Recup de l'input
        let loc = $("#valeurInput").val();
        $("#meteoJour").html("");
        $("#contentJourSemaine").html("");
        $("#valeurInput").val("");
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid=9440bfa82499acb03378ed9777363d93&units=metric",
    
            method: "GET",
    
            dataType : "json",
        })
        .done(function(response){
            let data = response;
            let temps = data.weather[0].main;
            $("#meteoJour").html("<img src='IMG/"+temps.toLowerCase()+".svg'><div id='texteMeteo'><p>"+joursSemaine[jourCourant]+"</p><p>"+data.main.temp+" °</p></div>")
            septJours(data.coord.lat, data.coord.lon);
        }).fail(function(){
            alert("La ville n'existe pas :(");
        });
    });
    function septJours(lat, lon){
        let i = jourCourant+1;
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=9440bfa82499acb03378ed9777363d93&units=metric",
    
            method: "GET",
    
            dataType : "json",
        })
        .done(function(response){
            let data = response;
            $.each(data.daily, function(res, obj){
                if(i > 6){
                    i = 0;
                }
                console.log(obj);
                let urlImg = obj.weather[0].main;
                $("#contentJourSemaine").html($("#contentJourSemaine").html() + "<div class='meteoJourSemaine'><img src='IMG/"+urlImg.toLowerCase()+".svg'><p>"+joursSemaine[i]+"</p><p>"+Math.round(obj.temp.day)+"</p></div>");
                i -=-1;

            });
        }).fail(function(){
            alert("La ville n'existe pas :(");
        });
    }
    
}); 