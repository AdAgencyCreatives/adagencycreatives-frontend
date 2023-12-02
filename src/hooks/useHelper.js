import { useContext } from "react";
import { Context } from "../context/AuthContext";

const useHelper = () => {

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
        const expressionWithHttp =
            /((https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi;

        const regex = new RegExp(expressionWithHttp);

        // return text.replace(regex, "<a href='$1' target='_blank'>$1</a>");
        return text.replace(regex, replacer);
    };

    const specialCharsToEncode = {
        "/":"%2F",
        "'":"%27",
        "+":"%2B",
        "&":"%26",
        "#":"%23",
    };

    const encodeSpecial = (text) => {
        let result = text;
        for (const key in specialCharsToEncode) {
            if (Object.hasOwnProperty.call(specialCharsToEncode, key)) {
                const element = specialCharsToEncode[key];
                while(result.indexOf(key)>= 0) {
                    result= result.replace(key, element);
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
                while(result.indexOf(element)>= 0) {
                    result= result.replace(element, key);
                }
            }
        }
        return result;
    };

    return { decodeEntities, injectHyperlinks, encodeSpecial, decodeSpecial };
}

export default useHelper;