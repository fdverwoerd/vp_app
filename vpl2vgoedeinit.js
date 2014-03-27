// VPL app						//
//								//
// Gemaakt door Rick Verwoerd	//
// Versie: 0.2					//
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
				
				
			} else {
				// Vul settings.colliwaarden standaard in met 60"
				collisettings = [];// array containing objects!
				collisettings.push({type: "entresol", collipu: 40});
				collisettings.push({type: "pak", collipu: 50});
				collisettings.push({type: "doos", collipu: 60});
				collisettings.push({type: "bulk", collipu: 70});
				
				console.log("Standaard waarden initialiseren...");
				localStorage.setItem("collisettings", JSON.stringify(collisettings));
		};
		
		// WERKNEMERS
		if(localStorage && localStorage.getItem('werknemers')){
		
			werknemers = JSON.parse( localStorage.getItem('werknemers') );
			console.log("Parsed werknemers");
			
		} else {
			// Vul werknemers met Dummy DATA op eerste INIT.
			werknemers = [];// array containing objects!
			werknemers.push({naam: "Annalies Voorbeeld", streak: 4, id: this.getID(), goed:4, totaal:925});
			
			console.log("Werknemers Array voor het eerst aangemaakt");
			localStorage.setItem("werknemers", JSON.stringify(werknemers));
			
		};
		
		// ID COUNT
		if(localStorage && localStorage.getItem('idcount')){
			
			idcount = JSON.parse( localStorage.getItem('idcount') );
			console.log("Parsed idcount");
			
		} else {
			
			idcount = 0;
			console.log("IDcount variabele aangemaakt: " + idcount);
			
			localStorage.setItem("idcount", JSON.stringify(idcount));
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
			
		}
		return "INIT complete";
	},
	getID: function(id) {
		
		// Check localStorage of het de string van idcount bevat
		if(localStorage && localStorage.getItem('idcount')){
			// check of id count bestaat en haal hem op.
			var oldid = JSON.parse( localStorage.getItem('idcount') );
			var newcount = oldid+1;
			localStorage.setItem("idcount", JSON.stringify(newcount));
			
			return newcount;
		
		} else {
		
			// vpl.init() // maybe?

		}

	},
	resetVpl: function(){
		// Reset all localstorage variabelen, dit verwijderd ook alle inhoud.
		localStorage.removeItem('werknemers');
		localStorage.removeItem('containers');
		localStorage.removeItem('collisettings');
		localStorage.removeItem('idcount');
		
		return "RESET complete";
		// PAS OP de variabelen zijn na deze functie er nog wel, pas na refresh zijn ze niet meer aanwezig.
	
	},
	
}