[![npm version](https://badge.fury.io/js/permutation-sjt.svg)](https://badge.fury.io/js/permutation-sjt)
[![Build Status](https://travis-ci.org/dranidis/permutation-sjt.svg?branch=main)](https://travis-ci.org/github/dranidis/permutation-sjt)
[![Coverage Status](https://coveralls.io/repos/github/dranidis/permutation-sjt/badge.svg)](https://coveralls.io/github/dranidis/permutation-sjt)
[![Dependencies Status](https://status.david-dm.org/gh/dranidis/permutation-sjt.svg)](https://status.david-dm.org/gh/dranidis/permutation-sjt)

# permutation-sjt

A quite fast permutation algorithm that does not use a lot of memory, O(n).

Instead of returning a whole array of permutations, the method `next()` returns the next permutation. Each permutation is based on the previous and is calculated quickly.

The boolean method `hasNext()` checks if there is a next permutation.

The array returned by `next()` can be used as the indices for the actual array to be permuted. For example we can use map as in the following example to get a permutation of the actual array:

```TypeScript
const arr = ['A', 'B', 'C'];

const p = new Permutation(arr.length);

while (p.hasNext()) {
  const arrPermutation = p.next().map((i) => arr[i]);
  ...
}
```

## Run-time performance

If you need to generate ALL permutations with a loop like the one above, the complexity is `O(n!)`:

- Performs well with `n < 13`.
- `n = 13` takes several minutes to complete.
- No problems with memory, `O(n)`.

## Steinhaus–Johnson–Trotter algorithm (Even's speedup)

The Steinhaus–Johnson–Trotter algorithm or Johnson–Trotter algorithm generates
all of the permutations of n elements. Each permutation in the sequence that
it generates differs from the previous permutation by swapping two adjacent
elements of the sequence.

An improvement of the Steinhaus–Johnson–Trotter algorithm by Shimon Even
provides an improvement to the running time
of the algorithm by storing additional information for each element in the
permutation: its position, and a direction (positive, negative, or zero) in which
it is currently moving.

This algorithm takes time O(i) for every step in which the greatest number to move is n − i + 1.

For more information visit:
https://en.wikipedia.org/wiki/Steinhaus%E2%80%93Johnson%E2%80%93Trotter_algorithm

## Install

```
npm i permutation-sjt
```

## Usage

```TypeScript
import { Permutation } from 'permutation-sjt';

const p = new Permutation(3);

const permutations = [];

while (p.hasNext()) {
  permutations.push(p.next());
}

console.log(permutations);
```

outputs

```
    [
      [ 0, 1, 2 ],
      [ 0, 2, 1 ],
      [ 2, 0, 1 ],
      [ 2, 1, 0 ],
      [ 1, 2, 0 ],
      [ 1, 0, 2 ]
    ]
```

```TypeScript
import { Permutation } from 'permutation-sjt';

const p = new Permutation(2, 1); // starts numbers from 1

const permutations = [];

while (p.hasNext()) {
  permutations.push(p.next());
}

console.log(permutations);
```

outputs

```
[ [ 1, 2 ], [ 2, 1 ] ]
```
