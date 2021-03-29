/**
 * Steinhaus–Johnson–Trotter algorithm, Even's speedup
 * https://en.wikipedia.org/wiki/Steinhaus%E2%80%93Johnson%E2%80%93Trotter_algorithm
 *
 *
 * A subsequent improvement by Shimon Even provides an improvement to the running time
 * of the algorithm by storing additional information for each element in the
 * permutation: its position, and a direction (positive, negative, or zero) in which
 * it is currently moving (essentially, this is the same information computed using
 * the parity of the permutation in Johnson's version of the algorithm).
 */
export class Permutation {
  private numbers: number[] = [];
  private directions: number[] = [];
  private terminated = false;
  /**
   *
   * @param n numbers in the arrray 1..n
   */
  constructor(private n: number) {
    /**
     * Initially, the direction of the number 1 is zero,
     * and all other elements have a negative direction
     */
    for (let i = 0; i < n; i++) {
      this.numbers?.push(i + 1);
      if (i === 0) this.directions.push(0);
      else this.directions.push(-1);
    }
  }

  next(): number[] | undefined {
    if (this.terminated) {
      return undefined;
    }
    const copy = this.numbers.slice();
    this.generateNext();
    return copy;
  }

  /**
   * At each step, the algorithm finds the greatest element with a nonzero direction,
   * and swaps it in the indicated direction.
   *
   * When all numbers become unmarked, the algorithm terminates.
   */
  private generateNext() {
    const index = this.findMaxWithDirection();
    if (index !== -1) this.swapWithNextElementInDirection(index);
    else this.terminated = true;
  }

  private findMaxWithDirection(): number {
    let max = 0;
    let index = -1;
    for (let i = 0; i < this.numbers.length; i++) {
      if (this.directions[i] !== 0 && this.numbers[i] > max) {
        max = this.numbers[i];
        index = i;
      }
    }
    return index;
  }

  private swapWithNextElementInDirection(index: number) {
    // precondition this.directions[index] not 0
    /**
     * swaps it in the indicated direction
     */
    const newIndex = index + this.directions[index];
    [this.numbers[newIndex], this.numbers[index]] = [this.numbers[index], this.numbers[newIndex]];
    [this.directions[newIndex], this.directions[index]] = [this.directions[index], this.directions[newIndex]];
    /**
     * If this causes the chosen element to reach the first or last position
     * within the permutation, or if the next element in the same direction
     * is greater than the chosen element, the direction of the chosen element is set to zero:
     */
    if (
      newIndex === 0 ||
      newIndex === this.numbers.length - 1 ||
      this.numbers[newIndex] < this.numbers[newIndex + this.directions[newIndex]]
    ) {
      this.directions[newIndex] = 0;
    }

    /**
     * After each step, all elements greater than the chosen element
     * (which previously had direction zero) have their directions
     * set to indicate motion toward the chosen element.
     * */
    for (let i = 0; i < this.numbers.length; i++) {
      if (i === newIndex) continue;
      if (i < newIndex && this.numbers[i] > this.numbers[newIndex]) {
        this.directions[i] = 1;
      }
      if (i > newIndex && this.numbers[i] > this.numbers[newIndex]) {
        this.directions[i] = -1;
      }
    }
  }
}
