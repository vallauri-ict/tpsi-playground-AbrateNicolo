let val;
let piazzati = 0;
let ordine = ["Applicazione", "Presentazione", "Sessione", "Trasporto", "Rete", "Data Link", "Fisico"];
$(document).ready(function () {
    setTimeout(function () {
        if(piazzati!==7)
            alert("hai perso");
            $(".pedina").draggable("disable");
    }, 10000);
    $("#restart").click(function () {
        location.reload();
    });
    val = ["Rete", "Sessione", "Presentazione", "Applicazione", "Data Link", "Trasporto", 'Fisico'];
    let wrapper = $("#wrapper");
    let top = 35;
    for (let i = 0; i< val.length; i++) {
        let pedina = $("<div></div>");
        pedina.prop("id", "p" + (i+1));
        pedina.text(val[i]);
        pedina.addClass("pedina");
        pedina.css({
            "left" : "20px",
            "top": top + "px"
        });
        pedina.appendTo(wrapper);

        let bersaglio = $("<div></div>");
        bersaglio.prop("id", "b" + (i+1));
        bersaglio.addClass("bersaglio");
        bersaglio.css({
            "right" : "20px",
            "top": top + "px"
        });
        bersaglio.appendTo(wrapper);
        top += 60;
    }
    wrapper.children("div .pedina").draggable({
        "start" : function (){
            $(this).draggable({revert: "invalid"});
            $(this).addClass('rosso');
            $(".bersaglio").addClass('verde');
        }
    });

    wrapper.children("div .pedina").on("dblclick", function(){
        $(this).draggable("enable");
    });
    let px = "15px";
    wrapper.droppable({});
    $("div .bersaglio").droppable({
        "drop" : function(event, args){
            let textPedina = args.draggable.text();
            let idBersaglio = $(this).prop("id").substr(1)-1;
            if(textPedina==ordine[idBersaglio]){
                args.draggable.draggable("disable");   /* uso 2 .draggable perchè */
                /* nel caso in cui lo accetto*/
                args.draggable.css({
                   "left": $(this).css("left"),
                    "top": $(this).css("top")
                });
                piazzati++;
                args.draggable.css({
                    "top": "+=10px"
                });
                if(piazzati==7)
                    alert("Hai vinto");
            }else{
                args.draggable.draggable("option", "revert", true);
            }
            $(".pedina").css("background-color", "lightyellow");
            $(".bersaglio").css("background-color", "#CCC");
        }
    });
});

