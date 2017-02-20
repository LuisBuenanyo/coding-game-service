// mocks/constructors.js
//
// Copyright (c) 2016-2017 Endless Mobile Inc.
//
// These mocks stub out the external functionality for the
// CodingGameController so that it can be unit tested more
// easily.

const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Lang = imports.lang;

const Controller = imports.lib.controller;

const Descriptors = {
    warnings: [],
    events: [
        {
            name: 'start-mission::none',
            type: 'start-mission',
            data: {
                name: 'none'
            }
        },
        {
            name: 'none::event',
            type: 'chat-actor',
            data: {
                actor: 'MEME',
                message: 'Hey you'
            }
        },
    ],
    start: {
        initial_event: 'start-mission::none'
    },
    missions: [
        {
            name: 'none',
            short_desc: 'Short Description',
            long_desc: 'Long Description',
            start_events: [
                'none::event'
            ],
            'artifacts': [
            ]
        },
    ]
};
const createChatController = jasmine.createSpyObj.bind(this, 'ChatControllerMock', [
    'sendChatMessage',
    'reset'
]);
const createExternalService = jasmine.createSpyObj.bind(this, 'ExternalServiceMock', [
    'connectHandlers',
    'setGameManagerState',
    'currentMission',
    'completeTaskWithPoints',
    'listeningForEvents'
]);
const ExternalEffectsStub = new Lang.Class({
    Name: 'ExternalEffectsStub',

    performEventIn: function(name, timeout, callback) {
        callback();
    },

    cancelPendingEvent: function(name) {
    },

    cancelAllPendingEvents: function() {
    },

    changeGSettingsValue: function(settings, key, value) {
    },

    fetchGSettingsValue: function(settings, key, variant) {
        // Essentially, we just have some known data
        // that we will want to test with here
        switch (variant) {
        case 'as':
            return [];
        case 'b':
            return true;
        case 's':
            return 'example';
        default:
            throw new Error('Don\'t know how to handle variant type ' + variant);
        }
    },

    copySourceToTarget: function(settings, key, value) {
    },

    addApplication: function(app) {
    },

    removeApplication: function(app) {
    },

    removeFile: function(app) {
    }
});
const createExternalEffects = function() {
    let effects = new ExternalEffectsStub();
    spyOn(effects, 'performEventIn').and.callThrough();
    spyOn(effects, 'changeGSettingsValue');
    spyOn(effects, 'copySourceToTarget');
    spyOn(effects, 'addApplication');
    spyOn(effects, 'removeApplication');
    spyOn(effects, 'removeFile');
    return effects;
}
const createLogFileWithStructure = function(structure) {
    let [logFile, logFileStream] = Gio.File.new_tmp("game-service-log-XXXXXX");
    logFileStream.output_stream.write(JSON.stringify(structure), null);
    return logFile;
}
