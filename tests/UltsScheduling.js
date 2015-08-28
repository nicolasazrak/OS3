'use strict';

var should  		= require('should');
var Fifo 			= require('../js/algorithms/Fifo');
var RoundRobin    	= require('../js/algorithms/RoundRobin');
var SJF				= require('../js/algorithms/SJF');
var ULT				= require('../js/algorithms/Commons/ULT');


describe('Checking ULTs scheduling ', () => {

	it('should schedule ULTs with Fifo', () => {

		var ults = [
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
			},
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
		];

		var results = [
			{
                id: 1,
                description: 'KLT 1/ULT 1',
                result: [null, 'cpu', 'cpu', 'cpu', 'io', 'io', 'io', 'io', 'io', 'cpu', 'cpu', 'cpu', 'cpu', 'cpu', null, null, null, null, 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io', null, null, null, null, null, null, null, null ]
            },
            {
                id: 2,
                description: 'KLT 2/ULT 1',
                result: [null, null, null, null, 'cpu', null, null, null, null, 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'cpu', 'cpu', 'cpu', 'cpu', 'cpu', 'cpu', null, null, 'io', 'io', 'io', 'io', 'io', 'io', 'io', 'io']
            }
		];

		ults = ults.map( ult => new ULT(ult) );
		new Fifo({log: () => {}}).schedule(ults).should.be.eql(results);

	})

	it('should schedule ULTs with RoundRobin', () => {

		var ults = [
			{
				id: 1,
				description: 'KLT 1/ULT 1',
				start: 0,
				bursts: [
					{ device: 'cpu', quantum: 4 },
					{ device: 'io',  quantum: 3 },
					{ device: 'cpu', quantum: 2 },
				]
			},
			{
				id: 2,
				description: 'KLT 2/ULT 1',
				start: 2,
				bursts: [
					{ device: 'cpu', quantum: 1 },
					{ device: 'io',  quantum: 5 },
					{ device: 'cpu', quantum: 4 },
				]
			}
		];

		var results = [
			{
				id: 1,
				description: 'KLT 1/ULT 1',
				result: ['cpu', 'cpu', 'cpu', null, 'cpu', null, null, null, null, 'io', 'io', 'io', null, 'cpu', 'cpu']
			},
			{
				id: 2,
				description: 'KLT 2/ULT 1',
				result: [null, null, null, 'cpu', 'io', 'io', 'io', 'io', 'io', 'cpu', 'cpu', 'cpu', 'cpu', null, null]
			}
		];

		ults = ults.map( ult => new ULT(ult) );
		new RoundRobin({log: () => {}}).schedule(ults, {
			quantum: {
				cpu: 3
			}
		}).should.be.eql(results);

	})


	it('should schedule ULTs with SJF', () => {

		var ults = [
			{
				id: 1,
				description: 'KLT 1/ULT 1',
				start: 0,
				bursts: [
					{ device: 'cpu', quantum: 3 },
					{ device: 'io',  quantum: 3 },
					{ device: 'cpu', quantum: 2 },
				]
			},
			{
				id: 2,
				description: 'KLT 2/ULT 1',
				start: 0,
				bursts: [
					{ device: 'cpu', quantum: 1 },
					{ device: 'io',  quantum: 5 },
					{ device: 'cpu', quantum: 4 },
				]
			}
		];

		var results = [
			{
				id: 1,
				description: 'KLT 1/ULT 1',
				result: [null, 'cpu', 'cpu', 'cpu', null, null, 'io', 'io', 'io', null, 'cpu', 'cpu']
			},
			{
				id: 2,
				description: 'KLT 2/ULT 1',
				result: ['cpu', 'io', 'io', 'io', 'io', 'io', 'cpu', 'cpu', 'cpu', 'cpu', null, null]
			}
		];

		ults = ults.map( ult => new ULT(ult) );
		new SJF({log: () => {}}).schedule(ults).should.be.eql(results);

	})



});
