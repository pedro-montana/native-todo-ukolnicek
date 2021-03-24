import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';

export const useTasks = (selectedProject = 'NEXT_7') => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .where('userId', '==', 'o5xLFrfzgrbTnfK7Iq9Ut3dTX9S2');

        unsubscribe =
            selectedProject && !collatedTasksExist(selectedProject)
                ? (unsubscribe = unsubscribe.where(
                      'projectId',
                      '==',
                      selectedProject
                  ))
                : selectedProject == 'TODAY'
                ? (unsubscribe = unsubscribe.where(
                      'date',
                      '<=',
                      moment().format('YYYY/MM/DD')
                  ))
                : selectedProject == 'INBOX' || selectedProject === 0
                ? unsubscribe
                : unsubscribe;

        unsubscribe = unsubscribe.onSnapshot((snapshot) => {
            const newTasks = snapshot.docs.map((task) => ({
                id: task.id,
                ...task.data(),
            }));

            setTasks(
                selectedProject === 'NEXT_7'
                    ? newTasks.filter(
                          (task) =>
                              moment(task.date, 'YYYY/MM/DD').diff(
                                  moment(),
                                  'days'
                              ) <= 7 && task.archived !== true
                      )
                    : newTasks.filter(
                          (task) => task.archived === false || !task.archived
                      )
            );

            setArchivedTasks(
                newTasks.filter((task) => task.archived != false)
            );
        });
        return () => unsubscribe();
    }, [selectedProject]);

    return { tasks, archivedTasks };
};

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection('projects')
            .where('userId', '==', 'o5xLFrfzgrbTnfK7Iq9Ut3dTX9S2')
            .orderBy('projectId')
            .get()
            .then((snapshot) => {
                const allProjects = snapshot.docs.map((project) => ({
                    ...project.data(),
                    docId: project.id,
                }));
                if (
                    JSON.stringify(
                        allProjects.map((a) => a.projectId + '_' + a.name)
                    ) !==
                    JSON.stringify(
                        projects.map((p) => p.projectId + '_' + p.name)
                    )
                ) {
                    setProjects(allProjects);
                }
            });
    }, [projects]);
    return { projects, setProjects };
};
