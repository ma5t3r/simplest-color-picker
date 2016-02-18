/**
 * simplest.color.picker
 * Le plus simple de tous les plugins de sélection de couleurs
 *
 * Copyright (c) 2016 qortex.fr
 * gerald.andrez { at } gmail.com
 *
 * La copie, modification, distribution commerciale ou gratuite de ce logiciel
 * est accordée gratuitement à toute personne en obtenant une copie sous réserve
 * des conditions suivantes :
 * Le copyright ci-dessus ainsi que le présent avis d'autorisation doivent apparaitre
 * tel quel dans toutes copies complètes ou substancielles du présent logiciel.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
(function($) {
    $.fn.simplestColorPicker = function(options) {
        var base = this;
        var pre_id = Date.now();
        base.options = $.extend({}, $.fn.simplestColorPicker.options, options);
        base.addClass(base.options.className);
        var type = base.options.showInput == true ? "text" : "hidden";
        var string = '<input class="' + base.options.inputClass + '" type="' + type + '" name="' + base.options.inputName + '" id="' + base.options.inputName + '" value="'+ base.options.active +'" />';
        var interval;
        //console.log(string);
        //console.log(base.options.showInput+"");
        base.append(string);

        var ulObj = $('<ul>').appendTo(base);

        base.each(function() {
            for (var i = 0; i < base.options.colors.length; ++i) {
                couleur =  base.options.colors[i];
                active = base.options.active == couleur ? 'active' : '';
                liObj = document.createElement("li");
                liObj.className = active;
                liObj.id = "myli"+pre_id+i;
                liObj.style.backgroundColor = couleur;
                $(liObj).bind('click', {tst: "#myli"+pre_id+i}, function(e){
                    _inactive();
                    _active(this);
                    event.type = 'changed';
                    $(liObj).trigger(couleur, event);
                });
                ulObj.append(liObj);
            }
        });

        function changed (color, e) {
            return color;
        }


        function _inactive() {
            for (var i = 0; i < base.options.colors.length; ++i) {
                $('#myli'+pre_id+i).removeClass('active');
                clearInterval(interval);
                $('#myli'+pre_id+i).css('visibility', 'visible');
            }
        }

        function _active(ctrl) {
            $(ctrl).addClass('active');
            //console.log(ctrl.style.backgroundColor);
            //$('#'+base.options.resultCtrl).text(_rgb2hex(ctrl.style.backgroundColor));
            $('#'+base.options.inputName).val(_rgb2hex(ctrl.style.backgroundColor));
            var cpt = 0;
            if(base.options.animation) {
                interval = setInterval(function () {
                    cpt +=1;
                    if(cpt === 5){
                        //console.log('in the pocket');
                        $(ctrl).css('visibility', 'visible');
                        clearInterval(interval);
                        return;
                    }
                    if ($(ctrl).css('visibility') == 'hidden') {
                        $(ctrl).css('visibility', 'visible');
                    } else {
                        $(ctrl).css('visibility', 'hidden');
                    }
                }, base.options.animationTime);
            }
        }


        function _rgb2hex(rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            return "#" + _hex(rgb[1]) + _hex(rgb[2]) + _hex(rgb[3]);
        }

        var hexaDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
        function _hex(x) {
            return isNaN(x) ? "00" : hexaDigits[(x - x % 16) / 16] + hexaDigits[x % 16];
        }

    };

    $.fn.simplestColorPicker.options = {
        colors: [
            '#0064b5',
            '#00a3c7',
            '#0fad00',
            '#8cc700',
            '#ffff00',
            '#ff9400',
            '#fec500',
            '#ff6600',
            '#ff0000',
            '#c5007c',
            '#6300a5',
            '#0010a5'
        ],
        className       : 'simple-colors',         //class of the container
        activeColor     : '#0064b5',                //Active color when start plugin
        showInput       : true,                     //show or hide input (text/hidden)
        inputName       : 'result',                 //where plugin writes the seleted color value (must be an INPUT)
        inputClass      : 'form-control input-sm',  //bootstrap class by default
        animation       : true,                     //flash when selected
        animationTime   : 100                       //laps time animation
    };
    return this;

})(jQuery);

