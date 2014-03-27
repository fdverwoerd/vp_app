// VPL app						//
// copyright (c) 2013			//
// Gemaakt door Rick Verwoerd	//
// Versie: 0.4					//
// ----------------------------	//

// Standaard waarden eerste keer dat app wordt gedownload en geinitialiseerd.
var vpl = 
	{
	init: function(){
		// COLLIWAARDEN
		if(localStorage && localStorage.getItem('collisettings')){	
				
				// Parse de waarden uit localstorage in een object
				collisettings = JSON.parse( localStorage.getItem('collisettings') );
				console.log("Parsed collisettings");
				
				this.renderColliInput();
				
				
			} else {
				// Vul settings.colliwaarden standaard in met 60"
				collisettings = [];// array containing objects!
				collisettings.push({type: "entresol", collipu: 40});
				collisettings.push({type: "pak", collipu: 50});
				collisettings.push({type: "doos", collipu: 60});
				collisettings.push({type: "bulk", collipu: 70});
				
				console.log("Standaard waarden initialiseren...");
				localStorage.setItem("collisettings", JSON.stringify(collisettings));
				
				vpl.init();
		};
		
		// WERKNEMERS
		if(localStorage && localStorage.getItem('werknemers')){
		
			werknemers = JSON.parse( localStorage.getItem('werknemers') );
			console.log("Parsed werknemers");
			
			
		} else {
			// Vul werknemers met Dummy DATA op eerste INIT.
			werknemers = [];// array containing objects!
			werknemers.push({naam: "Annalies Voorbeeld", streak: 4, id: 0, goed:4, totaal:925});
			
			console.log("Werknemers Array voor het eerst aangemaakt");
			localStorage.setItem("werknemers", JSON.stringify(werknemers));
			
			vpl.init();
			
		};
		
		// ID COUNT
		if(localStorage && localStorage.getItem('idcount')){
			
			idcount = JSON.parse( localStorage.getItem('idcount') );
			console.log("Parsed idcount");
			
		} else {
			
			idcount = 0;
			console.log("IDcount variabele aangemaakt.");
			
			localStorage.setItem("idcount", JSON.stringify(idcount));
			
			vpl.init();
		};
		
		// CONTAINERS
		if(localStorage && localStorage.getItem('containers')){
			
			containerlijst = JSON.parse( localStorage.getItem('containers') );
			console.log("Parsed containerlijst");
			
			
		} else {
			// Vul containers tijdelijk.
			containerlijst = [];// array containing objects!
			containerlijst.push({naam: "Voorbeeld", starttijd: new Date(), eindtijd: 0, colli:0, type:"pak", klaar: false});
			
			console.log("Containerlijst Array voor het eerst aangemaakt");
			localStorage.setItem("containers", JSON.stringify(containerlijst));
			
			vpl.init();
			
		}
		
		
		
		//return "INIT complete";
	},
	getID: function(id) {
		
		// Check localStorage of het de string van idcount bevat
		if(localStorage && localStorage.getItem('idcount')){
			
			var oldid = JSON.parse( localStorage.getItem('idcount') );
			var newcount = oldid+1;
			localStorage.setItem("idcount", JSON.stringify(newcount));
			
			return newcount;
		}

	},
	resetVpl: function(){
		// Reset all localstorage variabelen, dit verwijderd ook alle inhoud.
		localStorage.removeItem('werknemers');
		localStorage.removeItem('containers');
		localStorage.removeItem('collisettings');
		localStorage.removeItem('idcount');
		
		location.replace('http://rivergo.nl/vpl2/');
		
		return "RESET complete";
		// PAS OP de variabelen zijn na deze functie er nog wel, pas na refresh zijn ze niet meer aanwezig.
	
	},
	intify: function(stringetje) {
			return integer = parseInt(stringetje);
	},	
	saveColliSettings: function() {
			
			/* beetje lomp en niet variabel, maar de code is werkt atm :) */
			collisettings[0].collipu = this.intify($("#entresol").val());
			collisettings[1].collipu = this.intify($("#pak").val());
			collisettings[2].collipu = this.intify($("#doos").val());
			collisettings[3].collipu = this.intify($("#bulk").val());
			
			
			// collisettings bestaat nog steeds de nieuwe waarde maar wordt ook opgeslagen in LocalStorage.
			localStorage.setItem("collisettings", JSON.stringify(collisettings));
			
	},
	renderColliInput: function() {
		
		// HTML string met invoervelden voor collisettings te wijzigen.
		var html = "";
		for (i=0; i < collisettings.length; i++) {
				
				html += "<label for='"+collisettings[i].type+"'>"+ collisettings[i].type + " per uur:</label>";
				html += "<input type='range' name='slider' id='"+ collisettings[i].type +"' value='"+ collisettings[i].collipu +"' min='0' max='120' /><hr>"
		}
		$("#colli").html(html);
		
		var $sliderz = $("#colli");
		//$sliderz.trigger('create');

		$sliderz.on("change", function(){
			vpl.saveColliSettings();
		});
		
	},
	voegWerknemerToe: function(naam) {
		if(naam) {
			console.log("Aanmaken naam: " + naam);
			werknemers.push({naam: naam, streak: 0, id: this.getID(), goed:0, totaal:0});
			console.log(werknemers);
			localStorage.setItem("werknemers", JSON.stringify(werknemers));
			
			this.renderWerknemersLijst();	
			
			
		} else {
			return "ERR: geen naam ingevoerd";
		}
	},
	deleteWerknemer: function(id) {
		// kijkt door werknemers array, checkt of id overeenkomt dan pakt hij indexOf nummer van array om hem daarna te splicen/verwijderen.
		for (var key in werknemers) {
		
			if (werknemers[key].id == id) {
				console.log("Deleting: " + werknemers[key].naam);
				;
				var nummer = werknemers.indexOf(werknemers[key]);
				werknemers.splice(nummer, 1);
				
			} 
		}
		localStorage.setItem("werknemers", JSON.stringify(werknemers));
		this.renderWerknemersLijst();	
	},
	renderWerknemersLijst: function() {
		// TEST console.log(werknemers);
		
		var html1 ="";
		for (i=0; i < (werknemers.length) ; i++) {
			html1 += "<li><a class='werknemer' data-id='"+werknemers[i].id+"'>" + werknemers[i].naam +
			"<span class='ui-li-count'>"+ werknemers[i].totaal +"</span></a></li>";
			
		}		
		
		$(".lijst1").html(html1);
		
		// vraag me niet waarom, maar .page() is de oplossing voor rare fouten...
		$("#opties").page();
		
		$(".lijst1").listview('refresh');
		//$(".lijst2").listview();
		
		if(werknemers.length > 0) {
			$(".werknemer").on("click", function() {
				var id = $(this).data("id");
				console.log(id);
				vpl.deleteWerknemer(id);
			});
		} else {
			console.log("Geen werknemers aanwezig")
		}
		

	},
	renderStartContainerLijst: function() {
	
		var html2 ="";
		for (i=0; i < (werknemers.length) ; i++) {
			html2 += "<li><a href='#l' class='cstart' data-id='"+werknemers[i].id+"'>" + werknemers[i].naam +
			"<span class='ui-li-count'>"+ werknemers[i].totaal +"</span></a></li>";
			
		}
		$(".lijst2").html(html2);
		
		// hier hoeft het weer neit, raare shit dat mobile$("#mypanel").page();
		
		$(".lijst2").listview('refresh');
		
		if(werknemers.length > 0) {
			$(".cstart").on("click", function() {
				
				var id = $(this).data("id");
				var name = "";
				console.log("Initiaten van container dialog met ID: "+id);
				
				for (var key in werknemers) {
			
					if (werknemers[key].id == id) {
						name = werknemers[key].naam;
						$("#cname").html("<h3>"+name+"</h3>");	
					} 
				};
				$("#dialog").click();
			});
		} else {
			console.log("Geen werknemers aanwezig")
		}
	},
	realtimeVerschil: function(container) {
		var nu = new Date();
		var eind = new Date(container.eindtijd);
		var start = new Date(container.starttijd);
		
		var realtime_start = start.getHours()+":"+start.getMinutes();
		/*
		var christmas=new Date(today.getFullYear(), 11, 25) //Month is 0-11 in JavaScript
		if (today.getMonth()==11 && today.getDate()>25) //if Christmas has passed already
		christmas.setFullYear(christmas.getFullYear()+1) //calculate next year's Christmas
		*/
		//Set 1 day in milliseconds
		var one_min=1000*60,
			one_sec=1000;
		
		//Calculate difference btw the two dates, and convert to days
		var realtimeverschil_min = Math.floor((eind.getTime()-nu.getTime())/(one_min));
		var realtimeverschil_sec = Math.floor((eind.getTime()-nu.getTime())/(one_sec)% 60);
		if(realtimeverschil_min < 30) {
			var realtime_color = "yellow";
			if(realtimeverschil_min < 10) {
			var realtime_color = "red";
				if (realtimeverschil_min < 0) {
					//console.log("TE LAAT");
				}
			}
		} else {
			var realtime_color = "black";
		}
		
		var min_en_sec = [realtimeverschil_min, realtimeverschil_sec, realtime_start, realtime_color]
		return min_en_sec;
		
	},
	renderContainers: function() {
		var html = "<ul class='dashboardlijst'>";
		
		for (var key in containerlijst) {
			var index = werknemers.indexOf(werknemers[key]);
			var min_sec = this.realtimeVerschil(containerlijst[key]);
			var colorcheck = min_sec[3];
			
			html += "<li><div class='background'><h3>"+ containerlijst[key].naam +"</h3></div>";
			
			html += "<div class='li-in-twee'><span class='typecontainer'>"+ containerlijst[key].type +"</span></div><div class='li-in-twee resterend'><span class='verschiltijd tijd-min "+ colorcheck + "'>"+ min_sec[0] +"</span><span class='verschiltijd tijd-sec "+ colorcheck +"'>"+ min_sec[1] +"</span></div>";
			
			html += "<div class='li-in-twee background container-footer'><span class='tijd-icoon'><img src='images/svg/klok.svg' alt='Icoon van een klok'></span><span class='taak-start'>"+min_sec[2]+"</span></div>"
			html += "<div class='li-in-twee background container-footer'><a href='#' id='NaN'><img src='images/svg/winkel.svg' alt='Icoon van een winkelwagen'></a><a href='#' class='klaar' id='"+ index +"'><img src='images/svg/vink.svg' alt='Icoon van een vinkje'></a></div></li>";
					
		}
		html += "</ul>"
			
			$("#containers").html(html);
			$("#containers a.klaar").on("click", function() {
			var index = $(this).attr("id");
			console.log("Verwijderen van container met index: " + index);
			containerlijst.splice(index, 1);
			$(this).attr("disabled", "disabled");
			localStorage.setItem("containers", JSON.stringify(containerlijst));
			
		});
	
	}	
};// einde VPL

// Tijd shizzle functies, ze werken!
function tijdVoorContainerInSec(colli, collipu) {
	
	var secondenPerColli = berekenColliVerhouding(collipu) * 60;
	
	var aantalMilliSeconden = (colli * secondenPerColli) * 1000;
	var nu = new Date().getTime()
	var eindtijd = nu + aantalMilliSeconden;
	
	eindtijd = new Date(eindtijd);
	console.log(eindtijd); 
	return eindtijd;		
}
function berekenColliVerhouding(collipu) {
	// s
	var colliVerhouding = 60 / collipu;
	return colliVerhouding;
}

if(vpl){
	console.log("VPL = TRUE > vpl.init() uitgevoerd");
	vpl.init();
	
}

$( document ).ready(function() {
  // Handler for .ready() called.
  	$("#resetvpl").on("click", function() {
		// Reset alles
		var reset=confirm("PAS OP!\n\nWeet je zeker dat je alle gegevens wilt resetten?");
		if (reset==true)
		  {
			  console.log("Reset!");
			  vpl.resetVpl();
		  }
		else
		  {
		  	return;
		  }
	});
	$("#optiesknop").on("click", function() {
		vpl.renderWerknemersLijst();
	});
	$("#startcontainerbegin").on("click", function() {
		vpl.renderStartContainerLijst();
	});
	$("#savewerknemer").on("click", function() {
		var naam = $("#name").val();
		$("#name").val("");
		vpl.voegWerknemerToe(naam);
		
	});
	$("#startcontainer").on("click", function() {
		
		var naam = $("#cname h3").text(),
			type = $("#select-type").val(),
			starttijd = new Date(),
			colli = $("#aantal").val(),
			klaar = false;
			collipu = undefined;
			
		$("#aantal").val("")
			
		console.log("Container aangemaakt voor: "+ naam);
		// aanmaken van een container vanuit het dialog box.
		
		
		if(type== "pak"){
			collipu = collisettings[1].collipu

		} else if(type== "doos"){
			collipu = collisettings[2].collipu
			
		} else if(type == "bulk"){
			collipu = collisettings[3].collipu
		}
		else if(type == "entresol"){
			collipu = collisettings[0].collipu
		}
		
		var eindtijd = tijdVoorContainerInSec(colli, collipu);
		
		containerlijst.push({naam: naam, starttijd: starttijd, eindtijd: eindtijd, colli: colli, type: type, klaar: false});
		
		localStorage.setItem("containers", JSON.stringify(containerlijst));
		
		
		// dialog closen
		
		$("#nieuwecontainer").dialog('close');
	});
	
	var timeNow = setInterval(function(){
        date_future = new Date(new Date().getFullYear() +1, 0, 1);
        date_now = new Date();
        
        nuseconden = Math.floor(date_now/1000);
		
        vpl.renderContainers(); // Het renderen van de tijden en containers in het overzicht, word elke seconen ververst.
        $("#timenow").text(" " + (date_now.getUTCHours()+1) + " : " + date_now.getUTCMinutes() + " : " + date_now.getUTCSeconds());
    },1000);

	
	
	
});
