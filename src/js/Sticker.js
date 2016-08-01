/**
 *	The Sticker application object
 *	Sets up variables and functions 
 *	Creates the PostIt application window
 *	Adds drag-n-drop functionality and functinality thats exposes elements in the Sticker application
 */
  
function Sticker(currId){
	/**
	 *	Internal reference to the instance of this object. 
	 */
	var self = this;
	
	/**
	 *	Reference to the object's Stickers window 
	 */
	this.element = null;
	
	/**
	 * Reference to the closebutton
	 */
	this.closeButton = null;
		
	/**
	 *	Reference to the object's textarea
	 */
	this.textarea = null;
	
	/**
	 *	Reference to the content area (desktop)
	 */
	this.pageContentWrapper = document.getElementById('page-content-wrapper');

	/**
	 * New ajax object for this instance
	 */
	this.ajax = new Ajax();

	/**
	 * Creates random number as id for the sticker
	 */
	if(!currId){
		this.stickerId = Utils.getUniqueId();	
	}else{
		this.stickerId = currId;
	}


	this.coords = null;

	/**
	 *	"The class constructor"
	 *	Creates all the graphic elements and applies the event listeners
	 */
	function init(){

		createStickerWindow();
		 
		/**
		 * Event listeners for draggable window element, close button and textarea events
		 */
		Event.addEventListener(self.menubar, Event.MOUSE_DOWN, startDrag);
		Event.addEventListener(self.menubar, Event.MOUSE_UP, stopDrag);
		Event.addEventListener(self.closeButton, Event.CLICK, closeWindow);
		Event.addEventListener(self.textarea, Event.KEY_UP, getDetailsForXMLFile);
	}

	/**
	 *	Starts the drag-and-drop functionality found in Utils and Drag objects and
	 */
	function startDrag(event){
		self.element.style.zIndex	= Utils.getUniqueId();
		self.element.style.opacity	= 0.7;
		self.menubar.style.cursor	= 'move';
		Drag.beginDrag(self.element, event);
	}
	
	/**
	 *	Stops the drag-and-drop functionality
	 */
	function stopDrag(event){
		self.element.style.opacity	= 1;
		self.menubar.style.cursor	= 'default';
		getDetailsForXMLFile();
	}

	/**
	 * Closes the application window
	 */
	function closeWindow(event){
		self.element.parentNode.removeChild(self.element);
	}

	/**
	 * Creates a sticker window and applies it on the desktop
	*/
	function createStickerWindow(){
		self.element = document.createElement('div');
		self.element.setAttribute('class', 'sticker');
		// MENUBAR WITH THE CLOSE BUTTON
		self.menubar = 	document.createElement('div');
		self.menubar.setAttribute('class', 'sticker-drag');
		self.closeButton = document.createElement('div');
		self.closeButton.setAttribute('class', 'sticker-close');
		self.menubar.appendChild(self.closeButton);
		// TEXTAREA CONTENT
		self.textarea = document.createElement('textarea');
		// Append the parts to the dice window element
		self.element.appendChild(self.menubar);
		self.element.appendChild(self.textarea);
	}
	
	/**
	 * Creates the structure in the XML-file
	 */
	this.createStickerXMLStructure = function(){
		self.ajax.get("src/php/createPostit.php", onDataLoaded);
	}

	/**
	 * Called eachtime a key is pressed or dragging of the element stopped
	*/
	function getDetailsForXMLFile(event){
		if(self.element.style.zIndex > 0){
			var zIndex = self.element.style.zIndex;
		} else{
			var zIndex = Utils.getUniqueId()		
		}
		self.coords = Drag.getPosition(self.element);
		updateStickerXMLFile(self.textarea.value, self.coords, zIndex);
	}

	/**
	 * Updates the XML-file when keyup and drag event occurs
	 */
	function updateStickerXMLFile(keychar, coords, zindex){
		var parameters = "text="+keychar+"&coordsX="+coords.x+"&coordsY="+coords.y+"&zIndex="+zindex+"&id="+self.stickerId;
		self.ajax.post("src/php/updatePostit.php", parameters, onDataLoaded);
	}

	function onDataLoaded(){
		// console.log("done");
	}
	
	/**
	 *	Invokes the "constructor" function
	 */
	init();

}

