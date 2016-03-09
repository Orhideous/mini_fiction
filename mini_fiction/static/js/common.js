'use strict';

core.define('common', {
    load: function(content) {
        this.markitupFor(content);
        this.buttonsFor(content);
        this.bootstrapFor(content);
    },

    loadModal: function(modalElement) {
        this.markitupFor(modalElement);
        this.buttonsFor(modalElement);
        this.bootstrapFor(modalElement);
    },

    unload: function(content) {
        this.markitupDestroy(content);
    },

    unloadModal: function(modalElement) {
        this.markitupDestroy(modalElement);
    },

    markitupFor: function(elem) {
        $('.with-markitup', elem).markItUp(mySettings);
    },

    markitupDestroy: function(elem) {
        $('.with-markitup', elem).markItUpRemove();
    },

    bootstrapFor: function(elem) {
        $('.bootstrap', elem).each(this.bootstrap);
    },

    buttonsFor: function(elem) {
        // Виджет выбора персонажей
        $('.characters-select:checked + img', elem).addClass('ui-selected');
        $(".character-item", elem).click(function() {
            var input = $('input', this);
            var checked = input.prop('checked');
            input.prop('checked', !checked);
            $('img', this).toggleClass('ui-selected', !checked);
        });
    },

    bootstrap: function() {
        var group = $(this);
        var buttons_container = $('.buttons-visible', group);
        var data_container = $('.buttons-data', group);
        var type = group.hasClass('checkbox') ? 'checkbox' : 'radio';

        // Обработка проставленных заранее чекбоксов и радиоселектов
        $('input', data_container).each(function() {
            var input = $(this);
            var value = input.attr('value');
            if (input.prop('checked')) {
                $('button[value=' + value + ']', buttons_container).addClass('active');
            }
        });
        // Onclick-обработчик
        $('button', buttons_container).each(function() {
            var button = $(this);
            button.on('click', function() {
                var value = button.attr('value');
                if (type == 'checkbox') {
                    var input = $('input:checkbox[value=' + value + ']', data_container);
                    input.prop('checked', !($('input:checked[value=' + value + ']', data_container).length | 0));
                } else if (type == 'radio') {
                    if (!(!!($('input:radio[value=' + value + ']', data_container).prop('checked')))) {
                        $('input:radio', data_container).prop('checked', false);
                        $('input:radio[value=' + value + ']', data_container).prop('checked', true);
                    }
                }
            });
        });
    }
});
