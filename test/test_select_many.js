jQuery(function() {

  function changeSelect(select, optionValue) {
    var select = jQuery(select);

    select.find('option').each(function(idx) {
      if (this.value == optionValue) {
        select.get(0).selectedIndex = idx;
        select.trigger('change')
        return false;
      }
    });
  }

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
    changeSelect(this.harleys, '3');
    equals(this.selectedList.find('li').size(), 1);
    equals(this.selectedList.find('li').text(), 'Softail Deluxe');
  });

  test("selecting an option should set it to disabled", function() {
    var item = this.harleys.find('option[value=1]');
    changeSelect(this.harleys, '1');
    equals(item.attr('disabled'), true);
  });

  test("clicking the select element does not add items to the selected list", function() {
    equals(this.selectedList.find('li').size(), 0);
    this.harleys.click();
    equals(this.selectedList.find('li').size(), 0);
  });

  test("clicking a disabled option does nothing", function() {
    var item = this.harleys.find('option[value=1]');
    changeSelect(this.harleys, '1');
    equals(this.selectedList.find('li').size(), 1);
    item.click();
    equals(this.selectedList.find('li').size(), 1);
  });

  test("selecting an option creates a hidden input field inside its selected list item", function() {
    changeSelect(this.harleys, '3');
    var li = this.selectedList.find('li');
    var input = li.find('input[type=hidden]');

    ok(input.get(0));
  });
 
  test("a selected option's hidden input field should have its value set to the options value", function() {
    changeSelect(this.harleys, '4');
    var input = this.selectedList.find('li input[type=hidden]');

    equals(input.attr('value'), '4');
  });
 
  test("a selected option's hidden input field should have its name set to the parent select's name", function() {
    changeSelect(this.harleys, '4');
    var input = this.selectedList.find('li input[type=hidden]');

    equals(input.attr('name'), 'harleys[]');
  });

  test("the select element should have it's name attribute removed", function() {
    equals(this.harleys.attr('name'), "");
  });

  test("clicking a selected list item removes it from the list", function() {
    changeSelect(this.harleys, '4');
    var li = this.selectedList.find('li');

    equals(this.selectedList.find('li').size(), 1);
    li.click();
    equals(this.selectedList.find('li').size(), 0);
  });

  test("clicking a selected list item enables its option in the select", function() {
    var option = this.harleys.find('option[value=4]');
    changeSelect(this.harleys, '4');
    equals(option.attr('disabled'), true);
    this.selectedList.find('li').click();
    equals(option.attr('disabled'), false);
  });
});
