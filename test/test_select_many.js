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

  function _findParam(form, name, value) {
    var data = form.serializeArray();
    var foundParam = null;

    jQuery.each(data, function() {
      if (this.name == name && this.value == value) {
        foundParam = this;
      }
    });

    return foundParam;
  }

  function assertParamsContain(form, name, value) {
    same(_findParam(form, name, value), {name: name, value: value});
  }

  function denyParamsContain(form, name, value) {
    equals(_findParam(form, name, value), null);
  }

  module("selectMany", {
    setup: function() {
      jQuery('select[multiple]').selectMany();
      this.form = jQuery('#motorcycles');
      this.harleyMulti     = jQuery('#harleys')
      this.harleySingle    = jQuery('#harleys').nextAll('select.select-many').eq(0);
      this.harleySelected  = this.harleySingle.prev();
      this.hondaMulti      = jQuery('#hondas')
      this.hondaSingle     = jQuery('#hondas').nextAll('select.select-many').eq(0);
      this.hondaSelected   = jQuery('#hondas').nextAll('ul').eq(0);
      this.triumphMulti    = jQuery('#triumphs')
      this.triumphSingle   = jQuery('#triumphs').nextAll('select.select-many').eq(0);
      this.triumphSelected = jQuery('#triumphs').nextAll('ul').eq(0);
    }
  });

  test("should add select-many class to single select element", function() {
    ok(this.harleySingle.hasClass('select-many'));
  });

  test("should create a ul before the single select element with the class select-many-selected", function() {
    ok(this.harleySelected.get(0));
  });

  test("should create a single select with the same options as the given select", function() {
    var expOpts = this.triumphMulti.find('option');

    ok(this.triumphSingle.get(0));

    this.triumphSingle.find('option').each(function(idx) {
      equals(jQuery(this).val(),        expOpts.eq(idx).val(), 'value');
      equals(jQuery(this).attr('name'), expOpts.eq(idx).attr('name'), 'name');
    });
  });

  test("single select should not have a name or id attributes", function() {
    equals(this.harleySingle.attr('id'), '');
    equals(this.harleySingle.attr('name'), '');
  });

  test("selecting an option should create a corresponding list item", function() {
    changeSelect(this.harleySingle, '3');
    equals(this.harleySelected.find('li').size(), 1);
    equals(this.harleySelected.find('li').text(), 'Softail Deluxe');
  });

  test("selecting an option should set it to disabled", function() {
    var item = this.harleySingle.find('option[value=1]');
    changeSelect(this.harleySingle, '1');
    equals(item.attr('disabled'), true);
  });

  test("clicking the single select element does not add items to the selected list", function() {
    equals(this.harleySelected.find('li').size(), 0);
    this.harleySingle.click();
    equals(this.harleySelected.find('li').size(), 0);
  });

  test("clicking a disabled option does nothing", function() {
    var item = this.harleySingle.find('option[value=1]');
    changeSelect(this.harleySingle, '1');
    equals(this.harleySelected.find('li').size(), 1);
    item.click();
    equals(this.harleySelected.find('li').size(), 1);
  });

  test("selecting an option selects its value in the hidden multi select", function() {
    var multiOption = this.harleyMulti.find('option[value=3]');

    equals(multiOption.attr('selected'), false);
    changeSelect(this.harleySingle, '3');
    equals(multiOption.attr('selected'), true);
  });
 
  test("clicking a selected list item removes it from the list", function() {
    changeSelect(this.harleySingle, '4');
    var li = this.harleySelected.find('li');

    equals(this.harleySelected.find('li').size(), 1);
    li.click();
    equals(this.harleySelected.find('li').size(), 0);
  });

  test("clicking a selected list item enables its option in the select", function() {
    var option = this.harleySingle.find('option[value=4]');
    changeSelect(this.harleySingle, '4');
    equals(option.attr('disabled'), true);
    this.harleySelected.find('li').click();
    equals(option.attr('disabled'), false);
  });

  test("clicking a selected list item deselects its option in the multi select", function() {
    var multiOption = this.harleyMulti.find('option[value=4]');

    changeSelect(this.harleySingle, '4');

    equals(multiOption.attr('selected'), true);
    this.harleySelected.find('li').click();
    equals(multiOption.attr('selected'), false);
  });

  test("preselected options should be automatically added to selected list", function() {
    equals(this.hondaSelected.find('li').size(), 1);
    equals(this.hondaSelected.find('li').text(), 'Hornet');
  });

  test("multiple attribute is removed from select", function() {
    equals(this.triumphSingle.attr('multiple'), false);
  });

  test("select with multiple attribute allows for multiple preselected values", function() {
    equals(this.triumphSelected.find('li').size(), 3);
    equals(this.triumphSelected.find('li').eq(0).text(), 'Street Triple');
    equals(this.triumphSelected.find('li').eq(1).text(), 'Scrambler');
    equals(this.triumphSelected.find('li').eq(2).text(), 'Tiger');
  });

  test("should create an option for a blank value in the multi select if it doesn't already exist", function() {
    equals(this.harleyMulti.find('option:first').val(), '');
  });

  test("should not create an option for a blank value in the multi select if one already exists", function() {
    equals(this.hondaMulti.find('option').eq(0).val(), '');
    ok(this.hondaMulti.find('option').eq(1).val() != '');
  });

  test("blank option should automatically be selected on initialization if no other options are", function() {
    equals(this.harleyMulti.find('option:first').attr('selected'), true);
  });

  test("blank option should not be set on initialization if any other options are", function() {
    equals(this.hondaMulti.find('option:first').attr('selected'), false);
  });

  test("selecting an option should unselect the blank option", function() {
    equals(this.harleyMulti.find('option:first').attr('selected'), true);
    changeSelect(this.harleySingle, '4');
    equals(this.harleyMulti.find('option:first').attr('selected'), false);
  });

  test("deselcting all options should set the blank option to selected", function() {
    equals(this.harleyMulti.find('option:first').attr('selected'), true);
    changeSelect(this.harleySingle, '4');
    equals(this.harleyMulti.find('option:first').attr('selected'), false);
    this.harleySelected.find('li').click();
    equals(this.harleyMulti.find('option:first').attr('selected'), true);
  });

  test("serializing a select with no pre-selected values should yield a blank value", function() {
    assertParamsContain(this.form, 'harleys[]', '');
  });

  test("serializing a select with 1 or more pre-selected values should not yield a blank value", function() {
    denyParamsContain(this.form, 'hondas[]', '');
  });

  test("serializing a select that has had all of its options deselected should yield a blank value", function() {
    denyParamsContain(this.form, 'triumphs[]', '');

    this.triumphSelected.find('li').each(function() {
      jQuery(this).click();
    });

    assertParamsContain(this.form, 'triumphs[]', '');
  });
});
