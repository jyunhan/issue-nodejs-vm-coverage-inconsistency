const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const targetCode = `this._v8CoverageResults.map(cov => ({
          result: cov.map(r => r.result)
        }))`

const postCode = `this._v8CoverageResults.map((cov, idx) => ({
          result: cov.map(r => {
            if (/modules\\\/calculate.js/i.test(r.result.url)) {
              const targetFunc = r.result.functions.slice().filter(funcCov => funcCov.functionName === 'complicated')
              console.log('The ' + 'result\[' + idx + '\] in this test:\\n', JSON.stringify(targetFunc, null, 4), '\\n')
            }
            return r.result
          })
        }))
`

const amendJest = () => {
  const filePath = path.join(path.resolve(__dirname, '../node_modules/@jest/reporters/build/CoverageReporter.js'))
  const content = readFileSync(filePath, { encoding: 'utf-8' })
  const amendResult = content.replace(targetCode, postCode)

  writeFileSync(filePath, amendResult)
}

amendJest()
