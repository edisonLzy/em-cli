export default class ErrorHandler {
  constructor() {
    process.on('uncaughtException', (err) => {});
  }
}
