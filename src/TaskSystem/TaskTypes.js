import { types } from 'mobx-state-tree';
const TaskState = types.enumeration('TaskState', ['free', 'pending', 'complete', 'error', 'destroyed']);

const AutoType = {
    anyType: types.custom({
        name: 'any',
        fromSnapshot(value) {
            return value;
        },
        toSnapshot(value) {
            return value;
        },
        isTargetType() {
            return true;
        },
        getValidationMessage() {
            return '';
        },
    }),
};

export { AutoType, TaskState };
