/*jslint */

/**
 * jquery.cookies.js
 *
 * Copyright (c) 2005 - 2011, James Auldridge
 * All rights reserved.
 *
 * Licensed under the BSD, MIT, and GPL (your choice!) Licenses:
 *    @link http://code.google.com/p/cookies/wiki/License
 *
 */
(function (global) {
    'use strict';

        /* localize vendor support */
    var $ = global.jQuery,
        jaaulde = global.jaaulde,
        cookies = jaaulde.utils.cookies,
        /* declarations */
        NameTokenIterator;

    /* alias cookies lib under jQ to meet general audience expectations */
    $.cookies = cookies;

    NameTokenIterator = function () {
        var name_token_attrs = [
            'name',
            'id'
        ];

        this.current = null;

        this.next = function () {
            this.current = name_token_attrs.shift();

            return !!this.current;
        };
    };

    $.extend($.fn, {
        /**
         * $('selector').cookify - set the value of an input field, or the innerHTML of an element, to a cookie by the name or id of the field or element
         *                           (field or element MUST have name or id attribute)
         *
         * @access public
         * @param options OBJECT - list of cookie options to specify
         * @return jQuery
         */
        cookify: function (options) {
            var inputs = this.filter(':input');

            /*
             * Iterate radio inputs
             */
            inputs.filter(':radio').each(function () {});

            /*
             * Iterate checkbox inputs
             */
            inputs.filter(':checkbox').each(function () {});

            /*
             * Iterate all other inputs
             */
            inputs.not(':radio, :checkbox').each(function () {
                var $this,
                    nti,
                    name_token,
                    value;

                $this = $(this);

                nti = new NameTokenIterator();

                while (nti.next()) {
                    name_token = $this.attr(nti.current);

                    if (typeof name_token === 'string' && name_token !== '') {
                        value = $this.val();

                        cookies.set(
                            name_token,
                            (typeof value === 'string' && value !== '') ? value : null,
                            options
                        );

                        break;
                    }
                }
            });

            /*
             * Iterate non-input elements
             */
            this.not(':input').each(function () {
                var $this,
                    nti,
                    name_token,
                    value;

                $this = $(this);

                nti = new NameTokenIterator();

                while (nti.next()) {
                    name_token = $this.attr(nti.current);

                    if (typeof name_token === 'string' && name_token !== '') {
                        value = $this.html();

                        cookies.set(
                            name_token,
                            (typeof value === 'string' && value !== '') ? value : null,
                            options
                        );

                        break;
                    }
                }
            });

            return this;
        },
        /**
         * $('selector').cookieFill - set the value of an input field or the innerHTML of an element from a cookie by the name or id of the field or element
         *
         * @access public
         * @return jQuery
         */
        cookieFill: function () {
            var inputs = this.filter(':input');

            /*
             * Iterate radio inputs
             */
            inputs.filter(':radio').each(function () {});

            /*
             * Iterate checkbox inputs
             */
            inputs.filter(':checkbox').each(function () {});

            /*
             * Iterate all other inputs
             */
            inputs.not(':radio, :checkbox').each(function () {
                var $this,
                    nti,
                    name_token,
                    value;

                $this = $(this);

                nti = new NameTokenIterator();

                while (nti.next()) {
                    name_token = $this.attr(nti.current);

                    if (typeof name_token === 'string' && name_token !== '') {
                        value = cookies.get(name_token);

                        if (value !== null) {
                            $this.val(value);
                        }

                        break;
                    }
                }
            });

            /*
             * Iterate non input elements
             */
            this.not(':input').each(function () {
                var $this,
                    nti,
                    name_token,
                    value;

                $this = $(this);

                nti = new NameTokenIterator();

                while (nti.next()) {
                    name_token = $this.attr(nti.current);

                    if (typeof name_token === 'string' && name_token !== '') {
                        value = cookies.get(name_token);

                        if (value !== null) {
                            $this.html(value);
                        }

                        break;
                    }
                }
            });

            return this;
        },
        /**
         * $('selector').cookieBind - call cookie fill on matching elements, and bind their change events to cookify()
         *
         * @access public
         * @param options OBJECT - list of cookie options to specify
         * @return jQuery
         */
        cookieBind: function (options) {
            return this.each(function () {
                var $this = $(this);

                $this.cookieFill().on('change', function () {
                    $this.cookify(options);
                });
            });
        }
    });
}(this));