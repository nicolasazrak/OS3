var assert          = require("assert");
var sjf      = require('../js/algorithms/SJF');
var should          = require('should');
var KLT     = require('../js/algorithms/Commons/KLT');

describe('SJFTest', function () {

    //El test seria valido tanto para SJF (Se apropia) como para SRT (No se apropia)
    it("[Example] Test1", function () {

        var SJF = new sjf();

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
                result: [null, 'cpu', 'cpu', 'scanner', 'scanner', null, null, null, null, null, null, null, null, 'cpu', 'cpu', 'cpu', 'cpu']
            },
            {
                id: 2,
                description: 'KLT 2/ULT 1',
                result: [null, null, null, 'cpu', 'cpu', 'cpu', 'cpu', 'printer', 'printer', null, 'cpu', 'cpu', 'cpu', null, null, null, null]
            },
            {
                id: 3,
                description: 'KLT 3/ULT 1',
                result: ['cpu', 'printer', 'printer', 'printer', null, null, null, 'cpu', 'cpu', 'cpu', null, null, null, null, null, null, null]
            }
        ];

        newQueue = newQueue.map( klt => new KLT(klt) );

        SJF.schedule(newQueue).should.be.eql(result);


    });

});
