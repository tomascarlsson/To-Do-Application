/**
 *	Main
 *
 *	@author		Tomas Carlsson
 *	@email		tomas.tc@gmail.com
 */
var Main = {
		
	/**
	 * Reference to the add-sticker button that add a new sticker
	 */
	addStickerBtn: null,
	

	//---------------------------------------------------
	//  Public static properties 
	//  (annars skulle det varit this.ajax eller Person.ajax)
	//---------------------------------------------------
	
	/**
	 *	Global access to the ajax class through this 
	 *	propertie.
	 */
	ajax : null,



	//---------------------------------------------------
	//  Public static methods
	//---------------------------------------------------
	
	/**
	 *	"The class constructor"
	 *	Initiation method that add event listener to the add sticker icon in upper left corner
	 *	Also checks make a request to a php file that checks the database
	 */
	init : function() {	
		Main.addStickerBtn = document.getElementById('add-new-sticker-btn');
		Event.addEventListener(Main.addStickerBtn, Event.CLICK, Main.addSticker);

		Main.ajax = new Ajax();
		Main.ajax.get("src/php/checkDatabase.php", Main.getXmlData);
	},

	/**
	 * Adds new sticker window to the "desktop"
	 *	@return undefined
	 */
	addSticker: function(event) {	
		var sticker	= new Sticker();
		sticker.createStickerXMLStructure();
		sticker.pageContentWrapper.appendChild(sticker.element);
	},

	/**
	 * Gets the XML database
	 */
	getXmlData: function(){
		Main.ajax = new Ajax();
		Main.ajax.get("src/xml/0.xml", Main.onDataLoaded);
	},

	/**
	 * Rebuild the stickers with info from the database and place them where they were last time.
	 */
	onDataLoaded: function(responseData){

		responseData = responseData.responseXML;
		responseData = responseData.getElementsByTagName("sticker");

		for (var i = 0; i < responseData.length; i++){
					var text = responseData[i].getElementsByTagName('text')[0];
					text = text.childNodes[0];
					text = text.nodeValue;

					var positionX = responseData[i].getElementsByTagName('position')[0].getElementsByTagName('x')[0];
					positionX = positionX.childNodes[0];
					positionX = positionX.nodeValue;

					var positionY = responseData[i].getElementsByTagName('position')[0].getElementsByTagName('y')[0];
					positionY = positionY.childNodes[0];
					positionY = positionY.nodeValue;

					var currId = responseData[i].getElementsByTagName('id')[0];
					currId = currId.childNodes[0];
					currId = currId.nodeValue;

			
			var sticker	= new Sticker(currId);
			sticker.pageContentWrapper.appendChild(sticker.element);
			sticker.element.setAttribute("style", "opacity: 1; position: relative; left: "+positionX+"px; top: "+positionY+"px")
			sticker.element.getElementsByTagName('textarea')[0].innerHTML = text;

		}

	}


		/*
		
		<div class="sticker" style="z-index: 1459507050; opacity: 1; position: relative; left: 92px; top: 11px;">
			<div class="sticker-drag" style="cursor: default;">
			<div class="sticker-close"></div></div>
			<textarea></textarea>
		</div>
		 */
		
}

Event.addEventListener(window, Event.LOAD, Main.init);