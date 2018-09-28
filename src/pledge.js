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
    this._callHandler()
};


$Promise.prototype._internalReject = function (value) {
    if (this._state === 'pending') {
        this._state = 'rejected';
        this._value = value;
    }
    this._callHandler()
};


$Promise.prototype.then = function(successCb, errorCb) {
    if (typeof successCb !== 'function' && typeof errorCb !== 'function') {
        this._handlerGroups.push(false)
    }
    this._handlerGroups.push({
        successCb: successCb,
        errorCb: errorCb
    })
    this._callHandler()
}

$Promise.prototype._callHandler = function (successCb, errorCb) {


    if (this._state !== 'pending') {
        while (this._handlerGroups.length) {
   
            if (this._handlerGroups[0].successCb !== 'undefined') {
                this._handlerGroups[0].successCb(this._value);
                this._handlerGroups.shift()
            } else {
                this._handlerGroups[0].errorCb();
            }
        }
    }
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
