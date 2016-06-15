"use strict";
yayoi.initPackages("yayoi.util");

yayoi.extend("yayoi.util.Logger", "yayoi.core.Object", [], function() {
    this.levels = {
        debug: 1,
        info: 2,
        warn: 3,
        error: 4
    };
    this.typeName = null;
    this.debug = function() {
        var logLevel = this.levels[yayoi.config.global.logLevel];
        if(logLevel > this.levels.debug) {
            return;
        }
        if(!console){
            return;
        }
        console.log("%c" + this.typeName + " %cdebug", "color: rgb(80, 245, 31); font-size:12px; font-weight: bold;","color: rgb(245, 198, 31); font-size:12px;");
        for(var i=0; i<arguments.length; i++) {
            console.debug(arguments[i]);
        }
    };
    this.info = function() {
        var logLevel = this.levels[yayoi.config.global.logLevel];
        if(logLevel > this.levels.info) {
            return;
        }
        if(!console){
            return;
        }
        console.log("%c" + this.typeName + " %cinfo" , "color: rgb(31, 33, 245); font-size:12px; font-weight: bold;", "color: rgb(31, 33, 245); font-size:12px;");
        for(var i=0; i<arguments.length; i++) {
            console.info(arguments[i]);
        }
    };
    this.warn = function() {
        var logLevel = this.levels[yayoi.config.global.logLevel];
        if(logLevel > this.levels.warn) {
            return;
        }
        if(!console){
            return;
        }
        console.log("%c" + this.typeName + " %cwarn" , "color: rgb(245, 114, 31); font-size:12px; font-weight: bold;", "color: rgb(245, 114, 31); font-size:12px;");
        for(var i=0; i<arguments.length; i++) {
            console.warn(arguments[i]);
        }
    };
    this.error = function() {
        var logLevel = this.levels[yayoi.config.global.logLevel];
        if(logLevel > this.levels.error) {
            return;
        }
        if(!console){
            return;
        }
        console.log("%c" + this.typeName + " %cerror" , "color: rgb(245, 31, 31); font-size:12px; font-weight: bold;", "color: rgb(245, 31, 31); font-size:12px;");
        for(var i=0; i<arguments.length; i++) {
            console.error(arguments[i]);
        }
    };
    this.clear = function() {
        clear();
    };
});
