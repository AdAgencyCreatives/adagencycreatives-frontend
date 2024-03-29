import { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as AlertContext } from "../context/AlertContext";

const useHelper = () => {

    const { showAlert } = useContext(AlertContext);

    const {
        state: { token, role },
    } = useContext(AuthContext);

    const validateAccess = (e, item) => {
        if (item && item.roles && item.roles.length > 0) {
            for (let index = 0; index < item.roles.length; index++) {
                const roleToCompare = item.roles[index];
                if (role && role == roleToCompare) {
                    return true;
                }
            }

            e.preventDefault();
            e.stopPropagation();

            showAlert(item.restrictedMessage);

            return false;
        }
        return true;
    };

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

        if (matched.lastIndexOf(".") == matched.length - 1) {
            matched = matched.substring(0, matched.length - 1);
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
        text = text.replace("&nbsp;", ">>&nbsp;<<");
        // console.log(text);
        // const expressionWithHttp =
        //     /((https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi;

        const expressionWithHttp =
            /((href=")?(https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(com|net|org|biz|edu)\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)(.*<\/a>)?)/gi;

        const regex = new RegExp(expressionWithHttp);

        // return text.replace(regex, "<a href='$1' target='_blank'>$1</a>");
        text = text.replace(regex, replacer);

        text = text.replace(">>&nbsp;<<", "&nbsp;");

        return text;
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
        if (!text || !text.length) {
            return text;
        }
        if (text.length == 1) {
            return text.toUpperCase();
        }

        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const getAorAn = (word, capitalized = false) => {
        if (!word || !word.length) {
            return capitalized ? capitalize("a") : "a";
        }

        const vowels = ['a', 'e', 'i', 'o', 'u'];
        const letter = word.charAt(0).toLowerCase();

        if (vowels.includes(letter)) {
            return capitalized ? capitalize("an") : "an";
        }

        return capitalized ? capitalize("a") : "a";
    };

    const hasPasswordError = (value) => {

        let errMsg = "Passwords must be a minimum of eight characters, contain at least one number, and special character";

        if (!value?.length) {
            return "";
        }

        if (value.length < 8) {
            return errMsg;
        }

        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        let hasDigit = false;
        let hasUpper = false;
        let hasLower = false;
        let hasSpecial = false;

        for (let index = 0; index < value.length; index++) {
            const element = value[index];
            if (digits.includes(element)) {
                hasDigit = true;
                continue;
            }
            if (upperCase.includes(element)) {
                hasUpper = true;
                continue;
            }
            if (lowerCase.includes(element)) {
                hasLower = true;
                continue;
            }
            hasSpecial = true;
        }

        if (!hasDigit) {
            return errMsg;
        }

        if (!(hasUpper || hasLower)) {
            return errMsg;
        }

        if (!hasSpecial) {
            return errMsg;
        }

        return "";
    };

    const isObject = (value) => {
        return value?.constructor?.toString()?.indexOf("Object") > -1;
    };

    return { validateAccess, rectify_url, decodeEntities, injectHyperlinks, encodeSpecial, decodeSpecial, strReplaceAll, isCharNumber, getNumericString, formatPhone, capitalize, getAorAn, hasPasswordError, isObject };
}

export default useHelper;