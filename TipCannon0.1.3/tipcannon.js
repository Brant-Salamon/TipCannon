var __DEBUG__ = false;

function log(msg) {
    if (__DEBUG__) {
        console.log(msg);
    }
}

$(document).ready(function() {
    log('extension loaded');
    ui.init();

    var tipAmount = 1;
    ui.$tokens.on('click keyup', function() {
        tipAmount = ui.getTokenAmount();
        log('Token amount changed:' + tipAmount);
    });

    var speed = 1000;
    ui.$speed.on('change', function() {
        speed = ui.getSpeed();
        log('Speed changed');

        if (ui.isFiring()) {
            stop();
            start();
        }
    });

    ui.$fireBtn.on('click', function() {
        if ($(this).is('.on')) {
            start();
        }
        else {
            stop();
        }
    });

    function start() {
        tipInterval = setInterval(function() {
            var tokensLeft = getAvailableTokens();
            if ((tokensLeft - tipAmount >= 0)) {
                tip(tipAmount);
                log('Tipped ' + tipAmount + '. Tokens left: ' + tokensLeft);
            }
            else {
                ui.$fireBtn.trigger('click');
                log('No tokens left');
            }
        }, speed);
        log('start()');
    }

    function stop() {
        clearInterval(tipInterval);
        log('stop()');
    }
	
});

function setTipCannonDebug(state) {
	__DEBUG__ = state;
}
