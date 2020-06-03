import Vue from "vue";
import Vuex from "vuex";
import omit from "lodash/omit";
import { createTask, deleteTask, updateTask } from "../request/tasks";
import { createGroup, deleteGroup, updateGroup } from "../request/groups";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    groups: [],
    init: false
  },
  actions: {
    addTask({ state }, newTask) {
      createTask(newTask).then(createdTask => {
        state.tasks.push(createdTask);
      });
    },
    updateTask({ state }, task) {
      updateTask(task._id, omit(task, "_id")).then(updatedTask => {
        for (let i = 0; i < state.tasks.length; ++i) {
          if (state.tasks[i]._id === updatedTask._id) {
            state.tasks[i].title = updatedTask.title;
            state.tasks[i].description = updatedTask.description;
            state.tasks[i].done = updatedTask.done;
            state.tasks[i].group = updatedTask.group;
            break;
          }
        }
      });
    },
    removeTask({ state }, taskId) {
      deleteTask(taskId).then(() => {
        for (let i = 0; i < state.tasks.length; ++i) {
          if (state.tasks[i]._id === taskId) {
            state.tasks.splice(i, 1);
            break;
          }
        }
      });
    },
    addGroup({ state }, newGroup) {
      createGroup(newGroup).then(createdGroup => {
        state.groups.push(createdGroup);
      });
    },
    updateGroup({ state }, group) {
      updateGroup(group._id, omit(group, "_id")).then(updatedGroup => {
        for (let i = 0; i < state.groups.length; ++i) {
          if (state.groups[i]._id === updatedGroup._id) {
            state.groups[i].title = updatedGroup.title;
            break;
          }
        }
      });
    },
    removeGroup({ state }, groupId) {
      deleteGroup(groupId).then(() => {
        for (let i = 0; i < state.groups.length; ++i) {
          if (state.groups[i]._id === groupId) {
            state.groups.splice(i, 1);
            break;
          }
        }
      });
    }
  }
});
