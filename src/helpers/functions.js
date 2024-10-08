import { offensiveWords, removeCharacters } from "../config";

export function sanitizeInputText(inputText) {
    let finalText = inputText;
    for (let index = 0; index < removeCharacters.length; index++) {
        let charItem = removeCharacters[index];
        while (finalText.indexOf(charItem) >= 0) {
            finalText = finalText.replace(charItem, " ");
        }
    }

    while (finalText.indexOf("  ") >= 0) {
        finalText = finalText.replace("  ", " ");
    }

    return finalText;
};

export function stringToWords(inputText) {
    return sanitizeInputText(inputText).split(" ");
};

export function containsOffensiveWords(inputText) {
    if (!inputText || inputText.length == 0) {
        return false;
    }
    let lowerInputText = inputText.toLowerCase();
    let inputWords = stringToWords(lowerInputText);

    for (let offensiveWordsIndex = 0; offensiveWordsIndex < offensiveWords.length; offensiveWordsIndex++) {
        const offensiveWordItem = offensiveWords[offensiveWordsIndex];
        for (let inputWordsIndex = 0; inputWordsIndex < inputWords.length; inputWordsIndex++) {
            const inputWordItem = inputWords[inputWordsIndex];
            if (inputWordItem == offensiveWordItem) {
                return true;
            }
        }
    }
    return false;
};

// setCookie("cookiename", cookieExist, COOKIE_EXPIRY_TIME);
// example - setCookie("username", cookieExist, (0.5 * 60 * 1000)); this cookie expires in 30 seconds.
// the cookie expiry time have to be in seconds so convert your time in seconds and after that pass it.

export function setCookie(cname, cvalue, extime) {
    const d = new Date();
    d.setTime(d.getTime() + extime);
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// get a cookie and Its value
export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// pass the name of the cookie as string which you want to check that if It exists or not.
export function checkCookie(cookiename) {
    let cookieExist = getCookie(cookiename);
    if (cookieExist != "") {
        return cookieExist;
    }
    return false;
}