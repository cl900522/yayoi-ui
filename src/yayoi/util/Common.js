"use strict";
yayoi.initPackages("yayoi.util");

yayoi.util.Common = new function() {
    this.chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    this.randomUUID = function() {
        var uuid = [];
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        var radix = this.chars.length;
        var r;

        for (var i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = this.chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }

        return uuid.join("");
    };

    this.randomId = function() {
        var sId = [];
        for (var i = 0; i < 6; i++) {
            sId[i] = this.randomString(4);
        }
        return sId.join("-");
    };

    this.randomString = function(length) {
        var sRandom = "";
        for (var i = 0; i < length; i++) {
            sRandom += this.chars[0 | Math.random() * this.chars.length];
        }
        return sRandom;
    };
}
