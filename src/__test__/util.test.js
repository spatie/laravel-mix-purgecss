const { omit } = require('../util');

describe('omit', () => {
    it('can omit object values', () => {
        const object = { a: 'a', b: 'b', c: 'c' };
        const omitted = omit(object, ['a', 'c']);

        expect(omitted).toEqual({ b: 'b' });
        expect(object).toEqual({ a: 'a', b: 'b', c: 'c' });
    });
});
