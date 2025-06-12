/**
 * This function checks the user's preferred color scheme in the browser.
 * @returns {boolean} - Returns true if the user prefers a dark color scheme, otherwise false.
 */
function getWindowScheme(): boolean {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  return mq.matches;
}

export default getWindowScheme;
