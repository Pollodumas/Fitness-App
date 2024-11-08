import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExerciseDialog } from './components/ExerciseDialog';
import { WorkoutDay } from './components/WorkoutDay';
import { LandingPage } from './components/LandingPage';
import { MainMenu } from './components/MainMenu';
import { CompletedWorkouts } from './components/CompletedWorkouts';
import { Settings } from './components/Settings';
import { SaveWorkoutDialog } from './components/SaveWorkoutDialog';
import { Exercise } from './types/Exercise';
import { useTheme } from './contexts/ThemeContext';

const INITIAL_EXERCISES: Record<string, Exercise[]> = {
  'Lunes': [
    { name: 'Press de Banca', series: 4, reps: '8-10', pause: '90', weight: 60, videoUrl: 'https://www.youtube.com/watch?v=XSza8hVTlmM' },
    { name: 'Sentadillas', series: 4, reps: '10-12', pause: '120', weight: 80, videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U' }
  ],
  'Martes': [
    { name: 'Dominadas', series: 3, reps: '8-10', pause: '90', weight: 0, videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
    { name: 'Remo con Barra', series: 3, reps: '10-12', pause: '90', weight: 50, videoUrl: 'https://www.youtube.com/watch?v=G8l_8chR5BE' }
  ],
  'Miércoles': [
    { name: 'Press Militar', series: 4, reps: '8-10', pause: '90', weight: 40, videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
    { name: 'Elevaciones Laterales', series: 3, reps: '12-15', pause: '60', weight: 10, videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' }
  ],
  'Jueves': [],
  'Viernes': [],
  'Sábado': [
    { name: 'Peso Muerto', series: 4, reps: '6-8', pause: '120', weight: 100, videoUrl: 'https://www.youtube.com/watch?v=1ZXobu7JvvE' },
    { name: 'Hip Thrust', series: 3, reps: '12-15', pause: '90', weight: 70, videoUrl: 'https://www.youtube.com/watch?v=xDmFkJxPzeM' }
  ],
  'Domingo': []
};

export default function App() {
  const { currentTheme } = useTheme();
  const [showApp, setShowApp] = useState(false);
  const [exercises, setExercises] = useState(INITIAL_EXERCISES);
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<{ index: number; exercise: Exercise } | null>(null);
  const [completedWorkouts, setCompletedWorkouts] = useState<Array<{ day: string; datetime: string; exercises: Exercise[] }>>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSaveExercise = (exercise: Exercise) => {
    setExercises(prev => {
      const newExercises = { ...prev };
      if (editingExercise !== null) {
        newExercises[selectedDay][editingExercise.index] = exercise;
      } else {
        newExercises[selectedDay] = [...(newExercises[selectedDay] || []), exercise];
      }
      return newExercises;
    });
    setEditingExercise(null);
  };

  const handleEditExercise = (index: number) => {
    setEditingExercise({ index, exercise: exercises[selectedDay][index] });
    setIsDialogOpen(true);
  };

  const handleDeleteExercise = (index: number) => {
    setExercises(prev => {
      const newExercises = { ...prev };
      newExercises[selectedDay] = newExercises[selectedDay].filter((_, i) => i !== index);
      return newExercises;
    });
  };

  const handleSaveWorkout = () => {
    if (exercises[selectedDay].length === 0) {
      alert('No hay ejercicios para guardar en este día');
      return;
    }

    const alreadySaved = completedWorkouts.some(
      workout => workout.day === selectedDay && 
      new Date(workout.datetime).toDateString() === new Date().toDateString()
    );

    if (alreadySaved) {
      alert('Este día ya ha sido guardado');
      return;
    }

    setCompletedWorkouts(prev => [
      ...prev,
      {
        day: selectedDay,
        datetime: new Date().toISOString(),
        exercises: [...exercises[selectedDay]]
      }
    ]);

    setShowSaveDialog(true);
  };

  if (!showApp) {
    return <LandingPage onEnter={() => setShowApp(true)} />;
  }

  return (
    <div className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <MainMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onShowHistory={() => {
          setShowHistory(true);
          setIsMenuOpen(false);
        }}
        onShowSettings={() => {
          setShowSettings(true);
          setIsMenuOpen(false);
        }}
      />

      <header className="bg-gradient-to-r from-teal-600 to-teal-800 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-teal-700 rounded-lg transition-colors duration-200"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">CutiFit v1.7.2</h1>
          <button
            onClick={handleSaveWorkout}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 rounded-lg transition-colors duration-200"
          >
            Guardar Día
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showHistory ? (
          <CompletedWorkouts 
            completedWorkouts={completedWorkouts}
            onBack={() => setShowHistory(false)}
          />
        ) : showSettings ? (
          <Settings onBack={() => setShowSettings(false)} />
        ) : (
          <>
            <div className="flex flex-wrap gap-4 mb-8">
              {Object.keys(exercises).map((day) => (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg ${
                    selectedDay === day 
                      ? 'bg-teal-600 text-white' 
                      : currentTheme === 'dark'
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </motion.button>
              ))}
            </div>

            <WorkoutDay
              exercises={exercises[selectedDay]}
              onEdit={handleEditExercise}
              onDelete={handleDeleteExercise}
              theme={currentTheme}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition-colors duration-200"
              onClick={() => {
                setEditingExercise(null);
                setIsDialogOpen(true);
              }}
            >
              Agregar Ejercicio
            </motion.button>
          </>
        )}
      </main>

      <ExerciseDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingExercise(null);
        }}
        onSave={handleSaveExercise}
        initialExercise={editingExercise?.exercise}
      />

      <SaveWorkoutDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        theme={currentTheme}
      />
    </div>
  );
}