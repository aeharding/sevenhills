# Seven Hills Skydivers Website

Available at http://sevenhills.herokuapp.com/.

This repository is deployable to Heroku. However, you must first add redis to your application:
```sh
heroku addons:add redistogo
```

This repository is pretty much plain HTML/CSS/JS. We do use EJS templating on the index page for the jumping notification.

The neat thing about this project is the jumping status alert.

By sending a text message to a specific phone number (you must be a seven hills active member to get this number), you can update the status alert on our website.

Here is an example:

![SMS Message](http://i.imgur.com/FAgHkH3.png)

Which produces the following on the website:

![Chrome browser of website](http://imgur.com/NkDO8l1)
