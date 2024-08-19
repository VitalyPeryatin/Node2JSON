import React, {useState} from 'react';
import ReactDOM from "react-dom/client";

const JsonViewer = () => {
    const [sampleData, setSampleData] = useState("");
    window.addEventListener('message', (event: MessageEvent) => {
        const message = event.data.pluginMessage;
        switch (message.type) {
            case 'selection-changed':
                setSampleData(message.json);
                break;
            case 'remove':
                setSampleData("")
                break;
            default: {
                throw new Error(`Нет обработчика для ${message.type}`);
            }
        }
    });
    return (
        <div style={{ overflow: "scroll", height: 200 }}>
            <pre>{sampleData}</pre>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <div>
            <h1>JSON Viewer</h1>
            <JsonViewer/>
            <button style={{ position: 'absolute', bottom: 8 }} onClick={() => {
                parent.postMessage({ pluginMessage: { type: "remove" } }, "*");
            }}>Удалить</button>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
