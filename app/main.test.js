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
//	It seems that there must be a better way to test click events
//	JQuery was used to simulate click event 
test('check classes replaced on one click', () => {
  document.body.innerHTML =
    '<div class="page__rendering-block">' +
    '<div class="object-render"></div>' +
    '</div>';
  const main = require('./main');
  const $ = require('jquery');
  $('.object-render').eq(0).html('');
  $('.object-render').eq(0).html(main.drawObject(obj2, main.draw));
  $('.object-render__key-line').eq(0).click();
  expect($('.object-render__key-line').eq(0).next()
    .hasClass('object-render__object-block_collapsed')).toBeTruthy;

  expect($('.object-render__key-line').eq(0).next()
    .hasClass('object-render__object-block')).toBeFalsy;

  expect($('.object-render__key-line').eq(0).next().next()
    .hasClass('object-render__bracket')).toBeTruthy;

  expect($('.object-render__key-line').eq(0).next().next()
    .hasClass('object-render__bracket_hidden')).toBeFalsy;

  expect($('.object-render__key-line').eq(0).first()
    .hasClass('object-render__key-name_extended')).toBeTruthy;

  expect($('.object-render__key-line').eq(0).first()
    .hasClass('object-render__key-name_collapsed')).toBeFalsy;
});

test('check classes replaced on two clicks', () => {
  document.body.innerHTML =
    '<div class="page__rendering-block">' +
    '<div class="object-render"></div>' +
    '</div>';
  const main = require('./main');
  const $ = require('jquery');
  $('.object-render').eq(0).html('');
  $('.object-render').eq(0).html(main.drawObject(obj2, main.draw));
  $('.object-render__key-line').eq(0).click().click();
  expect($('.object-render__key-line').eq(0).next()
    .hasClass('object-render__object-block_collapsed')).toBeFalsy;

  expect($('.object-render__key-line').eq(0).next()
    .hasClass('object-render__object-block')).toBeTruthy;

  expect($('.object-render__key-line').eq(0).next().next()
    .hasClass('object-render__bracket')).toBeFalsy;
  
  expect($('.object-render__key-line').eq(0).next().next()
    .hasClass('object-render__bracket_hidden')).toBeTruthy;

  expect($('.object-render__key-line').eq(0).first()
    .hasClass('object-render__key-name_extended')).toBeFalsy;

  expect($('.object-render__key-line').eq(0).first()
    .hasClass('object-render__key-name_collapsed')).toBeTruthy;
});

test('check classes replaced when clicked on span inside p', () => {
  document.body.innerHTML =
    '<div class="page__rendering-block">' +
    '<div class="object-render"></div>' +
    '</div>';
  const main = require('./main');
  const $ = require('jquery');
  $('.object-render').eq(0).html('');
  $('.object-render').eq(0).html(main.drawObject(obj2, main.draw));
  $('.object-render__key-name_extended').eq(0).click();
  expect($('.object-render__key-line').eq(0).next()
    .hasClass('object-render__object-block_collapsed')).toBeTruthy;

  expect($('.object-render__key-line').eq(0).next()
    .hasClass('object-render__object-block')).toBeFalsy;

  expect($('.object-render__key-line').eq(0).next().next()
    .hasClass('object-render__bracket')).toBeTruthy;

  expect($('.object-render__key-line').eq(0).next().next()
    .hasClass('object-render__bracket_hidden')).toBeFalsy;

  expect($('.object-render__key-line').eq(0).first()
    .hasClass('object-render__key-name_extended')).toBeTruthy;

  expect($('.object-render__key-line').eq(0).first()
    .hasClass('object-render__key-name_collapsed')).toBeFalsy;
});
