import React, { useState } from 'react';
import { X } from 'lucide-react';

// 平日の時間帯
const WEEKDAY_TIME_SLOTS = [
  '9:00-13:00',
  '9:00-18:00',
  '9:00-21:00',
  '13:00-18:00',
  '13:00-21:00',
  '18:00-21:00'
] as const;

// 土日祝日の時間帯
const WEEKEND_TIME_SLOTS = [
  '9:30-13:00',
  '9:30-18:00'
] as const;

type WeekdayTimeSlot = typeof WEEKDAY_TIME_SLOTS[number];
type WeekendTimeSlot = typeof WEEKEND_TIME_SLOTS[number];
type TimeSlot = WeekdayTimeSlot | WeekendTimeSlot;

interface ShiftSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onShiftSelect: (date: Date, timeSlot: TimeSlot) => void;
}

export default function ShiftSubmissionModal({ isOpen, onClose, selectedDate, onShiftSelect }: ShiftSubmissionModalProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>(WEEKDAY_TIME_SLOTS[0]);

  if (!isOpen || !selectedDate) return null;

  // 土日かどうかを判定
  const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
  // 選択可能な時間帯を設定
  const availableTimeSlots = isWeekend ? WEEKEND_TIME_SLOTS : WEEKDAY_TIME_SLOTS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    onShiftSelect(selectedDate, selectedTimeSlot);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            シフト時間選択
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              日付
            </label>
            <div className="text-gray-900">
              {selectedDate?.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              時間帯
            </label>
            <select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value as TimeSlot)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#48d1cc] focus:ring focus:ring-[#48d1cc] focus:ring-opacity-50"
            >
              {availableTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#48d1cc]"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#48d1cc] border border-transparent rounded-md shadow-sm hover:bg-[#3bb3b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#48d1cc]"
            >
              決定する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}