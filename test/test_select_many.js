jQuery(function() {
  module("selectMany", {
    setup: function() {
      jQuery('select.select-many').selectMany();
      this.harleys = jQuery('#harleys');
      this.selectedList = this.harleys.prev('ul.select-many-selected');
    }
  });

  test("should create a ul before the select element with the class select-many-selected", function() {
    ok(this.selectedList.get(0));
  });

  test("selecting an option should create a corresponding list item", function() {
    this.harleys.find('option[value=3]').click();
    equals(this.selectedList.find('li').size(), 1);
    equals(this.selectedList.find('li').text(), 'Softail Deluxe');
  });

  test("selecting an option should set it to disabled", function() {
    var item = this.harleys.find('option[value=1]');
    item.click();
    equals(item.attr('disabled'), true);
  });
});
