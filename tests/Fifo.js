var fifo    = require('../js/algorithms/Fifo');
var should  = require('should');
var KLT     = require('../js/algorithms/Commons/KLT');

describe('FifoTest', function () {

    it("[Example] Test 1", function () {

        var Fifo = new fifo({log: () => {}});

        var newQueue = [
            {
                id: 1,
                ULTs: [
                    {
                        id: 2,
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
                id: 3,
                ULTs: [
                    {
                        id: 4,
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
                description: 'KLT 1/ULT 1',
                id: 2,
                result: [null, 'cpu', 'cpu', 'cpu', 'io', 'io', 'io', 'io', 'io', 'cpu', 'cpu', 'cpu', 'cpu', 'cpu', null, null, null, null, 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io', null, null, null, null, null, null, null, null ]
            },
            {
                description: 'KLT 2/ULT 1',
                id: 4,
                result: [null, null, null, null, 'cpu', null, null, null, null, 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'cpu', 'cpu', 'cpu', 'cpu', 'cpu', 'cpu', null, null, 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io']
            }
        ];

        newQueue = newQueue.map( klt => new KLT(klt) );

        Fifo.schedule(newQueue).should.be.eql(result);

    });
});
