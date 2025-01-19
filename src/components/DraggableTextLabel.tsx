import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

interface DraggableTextLabelProps {
  text: string;
  type: 'template' | 'placed';
  onDragEnd?: (text: string, position: { x: number; y: number }) => void;
}

export default function DraggableTextLabel({ text, type, onDragEnd }: DraggableTextLabelProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'text-label',
    item: { text },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && onDragEnd) {
        const { x, y } = monitor.getClientOffset() || { x: 0, y: 0 };
        onDragEnd(text, { x, y });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`
        inline-block px-2 py-1 rounded
        ${type === 'template' ? 'bg-gray-100 cursor-grab' : 'bg-white border border-gray-200'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
    >
      {text}
    </div>
  );
}