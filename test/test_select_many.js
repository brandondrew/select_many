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
      this.hondas = jQuery('#hondas');
      this.triumphs = jQuery('#triumphs');
      this.harleysSelected = this.harleys.prev('ul.select-many-selected');
      this.hondasSelected = this.hondas.prev('ul.select-many-selected');
      this.triumphsSelected = this.triumphs.prev('ul.select-many-selected');
    }
  });

  test("should create a ul before the select element with the class select-many-selected", function() {
    ok(this.harleysSelected.get(0));
  });

  test("selecting an option should create a corresponding list item", function() {
    changeSelect(this.harleys, '3');
    equals(this.harleysSelected.find('li').size(), 1);
    equals(this.harleysSelected.find('li').text(), 'Softail Deluxe');
  });

  test("selecting an option should set it to disabled", function() {
    var item = this.harleys.find('option[value=1]');
    changeSelect(this.harleys, '1');
    equals(item.attr('disabled'), true);
  });

  test("clicking the select element does not add items to the selected list", function() {
    equals(this.harleysSelected.find('li').size(), 0);
    this.harleys.click();
    equals(this.harleysSelected.find('li').size(), 0);
  });

  test("clicking a disabled option does nothing", function() {
    var item = this.harleys.find('option[value=1]');
    changeSelect(this.harleys, '1');
    equals(this.harleysSelected.find('li').size(), 1);
    item.click();
    equals(this.harleysSelected.find('li').size(), 1);
  });

  test("selecting an option creates a hidden input field inside its selected list item", function() {
    changeSelect(this.harleys, '3');
    var li = this.harleysSelected.find('li');
    var input = li.find('input[type=hidden]');

    ok(input.get(0));
  });
 
  test("a selected option's hidden input field should have its value set to the options value", function() {
    changeSelect(this.harleys, '4');
    var input = this.harleysSelected.find('li input[type=hidden]');

    equals(input.attr('value'), '4');
  });
 
  test("a selected option's hidden input field should have its name set to the parent select's name", function() {
    changeSelect(this.harleys, '4');
    var input = this.harleysSelected.find('li input[type=hidden]');

    equals(input.attr('name'), 'harleys[]');
  });

  test("the select element should have it's name attribute removed", function() {
    equals(this.harleys.attr('name'), "");
  });

  test("clicking a selected list item removes it from the list", function() {
    changeSelect(this.harleys, '4');
    var li = this.harleysSelected.find('li');

    equals(this.harleysSelected.find('li').size(), 1);
    li.click();
    equals(this.harleysSelected.find('li').size(), 0);
  });

  test("clicking a selected list item enables its option in the select", function() {
    var option = this.harleys.find('option[value=4]');
    changeSelect(this.harleys, '4');
    equals(option.attr('disabled'), true);
    this.harleysSelected.find('li').click();
    equals(option.attr('disabled'), false);
  });

  test("preselected options should be automatically added to selected list", function() {
    equals(this.hondasSelected.find('li').size(), 1);
    equals(this.hondasSelected.find('li').text(), 'Hornet');
  });

  test("multiple attribute is removed from select", function() {
    equals(this.triumphs.attr('multiple'), false);
  });

  test("select with multiple attribute allows for multiple preselected values", function() {
    equals(this.triumphsSelected.find('li').size(), 3);
    equals(this.triumphsSelected.find('li').eq(0).text(), 'Street Triple');
    equals(this.triumphsSelected.find('li').eq(1).text(), 'Scrambler');
    equals(this.triumphsSelected.find('li').eq(2).text(), 'Tiger');
  });

});
