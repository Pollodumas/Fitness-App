import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Exercise } from '../types/Exercise';
import { useTheme } from '../contexts/ThemeContext';

interface ExerciseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exercise: Exercise) => void;
  initialExercise?: Exercise;
}

export const ExerciseDialog: React.FC<ExerciseDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialExercise
}) => {
  const { currentTheme } = useTheme();
  const [exercise, setExercise] = useState<Exercise>({
    name: '',
    series: 1,
    reps: '10-12',
    pause: '60',
    weight: 0,
    videoUrl: ''
  });

  useEffect(() => {
    if (isOpen && initialExercise) {
      setExercise(initialExercise);
    } else if (isOpen) {
      setExercise({
        name: '',
        series: 1,
        reps: '10-12',
        pause: '60',
        weight: 0,
        videoUrl: ''
      });
    }
  }, [initialExercise, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exercise.name.trim() === '') {
      alert('El nombre del ejercicio es obligatorio');
      return;
    }
    onSave(exercise);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`mx-auto max-w-md rounded-xl ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 shadow-xl border border-teal-400/20`}>
          <Dialog.Title className={`text-xl font-medium mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {initialExercise ? 'Editar Ejercicio' : 'Agregar Ejercicio'}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Nombre del ejercicio
              </label>
              <input
                type="text"
                value={exercise.name}
                onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Series
              </label>
              <input
                type="text"
                value={exercise.series}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  const series = parseInt(value) || 1;
                  setExercise({ ...exercise, series });
                }}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Repeticiones
              </label>
              <input
                type="text"
                value={exercise.reps}
                onChange={(e) => setExercise({ ...exercise, reps: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Descanso (segundos)
              </label>
              <input
                type="text"
                value={exercise.pause}
                onChange={(e) => setExercise({ ...exercise, pause: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Peso (kg)
              </label>
              <input
                type="text"
                value={exercise.weight}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d.]/g, '');
                  const weight = parseFloat(value) || 0;
                  setExercise({ ...exercise, weight });
                }}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                URL del video (opcional)
              </label>
              <input
                type="url"
                value={exercise.videoUrl || ''}
                onChange={(e) => setExercise({ ...exercise, videoUrl: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="https://youtube.com/..."
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  currentTheme === 'dark'
                    ? 'border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-500 transition-colors duration-200"
              >
                {initialExercise ? 'Guardar' : 'Agregar'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};