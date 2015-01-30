

//For the application we are dealing with the files so the FileSystem module
// should be loaded first.
var fs = require('fs');

fs.readFile('source.json', 'utf8', function (err, data) {
  
  if (err) {
    // If the specified file failed to open or read
    console.log('Error while reading the file');
    
  } else {

      var studentObject = JSON.parse(data);

      fs.writeFile('destination.txt', 'First Name | Last Name | Score \n');
  

      studentObject.students = studentObject.students.sort(function (a, b) {
        return b.score - a.score;
      });

      for (var i = 0; i < studentObject.students.length; i++) {
        fs.appendFile('destination.txt', studentObject.students[i].id + ' | ' 
          + studentObject.students[i].fName + ' | ' + studentObject.students[i].lName + ' | '
          + studentObject.students[i].score + '\n', function (err) {
          if (err) {
            throw err;
          }
        });
      }

      var rootElement = require('xmlbuilder');

      rootElement = rootElement.create('students');

      var stud;// for student element
      var studName; // for name element
      var studScore; // for score element
    
      for (i = 0; i < studentObject.students.length; i++) {
        stud = rootElement.ele('student', {'id': studentObject.students[i].id});

        studName = stud.ele('name', studentObject.students[i].fName + ' '
        + studentObject.students[i].lName);

        studScore = stud.ele('score', studentObject.students[i].score);
      }

      var xmlString = rootElement.end({ pretty: true, indent: '  ', newline: '\n' });

      fs.writeFile('final.xml', xmlString);
    }
});