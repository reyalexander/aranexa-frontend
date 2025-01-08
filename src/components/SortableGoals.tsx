'use client';

import type { DragEndEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

interface SortableGoalsProps {
  items: string[];
  onChange: (newItems: string[]) => void;
}

// Cada “item” (meta) con la lógica para arrastrar
function SortableGoalItem({ id, index }: { id: string; index: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center space-x-3 rounded bg-zinc-800 px-3 py-2"
    >
      {/* Botón de “drag” (ícono) */}
      <div className="cursor-grab select-none text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 9h.01M8 15h.01M12 9h.01M12 15h.01M16 9h.01M16 15h.01"
          />
        </svg>
      </div>
      {/* Número de prioridad */}
      <span className="inline-block rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white">
        {index + 1}
      </span>
      {/* Texto de la meta */}
      <span className="flex-1">{id}</span>
    </div>
  );
}

export function SortableGoals({ items, onChange }: SortableGoalsProps) {
  // Configura los “sensores” para DnD
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      const newArr = arrayMove(items, oldIndex, newIndex);
      onChange(newArr);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item, index) => (
            <SortableGoalItem key={item} id={item} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
