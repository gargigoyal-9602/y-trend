import CacheState from "../redux/states/cache";
import ar from "./ar";
import en from "./en";

//function which falls back to english and then defaultText

const languages = {
    ar,
    en
}

export const langlist = Object.keys(languages).map((item) => ({ name: languages[item].name, code: item }));

//lang class falling back to english and then default text and then not found message
export default class lang {

    constructor(component) {
        const cacheState = CacheState.get();
        if (!component) {
            throw new Error("Component is required for language.");
        }

        this.component = component;

        if (!cacheState.language) {
            this.language = "en";
            CacheState.set({ language: "en" });
        } else {
            this.language = cacheState.language;
            //this.language = "en";
        }
        if (this.language in languages) {
            this.direction = languages[this.language].direction || "ltr";
        } else {
            throw new Error("Language not found. - " + this.language);
        }
    }

    get(key, defaultText) {

        const cacheState = CacheState.get();
        if (this.language in languages) {
            if (this.component in languages[this.language]) {
                if (key in languages[this.language][this.component]) {
                    return languages[this.language][this.component][key];
                }
            }
        }

        //falling back to english// saf to remove if not required
        if ("en" in languages) {
            if (this.component in languages["en"]) {
                if (key in languages["en"][this.component]) {
                    return languages["en"][this.component][key];
                }
            }
        }

        return defaultText || "No language found";

    }


}