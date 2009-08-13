(function($) {
  function _init(select) {
    var multi  = $(select).hide();
    var single = multi.clone().show().
                               removeAttr('multiple').
                               removeAttr('id').
                               removeAttr('name').
                               addClass('select-many');
    var list   = $('<ul class="select-many-selected"></ul>');

    // make sure that first first option in the single is blank
    //if (single.find('options:first').val() != '') {
    //  single.prepend('<option></option>').find('option:first').attr('selected', true);
    //}

    multi.after(single);
    multi.after(list);

    single.change(handleSingleChange);
    list.click(handleItemClick);

    // handle pre-selected options
    multi.find('option:selected').each(function() {
      selectOption($(this));
    });

    function selectOption(option) {
      var item = $('<li></li>').text(option.text());
      var val  = option.val();

      $.data(item[0], 'value', val);

      list.append(item);

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
    }
  }

  $.fn.selectMany = function() {
    return $.each(this, function() { _init(this) });
  };
})(jQuery);
