
var fs = require('fs');
var obj;

// Reading the JSON file and Parsing the contents in obj.//

fs.readFile('source.json', 'utf8', function (err, data) {
    var i;
    if (err) {
        throw err;
    }
    obj = JSON.parse(data);

    //-------------Reading ends-------------------//

    //-------Writing the contents to destination.txt file------------//

    fs.writeFile('destination.txt', 'First Name | Last Name | Score \n');

    //----------------Sorting the content -------------------------//
    obj.students = obj.students.sort(function (a, b) {
        return b.score - a.score; // in descending order of score.
    });
    //-------------Sorting ends-------------------//

    for (i = 0; i < obj.students.length; i++) {
        fs.appendFile('destination.txt', obj.students[i].id + " | " + obj.students[i].fName + " | " + obj.students[i].lName + " | " + obj.students[i].score + "\n", function (err) {
            if (err) {
                throw err;
            }
        });
    }
    var root = require('xmlbuilder');

    root = root.create('students',
                     {version: '1.0', encoding: 'UTF-8', standalone: true});
    var ele = root.ele(obj);
    var xmlString = root.end({ pretty: true, indent: '  ', newline: '\n' });

    fs.writeFile('final.xml', xmlString);
//-----------------writing ends-------------------//
});