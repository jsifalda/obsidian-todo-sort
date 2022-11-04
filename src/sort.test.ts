import { sortTodos } from "./sort";

test("sort incomplete", () => {
	const input = `
- [ ] a
- [ ] b
- [ ] c
`;
	const expectedOutput = `
- [ ] a
- [ ] b
- [ ] c
`;
	const result = sortTodos(input);
	expect(result.output).toBe(expectedOutput);
	expect(result.lineMap).toStrictEqual({
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
	});
});

test("sort mixed, already sorted", () => {
	const input = `
- [x] a
- [ ] b
- [ ] c
`;
	const expectedOutput = `
- [x] a
- [ ] b
- [ ] c
`;
	const result = sortTodos(input);
	expect(result.output).toBe(expectedOutput);
	expect(result.lineMap).toStrictEqual({
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
	});
});

test("sort mixed, not sorted", () => {
	const input = `
- [ ] a
- [ ] b
- [x] c
`;
	const expectedOutput = `
- [x] c
- [ ] a
- [ ] b
`;
	const result = sortTodos(input);
	expect(result.output).toBe(expectedOutput);
	expect(result.lineMap).toStrictEqual({
		0: 0,
		1: 2,
		2: 3,
		3: 1,
		4: 4,
	});
});

test("sort double list, not sorted", () => {
	const input = `
- [ ] a
- [ ] b
- [x] c
Hi
\t- [ ] d
\t- [x] e
\t- [ ] f
`;
	const expectedOutput = `
- [x] c
- [ ] a
- [ ] b
Hi
\t- [x] e
\t- [ ] d
\t- [ ] f
`;
	const result = sortTodos(input);
	expect(result.output).toBe(expectedOutput);
	expect(result.lineMap).toStrictEqual({
		0: 0,
		1: 2,
		2: 3,
		3: 1,
		4: 4,
		5: 6,
		6: 5,
		7: 7,
		8: 8,
	});
});

test("sort very nested", () => {
	const input = `
- Today
\t- [ ] a
\t- [ ] b
\t\t- This is a child note
\t- [x] c
\t\t- And so is this
- Tomorrow
\t- [ ] d
\t\t- [ ] d1
\t\t- [x] d2
\t- [x] e
\t- [ ] f
`;
	const expectedOutput = `
- Today
\t- [x] c
\t\t- And so is this
\t- [ ] a
\t- [ ] b
\t\t- This is a child note
- Tomorrow
\t- [x] e
\t- [ ] d
\t\t- [x] d2
\t\t- [ ] d1
\t- [ ] f
`;
	const result = sortTodos(input);
	expect(result.output).toBe(expectedOutput);
	expect(result.lineMap).toStrictEqual({
		0: 0,
		1: 1,
		2: 4,
		3: 5,
		4: 6,
		5: 2,
		6: 3,
		7: 7,
		8: 9,
		9: 11,
		10: 10,
		11: 8,
		12: 12,
		13: 13,
	});
});
