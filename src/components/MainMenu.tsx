import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, ClockIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface MainMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onShowHistory: () => void;
  onShowSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  isOpen,
  onClose,
  onShowHistory,
  onShowSettings
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0">
        <Dialog.Panel
          as={motion.div}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 left-0 w-64 bg-gray-800 shadow-xl"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Menú</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => {
                  onShowHistory();
                  onClose();
                }}
                className="flex items-center w-full px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ClockIcon className="h-5 w-5 mr-3" />
                <span>Entrenamientos Guardados</span>
              </button>

              <button
                onClick={() => {
                  onShowSettings();
                  onClose();
                }}
                className="flex items-center w-full px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Cog6ToothIcon className="h-5 w-5 mr-3" />
                <span>Configuración</span>
              </button>
            </nav>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};