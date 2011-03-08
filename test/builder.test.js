var target = document.getElementById('target');

module('build');

test('return collection', 2, function() {
    var cl = builder.build({ view: 'Base' });
    equal(cl.length, 1);
    equal(cl[0].typeName, 'Base');
});

test('set attributes', 1, function() {
    var cl = builder.build({ view: 'Base', text: 'foo' });
    equal(cl[0].text(), 'foo');
});

test('array of ml', 1, function() {
    var cl = builder.build([{ view: 'Base', text: 'foo' }]);
    equal(cl[0].text(), 'foo');
});

test('set childViews', 3, function() {
    var cl = builder.build({ view: 'Container', childViews: [
        { view: 'Base', text: 'foo1' },
        { view: 'Base', text: 'foo2' }
    ]});
    equal(cl.length, 1);
    equal(cl[0].childViews().length, 2);
    equal(cl[0].childViews()[0].typeName, 'Base');
});

test('from constructor', 2, function() {
    var cl = builder.build({ view: builder.viewNamespaces[0].Base });
    equal(cl.length, 1);
    equal(cl[0].typeName, 'Base');
});

test('set childViews', 5, function() {
    var cl = builder.build({ view: 'Container', childViews: [
        { view: 'Base', text: 'foo1' },
        { view: 'Base', text: 'foo2' }
    ]});
    var dcl = builder.build(cl);
    equal(dcl.length, 1);
    equal(dcl[0].childViews().length, 2);
    equal(dcl[0].childViews()[0].typeName, 'Base');
    ok(cl[0] === dcl[0]);
    ok(cl[0].childViews()[0] === dcl[0].childViews()[0]);
});
