(function($) {
  var $select;
  var $selectedItems;

  $.fn.selectMany = function() {
    return $.each(this, function() { _init(this) });
  };

  function _init(select) {
    $select = $(select);
    $select.before('<ul class="select-many-selected"></ul>');

    $selectedItems = $select.prev();

    $select.click(_handleClick);
  }

  function _handleClick(e) {
    var item = $(e.target);

    item.attr('disabled', true);
    $selectedItems.append('<li>' + item.text() + '</li>');
  }
})(jQuery);
