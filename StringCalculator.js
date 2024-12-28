class StringCalculator {
  add(numbers) {
    if (!numbers) return 0;

    let delimiter = /[,\n]/;

    if (numbers.startsWith("//")) {
      const parts = numbers.split("\n");
      const customDelimiter = parts[0].match(/\[(.+?)\]/g);
      if (customDelimiter) {
        delimiter = new RegExp(
          customDelimiter
            .map((d) => d.slice(1, -1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) // Escape special characters
            .join("|")
        );
      } else {
        delimiter = new RegExp(
          parts[0][2].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        ); // Escape special characters
      }
      numbers = parts[1];
    }

    const numArray = numbers
      .split(delimiter)
      .map((num) => parseInt(num, 10))
      .filter((n) => n <= 1000);

    const negatives = numArray.filter((n) => n < 0);
    if (negatives.length > 0) {
      throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
    }

    return numArray.reduce((sum, n) => sum + (isNaN(n) ? 0 : n), 0);
  }
}

// Export the class for testing
module.exports = StringCalculator;
