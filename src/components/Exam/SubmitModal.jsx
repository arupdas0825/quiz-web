import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function SubmitModal({
  isOpen,
  onClose,
  onConfirm,
  total,
  answered,
  notAnswered,
  marked
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[99999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-[440px] transform overflow-hidden rounded-3xl border border-white/10 bg-[#0a1024] p-8 text-left align-middle shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all">
                <Dialog.Title
                  as="h2"
                  className="mb-2 text-center text-2xl font-bold text-slate-50"
                >
                  Final Submission
                </Dialog.Title>
                <div className="mb-6 text-center text-sm text-slate-400">
                  Please review your attempt summary before submitting.
                </div>

                <div className="mb-8 flex flex-col gap-3 rounded-2xl bg-white/5 p-5">
                  <div className="flex justify-between text-[15px]">
                    <span className="text-slate-300">Total Questions</span>
                    <span className="font-semibold text-slate-50">{total}</span>
                  </div>
                  <div className="flex justify-between text-[15px]">
                    <span className="text-emerald-500">Answered</span>
                    <span className="font-semibold text-emerald-500">{answered}</span>
                  </div>
                  <div className="flex justify-between text-[15px]">
                    <span className="text-rose-500">Not Answered</span>
                    <span className="font-semibold text-rose-500">{notAnswered}</span>
                  </div>
                  <div className="flex justify-between text-[15px]">
                    <span className="text-purple-500">Marked for Review</span>
                    <span className="font-semibold text-purple-500">{marked}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    className="flex-1 rounded-xl border border-white/10 bg-transparent py-3 font-semibold text-slate-200 transition-all duration-200 hover:bg-white/5 active:scale-[0.98]"
                    onClick={onClose}
                  >
                    Go Back
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-xl bg-emerald-600 py-3 font-semibold text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all duration-200 hover:bg-emerald-500 hover:brightness-110 active:scale-[0.98]"
                    onClick={onConfirm}
                  >
                    Submit Now
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
