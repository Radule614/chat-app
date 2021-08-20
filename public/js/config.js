const RELEASE = (window.location.href.split('/'))[2] === 'localhost:3000'? false : true;
console.log(RELEASE);
console.log((window.location.href.split('/'))[2]);


let jsConfig = {
    defaultSection: ["home", "feed"],
    defaultUrl: "#/home/feed",
    maxChatWindows: 3,
    domainUrl: ""
}

if (RELEASE) {
    jsConfig.domainUrl = "https://e2chat.herokuapp.com";
} else {
    jsConfig.domainUrl = "http://localhost:3000";
}



