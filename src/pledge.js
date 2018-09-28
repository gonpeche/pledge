'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// TU CÓDIGO AQUÍ:
var $Promise = function (fn) {
    if (typeof fn !== 'function') throw TypeError ('/executor.+function/i')
    this._state = 'pending';

    this.executor = fn;

    this.executor(this._internalResolve.bind(this), this._internalReject.bind(this))

}

$Promise.prototype._internalResolve = function(someData) {
    if (this._state === 'pending') {
        this._state = 'fulfilled';
        this._value = someData;
    }
};

$Promise.prototype._internalReject = function (value) {
    if (this._state === 'pending') {
        this._state = 'rejected';
        this._value = value;
    }
};



/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
