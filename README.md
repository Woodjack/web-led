# web-led
Uses node.js and a particle.io photon board to blink a led over the internet

To use:

* Flash a photon with `led.ino`
* Replace the variables in `config.js` with your device id and access token
* Run `node server.js` from within the `node` directory
* Go to `localhost:8080/toggleLight`, `localhost:8080/LightOn` or `localhost:8080/LightOff` in a web browser (or curl/wget/etc).
