import { View } from './View';

export class MemoryView extends View {
    constructor(config) {
        super(Object.assign(config, { tasks: true, controlPanel: false }));
    }
    _update(data) {}
}
