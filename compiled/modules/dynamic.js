// Generated by CoffeeScript 1.7.1
(function() {
  var Asset, async, fs, mime, pathutil, walk,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  fs = require('fs');

  pathutil = require('path');

  async = require('async');

  mime = require('mime');

  Asset = require('../.').Asset;

  walk = require('../util').walk;

  exports.DynamicAssets = (function(_super) {
    __extends(DynamicAssets, _super);

    function DynamicAssets() {
      return DynamicAssets.__super__.constructor.apply(this, arguments);
    }

    DynamicAssets.prototype.create = function(options) {
      this.dirname = pathutil.resolve(options.dirname);
      this.toWatch = this.dirname;
      this.type = options.type, this.urlPrefix = options.urlPrefix, this.options = options.options, this.filter = options.filter, this.rewriteExt = options.rewriteExt;
      if (this.urlPrefix == null) {
        this.urlPrefix = '/';
      }
      if (this.urlPrefix.slice(-1) !== '/') {
        this.urlPrefix += '/';
      }
      if (this.type.prototype.mimetype != null) {
        if (this.rewriteExt == null) {
          this.rewriteExt = mime.extensions[this.type.prototype.mimetype];
        }
      }
      if ((this.rewriteExt != null) && this.rewriteExt[0] !== '.') {
        this.rewriteExt = '.' + this.rewriteExt;
      }
      if (this.options == null) {
        this.options = {};
      }
      this.options.hash = this.hash;
      this.options.maxAge = this.maxAge;
      this.assets = [];
      return walk(this.dirname, {
        ignoreFolders: true,
        filter: this.filter
      }, (function(_this) {
        return function(file, done) {
          var k, opts, url, v, _ref;
          url = pathutil.dirname(file.relpath);
          url = url.split(pathutil.sep);
          if (url[0] === '.') {
            url = [];
          }
          if (_this.rewriteExt != null) {
            url.push(file.namenoext + _this.rewriteExt);
          } else {
            url.push(file.name);
          }
          opts = {
            url: _this.urlPrefix + url.join('/'),
            filename: file.path
          };
          _ref = _this.options;
          for (k in _ref) {
            if (!__hasProp.call(_ref, k)) continue;
            v = _ref[k];
            opts[k] = v;
          }
          _this.addAsset(new _this.type(opts));
          return done();
        };
      })(this), (function(_this) {
        return function() {
          return _this.emit('created');
        };
      })(this));
    };

    return DynamicAssets;

  })(Asset);

}).call(this);
