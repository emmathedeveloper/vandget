"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlIsValid = exports.streamsToListenToAreValid = exports.isValidValueForHtmlFragment = exports.isValidValueForEachFragment = void 0;
function isValidValueForEachFragment(values) {
    if (!Array.isArray(values) && values.isStream && !Array.isArray(values.value))
        return false;
    if (!Array.isArray(values) && !values.isStream)
        return false;
    return true;
}
exports.isValidValueForEachFragment = isValidValueForEachFragment;
function isValidValueForHtmlFragment(content) {
    if (typeof content !== 'string' && content.isStream && typeof content.value !== 'string')
        return false;
    if (typeof content !== 'string' && !content.isStream)
        return false;
    return true;
}
exports.isValidValueForHtmlFragment = isValidValueForHtmlFragment;
function streamsToListenToAreValid(streams) {
    const allIsStream = streams.every(stream => stream.isStream);
    if (!allIsStream)
        throw new Error('A value you provided to the listen list of a StatefulWidget is not a valid stream');
    return true;
}
exports.streamsToListenToAreValid = streamsToListenToAreValid;
function urlIsValid(url) {
    if (typeof url !== 'string')
        throw new Error('');
}
exports.urlIsValid = urlIsValid;
//# sourceMappingURL=checks.js.map