var ui = {
    isFiringStarted: false,

    $origTipBtn: {},
    $tipBtn: {},
    $tooltip: {},

    $fireBtn: {},
    $tokens: {},
    $speed: {},

    init: function() {
        this.$origTipBtn = $('div.green_button_tip');

        this._injectTipCannonBtn();
        this._injectTooltip();
    },

    isFiring: function() {
        return this.$fireBtn.is('.on');
    },

    getTokenAmount: function() {
        var $active = this.$tokens.find('.active');
        if ($active.is('button')) {
            return parseInt($active.html());
        }
        else {
            var usrVal = parseInt($active.val());
            return usrVal ? usrVal : 1;
        }
    },

    getSpeed: function() {
        return parseInt(this.$speed.val());
    },

    _createTipCannonBtn: function() {
        var $container = $('<div>', {
            id: 'tipcannon-btn-container'
        });

        var $button = $('<a>', {
            id: 'tipcannon-btn',
        }).html('Tip Cannon');

        $container.append($button);
        return $container;
    },
    _injectTipCannonBtn: function() {
        var $tipBtnContainer = this._createTipCannonBtn();
        $tipBtnContainer.insertAfter(this.$origTipBtn);

        this.$tipBtn = $tipBtnContainer.find('a');
    },

    _createTooltip: function() {
        var $tooltip = $('<div>', {
            id: 'tipcannon-tooltip'
        });

        var self = this;
        setInterval(function() {
            var btnPos = self.$tipBtn.offset();
            $tooltip.css({
                position: 'absolute',
                top: btnPos.top + self.$tipBtn.height() + 'px',
                left: btnPos.left + 'px'
            });
        }, 750);

        $tooltip.append(this._createTipForm());
        return $tooltip;
    },
    _createTipForm: function() {
        var $form = $('<form>');

        var $tokenLabel = $('<label>');
        $tokenLabel.html(
            '<i class="icon-money"></i>Tokens/fire'
        );
        var tokens = {
            '1': 1,
            '15': 15,
            '100': 100
        };
        this.$tokens = $('<div>');
        for (label in tokens) {
            this.$tokens.append(
                $('<button>', {
                    class:'tipcannon-tokens ' + (label === '1' ? 'active': '')
                }).html(tokens[label])
            );
        }
        this.$tokens.append(
            $('<input>', {class: 'tipcannon-tokens', placeholder: 'Your'})
        );
        this.$tokens.append('<div style="clear: both;"></div>');

        var $speedLabel = $('<label>');
        $speedLabel.html(
            '<i class="icon-gauge"></i> Speed'
        );
        this.$speed = $('<select>', {id: 'tipcannon-speed'});
        var options = {
            'tip / quarter second': 250,
            'tip / half second': 500,
            'tip / second': 1000,
            'tip / 2 seconds': 2000,
            'tip / 5 seconds': 5000,
            'tip / 10 seconds': 10000
        };
        for (var label in options) {
            var speed = parseInt(options[label]);
            var $option = $('<option>', {value: speed}).html(label);
            if (speed === 1000) {
                $option.attr('selected', 'selected');
            }

            this.$speed.append($option);
        }

        this.$fireBtn = $('<a>', {
            id: 'tipcannon-fire'
        })
        .html(
            '<i class="icon-play"></i>Fire!'
        );

        var $donate = $('<span>')
            .addClass('tipcannon-donate')
            .html("<i class=\"icon-twitter\"></i>&nbsp;<a href=\"http://www.twitter.com/tipcannon_club\">TipCannon goes social</a>");

        function formRow($label, $input) {
            return $('<div>', {class: 'form-row'}).append($label).append($input);
        }
        $form
            .append( formRow($tokenLabel, this.$tokens) )
            .append( formRow($speedLabel, this.$speed) )
            .append(this.$fireBtn)
            .append($donate);

        return $form;
    },

    _injectTooltip: function() {
        var self = this;
        this.$tooltip = this._createTooltip();

        $('body').append(this.$tooltip);
        this.$tooltip.fadeOut(0);

        this.$tipBtn.on('click', function() {
            if ($(this).is('.on')) {
                $(this).removeClass('on');
                self.$tooltip.fadeOut();
            }
            else {
                $(this).addClass('on');
                self.$tooltip.fadeIn();
            }
        });

        this.$fireBtn.on('click', function() {
            if ($(this).is('.on')) {
                self.isFiringStarted = false;
                $(this).removeClass('on')
                    .html(
                        '<i class="icon-play"></i>Fire!'
                    );
            }
            else {
                self.isFiringStarted = true;
                $(this).addClass('on')
                    .html(
                        '<i class="icon-stop"></i>Stop'
                    );
            }
        });

        $('.tipcannon-tokens').on('click', function(e) {
            e.preventDefault();
            $('.tipcannon-tokens.active').removeClass('active');
            $(this).addClass('active');
        });
    }
};