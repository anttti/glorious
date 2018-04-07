import PouchDB from 'pouchdb';

PouchDB.plugin(require('relational-pouch'));
PouchDB.plugin(require('pouchdb-find'));

const db = new PouchDB('glorious');

db.setSchema([
  {
    singular: 'area',
    plural: 'areas',
    relations: {
      projects: { hasMany: 'project' }
    }
  },
  {
    singular: 'project',
    plural: 'projects',
    relations: {
      area: { belongsTo: 'area' },
      tasks: { hasMany: 'task' }
    }
  },
  {
    singular: 'task',
    plural: 'tasks',
    relations: {
      project: { belongsTo: 'project' },
      tags: { hasMany: 'tag' }
    }
  },
  {
    singular: 'tag',
    plural: 'tags',
    relations: {
      tasks: { hasMany: 'task' }
    }
  }
]);

db.rel.find('project').then(res => console.log(res));

export function fetchAreas() {
  return db.rel.find('area').then(res => res.areas);
}

export function createArea(title) {
  return db.rel.save('area', { title }).then(e => e.areas[0]);
}

export function createProject(areaId, title) {
  return db.rel
    .save('project', {
      title,
      area: areaId
    })
    .then(e => e.projects[0]);
}

export function createTask(projectId, title) {
  return db.rel
    .save('task', {
      title,
      project: projectId,
      isComplete: false,
      dateCreated: new Date().getTime(),
      dateFinished: null,
      hasStartDate: false,
      startDate: null,
      hasDueDate: false,
      dueDate: null
    })
    .then(e => e.tasks[0]);
}

export function fetchProjects(areaId) {
  return db.rel
    .findHasMany('project', 'area', areaId)
    .then(res => res.projects);
}

export function fetchTasks(projectId) {
  return db.rel
    .findHasMany('task', 'project', projectId)
    .then(res => res.tasks);
}

export function deleteArea(areaId) {
  return deleteEntity('area', areaId);
}

export function deleteProject(projectId) {
  return deleteEntity('project', projectId);
}

export function deleteTask(taskId) {
  return deleteEntity('task', taskId);
}

function deleteEntity(entity, id) {
  return db.rel.find(entity, id).then(e => {
    let toBeDeleted = e;
    if (e[entity] || e[`${entity}s`]) {
      // Pick the correct thing from something like
      // Object {projects: Array(6), areas: Array(1)}
      toBeDeleted = e[entity] ? e[entity][0] : e[`${entity}s`][0];
    }
    return db.rel.del(entity, toBeDeleted);
  });
}

export function toggleTask(taskId) {
  return db.rel
    .find('task', taskId)
    .then(t => {
      const task = t.tasks[0];
      task.isComplete = !task.isComplete;
      if (task.isComplete) {
        task.dateFinished = new Date().getTime();
      } else {
        task.dateFinished = null;
      }
      return db.rel.save('task', task);
    })
    .then(t => t.tasks[0]);
}
