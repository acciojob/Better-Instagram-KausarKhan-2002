//your code here

// Select all draggable elements
const draggables = document.querySelectorAll('.draggable');
let draggedElement = null;

// Add event listeners to each draggable element
draggables.forEach((draggable) => {
  // When drag starts
  draggable.addEventListener('dragstart', (e) => {
    draggedElement = e.target; // Store the element being dragged
    e.dataTransfer.effectAllowed = 'move'; // Indicate allowed action
  });

  // When another element is dragged over
  draggable.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow dropping
    e.dataTransfer.dropEffect = 'move'; // Indicate the action type
  });

  // When the dragged element is dropped on another element
  draggable.addEventListener('drop', (e) => {
    e.preventDefault();

    // Prevent drop on the same element
    if (draggedElement !== e.target) {
      // Swap the elements without cloning
      const draggedPosition = draggedElement.getBoundingClientRect();
      const targetPosition = e.target.getBoundingClientRect();

      // Determine the direction to swap based on proximity
      if (draggedPosition.top < targetPosition.top) {
        // If dragged element is above, swap below
        e.target.insertAdjacentElement('afterend', draggedElement);
      } else {
        // If dragged element is below, swap above
        e.target.insertAdjacentElement('beforebegin', draggedElement);
      }
    }
  });
});
