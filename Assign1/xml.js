var root = require('xmlbuilder').create('root',
                     {version: '1.0', encoding: 'UTF-8', standalone: true},
                     {pubID: null, sysID: null},
                     {allowSurrogateChars: false, skipNullAttributes: false, 
                      headless: false, ignoreDecorators: false, stringify: {}});
var ele = root.ele('child',
                   {'attribute': 'value',
                    'attribute2': 'value2'},
                   'element text');
var xmlString = root.end({ pretty: true, indent: '  ', newline: '\n' });

var fs = require('fs');

fs.writeFile('final.xml', xmlString);