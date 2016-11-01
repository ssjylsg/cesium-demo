/**
 * 轻量级的 javascript Promise 实现
 * 
 * @requires
 * @class: NPMap3D.Promise
 * @constructor
 *
 * 
 */
NPMap3D.Promise = function() {
    this._callbacks = [];
};

NPMap3D.Promise.prototype.then = function(func, context) {
    var p;
    if (this._isdone) {
        p = func.apply(context, this.result);
    } else {
        p = new NPMap3D.Promise();
        this._callbacks.push(function() {
            var res = func.apply(context, arguments);
            if (res && typeof res.then === 'function') {
                res.then(p.done, p);
            }
        });
    }
    return p;
};

NPMap3D.Promise.prototype.done = function() {
    this.result = arguments;
    this._isdone = true;
    for (var i = 0; i < this._callbacks.length; i++) {
        this._callbacks[i].apply(null, arguments);
    }
    this._callbacks = [];
};

NPMap3D.Promise.prototype.chain = function(funcs, args) {
    var p = new NPMap3D.Promise();
    if (funcs.length === 0) {
        p.done.apply(p, args);
    } else {
        funcs[0].apply(null, args).then(function() {
            funcs.splice(0, 1);
            p.chain(funcs, arguments).then(function() {
                p.done.apply(p, arguments);
            });
        });
    }
    return p;
};

NPMap3D.Promise.prototype.when = function(promises) {
    var p = new NPMap3D.Promise();
    var results = [];

    if (!promises || !promises.length) {
        p.done(results);
        return p;
    }

    var numdone = 0;
    var total = promises.length;

    function notifier(i) {
        return function() {
            numdone += 1;
            results[i] = Array.prototype.slice.call(arguments);
            if (numdone === total) {
                p.done(results);
            }
        };
    }

    for (var i = 0; i < total; i++) {
        promises[i].then(notifier(i));
    }

    return p;
};
