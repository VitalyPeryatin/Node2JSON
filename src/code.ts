figma.showUI(__html__, { title: "Node2JSON", height: 300 });

export const sendMessageToUI = (msg: any) => {
    figma.ui.postMessage(msg);
};

figma.on('selectionchange', () => {
    const sceneNode = figma.currentPage.selection[0]
    let json;
    try {
       const sceneObject = {
           id: sceneNode.id,
           name: sceneNode.name,
           width: sceneNode.width,
           height: sceneNode.height,
           x: sceneNode.x,
           y: sceneNode.y,
           visible: sceneNode.visible
        }
        json = JSON.stringify(sceneObject, null, 2);
    } catch (e) {
        json = "";
        console.error(e);
    }
    sendMessageToUI({
        type: 'selection-changed',
        json: json,
    })
});

figma.ui.onmessage = (message) => {
    switch (message.type) {
        case 'remove':
            // figma...
            sendMessageToUI({ type: 'remove' })
            break;
        default:
            break;
    }
}
