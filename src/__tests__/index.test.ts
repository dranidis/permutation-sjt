import { Permutation } from '../';

test('1st', () => {
  const p = new Permutation(4);
  let next: number[] | undefined = [];
  const iterations = 1;
  for (let i = 0; i < iterations; i++) next = p.next();
  expect(next).toEqual([1, 2, 3, 4]);
});

test('2nd', () => {
  const p = new Permutation(4);
  let next: number[] | undefined = [];
  const iterations = 2;
  for (let i = 0; i < iterations; i++) next = p.next();
  expect(next).toEqual([1, 2, 4, 3]);
});

test('3rd', () => {
  const p = new Permutation(4);
  let next: number[] | undefined = [];
  const iterations = 3;
  for (let i = 0; i < iterations; i++) next = p.next();
  expect(next).toEqual([1, 4, 2, 3]);
});

test('4rd', () => {
  const p = new Permutation(4);
  let next: number[] | undefined = [];
  const iterations = 4;
  for (let i = 0; i < iterations; i++) next = p.next();
  expect(next).toEqual([4, 1, 2, 3]);
});

test('5th - 4 is zeroed - 3 moves (at the end 4 has direction positive)', () => {
  const p = new Permutation(4);
  let next: number[] | undefined = [];
  const iterations = 5;
  for (let i = 0; i < iterations; i++) next = p.next();
  expect(next).toEqual([4, 1, 3, 2]);
});

test.each([
  [6, [1, 4, 3, 2]],
  [7, [1, 3, 4, 2]],
  [8, [1, 3, 2, 4]],
  [9, [3, 1, 2, 4]],
  [10, [3, 1, 4, 2]],
  [11, [3, 4, 1, 2]],
  [12, [4, 3, 1, 2]],
  [13, [4, 3, 2, 1]],
  [14, [3, 4, 2, 1]],
  [15, [3, 2, 4, 1]],
  [16, [3, 2, 1, 4]],
  [17, [2, 3, 1, 4]],
  [18, [2, 3, 4, 1]],
  [19, [2, 4, 3, 1]],
  [20, [4, 2, 3, 1]],
  [21, [4, 2, 1, 3]],
  [22, [2, 4, 1, 3]],
  [23, [2, 1, 4, 3]],
  [24, [2, 1, 3, 4]],
])('%i-th seq is %p', (n, arr) => {
  const p = new Permutation(4);
  let next: number[] | undefined = [];
  const iterations = n;
  for (let i = 0; i < iterations; i++) next = p.next();
  expect(next).toEqual(arr);
});

test('25 seq is undefined', () => {
  const p = new Permutation(4);
  let next: number[] | undefined = [];
  const iterations = 25;
  for (let i = 0; i < iterations; i++) next = p.next();
  expect(next).toBeUndefined();
});

// test('generate for 5', () => {
//   const p = new Permutation(5);
//   let next: number[] | undefined = p.next();
//   while (next !== undefined) {
//     console.log(next);
//     next = p.next();
//   }
// });
