const tasksDom = document.querySelector('.tasks');
const formDom = document.querySelector('.task-form');
const taskInputDom = document.querySelector('.task-input');
const formAlertDom = document.querySelector('.form-alert');

const showTasks = async () => {
  try {
    const { data: tasks } = await axios('/api/v1/tasks');

    if (tasks.length === 0) {
      tasksDom.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
      return;
    }

    const allTasks = tasks
      .map((task) => {
        const { completed, _id, name } = task;
        return ` <div class="single-task ${completed && 'task-completed'}">
      <h5>
        <span><i class="far fa-check-circle"></i></span>${name}
      </h5>
      <div class="task-links">
        <a href="edit.html?id=${_id}" class="edit-link">
          <i class="fas fa-edit"></i>
        </a>
        <button type="button" class="delete-btn" data-id="${_id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`;
      })
      .join('');
    tasksDom.innerHTML = allTasks;
  } catch (error) {
    console.log(error);
  }
};

showTasks();

//タスクの追加
formDom.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = taskInputDom.value;
  try {
    await axios.post('/api/v1/tasks', { name: name });
    showTasks();
    taskInputDom.value = '';
    formAlertDom.style.disply = 'block';
    formAlertDom.textContent = 'タスクが追加されました';
  } catch (error) {
    formAlertDom.style.disply = 'block';
    formAlertDom.innerHTML = '20文字以内で入力してください';
  }
  setTimeout(() => {
    formAlertDom.innerHTML = '';
  }, 3000);
});

//タスクの削除
tasksDom.addEventListener('click', async (e) => {
  const element = e.target;

  if (element.parentElement.classList.contains('delete-btn')) {
    const id = element.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
});
