const obj = { test_key: 'test_val' };
const obj2 = {
  a: 'text',
  b: {
    c: 'text',
    d: 'text',
  },
};
test('should contain test_key and test_val', () => {
  document.body.innerHTML =
    '<div class="page__rendering-block">' +
    '<div class="object-render"></div>' +
    '</div>';
  const main = require('./main');
  expect(main.drawObject(obj, main.draw)).toMatch(/test_key/);
  expect(main.drawObject(obj, main.draw)).toMatch(/test_val/);
});

test('String type should be returned', () => {
  document.body.innerHTML =
    '<div class="page__rendering-block">' +
    '<div class="object-render"></div>' +
    '</div>';
  const main = require('./main');
  expect(typeof main.drawObject(obj, main.draw)).toBe('string');
});

test('draw function should be called once', () => {
  document.body.innerHTML =
    '<div class="page__rendering-block">' +
    '<div class="object-render"></div>' +
    '</div>';
  const main = require('./main');
  const drawMock = jest.fn();
  main.drawObject(obj, drawMock);
  expect(drawMock.mock.calls.length).toBe(1);
});

test('draw function should be called twice', () => {
  document.body.innerHTML =
    '<div class="page__rendering-block">' +
    '<div class="object-render"></div>' +
    '</div>';
  const main = require('./main');
  const drawMock = jest.fn();
  main.drawObject(obj2, drawMock);
  expect(drawMock.mock.calls.length).toBe(2);
});

test('drawObject function result match', () => {
  document.body.innerHTML =
    '<div class="page__rendering-block">' +
    '<div class="object-render"></div>' +
    '</div>';
  const main = require('./main');
  const testFunc = () => 'test';
  expect(main.drawObject(obj, testFunc))
    .toBe('<div class="object-render__object-block">test</div>');
});

test('draw function result match', () => {
  document.body.innerHTML =
    '<div class="page__rendering-block">' +
    '<div class="object-render"></div>' +
    '</div>';
  const main = require('./main');
  expect(main.draw('test_key', obj))
    .toBe('<p class="object-render__key-line_inactive">' +
      '<span class="object-render__key-name">test_key: </span>' +
      '<span>test_val</span>' +
      '</p>');
});
