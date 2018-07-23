const onRender = (function () {
    // Meta
    const remote = require('electron').remote
    let w = remote.getCurrentWindow()


    // Discord Meta
    const Discord = require('discord.js');
    const client = new Discord.Client();


    // General Channel ID, dev
    let channelID = config.discord.channelID



    // Discord Start
    client.on('ready', () => {
        console.log(`johnBot is connected to discord.`);
        client.channels.get(channelID).send(config.discord.loginMessage);
    });


    // Bot commands
    client.on('message', msg => {
        if (msg.author.bot) return;
        // Check message for specific phrasing
        if (msg.content === 'ping') {
            msg.reply('pong');
        }

        if (msg.content.startsWith('!')) {
            let request = require('request');
            let zip = msg.content.substr(1)
            let apiKey = config.weather.weatherAPI;
            let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`

            request(url, function (err, response, body) {

                let result = JSON.parse(body)
                if (result.main === undefined) {

                    if (weatherError) {
                        client.channels.get(channelID).send(`The ! prefix is reserved for the weather command, and is to be followed by a US or CA postal code. (!12345). If you believe you are seeing this message in error, please consult the weatherAPI in config.js, with releation to https://openweathermap.org/api`)

                    } else {
                        weatherError = true;
                        client.channels.get(channelID).send(`The ! prefix is reserved for the weather command, and is to be followed by a US or CA postal code. (!12345).`)

                    }

                }
                let temp = temperatureConverter(result.main.temp).toFixed(1)
                weatherError = false;

                client.channels.get(channelID).send(`The weather in ${result.name} is ${result.weather[0].description}, with a tempature of ${temp}f.`)

            }

            );
        }

        // Check for pgrase
        let testString = msg.toString()
        let testCheck = testString.indexOf('bigfoot')
        if (testCheck !== -1) {
            msg.reply('*cums for bigfoot*')
        }
    });

    // Login to Discord Server
    client.login(config.discord.discordToken)


    // Kelvin to Fahrenheit converter
    function temperatureConverter(valNum) {
        valNum = parseFloat(valNum);
        return ((valNum - 273.15) * 1.8) + 32;
    }


    // Event listeners
    document.getElementById("away").addEventListener("click", awayButton);
    document.getElementById("weather").addEventListener("click", weatherButton);
    document.getElementById("dice").addEventListener("click", diceButton);
    document.getElementById("quit").addEventListener("click", quitButton);


    // Import Sensor Data
    let isJohnThere = false;

    // Boolean Data
    let awaySwitch = false;
    let weatherError = false;


    // Functions
    function quitButton() {
        client.channels.get(channelID).send(config.discord.logoutMessage);
        w.close()
    }

    function diceButton() {

        let dice = {
            sides: config.dice.sides,
            roll: function () {
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        }


        client.channels.get(channelID).send('Rolling dice...');
        client.channels.get(channelID).send(`${dice.roll()}`)
            .then(function () {
                console.log('Command sent. johnBot is happy.')
            })
            .catch(function (err) {
                console.log('Command failed. Error: ' + err)
            })


    }

    function weatherButton() {
        console.log('Sending "get weather" command to johnBot...')



        let request = require('request');

        let apiKey = config.weather.weatherAPI;
        let zip = config.weather.zip;
        let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`

        request(url, function (err, response, body) {
            if (err) {
                console.log('Command failed. Error: ', error);
            } else {
                let result = JSON.parse(body)
                let temp = temperatureConverter(result.main.temp).toFixed(1)

                client.channels.get(channelID).send(`The weather in ${result.name} is ${result.weather[0].description}, with a tempature of ${temp}f.`)
            }
        });


    }


    function awayButton() {

        // Dev Tool. Uncomment ln120 to use this command to find channel ID's
        // console.log(client.channels)




        if (awaySwitch) {

            awaySwitch = false;
            document.getElementById("switch").style.backgroundColor = "white";
            client.channels.get(channelID).send('JohnDar has been deactivated.');
            client.user.setActivity(null)
        } else {

            awaySwitch = true;
            document.getElementById("switch").style.backgroundColor = "green";
            client.channels.get(channelID).send('JohnDar is active.');
            // client.channels.get(channelID).send('John is at his desk');
            client.user.setActivity('At Desk')
        }

    }

    // Webcam Functions

    function awayMessage() {
        if (awaySwitch) {
            document.getElementById("switch").style.backgroundColor = "red";
            client.user.setActivity('Away from Desk')

        }

    }

    function returnMessage() {
        if (awaySwitch) {
            document.getElementById("switch").style.backgroundColor = "green";
            client.user.setActivity('At Desk')
        }

    }


    return {
        awaySwitch,
        awayMessage,
        returnMessage,
    }



})();