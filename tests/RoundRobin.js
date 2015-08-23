var assert  = require("assert");
var roundrobin    = require('../js/algorithms/RoundRobin');
var should  = require('should');


describe('RoundRobinTest', function () {

    /*before(function(){
        //Silent console messages
        console.log = function(){};
    }),*/

    it("[Example] Test 1", function () {

        var RoundRobin = new roundrobin();

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
                        id: 1,
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
                klt_id: 1,
                ult_id: 1,
                result: [null, 'cpu', 'cpu', null, 'cpu', null, null, null, null, null, null, null, null, 'io', 'io', 'io', 'io', 'io', null, 'cpu', 'cpu', 'cpu', 'cpu', 'cpu', null, null, null, 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io' ]
            },
            {
                description: 'KLT 2/ULT 1',
                klt_id: 2,
                ult_id: 1,
                result: [null, null, null, 'cpu', 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'cpu', 'cpu', 'cpu', 'cpu', 'cpu', 'cpu', 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io', null, null, null, null, null, null, null, null ]
            }
        ];

        RoundRobin.schedule(newQueue, {
            quantum: {
                cpu: 2
            }
        }).should.be.eql(result);

    });
});
