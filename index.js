var fs = require('file-system');
const xml = require('xml-js');

// fs.mkdir('1/2/3/4/5', function(err) {});
// fs.mkdirSync('1/2/3/4/5');
// fs.writeFile('path/test.txt', 'aaa', function(err) {});

var path = `${__dirname}/1`;

function fileSystemTest() {
  fs.recurse(path, ['**/*'], function(filepath, relative, filename) {
    if (filename) {
      console.log('found file %s in %s', filename, filepath);
    } else {
      console.log('found folder %s', relative);
    }
  });
}

function xmlTest1() {
  var xmlIn =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<note importance="high" logged="true">' +
    '    <title>Happy</title>' +
    '    <todo>Work</todo>' +
    '    <todo>Play</todo>' +
    '</note>';
  var result1 = xml.xml2json(xmlIn, { compact: true, spaces: 4 });
  var result2 = xml.xml2json(xmlIn, { compact: false, spaces: 4 });
  console.log(result1, '\n', result2);
}

function xmlTest() {
  fs.readFile('test.xml', 'utf-8', (err, data) => {
    if (err) return err;
    else {
      // console.log(data);
      let options = {
        ignoreComment: true,
        alwaysChildren: true,
        compact: true
      };
      fs.writeFileSync('jsonOut.json', xml.xml2json(data, options));
      let res = xml.xml2js(data, options);
      console.log(res);
      console.log(`found ${res.stages.stage.length} stages`);
      for (let i = 0; i < res.stages.stage.length; i++) {
        console.log(`stage with id: ${res.stages.stage[i]._attributes.id} has`);
        console.log(`the text: ${res.stages.stage[i].text._text}`);
        console.log(`the button: ${res.stages.stage[i].button._text}`);
        console.log(`script with code: ${res.stages.stage[i].script._text}`);
      }
    }
  });
}

xmlTest();
