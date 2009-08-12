# selectMany

`selectMany` is a jQuery plugin for creating a more user-friendly multiple select widget than the browser default.  It looks just like a single select widget, but allows for selecting multiple options which are then displayed directly above the widget as they are selected.  Items can be easily de-selected by clicking them.

## Usage

Simply apply the plugin to any select element.  In order to get multiple pre-selected values to work correctly, the select must have the `multiple` attribute set.

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

## License

Copyright (c) 2009 [Centro](www.centro.net), released under the MIT license.

Authored by:

[Corey Burrows](mailto:corey.burrows@gmail.com)

