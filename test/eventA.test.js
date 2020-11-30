const vm = require('vm');
const path = require('path');
const fs = require('fs');

const getContextByPath = (foldername, filename) => {
    const filepath = path.resolve(__dirname, '../src', foldername, filename)
    return fs.readFileSync(filepath, {
        encoding: "utf8"
    });
}

describe("eventA.test.js", () => {
    test("result", async () => {
        const moduleCalculate = getContextByPath('modules', 'calculate.js')
        const eventA = getContextByPath('events', 'eventA.js')
        const context = vm.createContext(vm.Context);

        vm.runInContext(moduleCalculate, context, {
            filename: path.resolve(__dirname, '../src/modules/calculate.js'),
            timeout: this.scriptTimeout
        });

        vm.runInContext(eventA, context, {
            filename: path.resolve(__dirname, '../src/events/eventA.js')
        });

        expect(context.isBecomeLess).toBe('is become less');
        expect(context.isGreater).toBe('is greater');
    });
});
