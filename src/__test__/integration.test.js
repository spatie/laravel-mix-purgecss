const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

test('it purges css', async () => {
    const contents = await readFile(path.resolve(__dirname, '../../example/public/css/app.css'), {
        encoding: 'utf8',
    });

    expect(contents).toMatchSnapshot();
});
