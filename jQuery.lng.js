(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {

    var DEFAULT = [];
    var CUR_LANG = "";
    var TRANSL_ARR = [];

    $.lng = function(lang, langs_arr) {

        // set config
        if (typeof lang === "string" && typeof langs_arr === "object") {
            CUR_LANG = lang;
            TRANSL_ARR = $.merge(langs_arr, TRANSL_ARR);
        }

        // set config json file
        if (typeof lang === "string" && typeof langs_arr === "string") {

            $.getJSON(langs_arr, function(resp) {
                CUR_LANG = lang;
                TRANSL_ARR = $.merge(TRANSL_ARR, resp);
                translateHtml();
            });
        }

        //------------------------------------------------------------------------

        function translate(string) {

            var lang_slot = "";

            $.each(TRANSL_ARR, function(i, item) {

                $.each(item, function(u, lang_item) {

                    if (string == lang_item) {
                        lang_slot = item;
                        return false;
                    }

                });
            });

            if (typeof lang_slot[CUR_LANG] !== "undefined") {
                return lang_slot[CUR_LANG];
            }

            return string;
        }

        //------------------------------------------------------------------------

        function translateHtml() {

            $("body").find('*').each(function() {

                if (/{lng:.*?}/.test($(this).html())) {

                    DEFAULT.push({
                        el: $(this),
                        text: $(this).text()
                    });

                    var replace_text = $(this).html().replace(/{lng:.*?}/gi, function(str) {

                        var clean_str = str.trim().replace("{lng:", "").replace("}", "").trim();

                        return translate(clean_str);
                    });

                    $(this).html(replace_text);
                }

            });

            console.log(DEFAULT);

        }

        //------------------------------------------------------------------------

        function rollback() {
            $.each(DEFAULT, function(i, item) {
                item.el.text(item.text);
            });
        }

        //------------------------------------------------------------------------

        $(document).ready(function() {
            translateHtml();
        });

        //------------------------------------------------------------------------

        $.lng.e = function(string) {
            return translate(string);
        };

        $.lng.update = function() {
            translateHtml();
        };

        $.lng.export = function() {
            return JSON.stringify(TRANSL_ARR);
        };

        $.lng.change = function(lang) {
            CUR_LANG = lang;
            rollback();
            translateHtml();
        };
        
        $.lng.rollback = function() {
            rollback();
        };

    };

}));
