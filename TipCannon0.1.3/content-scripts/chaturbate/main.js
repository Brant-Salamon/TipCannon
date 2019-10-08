var tipInterval = 0;

function getAvailableTokens() {
    return parseInt($('div.tokens.tokencount').html());
}
function setAvailableTokens(amount) {
    $('div.tokens.tokencount').html(amount);
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
    return $('input#id_tip_room_type').val();
}

function getTipV() {
    return $('input#id_v').val();
}

function getCsrfToken() {
    return $('input[name=csrfmiddlewaretoken]').val();
}

function tip(tipAmount) {
    var data = {
        csrfmiddlewaretoken: getCsrfToken(),
        tip_amount: tipAmount,
        message: '',
        tip_room_type: getRoomType(),
        tip_v: getTipV()
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