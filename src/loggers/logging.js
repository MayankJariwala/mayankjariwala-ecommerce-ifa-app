export class Logging {

    static timeStamp: string = new Date().toTimeString();

    static log = (layerName: string, message: string) => {
        if (`${process.env.REACT_APP_IS_LOGGING_ENABLED}` === "true") {
            console.log(`[LOG]  [${this.timeStamp}] [${layerName}] - ${message}`);
        }
    };

    static info = (layerName: string, message: string) => {
        if (`${process.env.REACT_APP_IS_LOGGING_ENABLED}` === "true") {
            console.info(`[INFO]    [${this.timeStamp}] [${layerName}]  -   ${message}`);
        }
    };

    static debug = (layerName: string, message: string) => {
        if (`${process.env.REACT_APP_IS_LOGGING_ENABLED}` === "true") {
            console.debug(`[DEBUG]  [${this.timeStamp}] [${layerName}]  -   ${message}`);
        }
    };

    static error = (layerName: string, message: string) => {
        if (`${process.env.REACT_APP_IS_LOGGING_ENABLED}` === "true") {
            console.error(`[ERROR]  [${this.timeStamp}] [${layerName}]  -   ${message}`);
        }
    };

    static warn = (layerName: string, message: string) => {
        if (`${process.env.REACT_APP_IS_LOGGING_ENABLED}` === "true") {
            console.warn(`[WARN]    [${this.timeStamp}] [${layerName}]  -   ${message}`);
        }
    };
}

