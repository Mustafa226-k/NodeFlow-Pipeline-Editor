// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar-container">
            <div className="toolbar-content">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />

                {/* New Nodes */}
                <DraggableNode type='example1' label='Example 1' />
                <DraggableNode type='example2' label='Example 2' />
                <DraggableNode type='debug' label='Debug' />
                <DraggableNode type='timer' label='Timer' />
                <DraggableNode type='condition' label='Condition' />
            </div>
        </div>
    );
};
