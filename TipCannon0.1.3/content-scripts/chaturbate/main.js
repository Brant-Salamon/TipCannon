var tipInterval = 0;

function getAvailableTokens() {
    //return parseInt($('div.tokens.tokencount').html());
    return parseInt($('#Zr>div:nth-child(7)>div>div:nth-child(1)>span:nth-child(2)').html());
}
function setAvailableTokens(amount) {
	//$('div.tokens.tokencount').html(amount);
	$('#Zr>div:nth-child(7)>div>div:nth-child(1)>span:nth-child(2)').html(amount)
}

function getModelUsername() {
    var url = window.location.href;
    url = url.split('/');

    var username = url[url.length - 1];
    if (username.length === 0) {
        username = url[url.length - 2];
    }
    return username;
}

function getRoomType() {
    return "public";
}

function getCsrfToken() {
    return $('input[name=csrfmiddlewaretoken]').val();
}
/*
https://chaturbate.com/tipping/send_tip/modelname/
tip_amount=25&message=&source=theater&tip_room_type=public&csrfmiddlewaretoken=lkjhklj
*/
function tip(tipAmount) {
    var data = {
        csrfmiddlewaretoken: getCsrfToken(),
        tip_amount: tipAmount,
        message: '',
        tip_room_type: getRoomType(),
		source: 'theatre'
    };
    log(data);

    if (!__DEBUG__) {
        $.post(
            'https://chaturbate.com/tipping/send_tip/' + getModelUsername() + '/', data,
            function (result) {
                if (result.success) {
                    setAvailableTokens(result.token_balance);
                }
            }, 'json'
        );
    }
};
