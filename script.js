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
      // Clone the elements
      const draggedClone = draggedElement.cloneNode(true);
      const targetClone = e.target.cloneNode(true);

      // Swap the elements
      draggedElement.replaceWith(targetClone);
      e.target.replaceWith(draggedClone);

      // Reassign event listeners to the swapped elements
      reassignEventListeners();
    }
  });
});

// Function to reassign event listeners to new elements
function reassignEventListeners() {
  const newDraggables = document.querySelectorAll('.draggable');
  newDraggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', (e) => {
      draggedElement = e.target;
      e.dataTransfer.effectAllowed = 'move';
    });

    draggable.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });

    draggable.addEventListener('drop', (e) => {
      e.preventDefault();
      if (draggedElement !== e.target) {
        const draggedClone = draggedElement.cloneNode(true);
        const targetClone = e.target.cloneNode(true);

        draggedElement.replaceWith(targetClone);
        e.target.replaceWith(draggedClone);

        reassignEventListeners();
      }
    });
  });
}
