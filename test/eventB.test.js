const vm = require('vm');
const path = require('path');
const fs = require('fs');

const getContextByPath = (foldername, filename) => {
    const filepath = path.resolve(__dirname, '../src', foldername, filename)
    return fs.readFileSync(filepath, {
        encoding: "utf8"
    });
}

describe("eventB.test.js", () => {
    test("result", async () => {
        const moduleCalculate = getContextByPath('modules', 'calculate.js')
        const eventB = getContextByPath('events', 'eventB.js')
        const context = vm.createContext(vm.Context);

        vm.runInContext(moduleCalculate, context, {
            filename: path.resolve(__dirname, '../src/modules/calculate.js'),
            timeout: this.scriptTimeout
        });

        vm.runInContext(eventB, context, {
            filename: path.resolve(__dirname, '../src/events/eventB.js')
        });

        expect(context.isLess).toBe('is less');
        expect(context.isEven).toBeFalsy();
    });
});
