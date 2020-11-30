const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const amendJest = () => {
  const filePath = path.resolve('./node_modules/jest-runtime/build/index.js')

  const content = readFileSync(filePath, { encoding: 'utf-8' })
  const amendResult = content.replace(/      this._fileTransforms.has\(res.url\) \&\&/i, '      // this._fileTransforms.has\(res.url\) \&\&')
  writeFileSync(filePath, amendResult)
}

amendJest()
