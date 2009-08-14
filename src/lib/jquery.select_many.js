(function($) {
  function _init(select) {
    var multi  = $(select).hide();
    var blank, single, list;

    blank = multi.find('option:first');

    // ensure that first option in the select is a blank one
    if (blank.val() != '') {
      blank = $('<option value=""></option>');
      multi.prepend(blank);
    }
    blank.attr('selected', true);

    single = multi.clone().show().
                           removeAttr('multiple').
                           removeAttr('id').
                           removeAttr('name').
                           addClass('select-many');
    list = $('<ul class="select-many-selected"></ul>');
    

    multi.after(single);
    multi.after(list);

    // handle pre-selected options
    multi.find('option:selected').each(function() {
      selectOption($(this));
    });

    single.find('option:first').attr('selected');

    // create observers
    single.change(handleSingleChange);
    list.click(handleItemClick);

    function selectOption(option) {
      if (option.val() == '') return;

      var item = $('<li></li>').text(option.text());
      var val  = option.val();

      $.data(item[0], 'value', val);

      list.append(item);

      blank.attr('selected', false);
      multi.find('option[value=' + val + ']').attr('selected', true);
      single.find('option[value=' + val + ']').attr('disabled', true).attr('selected', false);
    }

    function handleSingleChange(e) {
      var selectedOpt = single.find('option:selected');
      selectOption(selectedOpt);
    }

    function handleItemClick(e) {
      var item = e.target;
      var val  = $.data(item, 'value');

      $(item).remove();

      multi.find('option[value=' + val + ']').attr('selected', false)
      single.find('option[value=' + val + ']').attr('disabled', false)

      if (multi.find('option:selected').size() == 0) {
        blank.attr('selected', true);
      }
    }
  }

  $.fn.selectMany = function(opts) {
    return $.each(this, function() { _init(this) });
  };
})(jQuery);
