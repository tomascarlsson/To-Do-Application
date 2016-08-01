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
 * Checks if the XML-file (url) exists, otherwise create a new one
 */
if(!file_exists($pathToXMLFile)){
	$newXMLFile = fopen($pathToXMLFile, "w+");
	$newStickers = $XMLfile->createElement('stickers','');
	$XMLfile->appendChild($newStickers);
	$XMLfile->save($pathToXMLFile, LIBXML_NOEMPTYTAG);
	$XMLfile->load($pathToXMLFile); 
	$XMLfile->save($pathToXMLFile, LIBXML_NOEMPTYTAG);
} else{
	$XMLfile->load($pathToXMLFile); 
}


?>