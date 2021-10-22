'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var throwOnNetworkError = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(endpoint, others) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch(endpoint, others);

          case 3:
            return _context.abrupt('return', _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](0);
            throw {
              error: true,
              payload: new Error(_context.t0.message),
              meta: {}
            };

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 6]]);
  }));

  return function throwOnNetworkError(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = function (next) {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref2) {
      var endpoint = _ref2.endpoint,
          others = (0, _objectWithoutProperties3.default)(_ref2, ['endpoint']);
      var resp, meta, error;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return throwOnNetworkError(endpoint, others);

            case 2:
              resp = _context2.sent;
              meta = {};

              resp.headers.forEach(function (value, key) {
                return meta[key] = value;
              });

              if (resp.ok) {
                _context2.next = 13;
                break;
              }

              error = new Error('Bad Response');

              error.statusCode = resp.status;
              _context2.next = 10;
              return resp.text();

            case 10:
              error.payload = _context2.sent;

              error.meta = meta;
              throw error;

            case 13:
              _context2.t0 = next;
              _context2.next = 16;
              return resp.text();

            case 16:
              _context2.t1 = _context2.sent;
              _context2.t2 = meta;
              _context2.t3 = {
                payload: _context2.t1,
                meta: _context2.t2
              };
              return _context2.abrupt('return', (0, _context2.t0)(_context2.t3));

            case 20:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
};