/**
 * AutoCity 0.0.1
 * An autocomplete input field to search city based on Google Map Places
 *
 * @author   Tu Truong (<https://github.com/lufutu>)
 * @version  0.0.1
 * @license  MIT
 * @see      <https://github.com/lufutu/AutoCity>
 */

"use strict";
if (!(typeof window.google === 'object' && window.google.maps)) {
    throw 'Google Maps API is required. Please register the following JavaScript library https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places.';
}

var extend_object = function (obj, new_obj) {
    var name;

    if (obj === new_obj) {
        return obj;
    }

    for (name in new_obj) {
        obj[name] = new_obj[name];
    }

    return obj;
};

var insert_after = function (newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var getElementsByClassName = function (class_name) {

    var element,
        _class = class_name.replace('.', '');

    element = document.getElementsByClassName(_class)[0];

    return element;

};

var getElementById = function (id) {
    var element,
        id = id.replace('#', '');

    element = document.getElementById(id);
    return element;
};

var getElementByIdentifier = function (identifier) {
    if (identifier.indexOf("#") > -1) {
        return getElementById(identifier);
    } else {
        return getElementsByClassName(identifier);
    }
}

var AutoCity = function (opts, callback) {
    // Get options value
    var options, field, autocomplete;
    options = {
        element: '.autocity',
        element_custom_class: 'form-control',
        place_holder: null,
        data: "string",
        country: 'all'
    }
    options = extend_object(options, opts);

    // Get element change to hidden field and insert search box after that

    if (getElementByIdentifier(options.element) === 'undefined' || getElementByIdentifier(options.element) === null) {
        throw ('Must set \'autocity\' class for at least one field or set your own field class');
    } else {
        field = getElementByIdentifier(options.element);
    }

    field.type = "hidden";
    var input = document.createElement("input");
    input.type = "text";
    input.className = options.element_custom_class;
    if (options.place_holder != null) {
        if (options.place_holder.trim() != "") {
            input.placeholder = options.place_holder;
        }
    }
    insert_after(input, field);

    //Set up autocomplete input field
    if (options.country == 'all') {
        autocomplete = new google.maps.places.Autocomplete(
            (input), {
                types: ['(cities)']
            });
    } else {
        autocomplete = new google.maps.places.Autocomplete(
            (input), {
                types: ['(cities)'],
                componentRestrictions: {
                    'country': options.country
                }
            });
    }

    //Insert Data and callback function
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        if (options.data == "object") {
            field.value = JSON.stringify(place);
        } else {
            field.value = place.name;
        }
        if (typeof callback == "function") {
            callback.call(this, place);
        }
    });

};