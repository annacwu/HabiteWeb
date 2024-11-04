interface Habit {
    name: string;
    frequency: string; // FIXME: make this into its own enum later
    completions: number;
    completionDates: string[];
}

// get references to the DOM elements
const habitForm = document.getElementById('habit-form') as HTMLFormElement;
const habitInput = document.getElementById('habit-input') as HTMLInputElement;
const frequencyInput = document.getElementById('frequency-input') as HTMLInputElement;
const habitList = document.getElementById('habit-list') as HTMLUListElement;

habitForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent page refresh on form submission
    const habitName = habitInput.value.trim(); // trim removes leading/trailing whitespace
    const habitFrequency = frequencyInput.value.trim();

    if (habitName.length > 0 && habitFrequency.length > 0) {
        addHabit(habitName, habitFrequency);
        habitInput.value = '';
        frequencyInput.value = '';
    } else {
        alert('Please fill out all fields.');
    }
});

function addHabit(name: string, frequency: string) {
    const newHabit: Habit = {name, frequency, completions: 0, completionDates: []};
    const li = document.createElement('li'); // makes a new list element in the html
    li.textContent = `${newHabit.name} (${newHabit.frequency}) - Completed: ${newHabit.completions}`;

    // mark as completed button
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete'
    completeButton.addEventListener('click', () => markAsCompleted(newHabit));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    habitList.appendChild(li);
}

function markAsCompleted(habit: Habit) {
    const today = new Date().toISOString().split('T')[0];
    if (!habit.completionDates.includes(today)) {
        habit.completionDates.push(today);
        habit.completions++;
        alert(`Habit ${habit.name} completed.`);
    } else {
        alert(`You've already completed ${habit.name} today.`);
    }
}