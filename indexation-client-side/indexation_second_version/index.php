<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
function get_meta_description ($fichierHTML)
{
    $tableau_associatif_metas = get_meta_tags($fichierHTML);
    if(array_key_exists('description', $tableau_associatif_metas)){
        return $tableau_associatif_metas['description'] ; 
    }  
}
function get_meta_keywords ($fichierHTML)
{
    $tableau_associatif_metas = get_meta_tags($fichierHTML);
    if(array_key_exists('keywords', $tableau_associatif_metas)){
        return $tableau_associatif_metas['keywords'] ; 
    }  
}
function get_title($fichier_html)
{
    $chaine_html = file_get_contents($fichier_html);

    $modele = '/<title>(.*)<\/title>/si' ;

    if(isset($modele)){
        preg_match($modele, $chaine_html, $tableau_resultat) ;
      if(isset($tableau_resultat[1])){
        return $tableau_resultat[1] ;
      }
    }
}
function get_body($fichier_html)
{
    $chaine_html = file_get_contents($fichier_html);

    $modele = '/<body>(.*)<\/body>/si' ;
    $chaine_html =  preg_replace('/\s+/', ' ', $chaine_html);
    if(isset($modele)){
        preg_match($modele, $chaine_html, $tableau_resultat) ;
        if(isset($tableau_resultat[1])){
            return $tableau_resultat[1] ;  
        } 
    }
}
function get_stop_words($fichier_text)
{
    $file_string = file_get_contents($fichier_text);
    preg_match_all('~\w+(?:-\w+)*~', $file_string, $matches);
    return $matches[0];
}
function explode_bis($separateurs, $texte)
{
    if(isset($texte)){
        $tok = strtok($texte, $separateurs);
        if(strlen($tok)>2) $tab_mots[] = $tok;
        while ($tok !== false)
        {
            $tok = strtok($separateurs);
            if(strlen($tok)>2) $tab_mots[] = $tok;
        }
        return $tab_mots;
    }
  
}
function get_lowerCase_words_length_high_then_two_of_text($text, $separateurs)
{
     if(isset($text)){
        $texte = strtolower($text);
        return explode_bis ($separateurs, $texte);
     }
}
function calcul_number_occurence($tab_mots){
    if(isset($tab_mots)){
        return array_count_values( $tab_mots );
    }
}
function get_text_without_stop_words($words, $stop_words){
    if(isset($words)){
        return \array_diff($words, $stop_words);
    }
}
function print_tab($tab_mots)
{
    foreach ($tab_mots as $indice => $mot)  echo $indice , " = ", $mot, '<br>';
}
$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator('./files'));

$files = array(); 

foreach ($rii as $file) {

    if ($file->isDir()){ 
        continue;
    }

    $files[] = $file->getPathname(); 

}

foreach($files as $f) {
//1- Extraction of head elements texts
$titre = get_title($f);
$description = get_meta_description($f);
$keywords = get_meta_keywords($f);
$body = get_body($f);
$head = get_title($f).get_meta_description($f).get_meta_keywords($f);
//2- transform to lowercase, delete words with heigh<2 and get list of words
$separateurs = " ?,!.'’()\n\r";
if(isset($titre)){
    $wordsTitle =  get_lowerCase_words_length_high_then_two_of_text($titre, $separateurs);
}
if(isset($description)){
    $wordsDescription =  get_lowerCase_words_length_high_then_two_of_text($description, $separateurs);
}
if(isset($keywords)){
    $wordsKeywords =  get_lowerCase_words_length_high_then_two_of_text($keywords, $separateurs);
}
if(isset($body)){
    $wordsBody =  get_lowerCase_words_length_high_then_two_of_text($body, $separateurs);
}
if(isset($head)){
    $wordsHead = get_lowerCase_words_length_high_then_two_of_text($head, $separateurs);
}

//3- read stopWordsList
$stop_words = get_stop_words('./stop_words.txt');

//4- get_all_words_without_stop_words
if(isset($wordsTitle)){
    $wordsTitleF = get_text_without_stop_words($wordsTitle,$stop_words);
}
if(isset($wordsDescription)){
    $wordsDescriptionF = get_text_without_stop_words($wordsDescription,$stop_words);
}
if(isset($wordsKeywords)){
    $wordsKeywordsF = get_text_without_stop_words($wordsKeywords,$stop_words);
}
if(isset($wordsBody)){
    $wordsBodyF = get_text_without_stop_words($wordsBody,$stop_words);
}
if(isset($wordsHead)){
    $wordsHeadF = get_text_without_stop_words($wordsHead,$stop_words);
}
//5- get all_words_with_occurences
if(isset($wordsTitleF)){
    $wordsTitleOccurences=calcul_number_occurence($wordsTitleF);
}
if(isset($wordsDescriptionF)){
    $wordsDescriptionOccurences=calcul_number_occurence($wordsDescriptionF);
}
if(isset($wordsKeywordsF)){
    $wordsKeywordsOccurences=calcul_number_occurence($wordsKeywordsF);
}
if(isset($wordsBodyF)){
    $wordsBodyOccurences=calcul_number_occurence($wordsBodyF);
}
if(isset($wordsHeadF)){
    $wordsHeadOccurences=calcul_number_occurence($wordsHeadF);
}

//6- 
if(isset($wordsTitleOccurences)){
    foreach($wordsTitleOccurences as $word=>$val){
        $wordsTitleOccurences[$word]=$wordsTitleOccurences[$word]*1.5;
    }
}
if(isset($wordsDescriptionOccurences)){
    foreach($wordsDescriptionOccurences as $word=>$val){
        $wordsDescriptionOccurences[$word]=$wordsDescriptionOccurences[$word]*1.5;
    }
}
if(isset($wordsKeywordsOccurences)){
    foreach($wordsKeywordsOccurences as $word=>$val){
        $wordsKeywordsOccurences[$word]=$wordsKeywordsOccurences[$word]*1.5;
    }
}
if(isset($wordsHeadOccurences)){
    foreach($wordsHeadOccurences as $word=>$val){
        $wordsHeadOccurences[$word]=$wordsHeadOccurences[$word]*1.5;
    }
}
$result["file"]=$f;
$result["head"]=$wordsHeadOccurences;
$result["body"]=$wordsBodyOccurences;
$result["title"]=$titre;
$result["descriptions"]=$description;
$result["keywords"]=$keywords;
$result_final[]= $result;

}

echo (json_encode($result_final)); 

?>
