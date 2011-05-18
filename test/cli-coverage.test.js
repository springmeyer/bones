var assert = require('assert');
var exec = require('child_process').exec;

require('./fixture');
exports['test --help'] = function(beforeExit) {
    var completed = false;

    require('optimist').argv = { _: [], '$0': 'node ./test/fixture', help: true };
    require('bones').start(function(output) {
        completed = true;

        assert.deepEqual(output, [
            [ 'Usage: %s for a list of options.', '\u001b[0;32mnode ./test/fixture [command] --help\u001b[0m' ],
            [ 'Available commands are:' ],
            [ '  start:  start application' ]
        ]);
    });

    beforeExit(function() { assert.ok(completed); });
};

exports['test start --help'] = function(beforeExit) {
    var completed = false;

    require('optimist').argv = { _: ['start'], '$0': 'node ./test/fixture', help: true };
    require('bones').start(function(output) {
        completed = true;
        assert.deepEqual(output, [
            [ 'Usage: %s', '\u001b[0;32mnode ./test/fixture start [options...]\u001b[0m' ],
            [ '%s%s: %s', '\u001b[1;33mstart\u001b[0m', '\u001b[0;33m\u001b[0m', 'start application' ],
            [ '    --config=[path]  Path to JSON configuration file.' ]
        ]);
    });

    beforeExit(function() { assert.ok(completed); });
};
