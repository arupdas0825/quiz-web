import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, LayoutGrid } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function NavigatorGrid({ total, current, onSelect, visited, answers, marked, onNavigate }) {
  const getStatusColor = (i) => {
    if (current === i) return 'bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-[#0a1024]';
    if (marked.includes(i)) return 'bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.4)]';
    if (answers[i] !== -1) return 'bg-emerald-600 text-white';
    if (visited.includes(i)) return 'bg-rose-600 text-white';
    return 'bg-[#1e293b] text-slate-300 hover:bg-slate-700'; // untouched
  };

  return (
    <div className="grid grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 p-1">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => {
            onSelect(i);
            if (onNavigate) onNavigate(); // Close drawer on mobile
          }}
          className={twMerge(
            "flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200",
            getStatusColor(i)
          )}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-300 bg-white/5 p-4 rounded-xl border border-white/10">
      <div className="flex w-[45%] items-center gap-2">
        <div className="h-3 w-3 rounded-sm bg-emerald-600"></div> Answered
      </div>
      <div className="flex w-[45%] items-center gap-2">
        <div className="h-3 w-3 rounded-sm bg-rose-600"></div> Not Answered
      </div>
      <div className="flex w-[45%] items-center gap-2">
        <div className="h-3 w-3 rounded-sm bg-purple-600"></div> Marked
      </div>
      <div className="flex w-[45%] items-center gap-2">
        <div className="h-3 w-3 rounded-sm bg-[#1e293b]"></div> Unvisited
      </div>
    </div>
  );
}

export default function NavigatorDrawer({ 
  isOpen, 
  setIsOpen, 
  total, current, onSelect, visited, answers, marked 
}) {
  return (
    <>
      {/* Floating Mobile Button (hidden on lg) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 active:scale-95"
      >
        <LayoutGrid size={24} />
      </button>

      {/* Desktop Sidebar (visible on lg) */}
      <div className="hidden lg:flex flex-col h-[calc(100vh-140px)] w-[340px] rounded-2xl border border-white/5 bg-[#0a1024]/80 p-6 backdrop-blur-xl shrink-0 sticky top-[100px]">
        <h3 className="mb-6 text-lg font-bold text-slate-200">Question Palette</h3>
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
          <NavigatorGrid total={total} current={current} onSelect={onSelect} visited={visited} answers={answers} marked={marked} />
        </div>
        <Legend />
      </div>

      {/* Mobile Drawer (Dialog) */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel className="w-full transform overflow-hidden rounded-t-3xl bg-[#0a1024] p-6 text-left align-middle shadow-xl transition-all border-t border-white/10 flex flex-col max-h-[85vh]">
                  <div className="flex items-center justify-between mb-6">
                    <Dialog.Title as="h3" className="text-xl font-bold text-white">
                      Question Palette
                    </Dialog.Title>
                    <button
                      type="button"
                      className="rounded-full bg-white/10 p-2 text-slate-300 hover:bg-white/20 outline-none"
                      onClick={() => setIsOpen(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto scrollbar-hide">
                    <NavigatorGrid total={total} current={current} onSelect={onSelect} visited={visited} answers={answers} marked={marked} onNavigate={() => setIsOpen(false)} />
                    <Legend />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
