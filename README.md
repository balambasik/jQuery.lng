# jQuery.lng
Easy jQuery localization plugin


**{lng: String}**

```html
<div>

<span> {lng: Hello} </span>
<button> {lng: How are you} </button>
<a htrf="#"> {lng: Today is beautiful weather} </a>

<p>
Lorem ipsum dolor sit amet,    {lng: Today is beautiful weather}    consectetur 
adipiscing elit,   {lng: How are your}    Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</p>

</div>
```


**use object translations**
```js
var display_lang = "it";

var translations = [{
    "en": "Hello",
    "it": "Ciao"
}, {
    "en": "How are you",
    "it": "Come stai"
}, {
    "en": "Today is beautiful weather",
    "it": "Oggi è bel tempo"
}];

$.lng(display_lang, translations);
```

**use json file translations**
```js
 $.lng("it", "/translate.json");
```

**translate.json**

```json
[{
    "en": "Hello",
    "it": "Ciao"
}, {
    "en": "How are you",
    "it": "Come stai"
}, {
    "en": "Today is beautiful weather",
    "it": "Oggi è bel tempo"
}]
```

**change lang**
```js
 $.lng.change("fr");
```

**vars**
```js

var translate = $.lng.e("Today is beautiful weather");
// translate = Oggi è bel tempo 

```



