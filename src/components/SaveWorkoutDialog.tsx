import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface SaveWorkoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark' | 'system';
}

export const SaveWorkoutDialog: React.FC<SaveWorkoutDialogProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="mx-auto max-w-sm rounded-xl bg-gray-800 p-6 shadow-xl border border-teal-400/20"
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 10 }}
            >
              <CheckCircleIcon className="h-16 w-16 text-teal-400 mb-4" />
            </motion.div>

            <Dialog.Title className="text-xl font-medium text-white mb-2">
              ¡Entrenamiento Guardado!
            </Dialog.Title>
            
            <p className="text-gray-300 mb-6">
              Tu progreso ha sido registrado exitosamente.
            </p>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-colors"
            >
              Continuar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};