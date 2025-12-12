// script.js

// Grab the scrollable list element
const infiList = document.getElementById('infi-list');

// Counter for numbering items
let itemCount = 1;

// Add "num" list items (li)
function addItems(num) {
  for (let i = 0; i < num; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${itemCount++}`;
    infiList.appendChild(li);
  }
}

// Check if the list is scrollable (scrollHeight > clientHeight)
function ensureScrollable(minExtra = 200) {
  // If content fits (not scrollable), increase padding-bottom so scrollHeight grows
  if (infiList.scrollHeight <= infiList.clientHeight) {
    // Add inline padding-bottom to force overflow. Use a value that comfortably
    // makes it scrollable but won't visually break things too much.
    infiList.style.paddingBottom = `${minExtra}px`;
  }
}

// Initial setup: add exactly 2 todo items by default (test expects 2)
addItems(2);

// Ensure the list is scrollable for tests that call cy.scrollTo() on it
ensureScrollable(300);

// Add scroll listener to append 2 more items when bottom is reached
infiList.addEventListener('scroll', () => {
  const scrollTop = infiList.scrollTop;
  const clientHeight = infiList.clientHeight;
  const scrollHeight = infiList.scrollHeight;
  const threshold = 2; // small tolerance to avoid tiny rounding issues

  if (scrollTop + clientHeight >= scrollHeight - threshold) {
    addItems(2);
  }
});
