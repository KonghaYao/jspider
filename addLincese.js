const fs = require('fs');
const path = require('path');

function add(father, header) {
    fs.readdir(father, { withFileTypes: true }, (err, files) => {
        files.map((i) => {
            const PATH = father + '/' + i.name;
            if (i.isFile()) {
                if (path.extname(PATH) === '.js') {
                    fs.readFile(PATH, (err, text) => {
                        fs.writeFile(PATH, header + text, () => {});
                    });
                }
            } else {
                add(PATH, header);
            }
        });
    });
}
add(
    './src',
    `/**
     * @license
     * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
     * SPDX-License-Identifier: Apache-2.0
     */
    `,
);
