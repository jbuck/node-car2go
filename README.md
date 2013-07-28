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

// get a list of available cars in Toronto in JSON format
car2go.vehicles({
  format: "json",
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

### Vehicles

List available vehicles in a city

#### Options

* `loc` *Required* - The city to list vehicles in.
* `format` - The output format. Must be `kml` or `json`, defaults to `kml`.

#### Usage

```javascript
car2go.vehicles({
  format: "json",
  loc: "Toronto"
}, function(err, vehicles) {
  console.log(vehicles);
});

// Output

{
  address: 'Green P-141 Greenlaw Ave(S of St Clair  Ave W)',
  coordinates: [ -79.44774, 43.6762, 0 ],
  engineType: 'CE',
  exterior: 'GOOD',
  fuel: 100,
  interior: 'GOOD',
  name: 'BPXL726',
  vin: 'WMEEJ3BA8DK643640'
},
... more cars
```
