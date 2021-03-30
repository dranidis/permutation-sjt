/**
 * Steinhaus–Johnson–Trotter algorithm, Even's speedup
 * https://en.wikipedia.org/wiki/Steinhaus%E2%80%93Johnson%E2%80%93Trotter_algorithm
 *
 *
 * The Steinhaus–Johnson–Trotter algorithm or Johnson–Trotter algorithm generates
 * all of the permutations of n elements. Each permutation in the sequence that
 * it generates differs from the previous permutation by swapping two adjacent
 * elements of the sequence.
 *
 * An improvement of the Steinhaus–Johnson–Trotter algorithm by Shimon Even
 * provides an improvement to the running time
 * of the algorithm by storing additional information for each element in the
 * permutation: its position, and a direction (positive, negative, or zero) in which
 * it is currently moving.
 */
export class Permutation {
  private numbers: number[] = [];
  private directions: number[] = [];
  private positions: number[] = [];
  private terminated = false;
  /**
   *
   * @param n numbers in the arrray 1..n
   */
  constructor(private n: number, private start = 0) {
    if (n < 0) throw new Error('Permutation constructor expects a positive number');
    /**
     * Initially, the direction of the number 1 is zero,
     * and all other elements have a negative direction
     */
    for (let i = 0; i < n; i++) {
      this.numbers.push(i);
      this.positions.push(i);
      if (i === 0) this.directions.push(0);
      else this.directions.push(-1);
    }
  }

  /**
   * Checks if there is a permutation to return.
   *
   * @returns
   */
  hasNext(): boolean {
    return !this.terminated;
  }
  /**
   * Returns the next permutation of the Steinhaus–Johnson–Trotter algorithm,
   * starting with [1,2,3, ..., n].
   *
   * Returns undefined if the permutations have been exhausted.
   *
   * @returns the next permutation or undefined
   */
  next(): number[] {
    if (this.terminated) {
      throw new Error('next(): there is no next permutation');
    }
    const copy = this.numbers.slice(0);
    this.generateNext();
    if (this.start > 0) return copy.map((i) => i + this.start);
    else return copy;
  }

  /**
   * At each step, the algorithm finds the greatest element with a nonzero direction,
   * and swaps it in the indicated direction.
   *
   * When all numbers become unmarked, the algorithm terminates.
   */
  private generateNext() {
    // findMaxWithDirection;
    let index = -1;
    for (let i = this.n - 1; i >= 0; i--) {
      if (this.directions[i] !== 0) {
        index = this.positions[i];
        break;
      }
    }
    // swap
    if (index !== -1) this.swapWithNextElementInDirection(index);
    else this.terminated = true;
  }

  private swapWithNextElementInDirection(index: number) {
    // precondition this.directions[index] not 0
    /**
     * swaps it in the indicated direction
     */
    const number = this.numbers[index];
    const newIndex = index + this.directions[number];
    const otherNumber = this.numbers[newIndex];

    [this.positions[number], this.positions[otherNumber]] = [this.positions[otherNumber], this.positions[number]];
    [this.numbers[newIndex], this.numbers[index]] = [this.numbers[index], this.numbers[newIndex]];

    /**
     * If this causes the chosen element to reach the first or last position
     * within the permutation, or if the next element in the same direction
     * is greater than the chosen element, the direction of the chosen element is set to zero:
     */
    if (
      newIndex === 0 ||
      newIndex === this.numbers.length - 1 ||
      this.numbers[newIndex] < this.numbers[newIndex + this.directions[number]]
    ) {
      this.directions[number] = 0;
    }

    /**
     * After each step, all elements greater than the chosen element
     * (which previously had direction zero) have their directions
     * set to indicate motion toward the chosen element.
     * */
    for (let i = 0; i < this.numbers.length; i++) {
      if (i === newIndex) continue;
      if (this.numbers[i] > this.numbers[newIndex]) {
        this.directions[this.numbers[i]] = i < newIndex ? 1 : -1;
      }
    }
  }
}
