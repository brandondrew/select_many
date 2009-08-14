# selectMany

`selectMany` is a jQuery plugin for creating a more user-friendly multiple select widget than the browser default.  It takes a regular multiple select and turns it into a single select that allows you to select multiple options which are then displayed directly above the select element.  Options can easily be de-selected by clicking them.

## Usage

Simply apply the plugin to any multiple select element.

    <select id="colors" multiple="multiple">
      <option value="1">Red</option>
      <option value="2">Yellow</option>
      <option value="3">Blue</option>
      <option value="4">Green</option>
    </select>

    jQuery('#colors').selectMany()

## Configuration

`selectMany` currently does not take any configuration parameters.

## Styling

`selectMany` injects a ul element directly above the select element it is applied to that contains the selected options.  This ul element is given a class name of `select-many-selected`.  A basic stylesheet is included with the plugin.

## Serializing an empty select

Our usage of this plugin requires it to submit an empty value when no values are selected.  The default behavior of a multiple select form element is to not include it's name at all in the serialized form paramters.  To work around this, the plugin inserts an emtpy `option` element into the select if it doesn't already exist and ensures that it is selected if no other options are.

## License

Copyright (c) 2009 [Centro](www.centro.net), released under the MIT license.

Authored by:

[Corey Burrows](mailto:corey.burrows@gmail.com)

