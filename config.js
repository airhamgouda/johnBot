const config = (function () {
    // Discord Settings
    const discord = {
        discordToken: 'NDY5Njc2NzYxMzEyMDAyMDUx.DjLMug.YpIgxQyCbXMYOODHEdArEuHQM0g',
        channelID: '344311876341071873',
        loginMessage: 'johnBot activated',
        logoutMessage: 'johnBot away!',
    }

    // JohnDar Settings 
    const johnDar = {
        // Sensitivity value. Please enter a value between 0 and 1, with 0.2 being the default value.
        // Adjust contrast for motion detection.
        sensitivity: 0.2,
        // Scale value. Please enter a value between 1 and 10, with 5 being the default value.
        // Adjusts timers for presence value change.
        scale: 7,
        // Threshold value. Please enter a value between 0 and 255, with 25 being the default value.
        // Adjusts minimum average value that regeisters as movement.
        threshold: 25,
        // Debug mode
        debug: false,
        // Adjust the resolution of webcam tracking monitor. The lower it is, the better performance, the higher it is, the better the accuracy.
        // Default values are {x: 130, h: 100}] for high accuracy, and [{x: 60, h: 50}] for high performance
        sourceDimensions: { w: 60, h: 50 },
    }

    // Weather Settings
    const weather = {
        zip: 80537,
        weatherAPI: 'caaaed144b9beb21337949e44402a0d5',
    }


    // Dice settings
    const dice = {
        sides: 6,
    }

    return {
        discord,
        weather,
        dice,
        johnDar
    }

})();