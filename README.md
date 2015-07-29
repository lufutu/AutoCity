# AutoCity
An autocomplete input field to search city based on Google Map Places.
Don't require JQuery library.
Be free to use!

## Usage

Add GoogleMap Javascript SDK first and include `&libraries=places` before use!
You can also include `language` parameter if you want.

```javascript
AutoCity()
```
## Options

| Property             | Meaning                                                                                                                                            | Default       |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| element              | The HTML element input field will use for revice data. You can use "#" for id and "." for class                                                    | .autocity     |
| element_custom_class | Custom class of input field will display for searching                                                                                             | form-control  |
| place_holder         | Place holder text for input field will display for searching                                                                                       | Empty         |
| data                 | Value insert to input field, have two value `string` or `object`. String is simple name of city, object is an JSON object include all data of city | string        |
| country              | Add country for filter like 'us','fr','vn'..                                                                                                       | All Countries |

## Callback

You can add callback function when google return all data of selected city

```javascript
AutoCity({
            data: 'object'
        }, function (city) {
            alert("You selected city " + city.name);
        });
```
`city` is [Google Map Place Object] (https://developers.google.com/maps/documentation/javascript/places)
