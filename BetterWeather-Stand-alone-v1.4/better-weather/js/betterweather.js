/**
 * BetterWeather v1.4
 * Author: BetterStudio (http://themeforest.net/user/Better-Studio)
 * @license BetterStudio
*/
(function($){
    $.betterWeather = function(el, options){
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("betterWeather", base);

        // Tries count in ajax calls
        base.tries = 1;

        // Template Initialized
        base.templateInitialized = false;

        // Detecting retina
        base.retina = window.devicePixelRatio > 1;

        // Default Options
        base.defaultOptions = {
            source      :   'forecast',

            apiKey      :   "",

            location    :   "",
            locationName:   "",
            showLocation:   true,

            showDate    :   true,

            visitorLocation: false,

            fontColor   :   "#fff",
            bgColor     :   "#4f4f4f",
            style       :   "normal", // Modern

            nextDays    :   true,

            animatedIcons:  true,
            naturalBackground:  true,

            url         :   "better-weather/ajax/ajax.php",

            unit        :   "C" ,// F
            showUnit    :   false,

            mode        :   "widget" , // inline
            inlineSize  :   "medium"  // small, medium, large
        };

        // Widget Elements
        base.elements = {
            location: '',
            date: '',
            currentlyDegree: '',
            upDegree: '',
            summary: '',
            summaryIconContainer: '',
            day1Title: '',
            day1Degree: '',
            day1IconContainer: '',
            day2Title: '',
            day2Degree: '',
            day2IconContainer: '',
            day3Title: '',
            day3Degree: '',
            day3IconContainer: '',
            day4Title: '',
            day4Degree: '',
            day4IconContainer: ''
        };

        // Month
        base.monthList = {
            January     : 'January',
            February    : 'February',
            March       : 'March',
            April       : 'April',
            May         : 'May',
            June        : 'June',
            July        : 'July',
            August      : 'August',
            September   : 'September',
            October     : 'October',
            November    : 'November',
            December    : 'December'
        };

        // DaysList
        base.daysList = {
            Sat : 'Sat',
            Sun : 'Sun',
            Mon : 'Mon',
            Tue : 'Tue',
            Wed : 'Wed',
            Thu : 'Thu',
            Fri : 'Fri'
        };

        // Weather States List
        base.stateList = {
            clear           : 'Clear',
            rain            : 'Rain',
            snow            : 'Snow',
            sleet           : 'Sleet',
            wind            : 'Wind',
            foggy           : 'Foggy',
            cloudy          : 'Cloudy',
            mostly_cloudy   : 'Mostly Cloudy',
            partly_cloudy   : 'Partly Cloudy',
            thunderstorm    : 'Thunderstorm',
            drizzle         : 'Drizzle',
            light_Rain      : 'Light Rain',
            breezy_and_Partly_Cloudy      : 'breezy and Partly Cloudy',
            overcast        : 'Overcast'
        };

        // data for syntax highlight purpose ;)
        base.data = {
            latitude: '',
            longitude: '',
            timezone: '',
            currently: {
                time: '',
                summary: '',
                icon: '',
                nearestStormDistance: '',
                nearestStormBearing: '',
                precipIntensity: '',
                precipProbability: '',
                temperature: '',
                apparentTemperature: '',
                dewPoint: '',
                humidity: '',
                windSpeed: '',
                windBearing: '',
                visibility: '',
                cloudCover: '',
                pressure: '',
                ozone: '',
                temperatureMin: '',
                temperatureMax: '',
                sunriseTime: '',
                sunsetTime: ''
            },
            daily: [
                {
                    dayName: '',
                    time: '',
                    icon: ''
                },
                {
                    dayName: '',
                    time: '',
                    icon: ''
                },
                {
                    dayName: '',
                    time: '',
                    icon: ''
                },
                {
                    dayName: '',
                    time: '',
                    icon: ''
                }
            ]
        };

        base.init = function(){

            base.options = $.extend( {} , base.defaultOptions , options);

            base.helper.showLoader();

            base.initColor();

            base.initStyle();

            if( base.options.apiKey === "" ){
                if( (typeof(BW_Localized) !== "undefined" && BW_Localized !== null ) &&
                    (typeof(BW_Localized.apiKey) !== "undefined" && BW_Localized.apiKey !== null ) ){
                    base.options.apiKey = BW_Localized.apiKey;
                }
                else{
                    base.helper.hideLoader();
                    base.helper.log( "error", "No API Key provided! ", " Obtain API Key from https://developers.forecast.io");
                    return;
                }
            }

            base.getDataAjax();

        };

        base.initTemplate= function(){

            base.helper.cleanLog();

            if( base.templateInitialized === true){
                return;
            }

            base.templateInitialized = true;

            // widget mode init
            if( base.options.mode === 'widget' ){

                if( base.options.naturalBackground ){
                    base.$el.addClass('with-natural-background');
                }

                if( base.options.showUnit ){
                    base.$el.addClass('unit-showed');
                }

                base.$el.append( base.helper.templateWidgetCurrently );

                if( base.options.showLocation )
                    base.elements.location = base.$el.find('.bw_currently .bw_location');
                else{
                    base.$el.find('.bw_currently .bw_location').remove();
                    base.$el.find('.bw_currently .bw_separator').remove();
                }

                if( base.options.showDate )
                    base.elements.date = base.$el.find('.bw_currently .bw_date');
                else{
                    base.$el.find('.bw_currently .bw_date').remove();
                    base.$el.find('.bw_currently .bw_separator').remove();
                }

                base.elements.currentlyDegree = base.$el.find('.bw_currently .bw_degree');
                base.elements.upDegree = base.$el.find('.bw_currently .bw_up-degree');
                base.elements.downDegree = base.$el.find('.bw_currently .bw_down-degree');
                base.elements.summaryIconContainer = base.$el.find('.bw_currently .bw_summary .bw_icon-container');
                base.elements.summary = base.$el.find('.bw_currently .bw_summary p');

                if( base.options.nextDays ){
                    base.$el.addClass('have-next-days');
                    base.$el.append( base.helper.templateWidgetNextDays );

                    base.elements.day1Title = base.$el.find('.bw_days .bw_day-1 .bw_day-title');
                    base.elements.day1IconContainer = base.$el.find('.bw_days .bw_day-1 .bw_icon-container');

                    base.elements.day2Title = base.$el.find('.bw_days .bw_day-2 .bw_day-title');
                    base.elements.day2IconContainer = base.$el.find('.bw_days .bw_day-2 .bw_icon-container');

                    base.elements.day3Title = base.$el.find('.bw_days .bw_day-3 .bw_day-title');
                    base.elements.day3IconContainer = base.$el.find('.bw_days .bw_day-3 .bw_icon-container');

                    base.elements.day4Title = base.$el.find('.bw_days .bw_day-4 .bw_day-title');
                    base.elements.day4IconContainer = base.$el.find('.bw_days .bw_day-4 .bw_icon-container');
                }

                base.initIcons();

                base.prettifyIconSize();

                $( window ).resize(function() {
                    base.prettifyIconSize();
                });

            }
            // Inline style
            else if( base.options.mode === 'inline' ){
                base.$el.append( base.helper.templateInlineCurrently );

                base.elements.summaryIconContainer = base.$el.find('.bw_icon_container');
                base.elements.currentlyDegree = base.$el.find('.bw_temperature');
                base.elements.summary = base.$el.find('.bw_summary');

                base.initIcons();
            }

        };

        base.refreshData = function(){

            // Data for widgets
            if( base.options.mode === 'widget' ){
                base.$el.addClass( "state-" + base.data.currently.icon );

                // Sunset Sunrise Time :))
                var _sunriseTime = new Date( base.data.currently.sunriseTime  * 1000);
                var _sunsetTime = new Date( base.data.currently.sunsetTime  * 1000);
                var _currentDate = new Date();
                var _currentTimeMinus30 = new Date(  _currentDate.getTime() + (-30*60000));
                var _currentTimePlus30 = new Date(  _currentDate.getTime() + (30*60000));
                if( ( _sunriseTime >= _currentTimeMinus30) && (_sunriseTime <= _currentTimePlus30) ){
                    base.$el.removeClass( "state-" + base.data.currently.icon );
                    base.$el.addClass( "state-sunrise" );
                }else if( ( _sunsetTime >= _currentTimeMinus30) && (_sunsetTime <= _currentTimePlus30) ){
                    base.$el.removeClass( "state-" + base.data.currently.icon );
                    base.$el.addClass( "state-sunset" );
                }

                base.helper.setIconTo( base.data.currently.icon , base.elements.summaryIconContainer.find('.bw_icon'));
                base.elements.summary.text( base.helper.getStateName( base.data.currently.summary ) );
                base.elements.currentlyDegree.find('p').text( base.helper.getPrettyTemperature( base.data.currently.temperature ) );
                base.elements.upDegree.text( base.helper.getPrettyTemperature( base.data.currently.temperatureMax ) );
                base.elements.downDegree.text( base.helper.getPrettyTemperature( base.data.currently.temperatureMin ) );

                if( base.options.showDate ){
                    var _date = new Date(base.data.currently.time * 1000);
                    base.elements.date.text( _date.getDate() + ' '+ base.helper.getMonth( _date.getMonth() + 1) );
                }

                if( base.options.showLocation )
                    if( base.options.locationName !== ''){
                        base.elements.location.text( base.options.locationName );
                    }else{
                        var _location = base.data.timezone;
                        _location = _location.split('/');
                        _location = _location[_location.length -1].replace('_',' ');
                        base.elements.location.text( _location );
                    }

                if( base.options.nextDays ){
                    base.helper.setIconTo( base.data.daily['1'].icon , base.elements.day1IconContainer.find('.bw_icon'));
                    base.elements.day1Title.text( base.helper.getDayName( base.data.daily['1'].dayName ) );

                    base.helper.setIconTo( base.data.daily['2'].icon , base.elements.day2IconContainer.find('.bw_icon'));
                    base.elements.day2Title.text( base.helper.getDayName( base.data.daily['2'].dayName ) );

                    base.helper.setIconTo( base.data.daily['3'].icon , base.elements.day3IconContainer.find('.bw_icon'));
                    base.elements.day3Title.text( base.helper.getDayName( base.data.daily['3'].dayName ) );

                    base.helper.setIconTo( base.data.daily['4'].icon , base.elements.day4IconContainer.find('.bw_icon'));
                    base.elements.day4Title.text( base.helper.getDayName( base.data.daily['4'].dayName ) );
                }
            }
            // Data for inline
            else if( base.options.mode === 'inline' ){
                base.$el.addClass( "state-" + base.data.currently.icon );
                base.helper.setIconTo( base.data.currently.icon , base.elements.summaryIconContainer.find('.bw_icon'));
                base.elements.summary.text( base.helper.getStateName( base.data.currently.summary ) );
                base.elements.currentlyDegree.text( base.helper.getPrettyTemperature( base.data.currently.temperature ) );
            }
        };

        base.emptyData = function(){

            if( base.options.mode === 'inline '){
                return ;
            }

            base.initTemplate();

            base.$el.addClass( "state-no-data" );
            base.elements.summary.text( "N/A" );
            base.elements.currentlyDegree.find('p').text( "N/A" );
            base.elements.upDegree.text( "N/A" );
            base.elements.downDegree.text( "N/A" );

            if( base.options.showDate ){
                var _date = new Date();
                base.elements.date.text( _date.getDate() + ' '+ base.helper.getMonth( _date.getMonth() + 1) );
            }

            if( base.options.showLocation )
                if( base.options.locationName !== ''){
                    base.elements.location.text( base.options.locationName );
                }else{
                    base.elements.location.text( "N/A" );
                }

            if( base.options.nextDays ){
                base.elements.day1Title.text( "N/A" );
                base.elements.day2Title.text( "N/A" );
                base.elements.day3Title.text( "N/A" );
                base.elements.day4Title.text( "N/A" );
            }

        };

        base.initColor = function(){
            if( base.options.mode === 'widget' ){
                if( ! base.options.naturalBackground ){
                    base.$el.css( "background-color" , base.options.bgColor );
                }
            }
            base.$el.css( "color" , base.options.fontColor );
        };

        base.initStyle = function(){
            if( base.options.mode === 'widget' ){
                base.$el.addClass( "style-" + base.options.style );
                base.$el.addClass('better-weather');
            }else if( base.options.mode === 'inline' ){
                base.$el.addClass( "bw_size-" + base.options.inlineSize );
                base.$el.addClass('better-weather-inline');
            }
        };

        base.initIcons = function(){

            // Prepare icons fopr widget
            if( base.options.mode === 'widget' ){

                // Base Icon Manager
                if( base.helper.isCanvasSupported() ){
                    base.skycons = new Skycons({
                        "color" : base.options.fontColor,
                        "dropShadow" : true
                    });
                }

                // Big icon
                if( base.options.style === 'normal' ){
                    base.helper.addCanvasTo( base.elements.summaryIconContainer , base.$el.attr('id') +'-summary-icon' , 85 , 85 );
                }else{
                    base.helper.addCanvasTo( base.elements.summaryIconContainer , base.$el.attr('id') +'-summary-icon' , 55 , 55 );
                }
                // Days icons
                if( base.options.nextDays ){
                    base.helper.addCanvasTo( base.elements.day1IconContainer , base.$el.attr('id') +'-day1-icon' , 17 , 17 );
                    base.helper.addCanvasTo( base.elements.day2IconContainer , base.$el.attr('id') +'-day2-icon' , 17 , 17 );
                    base.helper.addCanvasTo( base.elements.day3IconContainer , base.$el.attr('id') +'-day3-icon' , 17 , 17 );
                    base.helper.addCanvasTo( base.elements.day4IconContainer , base.$el.attr('id') +'-day4-icon' , 17 , 17 );
                }
            }
            // Prepare icons for inline style
            else if( base.options.mode === 'inline' ){
                // Base Icon Manager
                if( base.helper.isCanvasSupported() ){
                    base.skycons = new Skycons({
                        "color" : base.options.fontColor,
                        "dropShadow" : false
                    });
                }

                var _w = '', _h ='';
                switch ( base.options.inlineSize ){
                    case 'small':
                        _h = _w = 18;
                        break;
                    case 'medium':
                        _h = _w = 30;
                        break;
                    case 'large':
                        _h = _w = 55;
                        break;
                }
                base.helper.addCanvasTo( base.elements.summaryIconContainer , base.$el.attr('id') +'-summary-icon' , _w , _h );
            }

        };

        base.prettifyIconSize = function(){

            var _w = base.$el.width();
            var $_icon = base.elements.summaryIconContainer.find('.bw_icon');

            if($_icon.hasClass('hw_static-icon')){
                return ;
            }

            switch( true ){

                case _w <= 70:
                    base.helper.updateIconSize( $_icon , 28 , 28 );
                    break;

                case _w <= 100:
                    base.helper.updateIconSize( $_icon , 35 , 35 );

                    break;

                case _w <= 200:
                    base.helper.updateIconSize( $_icon , 40 , 40 );
                    break;

                case _w <= 400:
                    if(base.options.style === 'modern'){
                        base.helper.updateIconSize( $_icon , 55 , 55 );
                    }else if( base.options.style === 'normal' ){
                        base.helper.updateIconSize( $_icon , 70 , 70 );
                    }
                    break;

                case _w <= 1170:
                    base.helper.updateIconSize( $_icon , 35 , 35 );
                    break;
            }

        };


        base.getDataAjax = function() {

            var data  = "location="    + base.options.location;
            data += "&apikey="     + base.options.apiKey;
            data += "&source="     + base.options.source;

            if( base.options.visitorLocation ){
                data += "&visitor_location=true";
            }

            // Ajax compatibility with WordPress
            if( typeof BW_Localized.action != 'undefined' ){
                data += "&action=" + BW_Localized.action;
            }

            jQuery.ajax({
                type: "POST",
                url: base.helper.getAjaxURL(),
                data: data,
                dataType: "json",
                success: function( response ){
                    switch ( response.status ){
                        case 'succeed':
                            base.data = response.data;
                            base.initTemplate();
                            base.helper.hideLoader();
                            base.refreshData();
                            break;
                        case 'error':
                            base.initTemplate();
                            base.helper.log( 'error' , response.msg , response.data );
                            if( base.tries <= 2){
                                base.tries++;
                                base.helper.log( 'alert' , 'Better Weather Another Ajax call sent' , '');
                                setTimeout(function(){
                                    base.helper.log( 'alert' , 'Better Weather another Ajax call sent.' , '');
                                    base.getDataAjax();
                                },3000);
                            }else{
                                base.helper.log( 'error' , 'Critical problem in Better Weather Ajax calls' , 'Better Weather sent 3 time Ajax Call but retried data has problem! Please check xml.php file and delete cache folder.' );
                                setTimeout(function(){
                                    base.emptyData();
                                    base.helper.hideLoader();
                                },2000);
                            }
                            break;
                    }
                }
            });

        };

        base.helper = {

            getCorretSize: function( value ){
                if( base.retina ){
                    return value * 2;
                }
                else{
                    return value;
                }
            },

            updateIconSize: function( $_icon , width , height ){
                $_icon.attr( 'width' , base.helper.getCorretSize(width));
                $_icon.attr( 'height' , base.helper.getCorretSize(height));
                $_icon.css( "width" , width+'px' );
                $_icon.css( "height" , height+'px' );
            },

            getAjaxURL: function(){

                if( base.options.url !== base.defaultOptions.url ){
                    return base.options.url;
                }

                if( (typeof(BW_Localized) !== "undefined" && BW_Localized !== null ) &&
                    (typeof(BW_Localized.url) !== "undefined" && BW_Localized.url !== null )
                    ){
                    return BW_Localized.url;
                }

                return base.defaultOptions.url;
            },
            showLoader: function(){
                if ( base.options.mode === 'inline' ) { return ; }

                if( base.$el.find('.bw-loader').length === 0 ){
                    base.$el.append( base.helper.templateWidgetLoader );
                }
            },
            hideLoader: function(){
                if ( base.options.mode === 'inline' ){ return; }
                base.$el.find('.bw-loader').remove();
            },

            celsiusToFahrenheit: function( celsius ){
                return (celsius * 9 / 5) + 32;
            },

            fahrenheitToCelsius: function( fahrenheit ){
                return (fahrenheit -32) * 5 / 9;
            },

            getPrettyTemperature: function( temperature ){
                if( base.options.mode === 'widget' ){
                    if( base.options.unit === 'F' ){
                        return parseInt( temperature ) + '°' + ( base.options.showUnit ? 'F' : '' );
                    }else{
                        return parseInt( base.helper.fahrenheitToCelsius(temperature) ) + '°' + ( base.options.showUnit ? 'C' : '' );
                    }
                }else if( base.options.mode === 'inline' ){
                    if( base.options.unit === 'F' ){
                        return parseInt( temperature ) + '°' + ( base.options.showUnit ? 'F' : '' );
                    }else{
                        return parseInt( base.helper.fahrenheitToCelsius(temperature) ) + '°' + ( base.options.showUnit ? 'C' : '' );
                    }
                }
            },

            getMonth: function(Month){
                var _month = '';
                switch ( Month ){
                    case 1:
                        _month = 'January';
                        break;
                    case 2:
                        _month = 'February';
                        break;
                    case 3:
                        _month = 'March';
                        break;
                    case 4:
                        _month = 'April';
                        break;
                    case 5:
                        _month = 'May';
                        break;
                    case 6:
                        _month = 'June';
                        break;
                    case 7:
                        _month = 'July';
                        break;
                    case 8:
                        _month = 'August';
                        break;
                    case 9:
                        _month = 'September';
                        break;
                    case 10:
                        _month = 'October';
                        break;
                    case 11:
                        _month = 'November';
                        break;
                    case 12:
                        _month = 'December';
                        break;
                }
                if( (typeof(BW_Localized) !== "undefined" && BW_Localized !== null ) &&
                    (typeof(BW_Localized.monthList) !== "undefined" && BW_Localized.monthList !== null ) &&
                    (typeof(BW_Localized.monthList[_month]) !== "undefined" && BW_Localized.monthList[_month] !== null )
                    ){
                    return BW_Localized.monthList[_month];
                }
                return base.monthList[_month];
            },

            getDayName: function(day){
                if( (typeof(BW_Localized) !== "undefined" && BW_Localized !== null ) &&
                    (typeof(BW_Localized.daysList) !== "undefined" && BW_Localized.daysList !== null ) &&
                    (typeof(BW_Localized.daysList[day]) !== "undefined" && BW_Localized.daysList[day] !== null )
                    ){
                    return BW_Localized.daysList[day];
                }
                return base.daysList[day];
            },

            getStateName: function(state){
                var _state = state.toLowerCase();
                _state = _state.replace( ' ' , '_' );
                _state = _state.replace( '-' , '_' );

                if( (typeof(BW_Localized) !== "undefined" && BW_Localized !== null ) &&
                    (typeof(BW_Localized.stateList) !== "undefined" && BW_Localized.stateList !== null ) &&
                    (typeof(BW_Localized.stateList[_state]) !== "undefined" && BW_Localized.stateList[_state] !== null )
                    ){
                    return BW_Localized.stateList[_state];
                }
                if( typeof(base.stateList[_state]) !== "undefined" && base.stateList[_state] !== null ){
                    return base.stateList[_state];
                }
                else{
                    return state;
                }
            },

            log: function( type , title , message ){
                switch( type ){
                    case 'error':
                        if ( base.options.mode === 'widget' ){
                            if(base.$el.find('.bw-error').length === 0){
                                base.$el.append( base.helper.templateWidgetErrors );
                            }
                            base.$el.find('.bw-error .bw-error-title').text( title );
                            console.log( (title===''?'': title + ':' ) + message );
                        }else{
                            console.log( (title===''?'': title + ':' ) + message );
                        }
                        break;
                    case 'alert':
                        console.log( (title===''?'': title + ':' ) + message );
                        break;
                }
            },

            cleanLog: function(){
                base.$el.find('.bw-error').remove();
            },

            isCanvasSupported: function() {
                var elem = document.createElement('canvas');
                return !!(elem.getContext && elem.getContext('2d')) ;
            },

            allowedIcons: [ "clear-day" ,"clear-night" , "rain" , "snow" , "sleet" , "wind" , "fog" , "cloudy" , "partly-cloudy-day" , "partly-cloudy-night" ],

            setIconTo: function( icon , $element ){

                if( base.helper.isCanvasSupported() && $.inArray( icon , base.helper.allowedIcons  ) >=0 && (base.options.animatedIcons === true) ){
                    base.skycons.set( $element.attr("id") , icon );
                    base.skycons.play();
                }else{
                    $element.addClass('bw_'+icon);

                    var _icon = '';
                    switch (icon){
                        case 'clear-day':
                            _icon = 'wi-day-sunny';
                            break;
                        case 'clear-night':
                            _icon = 'wi-night-clear';
                            break;
                        case 'rain':
                            _icon = 'wi-rain';
                            break;
                        case 'snow':
                            _icon = 'wi-snow';
                            break;
                        case 'sleet':
                            _icon = 'wi-rain';
                            break;
                        case 'wind':
                            _icon = 'wi-strong-wind';
                            break;
                        case 'thunderstorm':
                            _icon = 'wi-lightning';
                            break;
                        case 'cloudy':
                            _icon = 'wi-cloudy';
                            break;
                        case 'partly-cloudy-day':
                            _icon = 'wi-day-cloudy';
                            break;
                        case 'partly-cloudy-night':
                            _icon = 'wi-night-cloudy';
                            break;

                    }
                    if( icon === 'thunderstorm' ){
                        $element.parent().append('<i class="' + _icon + '"></i>');
                        $element.parent().find('canvas').remove();
                    }else{
                        $element.append('<i class="' + _icon + '"></i>');
                    }
                }

            },

            addCanvasTo: function( $element , id , width , height ){
                if (base.helper.isCanvasSupported() && (base.options.animatedIcons === true))
                    $element.append('<canvas id="'+ id +'" class="bw_icon bw_svg-icon" width="'+ base.helper.getCorretSize( width ) +'" height="'+ base.helper.getCorretSize( height ) +'" style="height:'+ height  +'px; width:'+ width +'px;"></canvas>');
                else
                    $element.append('<span id="'+ id +'" class="bw_icon hw_static-icon" ></span>');
            },

            // Inline Templates
            templateInlineCurrently: '<span class="bw_icon_container"></span><span class="bw_temperature"></span><span class="bw_summary"></span>',

            // widget Templates
            templateWidgetErrors: '<div class="bw-error"><p class="bw-error-sign">&#x26a0;</p><p class="bw-error-title"></p><p class="bw-error-text"></p></div>',
            templateWidgetLoader: '<div class="bw-loader"></div>',
            templateWidgetCurrently: '<div class="bw_currently"><div class="bw_date-loc"><span class="bw_location"></span><span class="bw_separator">-</span><span class="bw_date"></span></div><div class="bw_degree-up-down"><span class="bw_up-degree"></span><span class="bw_down-degree"></span></div><div class="bw_summary"><span class="bw_icon-container"></span><p></p></div><div class="bw_degree"><p></p></div></div>',
            templateWidgetNextDays: '<div class="bw_days"><ul class="bw_days-list"><li class="bw_day-item bw_day-1"><p class="bw_day-title"></p><span class="bw_icon-container"></span></li><li class="bw_day-item bw_day-2"><p class="bw_day-title"></p><span class="bw_icon-container"></span></li><li class="bw_day-item bw_day-3"><p class="bw_day-title"></p><span class="bw_icon-container"></span></li><li class="bw_day-item bw_day-4"><p class="bw_day-title"></p><span class="bw_icon-container"></span></li></ul></div>'
        };

        base.init();
    };

    $.fn.betterWeather = function(options){
        return this.each( function(){
            new $.betterWeather(this, options);
        });
    };

    // Hack for element query on local/cross domain
    elementQuery({
       ".better-weather":{"max-width":["2000px","1170px","970px","900px","830px","650px","550px","400px","350px","300px","250px","200px","170px","120px","100px","50px"]},
    });

})(jQuery);


