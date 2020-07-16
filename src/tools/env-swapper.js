const fs = require("fs");
const path = require("path");

(function() {
  const env = process.argv[2];
  try {
    fs.createReadStream(path.join(process.cwd(), `./env/${env}`)).pipe(
      fs.createWriteStream(path.join(process.cwd(), `./.env`))
    );
  } catch (e) {
    throw new Error(`${env} doesn't match any file in the env directory on project's root`);
  }
  console.log(`.env swapped to ${env}`);
})();
