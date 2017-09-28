const drawObject = require('./main');
const obj = {a: 'test string'};
test('should contain test string', () => {
  expect(drawObject(obj)).toMatch(/test string/);
});
test('must be string', () => {
  expect(typeof drawObject(obj)).toBe('string');
});