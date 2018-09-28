'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// TU CÓDIGO AQUÍ:
var $Promise = function (fn) {
    if (typeof fn !== 'function') throw TypeError ('/executor.+function/i')
    this._state = 'pending';
    this._handlerGroups = [];

    this.executor = fn;
    this.executor(this._internalResolve.bind(this), this._internalReject.bind(this))
}

$Promise.prototype._callHandler = function () {}

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


$Promise.prototype.then = function(successCb, errorCb) {

    if (typeof sucessCb !== 'function' && typeof errorCb !== 'function') {
        this._handlerGroups.push({
      
        })
    }
    this._handlerGroups.push({
        successCb: successCb,
        errorCb: errorCb
    })

}



/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
