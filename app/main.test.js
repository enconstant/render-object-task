
const obj = {test_key: 'test_val'};
test('should contain test string', () => {
  document.body.innerHTML =
    '<div class="page__rendering-block">' +
		'<div class="object-render"></div>' +
	 '</div>'
  const main = require('./main');
  console.log(main)	 
  expect(main.drawObject(obj)).toMatch(/test_key/);
});

test('String type should be returned', () => {
  document.body.innerHTML =
    '<div class="page__rendering-block">' +
		'<div class="object-render"></div>' +
	 '</div>'
  const main = require('./main');
  expect(typeof main.drawObject(obj)).toBe('string');
});
