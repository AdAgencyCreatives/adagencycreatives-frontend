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

    return { decodeEntities };
}

export default useHelper;