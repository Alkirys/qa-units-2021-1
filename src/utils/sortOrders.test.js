import React from 'react'
import {
	sortByItemCount,
	sortByDate,
	getSortFunction,
	sortOrders,
	sortTypes,
} from './sortOrders';

describe('sortByItemCount function', () => {
	it('orders are null', () => {
		const result = sortByItemCount(null, null);
		expect(result).toBe(0);
	});

	it('orders are empty', () => {
		const result = sortByItemCount({}, {});
		expect(result).toBe(0);
	});

	it('orders are numbers', () => {
		const result = sortByItemCount(1, 1);
		expect(result).toBe(0);
	});

	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('order1 < order2', () => {
		const order1 = {
			items: ['item1'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('order1 > order2', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});
});

describe('sortByDate function', () => {
	it('dates are null', () => {
		const result = sortByDate(null, null);
		expect(result).toBe(0);
	});

	it('dates are numbers', () => {
		const result = sortByDate(1, 1);
		expect(result).toBe(0);
	});

	it('dates are empty', () => {
		const result = sortByDate({}, {});
		expect(result).toBe(0);
	});

	it('same date', () => {
		const date1 = {
			date: 1544356800000,
		};

		const date2 = {
			date: 1544356800000,
		};

		const result = sortByDate(date1, date2);

		expect(result).toBe(0);
	});

	it('date1 > date2', () => {
		const date1 = {
			date: 1544356800000,
		};

		const date2 = {
			date: 1552481120000,
		};

		const result = sortByDate(date1, date2);

		expect(result).toBe(1);
	});

	it('date1 < date2', () => {
		const date1 = {
			date: 1552481120000,
		};

		const date2 = {
			date: 1544356800000,
		};

		const result = sortByDate(date1, date2);

		expect(result).toBe(-1);
	});
});

describe('getSortFunction function', () => {
	it('COUNT sort', () => {
		const result = getSortFunction(sortTypes.COUNT);

		expect(result).toBe(sortByItemCount);
	});

	it('DATE sort', () => {
		const result = getSortFunction(sortTypes.DATE);

		expect(result).toBe(sortByDate);
	});
});

describe('sortOrders function', () => {
	it('orders undefined', () => {
		const sortFunc = jest.fn();

		const result = sortOrders(undefined, sortFunc);

		expect(sortFunc).toBeCalledTimes(0);
	});

	it('orders undefined', () => {
		const sortFunc = jest.fn();

		const result = sortOrders([1, 2], undefined);

		expect(sortFunc).toBeCalledTimes(0);
	});

	it('all right', () => {
		const sortFunc = jest.fn();

		const result = sortOrders([1, 2], sortFunc);

		expect(sortFunc).toBeCalledTimes(1);
	});
});