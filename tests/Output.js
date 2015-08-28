var should  = require('should');
var KLT     = require('../js/algorithms/Commons/KLT');
var ULT     = require('../js/algorithms/Commons/ULT');
var Output 	= require('../js/algorithms/Commons/Output');


describe('Common Output', function () {

    it("shoud create output for KLT", function () {

		var newQueue = [
            new KLT({
                id: 1,
                ultCounter: 2,
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
            }),
            new KLT({
                id: 3,
                ultCounter: 3,
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
            }),
        ];


		Output.createInitialQueue(newQueue).should.be.eql(
			[
				{
					id: 2,
					description: 'KLT 1/ULT 1',
					result: []
				},
				{
					id: 4,
					description: 'KLT 2/ULT 1',
					result: []
				}
			]
		);

    });

    it("shoud create output for ULT", function () {

		var ults = [
            new ULT(
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
            ),
            new ULT(
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
            )
        ];

		Output.createInitialQueue(ults).should.be.eql(
			[
				{
					id: 2,
					description: 'KLT 1/ULT 1',
					result: []
				},
				{
					id: 4,
					description: 'KLT 2/ULT 1',
					result: []
				}
			]
		);

    });


});
