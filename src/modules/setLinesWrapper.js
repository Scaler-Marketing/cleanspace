export function setLinesWrapper(lines, callback) {
  // Wrap each line in a .line-wrapper span
  lines.forEach(line => {
    // add a space right after the last word to prevent the line from collapsing
    const innerHTML = line.innerHTML;
    // add space after the last word
    const newInnerHTML = innerHTML.replace(/(\w+)(\s*)$/, '$1 $2');
    line.innerHTML = newInnerHTML;
  });

  if (typeof callback === 'function') {
    callback();
  }
}