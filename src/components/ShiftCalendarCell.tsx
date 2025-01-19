import React from 'react';

interface ShiftCalendarCellProps {
  dayNumber: string;
  isWeekend: boolean;
  shifts?: {
    userName: string;
    timeSlot: string;
    isSpanning?: boolean;
  }[];
}

export default function ShiftCalendarCell({ dayNumber, isWeekend, shifts = [] }: ShiftCalendarCellProps) {
  // 時間帯ごとのシフトを整理
  const getShiftsForSlot = (slot: string) => {
    return shifts.filter(shift => shift.timeSlot.includes(slot));
  };

  // 矢印表示が必要かどうかを判定
  const shouldShowArrow = (userName: string, currentSlot: string, nextSlot: string) => {
    const userShifts = shifts.filter(shift => shift.userName === userName);
    return userShifts.some(shift => {
      const [start, end] = shift.timeSlot.split('-').map(time => parseInt(time));
      const [currentStart] = currentSlot.split('-').map(time => parseInt(time));
      const [nextStart, nextEnd] = nextSlot.split('-').map(time => parseInt(time));
      return start <= currentStart && end >= nextEnd;
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="text-right p-1 text-sm font-medium">{dayNumber}</div>
      {isWeekend ? (
        <>
          <div className="flex-1 border-t border-gray-200 p-1 min-h-[40px]">
            <div className="text-xs text-gray-500 mb-1">9:30-13:00</div>
            <div className="flex flex-wrap gap-1">
              {getShiftsForSlot('9:30-13:00').map((shift, index) => (
                <div key={index} className="text-xs bg-[#48d1cc] text-white px-1 rounded">
                  {shift.userName}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 border-t border-gray-200 p-1 min-h-[40px]">
            <div className="text-xs text-gray-500 mb-1">13:00-18:00</div>
            <div className="flex flex-wrap gap-1">
              {getShiftsForSlot('13:00-18:00').map((shift, index) => (
                shift.isSpanning ? (
                  <div key={index} className="text-xs text-center">↓</div>
                ) : (
                  <div key={index} className="text-xs bg-[#48d1cc] text-white px-1 rounded">
                    {shift.userName}
                  </div>
                )
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 border-t border-gray-200 p-1 min-h-[40px]">
            <div className="text-xs text-gray-500 mb-1">9:00-13:00</div>
            <div className="flex flex-wrap gap-1">
              {getShiftsForSlot('9:00-13:00').map((shift, index) => (
                <div key={index} className="text-xs bg-[#48d1cc] text-white px-1 rounded">
                  {shift.userName}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 border-t border-gray-200 p-1 min-h-[40px]">
            <div className="text-xs text-gray-500 mb-1">13:00-18:00</div>
            <div className="flex flex-wrap gap-1">
              {getShiftsForSlot('13:00-18:00').map((shift, index) => (
                shift.isSpanning ? (
                  <div key={index} className="text-xs text-center">↓</div>
                ) : (
                  <div key={index} className="text-xs bg-[#48d1cc] text-white px-1 rounded">
                    {shift.userName}
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="flex-1 border-t border-gray-200 p-1 min-h-[40px]">
            <div className="text-xs text-gray-500 mb-1">18:00-21:00</div>
            <div className="flex flex-wrap gap-1">
              {getShiftsForSlot('18:00-21:00').map((shift, index) => (
                shift.isSpanning ? (
                  <div key={index} className="text-xs text-center">↓</div>
                ) : (
                  <div key={index} className="text-xs bg-[#48d1cc] text-white px-1 rounded">
                    {shift.userName}
                  </div>
                )
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}