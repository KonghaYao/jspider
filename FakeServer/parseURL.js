/*
 * @license
 * Copyright 2021 KonghaYao 江夏尧 <dongzhongzhidong@qq.com>
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * The Regexps were copied from Purl (A JavaScript URL parser) v2.3.1
 * which developed and maintained by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license.
 */
const key = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "hash",
]; // keys available to query
const parser = {
    //less intuitive, more accurate to the specs
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    // more intuitive, fails on relative paths and deviates from specs
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
};

function parseUri(url, strictMode = false) {
    const res = parser[strictMode ? "strict" : "loose"].exec(decodeURI(url));

    const uri = key.reduce((col, keyName, index) => {
        col[keyName] = res[index] || "";
        return col;
    }, {});

    // build query and hash parameters
    uri.queryParams = parseString(uri.query);

    // compile a 'base' domain attribute
    uri["base"] = uri.host
        ? (uri.protocol ? uri.protocol + "://" + uri.host : uri.host) +
          (uri.port ? ":" + uri.port : "")
        : "";

    return uri;
}

function parseString(queryString) {
    return String(queryString)
        .split(/&|;/)
        .reduce(function (collection, pair) {
            try {
                pair = decodeURIComponent(pair.replace(/\+/g, " "));
            } catch (e) {
                // ignore
            }
            let [key, value] = pair.split(/=/g);
            collection[key] = value;
            return collection;
        }, {});
}

export function parseURL(url, strictMode = false) {
    return parseUri(url, strictMode);
}
