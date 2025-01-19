import React, { useState } from 'react';
import { Undo2, RotateCcw, Trash2 } from 'lucide-react';
import DraggableTextLabel from './DraggableTextLabel';

interface ShiftEditorPanelProps {
  onColorSelect: (color: string) => void;
  onUndo: () => void;
  onUndoTwo: () => void;
  onClearAll: () => void;
  selectedColor: string;
  textTemplates: string[];
  onAddTextLabel: (text: string, position: { x: number; y: number }) => void;
}

export default function ShiftEditorPanel({
  onColorSelect,
  onUndo,
  onUndoTwo,
  onClearAll,
  selectedColor,
  textTemplates,
  onAddTextLabel,
}: ShiftEditorPanelProps) {
  const [editorMode, setEditorMode] = useState<'view' | 'edit'>('view');
  
  const colors = [
    '#48d1cc',
    '#ff6b6b',
    '#4ecdc4',
    '#45b7d1',
    '#96ceb4',
    '#ffeead',
    '#ff9999',
    '#99ccff'
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">編集ツール</h3>
      
      {/* 編集モード切り替え */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          編集モード
        </label>
        <div className="flex space-x-4">
          <button
            onClick={() => setEditorMode('view')}
            className={`px-4 py-2 rounded-lg ${
              editorMode === 'view'
                ? 'bg-[#48d1cc] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            閲覧
          </button>
          <button
            onClick={() => setEditorMode('edit')}
            className={`px-4 py-2 rounded-lg ${
              editorMode === 'edit'
                ? 'bg-[#48d1cc] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            編集
          </button>
        </div>
      </div>

      {/* カラーパレット */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          背景色
        </label>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorSelect(color)}
              className={`w-8 h-8 rounded-full ${
                selectedColor === color ? 'ring-2 ring-offset-2 ring-[#48d1cc]' : ''
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* 操作履歴 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          操作履歴
        </label>
        <div className="space-y-2">
          <button
            onClick={onUndo}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Undo2 size={16} />
            <span>元に戻す（1つ前）</span>
          </button>
          <button
            onClick={onUndoTwo}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <RotateCcw size={16} />
            <span>元に戻す（2つ前）</span>
          </button>
        </div>
      </div>

      {/* テキストラベル */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          テキストラベル
        </label>
        <div className="space-y-2">
          {textTemplates.map((template, index) => (
            <DraggableTextLabel
              key={index}
              text={template}
              type="template"
              onDragEnd={onAddTextLabel}
            />
          ))}
        </div>
      </div>

      {/* その他の操作 */}
      <div>
        <button
          onClick={onClearAll}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
        >
          <Trash2 size={16} />
          <span>オールクリア</span>
        </button>
      </div>
    </div>
  );
}