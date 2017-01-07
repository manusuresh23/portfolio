(function () {
    var MagicLine, bind = function (fn, me) {
        return function () {
            return fn.apply(me, arguments);
        };
    };
    MagicLine = [function () {
        function magicLine(menu) {
            this.menu = menu;
            this.update = bind(this.update, this);
            if (!this.menu.length) {
                return;
            }
            $('<li>', { 'class': 'magic-line' }).appendTo(this.menu.addClass('has-magic-line'));
            this.update();
            $(window).resize(this.update);
        }
        magicLine.prototype.update = function () {
            var el, leftPos, ratio;
            el = this.menu.find('.active');
            if (el.length) {
                leftPos = el.position().left;
                ratio = el.width();
            } else {
                leftPos = ratio = 0;
            }
            return this.menu.find('.magic-line').css({ transform: 'translateX( ' + leftPos + 'px ) scaleX( ' + ratio + ' )' });
        };
        return magicLine;
    }()];
    window.magicLine = new MagicLine($('.menu'));
    $('.menu-item').on('click', function (e) {
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        return window.magicLine.update();
    });
}.call(this));