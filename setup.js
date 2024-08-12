const { attachment, ContentType } = require("allure-js-commons");

console.log("Setting up")

// global.selenoidURL = 'http://192.168.1.11:4444'
global.selenoidURL = 'https://user1:1234@selenoid.autotests.cloud'
global.sessionId = 0

global.it = async function(name, func) {
    return await test(name, async () => {
        try {
            await func();
        } catch (e) {
            await attachVideo();
            throw e;
        }
    });
};

async function attachVideo() {
    const videoUrl = selenoidURL + "/video/" + sessionId + ".mp4"
    const html = "<html><body><video width='100%' height='100%' controls autoplay><source src='" +
           videoUrl + "' type='video/mp4'></video></body></html>";
    await attachment("Title of our video", html, ContentType.HTML);
};
