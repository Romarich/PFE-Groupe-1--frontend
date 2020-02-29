const package = require('./package.json');
const fs = require('fs');

const _ENV = process.env._ENV || "production";

package.scripts.build = package.scripts.build.replace("${_ENV}", _ENV);

fs.writeFileSync('package.json', JSON.stringify(package, null, 4));
