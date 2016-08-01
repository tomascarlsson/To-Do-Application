<?php	
error_reporting(E_ALL); // Report all PHP errors

/**
 * Load the XML file with properties
 */
$XMLfile = new DomDocument(); 
$XMLfile->formatOutput = true;
$XMLfile->preserveWhiteSpace = false;
$XMLfile->load('../xml/0.xml'); 

/**
 * Get the values from the POST array
  */
$text = $_POST['text'];
$coordsX = $_POST['coordsX'];
$coordsY = $_POST['coordsY'];
$zIndex = $_POST['zIndex'];
$id = $_POST['id'];


updateStickerInfo($XMLfile, $id, $text, $coordsX, $coordsY, $zIndex);

/**
 * Updates the XML-file with the new sent in valuesw
 */
function updateStickerInfo($XMLfile, $id, $text,  $coordsX, $coordsY, $zIndex) { 
	$sticker = $XMLfile->getElementsByTagName('sticker');
	foreach($sticker as $s){
		$sId = $s->getElementsByTagName('id')->item(0)->nodeValue; // first time empty
		if($id == $sId || $sId == ''){
			$s->getElementsByTagName("id")->item(0)->nodeValue = $id;
			$s->getElementsByTagName("text")->item(0)->nodeValue = $text;
			$s->getElementsByTagName("x")->item(0)->nodeValue = $coordsX;
			$s->getElementsByTagName("y")->item(0)->nodeValue = $coordsY;
			$s->getElementsByTagName("z")->item(0)->nodeValue = $zIndex;
			// $s->getElementsByTagName("position")->item(0)->nodeValue = $position;
		}
	}

	// // Save the new XML code
	$XMLfile->save('../xml/0.xml', LIBXML_NOEMPTYTAG);
} 

?>