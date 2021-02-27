import getIcon from './getIcon';

const renderTaskRow = (task) => {
  const { id, title } = task;
  return `
    <tr data-id="${id}">
        <td><span class="id-row"></span></td>
        <td id="task-title-${id}">${title}</td>
        <td>
            <div
                class="btn-group"
                role="group"
                aria-label="Basic mixed styles example"
            >
                <button class="btn btn-danger" id="delete-task-btn-${id}">
                    ${getIcon('trash')}
                </button>
                <button type="button" class="btn btn-success" id="start-task-btn-${id}">
                    ${getIcon('play')}
                </button>
                <button type="button" class="btn btn-primary" id="complete-task-btn-${id}">
                    ${getIcon('check')}
                </button>
            </div>
        </td>
    </tr>
`;
};

export default renderTaskRow;
