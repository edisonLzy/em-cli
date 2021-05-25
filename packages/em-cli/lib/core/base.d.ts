/// <reference types="node" />
import EventEmitter from 'events';
export default class BaseClass extends EventEmitter {
    static commandInstallFlag: boolean;
    logSuccess: (msg: string) => void;
    logError: (msg: string) => void;
    logWarn: (msg: string) => void;
    logInfo: (msg: string) => void;
    logChalk: import("chalk").Chalk & import("chalk").ChalkFunction & {
        supportsColor: false | import("chalk").ColorSupport;
        Level: import("chalk").Level;
        Color: "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright" | "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";
        ForegroundColor: "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright";
        BackgroundColor: "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";
        Modifiers: "reset" | "bold" | "dim" | "italic" | "underline" | "inverse" | "hidden" | "strikethrough" | "visible";
        stderr: import("chalk").Chalk & {
            supportsColor: false | import("chalk").ColorSupport;
        };
    };
    loadingStart: (msg: string) => import("ora").Ora;
    constructor();
}
