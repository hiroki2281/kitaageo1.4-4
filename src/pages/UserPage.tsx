import React, { useState } from 'react';
import { Calendar, Clock, MessageSquare, LogOut, Send } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import ShiftSubmissionModal from '../components/ShiftSubmissionModal';

type ShiftEntry = {
  date: Date;
  timeSlot: string;
};

export default function UserPage() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'messages'>('calendar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedShifts, setSelectedShifts] = useState<ShiftEntry[]>([]);
  const [message, setMessage] = useState('');

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start);
    setIsModalOpen(true);
  };

  const handleShiftSelect = (date: Date, timeSlot: string) => {
    setSelectedShifts(prev => [...prev, { date, timeSlot }]);
  };

  const handleSubmitAll = async () => {
    try {
      // TODO: Supabaseにシフトを登録する処理を実装
      console.log('Submitting all shifts:', {
        shifts: selectedShifts,
        message
      });
      // 送信後にリセット
      setSelectedShifts([]);
      setMessage('');
    } catch (error) {
      console.error('Error submitting shifts:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">北上尾歯科 シフト管理</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">山田 花子</span>
            <button
              onClick={() => {/* TODO: ログアウト処理 */}}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* タブナビゲーション */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'calendar'
                ? 'bg-[#48d1cc] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar size={20} />
            <span>シフトカレンダー</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'messages'
                ? 'bg-[#48d1cc] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare size={20} />
            <span>メッセージ</span>
          </button>
        </div>

        {/* カレンダー表示 */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">シフトカレンダー</h2>
                <button
                  onClick={() => {
                    setSelectedDate(new Date());
                    setIsModalOpen(true);
                  }}
                  className="flex items-center space-x-2 bg-[#48d1cc] text-white px-4 py-2 rounded-lg hover:bg-[#3bb3b3]"
                >
                  <Clock size={20} />
                  <span>シフトを選択</span>
                </button>
              </div>
              <div className="calendar-container">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  locale={jaLocale}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek'
                  }}
                  height="auto"
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  weekends={true}
                  businessHours={{
                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                    startTime: '09:00',
                    endTime: '21:00',
                  }}
                  slotMinTime="09:00:00"
                  slotMaxTime="21:00:00"
                  select={handleDateSelect}
                  events={selectedShifts.map(shift => ({
                    title: shift.timeSlot,
                    start: shift.date,
                    backgroundColor: '#48d1cc',
                    borderColor: '#48d1cc'
                  }))}
                />
              </div>
            </div>

            {/* 選択したシフトとメモ */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">選択したシフト</h3>
              <div className="space-y-4">
                {selectedShifts.length > 0 ? (
                  <div className="space-y-2">
                    {selectedShifts.map((shift, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>
                          {shift.date.toLocaleDateString('ja-JP', {
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long'
                          })}
                          : {shift.timeSlot}
                        </span>
                        <button
                          onClick={() => setSelectedShifts(prev => prev.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700"
                        >
                          削除
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">シフトが選択されていません</p>
                )}

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メモ（任意）
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#48d1cc] focus:ring focus:ring-[#48d1cc] focus:ring-opacity-50"
                    placeholder="備考や要望があればご記入ください"
                  />
                </div>

                {selectedShifts.length > 0 && (
                  <button
                    onClick={handleSubmitAll}
                    className="w-full mt-4 flex items-center justify-center space-x-2 bg-[#48d1cc] text-white px-4 py-3 rounded-lg hover:bg-[#3bb3b3]"
                  >
                    <Send size={20} />
                    <span>全てのシフトを提出する</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* メッセージ表示 */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">メッセージ</h2>
            <div className="text-gray-600">
              メッセージはありません
            </div>
          </div>
        )}
      </main>

      {/* シフト提出モーダル */}
      <ShiftSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onShiftSelect={handleShiftSelect}
      />
    </div>
  );
}