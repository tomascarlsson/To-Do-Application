<?php	
error_reporting(E_ALL); // Report all PHP errors

/**
 * Load the XML file with properties
 */
$XMLfile = new DomDocument(); 
$XMLfile->formatOutput = true;
$XMLfile->preserveWhiteSpace = false;

$pathToXMLFile = '../xml/0.xml';

/**
 * Check if a XML-file exists
 */
if(!file_exists($pathToXMLFile)){
	createXMLFile($XMLfile, $pathToXMLFile);
} else{
	$XMLfile->load($pathToXMLFile); 
	createNewSticker($XMLfile, $pathToXMLFile);
}

/**
 * Creates a new XML-file with root data
 */
function createXMLFile($XMLfile, $pathToXMLFile){
	$newXMLFile = fopen($pathToXMLFile, "w+");
	$newStickers = $XMLfile->createElement('stickers','');
	$XMLfile->appendChild($newStickers);
	$XMLfile->save($pathToXMLFile, LIBXML_NOEMPTYTAG);
	$XMLfile->load($pathToXMLFile); 
	$XMLfile->save($pathToXMLFile, LIBXML_NOEMPTYTAG);
	createNewSticker($XMLfile, $pathToXMLFile);
}


/**
 * Creates a new empty XML structure
 */
function createNewSticker($XMLfile, $pathToXMLFile){
	// Create the new element and its child elements
	$newSticker 		= $XMLfile->createElement('sticker','');
		$newId 			= $XMLfile->createElement('id','');
		$newText 		= $XMLfile->createElement('text','');
		$newPosition 	= $XMLfile->createElement('position','');
			$coordsX 	= $XMLfile->createElement('x','');
			$coordsY 	= $XMLfile->createElement('y','');
			$coordsZ 	= $XMLfile->createElement('z','');
		$newPosition->appendChild($coordsX);
		$newPosition->appendChild($coordsY);
		$newPosition->appendChild($coordsZ);	
	$newSticker->appendChild($newId);
	$newSticker->appendChild($newText);
	$newSticker->appendChild($newPosition);

	if($XMLfile->getElementsByTagName('sticker')){
		// Append the new sticker element at the end of the XML code
		$stickers = $XMLfile->getElementsByTagName('stickers');
		$stickers->item(0)->appendChild($newSticker);
		// Save the new XML code
		$XMLfile->save($pathToXMLFile, LIBXML_NOEMPTYTAG);
	}
}



?>