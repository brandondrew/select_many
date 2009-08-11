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

    $select.click(_handleOptionClick);
    $selectedItems.click(_handleItemClick);
  }

  function _handleOptionClick(e) {
    var element = $(e.target);

    if (!element.is('option') || element.attr('disabled')) return;

    element.attr('disabled', true);

    var input = $('<input type="hidden" />').attr('name', $selectName).val(element.val());
    var li = $('<li>' + element.text() + '</li>').append(input);
    $selectedItems.append(li);
  }

  function _handleItemClick(e) {
    var element = $(e.target);
    var val = element.find('input').val();

    element.remove();

    $select.find('option[value=' + val + ']').attr('disabled', false);
  }
})(jQuery);
