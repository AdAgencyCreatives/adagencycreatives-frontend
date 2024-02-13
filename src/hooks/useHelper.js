import { useContext } from "react";
import { Context } from "../context/AuthContext";

const useHelper = () => {

    const rectify_url = (url) => {
        if (!url) {
          return url;
        }
    
        let lowerUrl = ("" + url).toLowerCase();
        let haveHttps = lowerUrl.indexOf("https://") >= 0;
        let haveHttp = lowerUrl.indexOf("http://") >= 0;
    
        return !(haveHttps || haveHttp) ? ("https://" + url) : url;
      };

    var decodeEntities = (function () {
        var cache = {},
            character,
            e = document.createElement('div');

        return function (html) {
            return html.replace(/([&][^&; ]+[;])/g, function (entity) {
                character = cache[entity];
                if (!character) {
                    e.innerHTML = entity;
                    if (e.childNodes[0])
                        character = cache[entity] = e.childNodes[0].nodeValue;
                    else
                        character = '';
                }
                return character;
            });
        };
    })();

    const replacer = (matched) => {
        if (matched.indexOf("href=") >= 0 || matched.indexOf("</a>") >= 0) {
            return matched;
        }

        let withProtocol = matched;

        if (!withProtocol.startsWith("http")) {
            withProtocol = "http://" + matched;
        }

        const newStr = `<a
          class="post-link"
          href="${withProtocol}"
          target="_blank"
        >
          ${matched}
        </a>`;

        return newStr;
    };

    const injectHyperlinks = (text) => {
        // const expressionWithHttp =
        //     /((https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi;

        const expressionWithHttp =
            /((href=")?(https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(com|net|org|biz|edu)\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)(.*<\/a>)?)/gi;

        const regex = new RegExp(expressionWithHttp);

        // return text.replace(regex, "<a href='$1' target='_blank'>$1</a>");
        return text.replace(regex, replacer);
    };

    const specialCharsToEncode = {
        "/": "%2F",
        "'": "%27",
        "+": "%2B",
        "&": "%26",
        "#": "%23",
    };

    const encodeSpecial = (text) => {
        let result = text;
        for (const key in specialCharsToEncode) {
            if (Object.hasOwnProperty.call(specialCharsToEncode, key)) {
                const element = specialCharsToEncode[key];
                while (result.indexOf(key) >= 0) {
                    result = result.replace(key, element);
                }
            }
        }
        return result;
    };

    const decodeSpecial = (text) => {
        let result = text;
        for (const key in specialCharsToEncode) {
            if (Object.hasOwnProperty.call(specialCharsToEncode, key)) {
                const element = specialCharsToEncode[key];
                while (result.indexOf(element) >= 0) {
                    result = result.replace(element, key);
                }
            }
        }
        return result;
    };

    const strReplaceAll = (source, search, replace) => {
        if (replace.indexOf(search) >= 0) {
            throw "Replace text should not contain search text, it will create infinite search replace.";
        }
        let sourceCopy = source;
        while (sourceCopy.indexOf(search) >= 0) {
            sourceCopy = sourceCopy.replace(search, replace);
        }
        return sourceCopy;
    };

    function isCharNumber(c) {
        return typeof c === 'string' && c.length == 1 && c >= '0' && c <= '9';
    }

    const getNumericString = (phone) => {
        let result = [];
        for (let i = 0; i < phone.length; i++) {
            const element = phone[i];
            if (isCharNumber(element)) {
                result.push(element);
            }
        }
        return result.join('');
    };

    const formatPhone = (phone) => {
        phone = getNumericString(phone);
        let result = [];
        for (let i = 0; i < phone.length; i++) {
            const element = phone[i];
            result.push(element);
            if (i == 2 || i == 5) {
                result.push('-');
            }
        }
        return result.join('');
    };

    const capitalize = (text) => {
        if(!text || !text.length) {
            return text;
        }
        if(text.length == 1) {
            return text.toUpperCase();
        }

        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const getAorAn = (word, capitalized = false) => {
        if(!word || !word.length) {
            return capitalized ? capitalize("a") : "a";
        }

        const vowels = ['a', 'e', 'i', 'o', 'u'];
        const letter = word.charAt(0).toLowerCase();

        if(vowels.includes(letter)) {
            return capitalized ? capitalize("an") : "an";
        }

        return capitalized ? capitalize("a") : "a";
    };

    return { rectify_url, decodeEntities, injectHyperlinks, encodeSpecial, decodeSpecial, strReplaceAll, isCharNumber, getNumericString, formatPhone, capitalize, getAorAn };
}

export default useHelper;