var range_el = document.querySelector('input');
var power_lvl = 0;



function testtest(e) {
    // document.getElementById("rangevalue1").innerHTML= e;
    // set the progress bar at the certain %
    if(e > 0 && e <= 8){ // 3m        
        // send the PWRLVL - 3;
        power_lvl = 3;
        document.getElementById("rangevalue1").innerHTML="3m";
    }
    else if(e > 8 && e <= 13){ // 5m
        // send the PWRLVL - 5;
        power_lvl = 5;        
        document.getElementById("rangevalue1").innerHTML="5m";
    }
    else if(e > 13 && e <= 25){ // 10m
        // send the PWRLVL - 6;
        power_lvl = 6;        
        document.getElementById("rangevalue1").innerHTML="10m";
    }
    else if(e > 25 && e <= 50){ // 20    
        // send the PWRLVL - 8;
        power_lvl = 8;        
        document.getElementById("rangevalue1").innerHTML="20m";
    }
    else if(e > 50 && e <= 75){ // 30m
        // send the PWRLVL - 10;
        power_lvl = 10;        
        document.getElementById("rangevalue1").innerHTML="30m";
    }
    else {
        // send the PWRLVL - 12;     
        power_lvl = 12;   
        document.getElementById("rangevalue1").innerHTML="40m";
    }
    if((login_stage >= 2) && (isDisconnecting == 0)) {
        tids_trace_reset();
        isIgnore=0;
        document.getElementById("settings-message").innerHTML = "Setting new Bluetooth range. Please wait...";
        if((login_stage >= 3) && (isDisconnecting == 0)) {
            setTimeout(ptModeOFF, 1000);//sendAT('AT+PT=0');
            login_stage = 2; // back to the PT mode
            //document.getElementById('btn_mode').innerHTML ='NORMAL MODE';
        }
        setTimeout(writeBTrange, 2000);
        setTimeout(ptModeON, 3000);              
    }    
}
