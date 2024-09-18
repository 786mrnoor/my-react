export default function cleanup(component) {
    component.effects.forEach(effect => {
        effect.cleanup && effect.cleanup();
    });

    //cleanup children
    component.component.children.forEach(c => {
        if (typeof c.type === 'function') {
            cleanup(c);
        }
    });
};
