class AbstractReaderController {
    constructor({ terminal, component }) {
        if (this.constructor === AbstractReaderController) {
            throw new Error("Cannot instantiate AbstractReaderController directly");
          }
        this._terminal = terminal;
        this._component = component;
    }
}

export default AbstractReaderController;
