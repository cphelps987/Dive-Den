<?php
//header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
error_reporting(E_ERROR); // Some servers disabled some features of curl that make a warning we stop to logging theme and we made a fallback to that

// Get content of given url
function bw_file_get_contents_curl($url) {
    try {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
        $data = curl_exec($ch);
        curl_close($ch);
    } catch(Exception $e) {
        $data = file_get_contents($url);
    }
    return $data;
}

function bw_get_user_gelocation(){
    // get user info's by ip
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $user_ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $user_ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $user_ip = $_SERVER['REMOTE_ADDR'];
    }

    // return false in local hosts
    if( $user_ip == '127.0.0.1' ){
        return false;
    }

    $user_geolocation = bw_file_get_contents_curl("http://better-studio.net/bw-api/get-geo.php?ip=".$user_ip);

    if( empty($user_geolocation) )
        return false;

    $user_geolocation = json_decode( $user_geolocation );

    if( $user_geolocation->statusCode != 'OK' )
        return false;

    return $user_geolocation->latitude . ',' . $user_geolocation->longitude;
}

function bw_create_result_data( $today_data , $past_day_data ){
    $result = array();

    $result['latitude'] = $today_data->latitude;
    $result['longitude'] = $today_data->longitude;
    $result['timezone'] = $today_data->timezone;
    $result['currently'] = $today_data->currently;

    // temperatureMin
    if(isset($past_day_data->temperatureMin))
        $result['currently']->temperatureMin = $past_day_data->temperatureMin;
    else
        $result['currently']->temperatureMin = 'NA';

    // temperatureMin
    if(isset($past_day_data->temperatureMax))
        $result['currently']->temperatureMax = $past_day_data->temperatureMax;
    else
        $result['currently']->temperatureMax = 'NA';

    // sunriseTime
    if(isset($past_day_data->sunriseTime))
        $result['currently']->sunriseTime = $past_day_data->sunriseTime ;
    else
        $result['currently']->sunriseTime = 'NA';

    // sunsetTime
    if(isset($past_day_data->sunsetTime))
        $result['currently']->sunsetTime = $past_day_data->sunsetTime ;
    else
        $result['currently']->sunsetTime = 'NA';

    $counter = -1;
    foreach ( $today_data->daily->data as $day){
        if($counter == -1){
            $counter++;
            continue;
        }
        if($counter > 4)
            break;
        else
            $counter++;

        $result['daily'][$counter] = array(
            'dayName'  =>  date('D', $day->time ),
            'time'  =>  $day->time,
            'icon'  =>  $day->icon
        );
    }

    return $result;
}

$apikey    = isset($_POST["apikey"]) && $_POST["apikey"]!="" && $_POST["apikey"]!= "false" ? $_POST["apikey"] : "" ;

$location  = isset($_POST["location"]) && $_POST["location"] != "" ? $_POST["location"] : "35.6705,139.7409";

$visitor_location  = isset($_POST["visitor_location"]) && $_POST["visitor_location"] == "true" ? true : false ;
if( $visitor_location ){
    $_l = bw_get_user_gelocation();
    if( ! is_bool($_l) )
        $location = $_l;
}

// Create Cache file name
$location  = trim( str_replace(" ",  "",  $location ) );
$cacheFileName = str_replace(
    array(".","/","\\",",") ,
    "" ,
    $location
);
$cacheFileName = "cache" . DIRECTORY_SEPARATOR . $cacheFileName . '.json';
$cacheTime = 1800;

// Check API Key exists
if ( !$apikey || $apikey == "" ) {
    echo json_encode(
        array(
            'status'	=> 'error',
            'msg'  	    => 'Better Weather Error: No API Key provided! Obtain API Key from https://developers.forecast.io/',
            'data'      => 'no data'
        )
    );
    die();
}

// If no cache directory, create one && return error on failure
if (!is_dir("cache")) {
    if (!mkdir("cache", 0700)) {
        echo json_encode(
            array(
                'status'	=> 'error',
                'msg'  	    => 'Better Weather Error: Unable to create cache folder! Make sure PHP has write permissions!',
                'data'      => 'no data'
            )
        );
        die();
    }
}

// clear cache file that older than last 30 minute
$clearCacheFile = "cache" . DIRECTORY_SEPARATOR . 'clear-cache.json';
if (!file_exists($clearCacheFile) || filemtime($clearCacheFile) <= time() - $cacheTime) {
    foreach( glob('cache/*.json') as $file ){
            unlink($file);
    }
    file_put_contents( $clearCacheFile, json_encode(time()) );
}

// If cache file is older than 30min, store new file && return error on failure
if (!file_exists($cacheFileName) || filemtime($cacheFileName) <= time() - $cacheTime) {

    // retrieving Today content
    $today_data = bw_file_get_contents_curl("https://api.forecast.io/forecast/$apikey/$location?exclude=hourly,flags,alerts,minutely");

    if ( $today_data == "Forbidden" ) {
        echo json_encode(
            array(
                'status'	=> 'error',
                'msg'  	    => 'Better Weather Error: Provided API key is incorrect!.',
                'data'      => 'no data'
            )
        );
        die();
    }

    if( ! $today_data ) {
        echo json_encode(
            array(
                'status'	=> 'error',
                'msg'  	    => 'Better Weather Error: No any data received from Forecast.io!.',
                'data'      => $today_data
            )
        );
        die();
    }

    $today_data = json_decode($today_data);

    // hack for getting today min/max temperature and sunset sunrise time!
    if( date('Y M d', $today_data->daily->data[0]->time ) == date('Y M d', $today_data->currently->time ) ){
        $past_day_data = $today_data->daily->data[0];
    }else{
        $past_day_data = bw_file_get_contents_curl("https://api.forecast.io/forecast/$apikey/$location,".strtotime("-1 day", time()) . '?exclude=currently,hourly,flags,alerts,minutely');
        $past_day_data = json_decode($past_day_data);
        $past_day_data = $past_day_data->daily->data[0];
    }

    $data = bw_create_result_data( $today_data , $past_day_data );

    if( !$visitor_location && !file_put_contents( $cacheFileName, json_encode($data) ) ) {
        echo json_encode(
            array(
                'status'	=> 'error',
                'msg'  	    => 'Better Weather Error: Unable to store new data! Delete the cache folder and try again.',
                'data'      => $data
            )
        );
        die();
    }
}
else{
    $data = json_decode( file_get_contents($cacheFileName) );
}

echo json_encode(
    array(
        'status'	=> 'succeed',
        'msg'  	    => 'Its OK!',
        'data'      => $data
    )
);
die();
