(function($) {
  var $select;
  var $selectName;
  var $selectedItems;

  $.fn.selectMany = function() {
    return $.each(this, function() { _init(this) });
  };

  function _init(select) {
    $select     = $(select);
    $selectName = $select.attr('name');

    $select.attr('name', null);
    $select.before('<ul class="select-many-selected"></ul>');

    $selectedItems = $select.prev();

    $select.change(_handleChange);
    $selectedItems.click(_handleItemClick);
  }

  function _handleChange(e) {
    var option = $select.find('option:selected');

    option.attr('disabled', true);

    var input = $('<input type="hidden" />').attr('name', $selectName).val(option.val());
    var li = $('<li>' + option.text() + '</li>').append(input);
    $selectedItems.append(li);
  }

  function _handleItemClick(e) {
    var element = $(e.target);
    var val = element.find('input').val();

    element.remove();

    $select.find('option[value=' + val + ']').attr('disabled', false);
  }
})(jQuery);
