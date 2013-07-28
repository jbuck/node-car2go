# car2go

Car2Go REST API

car2go can be used to access [car2go's API](http://code.google.com/p/car2go/wiki/index_v2_1). If you'd like to use their API and this module you must first [request an oauth key and secret](http://code.google.com/p/car2go/wiki/oauth).

## Quick start

`npm install car2go`

```javascript
var car2go = require("car2go").createClient({
  key: MY_OAUTH_KEY,
  secret: MY_OAUTH_SECRET
});

// get a list of available cars in Toronto
car2go.vehicles({
  loc: "Toronto"
}, function(err, cars) {
  if (err) {
    return console.log(err);
  }

  console.log(cars);
});
```

## API

### Locations

List of all the cities that car2go operates in.

#### Usage

```javascript
car2go.locations(function(err, locations) {
  console.log(locations);
});

// Output

[
  {
    "countryCode": "CA",
    "defaultLanguage": "en",
    "locationId": 13,
    "locationName": "Toronto",
    "mapSection": {
      "center": {
        "latitude": 43.65396,
        "longitude": -79.38635
      },
      "lowerRight": {
        "latitude": 43.6263638049989,
        "longitude": -79.2129903230651
      },
      "upperLeft": {
        "latitude": 43.67671718155003,
        "longitude": -79.55942239476869
      }
    },
    "timezone": "Canada/Eastern"
  },
  ... more cities
]
```
