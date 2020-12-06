# GO-UAT

## Setup

Install modules in `my-app`
```
cd ./my-app
npm i
```

Run the app with `npm`
```
npm start
```

### Confessions
I could not find the search suggestions API so I didn't do that, sorry. For what it's worth, I would have most likely use [Material-UI Menus](https://material-ui.com/components/menus/)

Also what getting the filtered search working there is a nasty warning, its from the use of the filter selector but it still works. If this was Prod I would look into finding a fix.

I would have liked to use the images for a background or profile image for people.

### Things I would do differently
Have a presetup with all the test, linting, building etc setup, as getting that all to work with Create-React-App can be a bit of a pain and I miss my linter.

Do more tests, There are only 2 as the 2nd AC needed me to check the focus of an input and I was under the impression Jest does not do that.
