(function($) {
  function _init(select) {
    var $select = $(select);
    var $selectName = $select.attr('name');

    $select.attr('name', null);
    $select.before('<ul class="select-many-selected"></ul>');

    var $selectedItems = $select.prev();

    $select.change(handleChange);
    $selectedItems.click(handleItemClick);

    handleChange();

    $select.attr('multiple', null);

    function handleChange() {
      $select.find('option:selected').each(function() {
        var option = $(this);
        if (option.val() != '') {
          selectOption(option);
        }
      });
    }

    function handleItemClick(e) {
      var element = $(e.target);
      var val = element.find('input').val();

      element.remove();

      $select.find('option[value=' + val + ']').attr('disabled', false);
    }

    function selectOption(option) {
      var input = $('<input type="hidden" />').attr('name', $selectName).val(option.val());
      var li = $('<li>' + option.text() + '</li>').append(input);
      $selectedItems.append(li);
      option.attr('disabled', true);
      option.attr('selected', false);
    }
  }

  $.fn.selectMany = function() {
    return $.each(this, function() { _init(this) });
  };
})(jQuery);
