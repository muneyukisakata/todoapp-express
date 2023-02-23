const taskIdDom = document.querySelector('.task-edit-id');
const taskNameDom = document.querySelector('.task-edit-name');
const editFormDom = document.querySelector('.single-task-form');
const taskCompletedDom = document.querySelector('.task-edit-completed');

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

console.log(id);

const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id, name, completed } = task;
    taskIdDom.textContent = _id;
    taskNameDom.value = name;
    if (completed) {
      taskCompletedDom.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTask();

//タスクの編集
editFormDom.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const taskName = taskNameDom.value;
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompletedDom.checked,
    });
    window.location.href = 'index.html';
  } catch (error) {
    console.log(error);
  }
});
