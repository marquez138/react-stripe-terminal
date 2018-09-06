import Terminal from '../mocks/terminal'

class TestHelpers {
    static CreateTerminal({options}) {

    }
    static async FakeAsync() {
        await new Promise(resolve => resolve())
    }
}

export default TestHelpers
