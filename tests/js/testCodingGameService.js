/* eslint-env jasmine */
// tests/js/testCodingGameService.js
//
// Copyright (c) 2016-2017 Endless Mobile Inc.
//
// These unit tests test the underlying functionality in CodingGameController
// (apart from the actual sequencing of events themselves).

const GLib = imports.gi.GLib;

const Controller = imports.lib.controller;
const Mocks = imports.mocks.constructors;

describe ('Game Service Controller', function () {
    beforeEach(function () {
        GLib.setenv('GSETTINGS_BACKEND', 'memory', true);
    });

    it('constructs', function() {
        new Controller.CodingGameController(Mocks.Descriptors,
                                            Mocks.createExternalService(),
                                            Mocks.createChatController(),
                                            Mocks.createExternalEffects(),
                                            Mocks.createLogFileWithStructure([]));
    });
});
