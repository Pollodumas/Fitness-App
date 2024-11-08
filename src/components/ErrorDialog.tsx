import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  theme: string;
}

export const ErrorDialog: React.FC<ErrorDialogProps> = ({ isOpen, onClose, message, theme }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 text-left align-middle shadow-xl transition-all`}>
                <div className="flex items-center justify-center mb-4">
                  <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500" />
                </div>
                <Dialog.Title
                  as="h3"
                  className={`text-lg font-medium leading-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                >
                  ¡Atención!
                </Dialog.Title>
                <div className="mt-2">
                  <p className={`text-sm text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    {message}
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Entendido
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};