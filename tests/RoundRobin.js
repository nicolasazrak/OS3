var assert          = require("assert");
var roundrobin      = require('../js/algorithms/RoundRobin');
var should          = require('should');
var KLT     = require('../js/algorithms/Commons/KLT');

describe('RoundRobinTest', function () {

    it("[Example] Test 1", function () {

        var RoundRobin = new roundrobin({log: () => {}});

        var newQueue = [
            {
                id: 1,
                ultCounter: 2,
                ULTs: [
                    {
                        id: 1,
                        description: 'KLT 1/ULT 1',
                        start: 1,
                        bursts: [
                            { device: 'cpu', quantum: 3 },
                            { device: 'io',  quantum: 5 },
                            { device: 'cpu', quantum: 5 },
                            { device: 'io',  quantum: 8 }
                        ]
                    }
                ]
            },
            {
                id: 2,
                ultCounter: 3,
                ULTs: [
                    {
                        id: 2,
                        description: 'KLT 2/ULT 1',
                        start: 2,
                        bursts: [
                            { device: 'cpu', quantum: 1 },
                            { device: 'io',  quantum: 9 },
                            { device: 'cpu', quantum: 6 },
                            { device: 'io',  quantum: 8 }
                        ]
                    }
                ]
            },
        ];

        var result =  [
            {
                id: 1,
                description: 'KLT 1/ULT 1',
                result: [null, 'cpu', 'cpu', null, 'cpu', null, null, null, null, null, null, null, null, 'io', 'io', 'io', 'io', 'io', null, 'cpu', 'cpu', 'cpu', 'cpu', 'cpu', null, null, null, 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io' ]
            },
            {
                id: 2,
                description: 'KLT 2/ULT 1',
                result: [null, null, null, 'cpu', 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'cpu', 'cpu', 'cpu', 'cpu', 'cpu', 'cpu', 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io', null, null, null, null, null, null, null, null ]
            }
        ];

        newQueue = newQueue.map( klt => new KLT(klt) );

        RoundRobin.schedule(newQueue, {
            quantum: {
                cpu: 2
            }
        }).should.be.eql(result);


    });

    it("[Example] Test 2", function () {

        var RoundRobin = new roundrobin({log: () => {}});

        var newQueue = [
            {
                id: 1,
                ultCounter: 2,
                ULTs: [
                    {
                        id: 1,
                        description: 'KLT 1/ULT 1',
                        start: 1,
                        bursts: [
                            { device: 'cpu', quantum: 2 },
                            { device: 'scanner',  quantum: 2 },
                            { device: 'cpu', quantum: 4 }
                        ]
                    }
                ]
            },
            {
                id: 2,
                ultCounter: 3,
                ULTs: [
                    {
                        id: 2,
                        description: 'KLT 2/ULT 1',
                        start: 0,
                        bursts: [
                            { device: 'cpu', quantum: 4 },
                            { device: 'printer',  quantum: 2 },
                            { device: 'cpu', quantum: 3 }
                        ]
                    }
                ]
            },
            {
                id: 3,
                ultCounter: 3,
                ULTs: [
                    {
                        id: 3,
                        description: 'KLT 3/ULT 1',
                        start: 0,
                        bursts: [
                            { device: 'cpu', quantum: 1 },
                            { device: 'printer',  quantum: 3 },
                            { device: 'cpu', quantum: 3 }
                        ]
                    }
                ]
            },
        ];

        var result =  [
            {
                id: 1,
                description: 'KLT 1/ULT 1',
                result: [null, null, null, null, 'cpu', 'cpu', 'scanner', 'scanner', null, null, 'cpu', 'cpu', 'cpu', null, null, null, 'cpu']
            },
            {
                id: 2,
                description: 'KLT 2/ULT 1',
                result: ['cpu', 'cpu', 'cpu', null, null, null, 'cpu', 'printer', 'printer', null, null, null, null, 'cpu', 'cpu', 'cpu', null]
            },
            {
                id: 3,
                description: 'KLT 3/ULT 1',
                result: [null, null, null, 'cpu', 'printer', 'printer', 'printer', 'cpu', 'cpu', 'cpu', null, null, null, null, null, null, null]
            }
        ];

        newQueue = newQueue.map( klt => new KLT(klt) );

        RoundRobin.schedule(newQueue, {
            quantum: {
                cpu: 3
            }
        }).should.be.eql(result);


    });

});
