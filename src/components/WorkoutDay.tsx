import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilIcon, TrashIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { Exercise } from '../types/Exercise';

interface WorkoutDayProps {
  exercises: Exercise[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  theme: string;
}

export const WorkoutDay: React.FC<WorkoutDayProps> = ({ exercises, onEdit, onDelete, theme }) => {
  const handleVideoClick = (videoUrl?: string) => {
    if (videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {exercises.map((exercise, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`rounded-lg p-4 shadow-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className={`text-xl font-semibold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {exercise.name}
                  </h3>
                  {exercise.videoUrl && (
                    <button
                      onClick={() => handleVideoClick(exercise.videoUrl)}
                      className={`p-1 rounded-full hover:bg-opacity-80 transition-colors duration-200 ${
                        theme === 'dark'
                          ? 'text-teal-400 hover:bg-gray-700'
                          : 'text-teal-600 hover:bg-gray-100'
                      }`}
                      title="Ver video del ejercicio"
                    >
                      <PlayCircleIcon className="h-6 w-6" />
                    </button>
                  )}
                </div>
                <div className={`grid grid-cols-2 gap-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <div>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Series</p>
                    <p className="font-medium">{exercise.series}</p>
                  </div>
                  <div>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Repeticiones</p>
                    <p className="font-medium">{exercise.reps}</p>
                  </div>
                  <div>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Descanso</p>
                    <p className="font-medium">{exercise.pause}s</p>
                  </div>
                  <div>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Peso</p>
                    <p className="font-medium">{exercise.weight} kg</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onEdit(index)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-teal-400 hover:bg-gray-700'
                      : 'text-gray-500 hover:text-teal-600 hover:bg-gray-100'
                  }`}
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                      : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'
                  }`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {exercises.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center py-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          No hay ejercicios programados para este día
        </motion.div>
      )}
    </div>
  );
};